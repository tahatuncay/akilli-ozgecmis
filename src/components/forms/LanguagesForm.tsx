"use client";

import { useCV } from "@/context/CVContext";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Language } from "@/types/cv";

const PROFICIENCY_LEVELS = [
  { value: "A1", label: "A1 - Başlangıç" },
  { value: "A2", label: "A2 - Temel" },
  { value: "B1", label: "B1 - Orta" },
  { value: "B2", label: "B2 - İyi" },
  { value: "C1", label: "C1 - İleri" },
  { value: "C2", label: "C2 - Yetkin" },
  { value: "native", label: "Anadil" },
] as const;

export function LanguagesForm() {
  const { cvData, dispatch } = useCV();
  const { languages } = cvData;

  const handleAddLanguage = () => {
    const newLanguage: Language = {
      id: crypto.randomUUID(),
      name: "",
      proficiency: "B2",
    };
    dispatch({ type: "ADD_LANGUAGE", payload: newLanguage });
  };

  const handleUpdateLanguage = (id: string, field: keyof Language, value: any) => {
    const languageToUpdate = languages.find((lang) => lang.id === id);
    if (languageToUpdate) {
      dispatch({
        type: "UPDATE_LANGUAGE",
        payload: { ...languageToUpdate, [field]: value },
      });
    }
  };

  const handleRemoveLanguage = (id: string) => {
    dispatch({ type: "REMOVE_LANGUAGE", payload: id });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Yabancı Diller</h2>
          <p className="text-sm text-[var(--foreground-muted)]">Bildiğiniz dilleri ve yetkinlik seviyelerinizi ekleyin.</p>
        </div>
        <Button onClick={handleAddLanguage} variant="outline" size="sm" leftIcon={
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        }>
          Dil Ekle
        </Button>
      </div>

      {languages.length === 0 ? (
        <Card variant="outlined" className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <svg className="h-12 w-12 text-[var(--foreground-muted)] mb-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
            </svg>
            <p className="text-[var(--foreground-muted)] mb-4">Henüz yabancı dil eklemediniz.</p>
            <Button onClick={handleAddLanguage} variant="primary">İlk Dili Ekle</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {languages.map((lang) => (
            <div key={lang.id} className="flex items-end gap-4 p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
              <div className="flex-1">
                <Input
                  label="Dil"
                  value={lang.name}
                  onChange={(e) => handleUpdateLanguage(lang.id, "name", e.target.value)}
                  placeholder="Örn: İngilizce"
                  required
                />
              </div>
              <div className="flex-1 flex flex-col gap-1.5">
                <label className="text-sm font-medium text-foreground">Seviye</label>
                <select
                  value={lang.proficiency}
                  onChange={(e) => handleUpdateLanguage(lang.id, "proficiency", e.target.value)}
                  className="w-full rounded-xl px-4 py-2.5 text-sm bg-[var(--surface)] text-foreground border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all duration-200"
                >
                  {PROFICIENCY_LEVELS.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveLanguage(lang.id)}
                className="text-[var(--foreground-muted)] hover:text-error hover:bg-error/10 flex-shrink-0"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
