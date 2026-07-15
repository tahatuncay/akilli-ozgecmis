"use client";

import { useState, useRef, useCallback } from "react";
import { useCV, LinkedInParsedData } from "@/context/CVContext";
import PDFProcessor from "@/components/pdf/PDFProcessor";

type ImportStatus = "idle" | "reading-pdf" | "analyzing" | "success" | "error";

// Kariyer.net kurumsal mor renkleri
const BRAND_COLOR = "#5F2685";
const BRAND_COLOR_DARK = "#3D1A54";

export function KariyernetImport() {
  const { dispatch } = useCV();
  const [status, setStatus] = useState<ImportStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetState = () => {
    setStatus("idle");
    setErrorMessage("");
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFile = useCallback((file: File) => {
    // Sadece PDF kabul et
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      setStatus("error");
      setErrorMessage("Lütfen sadece PDF dosyası yükleyin. Kariyer.net özgeçmişinizi PDF olarak indirip tekrar deneyin.");
      return;
    }

    // Dosya boyutu kontrolü (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setStatus("error");
      setErrorMessage("Dosya boyutu çok büyük (maks. 10MB). Lütfen daha küçük bir PDF yükleyin.");
      return;
    }

    setErrorMessage("");
    setStatus("reading-pdf");
    setSelectedFile(file);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  // Drag & Drop handlers
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);

      const file = e.dataTransfer.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  // PDFProcessor'dan metin geldiğinde
  const handleTextExtracted = useCallback(async (text: string) => {
    if (!text.trim()) {
      setStatus("error");
      setErrorMessage(
        "PDF'den metin çıkarılamadı. Kariyer.net PDF'inizin taranmış (görüntü) bir dosya olmadığından emin olun."
      );
      setSelectedFile(null);
      return;
    }

    setStatus("analyzing");

    try {
      const response = await fetch("/api/parse-kariyernet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rawText: text }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Kariyer.net verisi işlenirken bir hata oluştu.");
      }

      // Aynı LinkedInParsedData tipini kullanıyoruz — şema aynı
      const parsed: LinkedInParsedData = data.result;

      // CVContext'e aktar (aynı IMPORT_LINKEDIN_DATA action'ını kullanır)
      dispatch({ type: "IMPORT_LINKEDIN_DATA", payload: parsed });
      setStatus("success");
      setSelectedFile(null);

      // 4 saniye sonra başarı mesajını kaldır
      setTimeout(() => {
        setStatus("idle");
      }, 4000);
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "Kariyer.net verisi işlenirken bir hata oluştu. Lütfen tekrar deneyin.");
      setSelectedFile(null);
    }
  }, [dispatch]);

  // PDFProcessor hata durumu
  const handlePDFError = useCallback((error: string) => {
    setStatus("error");
    setErrorMessage(error);
    setSelectedFile(null);
  }, []);

  // Loading / Analyzing state render
  if (status === "reading-pdf" || status === "analyzing") {
    return (
      <div className="relative overflow-hidden rounded-xl border-2 p-6" style={{ borderColor: `${BRAND_COLOR}4D`, background: `linear-gradient(to bottom right, ${BRAND_COLOR}0D, ${BRAND_COLOR}1A, ${BRAND_COLOR_DARK}0D)` }}>
        {/* Shimmer overlay */}
        <div
          className="absolute inset-0 animate-shimmer pointer-events-none"
          style={{ background: `linear-gradient(90deg, transparent, ${BRAND_COLOR}1A, transparent)` }}
        />

        <div className="relative flex flex-col items-center gap-4 text-center">
          {/* Animated Kariyer.net icon */}
          <div className="relative">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center shadow-lg" style={{ background: `linear-gradient(to bottom right, ${BRAND_COLOR}, ${BRAND_COLOR_DARK})` }}>
              <svg className="w-7 h-7 text-white animate-pulse" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
              </svg>
            </div>
            {/* Spinning ring */}
            <div className="absolute -inset-2 rounded-2xl border-2 animate-spin" style={{ borderColor: `${BRAND_COLOR}4D`, borderTopColor: BRAND_COLOR, animationDuration: "1.5s" }} />
          </div>

          <div>
            <p className="text-sm font-semibold" style={{ color: BRAND_COLOR }}>
              {status === "reading-pdf" ? "PDF okunuyor..." : "Kariyer.net özgeçmişiniz analiz ediliyor..."}
            </p>
            <p className="text-xs text-[var(--foreground-muted)] mt-1">
              {status === "reading-pdf"
                ? "Dosyanızdan metin çıkarılıyor"
                : "Yapay zeka verilerinizi ayıklıyor, birkaç saniye sürebilir"}
            </p>
          </div>

          {/* Progress dots */}
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: BRAND_COLOR,
                  animation: "pulse 1.2s ease-in-out infinite",
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Hidden PDFProcessor */}
        {selectedFile && (
          <PDFProcessor
            file={selectedFile}
            onExtracted={handleTextExtracted}
            onError={handlePDFError}
          />
        )}
      </div>
    );
  }

  // Success state
  if (status === "success") {
    return (
      <div className="rounded-xl border-2 border-[var(--color-success)]/30 bg-gradient-to-br from-[var(--color-success)]/5 to-[var(--color-success)]/10 p-6 animate-scale-in">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="w-12 h-12 rounded-full bg-[var(--color-success)]/10 flex items-center justify-center">
            <svg className="w-7 h-7 text-[var(--color-success)]" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-[var(--color-success)]">
              Verileriniz başarıyla aktarıldı!
            </p>
            <p className="text-xs text-[var(--foreground-muted)] mt-1">
              Form alanları Kariyer.net verilerinizle dolduruldu. Dilediğiniz gibi düzenleyebilirsiniz.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (status === "error") {
    return (
      <div className="rounded-xl border-2 border-[var(--color-error)]/30 bg-gradient-to-br from-[var(--color-error)]/5 to-[var(--color-error)]/10 p-5 animate-fade-in">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="w-12 h-12 rounded-full bg-[var(--color-error)]/10 flex items-center justify-center">
            <svg className="w-7 h-7 text-[var(--color-error)]" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-[var(--color-error)]">Bir sorun oluştu</p>
            <p className="text-xs text-[var(--foreground-muted)] mt-1">{errorMessage}</p>
          </div>
          <button
            type="button"
            onClick={resetState}
            className="mt-1 px-4 py-1.5 text-xs font-medium rounded-lg bg-[var(--color-error)] text-white hover:bg-[var(--color-error)]/90 transition-colors duration-200 cursor-pointer"
          >
            Tekrar Dene
          </button>
        </div>
      </div>
    );
  }

  // Idle state — Drag & Drop + Upload
  return (
    <div
      className="group relative overflow-hidden rounded-xl border-2 border-dashed transition-all duration-300 cursor-pointer"
      style={{
        borderColor: isDragOver ? BRAND_COLOR : `${BRAND_COLOR}4D`,
        background: isDragOver
          ? `${BRAND_COLOR}1A`
          : `linear-gradient(to bottom right, ${BRAND_COLOR}0D, transparent, ${BRAND_COLOR_DARK}0D)`,
        transform: isDragOver ? "scale(1.01)" : "scale(1)",
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
      role="button"
      tabIndex={0}
      aria-label="Kariyer.net PDF'ini sürükleyip bırakın veya tıklayarak seçin"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          fileInputRef.current?.click();
        }
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = `${BRAND_COLOR}99`;
      }}
      onMouseLeave={(e) => {
        if (!isDragOver) {
          (e.currentTarget as HTMLElement).style.borderColor = `${BRAND_COLOR}4D`;
        }
      }}
    >
      <div className="p-5 flex items-center gap-4">
        {/* Kariyer.net icon */}
        <div
          className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300"
          style={{ background: `linear-gradient(to bottom right, ${BRAND_COLOR}, ${BRAND_COLOR_DARK})` }}
        >
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
          </svg>
        </div>

        {/* Text content */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold" style={{ color: BRAND_COLOR }}>
            Kariyer.net&apos;den Veri Aktar
          </p>
          <p className="text-xs text-[var(--foreground-muted)] mt-0.5">
            Kariyer.net PDF&apos;inizi sürükleyip bırakın veya{" "}
            <span className="font-medium underline underline-offset-2" style={{ color: BRAND_COLOR }}>
              tıklayarak seçin
            </span>
          </p>
        </div>

        {/* Upload icon */}
        <div
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300"
          style={{ backgroundColor: `${BRAND_COLOR}1A` }}
        >
          <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" style={{ color: BRAND_COLOR }} fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
          </svg>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,application/pdf"
        className="hidden"
        onChange={handleFileChange}
        aria-hidden="true"
      />
    </div>
  );
}
