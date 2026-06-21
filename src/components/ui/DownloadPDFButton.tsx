"use client";

import { Button } from "./Button";

interface DownloadPDFButtonProps {
  targetId: string;
  filename?: string;
  className?: string;
}

/**
 * PDF İndirme Butonu — Native window.print() tabanlı
 * 
 * Tarayıcının yerleşik yazdırma motorunu kullanarak vektörel PDF üretir.
 * Yazılar seçilebilir, kopyalanabilir ve ATS uyumludur.
 * Stil ayarları globals.css içindeki @media print kuralları ile yönetilir.
 */
export function DownloadPDFButton({ filename = "ozgecmis", className }: DownloadPDFButtonProps) {
  
  const handlePrint = () => {
    // PDF adını ayarlamak için document.title geçici olarak değiştirilir
    const originalTitle = document.title;
    if (filename) {
      document.title = filename.replace('.pdf', '');
    }

    // Tarayıcıya unvanı güncellemesi için zaman tanı
    setTimeout(() => {
      window.print();
      // Yazdırma dialogu açıldıktan sonra unvanı eski haline getir
      document.title = originalTitle;
    }, 100);
  };

  return (
    <Button
      onClick={handlePrint}
      className={className}
      leftIcon={
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
        </svg>
      }
    >
      Özgeçmişi İndir (PDF)
    </Button>
  );
}
