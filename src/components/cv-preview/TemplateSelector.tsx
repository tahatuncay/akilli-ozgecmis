"use client";

import { useCV } from "@/context/CVContext";
import { Button } from "@/components/ui/Button";

const TEMPLATES = [
  { id: "modern", name: "Modern", description: "Renkli ve dinamik sol şerit" },
  { id: "classic", name: "Klasik", description: "Geleneksel, kurumsal iki sütun" },
  { id: "minimal", name: "Minimal", description: "Zarif, bol beyaz alanlı" },
  { id: "creative", name: "Yaratıcı", description: "Canlı ve dikkat çekici renkler" },
  { id: "professional", name: "Profesyonel", description: "Yöneticiler için sade ve ciddi" },
];

export function TemplateSelector() {
  const { cvData, dispatch } = useCV();

  const handleSelect = (templateId: string) => {
    dispatch({ type: "UPDATE_TEMPLATE", payload: templateId });
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
    </div>
  );
}
