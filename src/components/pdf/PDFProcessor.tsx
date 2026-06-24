"use client";

import { useEffect } from "react";

interface PDFProcessorProps {
  file: File;
  onExtracted: (text: string) => void;
  onError: (error: string) => void;
}

export default function PDFProcessor({
  file,
  onExtracted,
  onError,
}: PDFProcessorProps) {
  useEffect(() => {
    let isMounted = true;

    const processPDF = async () => {
      // Sadece istemci tarafında çalıştırıldığından emin olunur
      if (typeof window === "undefined") return;

      try {
        // pdfjs-dist kütüphanesini dinamik olarak içe aktar
        const pdfjsLib = await import("pdfjs-dist");
        
        // Worker dosyasını yerel public klasöründen alıyoruz (CORS ve CDN hatalarını kökten çözmek için)
        pdfjsLib.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.mjs`;

        const arrayBuffer = await file.arrayBuffer();
        console.log(`[PDFProcessor] ${file.name} dosyası işlenmeye başlandı...`);

        const loadingTask = pdfjsLib.getDocument({ 
          data: arrayBuffer,
          disableFontFace: true, // Yazı tiplerinin yüklenmesini devre dışı bırakır (Europass vb. font hataları için)
          cMapUrl: `/cmaps/`,
          cMapPacked: true,
        });
        const pdfDocument = await loadingTask.promise;
        
        let fullText = "";
        for (let i = 1; i <= pdfDocument.numPages; i++) {
          try {
            const page = await pdfDocument.getPage(i);
            
            let textContent;
            try {
              // Font hatalarında çökmeyi önlemek için try-catch bloğuna alıyoruz
              textContent = await page.getTextContent();
            } catch (err) {
              console.warn(`[PDFProcessor] Sayfa ${i} metin içeriği çekilirken hata oluştu:`, err);
              continue; // Sayfayı atla veya varsa diğer sayfalara geç
            }
            
            const pageStrings = textContent.items.map((item: any) => {
              return "str" in item ? item.str : "";
            });
            
            // Metin parçalarını aralarında boşlukla birleştir ve fazla boşlukları temizle
            const pageText = pageStrings.join(" ").replace(/\s+/g, " ").trim();
            fullText += pageText + "\n";
          } catch (pageErr) {
            console.warn(`[PDFProcessor] Sayfa ${i} işlenirken hata oluştu:`, pageErr);
          }
        }

        console.log("[PDFProcessor] Ayıklanan Metin Uzunluğu:", fullText.length);

        if (isMounted) {
          onExtracted(fullText);
        }
      } catch (error: any) {
        console.error("PDF okuma hatası:", error);
        if (isMounted) {
          onError(`PDF okuma hatası: ${error?.message || error?.toString() || 'Bilinmeyen hata'}`);
        }
      }
    };

    processPDF();

    return () => {
      isMounted = false;
    };
  }, [file, onExtracted, onError]);

  return null; // Bu bileşen arayüz sunmaz, sadece arka planda PDF işler
}
