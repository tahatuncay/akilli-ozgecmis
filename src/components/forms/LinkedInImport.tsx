"use client";

import { useState, useRef, useCallback } from "react";
import { useCV, LinkedInParsedData } from "@/context/CVContext";
import PDFProcessor from "@/components/pdf/PDFProcessor";

type ImportStatus = "idle" | "reading-pdf" | "analyzing" | "success" | "error";

export function LinkedInImport() {
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
      setErrorMessage("Lütfen sadece PDF dosyası yükleyin. LinkedIn profilinizi PDF olarak indirip tekrar deneyin.");
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
        "PDF'den metin çıkarılamadı. LinkedIn PDF'inizin taranmış (görüntü) bir dosya olmadığından emin olun."
      );
      setSelectedFile(null);
      return;
    }

    setStatus("analyzing");

    try {
      const response = await fetch("/api/parse-linkedin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rawText: text }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "LinkedIn verisi işlenirken bir hata oluştu.");
      }

      const parsed: LinkedInParsedData = data.result;

      // CVContext'e aktar
      dispatch({ type: "IMPORT_LINKEDIN_DATA", payload: parsed });
      setStatus("success");
      setSelectedFile(null);

      // 4 saniye sonra başarı mesajını kaldır
      setTimeout(() => {
        setStatus("idle");
      }, 4000);
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "LinkedIn verisi işlenirken bir hata oluştu. Lütfen tekrar deneyin.");
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
      <div className="relative overflow-hidden rounded-xl border-2 border-[#0A66C2]/30 bg-gradient-to-br from-[#0A66C2]/5 via-[#0A66C2]/10 to-[#004182]/5 p-6">
        {/* Shimmer overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0A66C2]/10 to-transparent animate-shimmer pointer-events-none" />
        
        <div className="relative flex flex-col items-center gap-4 text-center">
          {/* Animated LinkedIn icon */}
          <div className="relative">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#0A66C2] to-[#004182] flex items-center justify-center shadow-lg">
              <svg className="w-7 h-7 text-white animate-pulse" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </div>
            {/* Spinning ring */}
            <div className="absolute -inset-2 rounded-2xl border-2 border-[#0A66C2]/30 border-t-[#0A66C2] animate-spin" style={{ animationDuration: "1.5s" }} />
          </div>

          <div>
            <p className="text-sm font-semibold text-[#0A66C2]">
              {status === "reading-pdf" ? "PDF okunuyor..." : "LinkedIn profiliniz analiz ediliyor..."}
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
                className="w-2 h-2 rounded-full bg-[#0A66C2]"
                style={{
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
              Form alanları LinkedIn verilerinizle dolduruldu. Dilediğiniz gibi düzenleyebilirsiniz.
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
      className={`
        group relative overflow-hidden rounded-xl border-2 border-dashed transition-all duration-300 cursor-pointer
        ${
          isDragOver
            ? "border-[#0A66C2] bg-[#0A66C2]/10 scale-[1.01]"
            : "border-[#0A66C2]/30 bg-gradient-to-br from-[#0A66C2]/5 via-transparent to-[#004182]/5 hover:border-[#0A66C2]/60 hover:bg-[#0A66C2]/8"
        }
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
      role="button"
      tabIndex={0}
      aria-label="LinkedIn PDF'ini sürükleyip bırakın veya tıklayarak seçin"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          fileInputRef.current?.click();
        }
      }}
    >
      <div className="p-5 flex items-center gap-4">
        {/* LinkedIn icon */}
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#0A66C2] to-[#004182] flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300">
          <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </div>

        {/* Text content */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-[#0A66C2]">
            LinkedIn&apos;den Veri Aktar
          </p>
          <p className="text-xs text-[var(--foreground-muted)] mt-0.5">
            LinkedIn PDF&apos;inizi sürükleyip bırakın veya{" "}
            <span className="text-[#0A66C2] font-medium underline underline-offset-2">
              tıklayarak seçin
            </span>
          </p>
        </div>

        {/* Arrow icon */}
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#0A66C2]/10 flex items-center justify-center group-hover:bg-[#0A66C2]/20 transition-colors duration-300">
          <svg className="w-4 h-4 text-[#0A66C2] group-hover:translate-x-0.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
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
