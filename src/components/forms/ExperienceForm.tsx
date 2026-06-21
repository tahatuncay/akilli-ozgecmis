"use client";

import { useState } from "react";
import { useCV } from "@/context/CVContext";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Experience } from "@/types/cv";

export function ExperienceForm() {
  const { cvData, dispatch } = useCV();
  const { experiences } = cvData;
  const [generatingIds, setGeneratingIds] = useState<Record<string, boolean>>({});

  const handleAddExperience = () => {
    const newExperience: Experience = {
      id: crypto.randomUUID(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      isCurrentJob: false,
      description: "",
      highlights: [],
    };
    dispatch({ type: "ADD_EXPERIENCE", payload: newExperience });
  };

  const handleUpdateExperience = (id: string, field: keyof Experience, value: any) => {
    const experienceToUpdate = experiences.find((exp) => exp.id === id);
    if (experienceToUpdate) {
      dispatch({
        type: "UPDATE_EXPERIENCE",
        payload: { ...experienceToUpdate, [field]: value },
      });
    }
  };

  const handleRemoveExperience = (id: string) => {
    dispatch({ type: "REMOVE_EXPERIENCE", payload: id });
  };

  const handleEnhanceDescription = async (exp: Experience) => {
    if (!exp.description) {
      alert("Lütfen önce taslak bir açıklama yazın.");
      return;
    }
    
    try {
      setGeneratingIds((prev) => ({ ...prev, [exp.id]: true }));
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "experience",
          payload: {
            company: exp.company,
            position: exp.position,
            description: exp.description,
          },
        }),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      handleUpdateExperience(exp.id, "description", data.result);
    } catch (err: any) {
      alert(err.message || "Bir hata oluştu.");
    } finally {
      setGeneratingIds((prev) => ({ ...prev, [exp.id]: false }));
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">İş Deneyimleri</h2>
          <p className="text-sm text-[var(--foreground-muted)]">Kariyer geçmişinizi ters kronolojik sırayla ekleyin.</p>
        </div>
        <Button onClick={handleAddExperience} variant="outline" size="sm" leftIcon={
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        }>
          Deneyim Ekle
        </Button>
      </div>

      {experiences.length === 0 ? (
        <Card variant="outlined" className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <svg className="h-12 w-12 text-[var(--foreground-muted)] mb-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
            </svg>
            <p className="text-[var(--foreground-muted)] mb-4">Henüz iş deneyimi eklemediniz.</p>
            <Button onClick={handleAddExperience} variant="primary">İlk Deneyimi Ekle</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <Card key={exp.id} variant="default" className="relative group">
              <button
                type="button"
                onClick={() => handleRemoveExperience(exp.id)}
                className="absolute top-4 right-4 p-2 text-[var(--foreground-muted)] hover:text-error hover:bg-error/10 rounded-lg transition-colors"
                aria-label="Deneyimi Sil"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </button>
              
              <CardHeader>
                <CardTitle>Deneyim {index + 1}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Şirket Adı"
                    value={exp.company}
                    onChange={(e) => handleUpdateExperience(exp.id, "company", e.target.value)}
                    placeholder="Örn: Google"
                    required
                  />
                  <Input
                    label="Pozisyon"
                    value={exp.position}
                    onChange={(e) => handleUpdateExperience(exp.id, "position", e.target.value)}
                    placeholder="Örn: Frontend Developer"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Başlangıç Tarihi"
                    type="month"
                    value={exp.startDate}
                    onChange={(e) => handleUpdateExperience(exp.id, "startDate", e.target.value)}
                    required
                  />
                  
                  <div className="flex flex-col gap-1.5">
                    <Input
                      label="Bitiş Tarihi"
                      type="month"
                      value={exp.endDate || ""}
                      onChange={(e) => handleUpdateExperience(exp.id, "endDate", e.target.value)}
                      disabled={exp.isCurrentJob}
                      required={!exp.isCurrentJob}
                    />
                    <label className="flex items-center gap-2 mt-2 text-sm text-foreground cursor-pointer">
                      <input
                        type="checkbox"
                        checked={exp.isCurrentJob}
                        onChange={(e) => {
                          handleUpdateExperience(exp.id, "isCurrentJob", e.target.checked);
                          if (e.target.checked) handleUpdateExperience(exp.id, "endDate", "");
                        }}
                        className="rounded border-[var(--border)] text-primary-600 focus:ring-primary-500"
                      />
                      Şu an bu pozisyonda çalışıyorum
                    </label>
                  </div>
                </div>

                <div>
                  <Textarea
                    label="İş Açıklaması"
                    value={exp.description}
                    onChange={(e) => handleUpdateExperience(exp.id, "description", e.target.value)}
                    placeholder="Bu roldeki temel sorumluluklarınız ve başarılarınız nelerdi?"
                    rows={4}
                  />
                  <div className="mt-3 flex justify-end">
                    <Button 
                      type="button"
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleEnhanceDescription(exp)}
                      disabled={generatingIds[exp.id]}
                      leftIcon={
                        generatingIds[exp.id] ? (
                          <svg className="animate-spin h-4 w-4 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        ) : (
                          <svg className="h-4 w-4 text-primary-500" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                          </svg>
                        )
                      }
                    >
                      {generatingIds[exp.id] ? "Geliştiriliyor..." : "AI ile Geliştir"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
