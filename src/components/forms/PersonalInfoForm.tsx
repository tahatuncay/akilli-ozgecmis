"use client";

import { useRef } from "react";
import { useCV } from "@/context/CVContext";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";

/**
 * Resmi Base64'e dönüştürür ve opsiyonel olarak yeniden boyutlandırır.
 * Max 400x400px boyutlandırma — dosya boyutunu küçültür ama kaliteyi korur.
 */
function processImage(file: File, maxSize: number = 400): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let { width, height } = img;

        // Proportional resize
        if (width > maxSize || height > maxSize) {
          if (width > height) {
            height = Math.round((height * maxSize) / width);
            width = maxSize;
          } else {
            width = Math.round((width * maxSize) / height);
            height = maxSize;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Canvas context unavailable"));
          return;
        }

        // High quality rendering
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to base64 — JPEG with 92% quality for good size/quality balance
        const base64 = canvas.toDataURL("image/jpeg", 0.92);
        resolve(base64);
      };
      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

export function PersonalInfoForm() {
  const { cvData, dispatch } = useCV();
  const { personalInfo } = cvData;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch({
      type: "UPDATE_PERSONAL_INFO",
      payload: { [name]: value },
    });
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Lütfen geçerli bir resim dosyası seçin.");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Resim dosyası 5MB'dan küçük olmalıdır.");
      return;
    }

    try {
      const base64 = await processImage(file);
      dispatch({
        type: "UPDATE_PERSONAL_INFO",
        payload: { photoUrl: base64 },
      });
    } catch (error) {
      console.error("Resim yüklenirken hata:", error);
      alert("Resim yüklenirken bir hata oluştu.");
    }

    // Reset input so same file can be re-selected
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemovePhoto = () => {
    dispatch({
      type: "UPDATE_PERSONAL_INFO",
      payload: { photoUrl: "" },
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card variant="default">
        <CardHeader>
          <CardTitle>Kişisel Bilgiler</CardTitle>
          <CardDescription>
            İşverenlerin sizinle iletişime geçebilmesi için temel bilgilerinizi girin.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">

          {/* ── Profil Fotoğrafı Yükleme Alanı ── */}
          <div className="flex flex-col items-center gap-4 pb-6 border-b border-[var(--border)]">
            <div className="relative group">
              {/* Gradient ring efekti */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-primary-400 via-primary-500 to-secondary-500 opacity-75 group-hover:opacity-100 transition-opacity duration-300 blur-[2px]" />

              {/* Fotoğraf alanı */}
              <div
                className="relative w-28 h-28 rounded-full overflow-hidden bg-[var(--background-secondary)] border-3 border-white cursor-pointer transition-transform duration-300 group-hover:scale-105"
                onClick={() => fileInputRef.current?.click()}
                role="button"
                tabIndex={0}
                aria-label="Profil fotoğrafı yükle"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    fileInputRef.current?.click();
                  }
                }}
              >
                {personalInfo.photoUrl ? (
                  <img
                    src={personalInfo.photoUrl}
                    alt="Profil fotoğrafı"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-[var(--foreground-muted)] gap-1">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                    </svg>
                    <span className="text-[10px] font-medium">Fotoğraf Yükle</span>
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-full">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Gizli file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={handlePhotoUpload}
              aria-hidden="true"
            />

            {/* Butonlar */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 text-xs font-medium rounded-lg bg-[var(--color-primary-500)] text-white hover:bg-[var(--color-primary-600)] transition-colors duration-200 cursor-pointer"
              >
                {personalInfo.photoUrl ? "Değiştir" : "Fotoğraf Seç"}
              </button>
              {personalInfo.photoUrl && (
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg border border-[var(--border)] text-[var(--foreground-secondary)] hover:bg-[var(--color-error)] hover:text-white hover:border-transparent transition-all duration-200 cursor-pointer"
                >
                  Kaldır
                </button>
              )}
            </div>
            <p className="text-[10px] text-[var(--foreground-muted)]">
              JPG, PNG veya WebP • Maks. 5MB
            </p>
          </div>

          {/* ── Mevcut Form Alanları ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Ad Soyad"
              name="fullName"
              placeholder="Örn: Ahmet Yılmaz"
              value={personalInfo.fullName}
              onChange={handleChange}
              required
            />
            <Input
              label="Meslek / Ünvan"
              name="title"
              placeholder="Örn: Frontend Developer"
              value={personalInfo.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="E-posta"
              name="email"
              type="email"
              placeholder="Örn: ahmet@example.com"
              value={personalInfo.email}
              onChange={handleChange}
              required
            />
            <Input
              label="Telefon"
              name="phone"
              type="tel"
              placeholder="Örn: +90 532 000 0000"
              value={personalInfo.phone}
              onChange={handleChange}
              required
            />
          </div>

          <Input
            label="Konum"
            name="location"
            placeholder="Örn: İstanbul, Türkiye"
            value={personalInfo.location}
            onChange={handleChange}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="LinkedIn (Opsiyonel)"
              name="linkedIn"
              type="url"
              placeholder="https://linkedin.com/in/..."
              value={personalInfo.linkedIn || ""}
              onChange={handleChange}
            />
            <Input
              label="Kişisel Web Sitesi (Opsiyonel)"
              name="website"
              type="url"
              placeholder="https://..."
              value={personalInfo.website || ""}
              onChange={handleChange}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
