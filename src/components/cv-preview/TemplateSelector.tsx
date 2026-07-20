"use client";

import { useState } from "react";
import { useCV } from "@/context/CVContext";

const TEMPLATES = [
  { id: "modern", name: "Modern", description: "Renkli ve dinamik sol şerit" },
  { id: "classic", name: "Klasik", description: "Geleneksel, kurumsal iki sütun" },
  { id: "minimal", name: "Minimal", description: "Zarif, bol beyaz alanlı" },
  { id: "creative", name: "Yaratıcı", description: "Canlı ve dikkat çekici renkler" },
  { id: "professional", name: "Profesyonel", description: "Yöneticiler için sade ve ciddi" },
];

const PRESET_COLORS = [
  { hex: "#0f766e", name: "Yeşil" },
  { hex: "#1e3a5f", name: "Lacivert" },
  { hex: "#7c2d12", name: "Bordo" },
  { hex: "#6d28d9", name: "Mor" },
  { hex: "#b45309", name: "Altın" },
  { hex: "#374151", name: "Koyu Gri" },
];

type TranslateStatus = "idle" | "translating" | "success" | "error";

export function TemplateSelector() {
  const { cvData, dispatch } = useCV();
  const [translateStatus, setTranslateStatus] = useState<TranslateStatus>("idle");
  const [translateError, setTranslateError] = useState("");

  const handleSelect = (templateId: string) => {
    dispatch({ type: "UPDATE_TEMPLATE", payload: templateId });
  };

  const handleColorChange = (color: string) => {
    dispatch({ type: "UPDATE_PRIMARY_COLOR", payload: color });
  };

  const handleLanguageChange = (lang: "tr" | "en") => {
    dispatch({ type: "UPDATE_CV_LANGUAGE", payload: lang });
  };

  const handleTranslateToEnglish = async () => {
    setTranslateStatus("translating");
    setTranslateError("");

    try {
      const response = await fetch("/api/translate-cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cvData }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Çeviri sırasında bir hata oluştu.");
      }

      const result = data.result;

      // Çevrilen alanları form state'ine uygula
      if (result.title) {
        dispatch({ type: "UPDATE_PERSONAL_INFO", payload: { title: result.title } });
      }
      if (result.summary) {
        dispatch({ type: "UPDATE_SUMMARY", payload: result.summary });
      }
      // Deneyim çevirileri
      if (result.experiences && Array.isArray(result.experiences)) {
        for (const translatedExp of result.experiences) {
          const existingExp = cvData.experiences.find((e) => e.id === translatedExp.id);
          if (existingExp) {
            dispatch({
              type: "UPDATE_EXPERIENCE",
              payload: {
                ...existingExp,
                position: translatedExp.position || existingExp.position,
                description: translatedExp.description || existingExp.description,
              },
            });
          }
        }
      }
      // Eğitim çevirileri
      if (result.education && Array.isArray(result.education)) {
        for (const translatedEdu of result.education) {
          const existingEdu = cvData.education.find((e) => e.id === translatedEdu.id);
          if (existingEdu) {
            dispatch({
              type: "UPDATE_EDUCATION",
              payload: {
                ...existingEdu,
                degree: translatedEdu.degree || existingEdu.degree,
                field: translatedEdu.field || existingEdu.field,
              },
            });
          }
        }
      }

      // Dili otomatik İngilizce'ye çevir
      dispatch({ type: "UPDATE_CV_LANGUAGE", payload: "en" });
      setTranslateStatus("success");

      setTimeout(() => setTranslateStatus("idle"), 3500);
    } catch (err: any) {
      setTranslateStatus("error");
      setTranslateError(err.message || "Çeviri sırasında bir hata oluştu.");
    }
  };

  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-4 mb-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">Şablon Seçimi</h3>
        <span className="text-xs text-[var(--foreground-muted)] px-2 py-1 bg-[var(--surface-hover)] rounded-md">Canlı Önizleme Aktif</span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {TEMPLATES.map((tpl) => (
          <button
            key={tpl.id}
            onClick={() => handleSelect(tpl.id)}
            className={`
              flex flex-col items-start p-3 rounded-xl border text-left transition-all duration-200
              ${cvData.templateId === tpl.id 
                ? "border-primary-500 bg-primary-50 ring-1 ring-primary-500 shadow-sm" 
                : "border-[var(--border)] hover:border-primary-300 hover:bg-[var(--surface-hover)]"}
            `}
          >
            <div className="flex items-center justify-between w-full mb-1">
              <span className={`font-medium ${cvData.templateId === tpl.id ? "text-primary-700" : "text-foreground"}`}>
                {tpl.name}
              </span>
              {cvData.templateId === tpl.id && (
                <svg className="w-4 h-4 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <span className="text-xs text-[var(--foreground-muted)]">{tpl.description}</span>
          </button>
        ))}
      </div>

      {/* Tema Rengi Seçici */}
      <div className="mt-5 pt-4 border-t border-[var(--border)]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[var(--foreground-muted)]" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
            </svg>
            <h4 className="text-sm font-semibold text-foreground">Tema Rengi</h4>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded-full border border-[var(--border)]" style={{ backgroundColor: cvData.primaryColor }} />
            <span className="text-xs text-[var(--foreground-muted)] font-mono uppercase">{cvData.primaryColor}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {PRESET_COLORS.map((color) => {
            const isSelected = cvData.primaryColor === color.hex;
            return (
              <button
                key={color.hex}
                type="button"
                onClick={() => handleColorChange(color.hex)}
                title={color.name}
                aria-label={`Tema rengi: ${color.name}`}
                className="group/color relative flex flex-col items-center gap-1 transition-transform duration-150"
                style={{ transform: isSelected ? "scale(1.1)" : "scale(1)" }}
              >
                <div
                  className="w-8 h-8 rounded-full transition-all duration-200 cursor-pointer"
                  style={{
                    backgroundColor: color.hex,
                    boxShadow: isSelected
                      ? `0 0 0 2px var(--surface), 0 0 0 4px ${color.hex}`
                      : "0 1px 3px rgba(0,0,0,0.15)",
                  }}
                />
                <span
                  className="text-[9px] font-medium transition-colors duration-150"
                  style={{ color: isSelected ? color.hex : "var(--foreground-muted)" }}
                >
                  {color.name}
                </span>
              </button>
            );
          })}

          <div className="w-px h-10 bg-[var(--border)] mx-1" />

          <div className="flex flex-col items-center gap-1">
            <label
              className="relative w-8 h-8 rounded-full cursor-pointer overflow-hidden transition-all duration-200"
              style={{
                background: `conic-gradient(from 0deg, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)`,
                boxShadow: !PRESET_COLORS.some((c) => c.hex === cvData.primaryColor)
                  ? `0 0 0 2px var(--surface), 0 0 0 4px ${cvData.primaryColor}`
                  : "0 1px 3px rgba(0,0,0,0.15)",
              }}
              title="Özel renk seç"
            >
              <input
                type="color"
                value={cvData.primaryColor}
                onChange={(e) => handleColorChange(e.target.value)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                aria-label="Özel tema rengi seçin"
              />
            </label>
            <span
              className="text-[9px] font-medium"
              style={{
                color: !PRESET_COLORS.some((c) => c.hex === cvData.primaryColor)
                  ? cvData.primaryColor
                  : "var(--foreground-muted)",
              }}
            >
              Özel
            </span>
          </div>
        </div>
      </div>

      {/* CV Dili Seçici */}
      <div className="mt-5 pt-4 border-t border-[var(--border)]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[var(--foreground-muted)]" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
            </svg>
            <h4 className="text-sm font-semibold text-foreground">CV Dili</h4>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Türkçe / English toggle */}
          <div className="flex rounded-xl border border-[var(--border)] overflow-hidden">
            <button
              type="button"
              onClick={() => handleLanguageChange("tr")}
              className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-all duration-200 ${
                cvData.cvLanguage === "tr"
                  ? "bg-primary-500 text-white shadow-sm"
                  : "bg-[var(--surface)] text-[var(--foreground-muted)] hover:bg-[var(--surface-hover)]"
              }`}
            >
              <span className="text-base">🇹🇷</span>
              Türkçe
            </button>
            <button
              type="button"
              onClick={() => handleLanguageChange("en")}
              className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-all duration-200 ${
                cvData.cvLanguage === "en"
                  ? "bg-primary-500 text-white shadow-sm"
                  : "bg-[var(--surface)] text-[var(--foreground-muted)] hover:bg-[var(--surface-hover)]"
              }`}
            >
              <span className="text-base">🇬🇧</span>
              English
            </button>
          </div>

          {/* Ayırıcı */}
          <div className="w-px h-8 bg-[var(--border)]" />

          {/* AI Çeviri Butonu */}
          {translateStatus === "translating" ? (
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-200">
              <svg className="animate-spin h-4 w-4 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-sm font-medium text-blue-600">İçerikler çevriliyor...</span>
            </div>
          ) : translateStatus === "success" ? (
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--color-success)]/10 border border-[var(--color-success)]/30">
              <svg className="w-4 h-4 text-[var(--color-success)]" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium text-[var(--color-success)]">Çeviri tamamlandı!</span>
            </div>
          ) : translateStatus === "error" ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[var(--color-error)]/10 border border-[var(--color-error)]/30">
                <svg className="w-4 h-4 text-[var(--color-error)]" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
                <span className="text-xs text-[var(--color-error)]">{translateError}</span>
              </div>
              <button
                type="button"
                onClick={() => setTranslateStatus("idle")}
                className="text-xs text-[var(--foreground-muted)] hover:text-foreground underline"
              >
                Kapat
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleTranslateToEnglish}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium shadow-sm hover:shadow-md hover:from-blue-600 hover:to-purple-600 transition-all duration-200 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
              </svg>
              CV&apos;yi İngilizceye Çevir (AI)
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
