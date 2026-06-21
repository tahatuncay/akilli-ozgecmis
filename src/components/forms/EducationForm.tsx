"use client";

import { useCV } from "@/context/CVContext";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Education } from "@/types/cv";

export function EducationForm() {
  const { cvData, dispatch } = useCV();
  const { education } = cvData;

  const handleAddEducation = () => {
    const newEducation: Education = {
      id: crypto.randomUUID(),
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
    };
    dispatch({ type: "ADD_EDUCATION", payload: newEducation });
  };

  const handleUpdateEducation = (id: string, field: keyof Education, value: any) => {
    const educationToUpdate = education.find((edu) => edu.id === id);
    if (educationToUpdate) {
      dispatch({
        type: "UPDATE_EDUCATION",
        payload: { ...educationToUpdate, [field]: value },
      });
    }
  };

  const handleRemoveEducation = (id: string) => {
    dispatch({ type: "REMOVE_EDUCATION", payload: id });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Eğitim Bilgileri</h2>
          <p className="text-sm text-[var(--foreground-muted)]">Eğitim geçmişinizi (üniversite, lise vb.) ekleyin.</p>
        </div>
        <Button onClick={handleAddEducation} variant="outline" size="sm" leftIcon={
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        }>
          Eğitim Ekle
        </Button>
      </div>

      {education.length === 0 ? (
        <Card variant="outlined" className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <svg className="h-12 w-12 text-[var(--foreground-muted)] mb-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
            </svg>
            <p className="text-[var(--foreground-muted)] mb-4">Henüz eğitim bilgisi eklemediniz.</p>
            <Button onClick={handleAddEducation} variant="primary">İlk Eğitimi Ekle</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {education.map((edu, index) => (
            <Card key={edu.id} variant="default" className="relative group">
              <button
                type="button"
                onClick={() => handleRemoveEducation(edu.id)}
                className="absolute top-4 right-4 p-2 text-[var(--foreground-muted)] hover:text-error hover:bg-error/10 rounded-lg transition-colors"
                aria-label="Eğitimi Sil"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </button>
              
              <CardHeader>
                <CardTitle>Eğitim {index + 1}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  label="Okul / Kurum Adı"
                  value={edu.institution}
                  onChange={(e) => handleUpdateEducation(edu.id, "institution", e.target.value)}
                  placeholder="Örn: Boğaziçi Üniversitesi"
                  required
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Derece"
                    value={edu.degree}
                    onChange={(e) => handleUpdateEducation(edu.id, "degree", e.target.value)}
                    placeholder="Örn: Lisans"
                    required
                  />
                  <Input
                    label="Bölüm / Alan"
                    value={edu.field}
                    onChange={(e) => handleUpdateEducation(edu.id, "field", e.target.value)}
                    placeholder="Örn: Bilgisayar Mühendisliği"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Başlangıç Yılı"
                    type="month"
                    value={edu.startDate}
                    onChange={(e) => handleUpdateEducation(edu.id, "startDate", e.target.value)}
                    required
                  />
                  <Input
                    label="Bitiş Yılı (veya Beklenen)"
                    type="month"
                    value={edu.endDate || ""}
                    onChange={(e) => handleUpdateEducation(edu.id, "endDate", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
