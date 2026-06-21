"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service like Crashlytics or Sentry
    console.error("Uygulama Hatası:", error);
  }, [error]);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-4 text-center">
      <div className="bg-error/10 text-error p-4 rounded-full mb-6">
        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-foreground mb-4">Bir şeyler yanlış gitti!</h2>
      <p className="text-[var(--foreground-muted)] max-w-md mb-8">
        Beklenmeyen bir hata oluştu. Sayfayı yenilemeyi veya tekrar denemeyi seçebilirsiniz. Sorun devam ederse lütfen daha sonra tekrar deneyin.
      </p>
      <div className="flex gap-4">
        <Button onClick={() => reset()} variant="primary">
          Tekrar Dene
        </Button>
        <Button onClick={() => window.location.href = "/"} variant="outline">
          Ana Sayfaya Dön
        </Button>
      </div>
    </div>
  );
}
