"use client";

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

export function TemplateSelector() {
  const { cvData, dispatch } = useCV();

  const handleSelect = (templateId: string) => {
    dispatch({ type: "UPDATE_TEMPLATE", payload: templateId });
  };

  const handleColorChange = (color: string) => {
    dispatch({ type: "UPDATE_PRIMARY_COLOR", payload: color });
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
          {/* Seçili renk göstergesi */}
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded-full border border-[var(--border)]" style={{ backgroundColor: cvData.primaryColor }} />
            <span className="text-xs text-[var(--foreground-muted)] font-mono uppercase">{cvData.primaryColor}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Hazır Renk Seçenekleri */}
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

          {/* Ayırıcı Çizgi */}
          <div className="w-px h-10 bg-[var(--border)] mx-1" />

          {/* Özel Renk Seçici */}
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
    </div>
  );
}
