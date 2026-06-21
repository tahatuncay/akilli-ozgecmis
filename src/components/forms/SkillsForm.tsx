"use client";

import { useCV } from "@/context/CVContext";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Skill } from "@/types/cv";

const SKILL_LEVELS = [
  { value: "beginner", label: "Başlangıç" },
  { value: "intermediate", label: "Orta" },
  { value: "advanced", label: "İleri" },
  { value: "expert", label: "Uzman" },
] as const;

export function SkillsForm() {
  const { cvData, dispatch } = useCV();
  const { skills } = cvData;

  const handleAddSkill = () => {
    const newSkill: Skill = {
      id: crypto.randomUUID(),
      name: "",
      level: "intermediate",
      category: "",
    };
    dispatch({ type: "ADD_SKILL", payload: newSkill });
  };

  const handleUpdateSkill = (id: string, field: keyof Skill, value: any) => {
    const skillToUpdate = skills.find((skill) => skill.id === id);
    if (skillToUpdate) {
      dispatch({
        type: "UPDATE_SKILL",
        payload: { ...skillToUpdate, [field]: value },
      });
    }
  };

  const handleRemoveSkill = (id: string) => {
    dispatch({ type: "REMOVE_SKILL", payload: id });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Yetenekler</h2>
          <p className="text-sm text-[var(--foreground-muted)]">Teknik ve sosyal becerilerinizi ekleyin.</p>
        </div>
        <Button onClick={handleAddSkill} variant="outline" size="sm" leftIcon={
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        }>
          Yetenek Ekle
        </Button>
      </div>

      {skills.length === 0 ? (
        <Card variant="outlined" className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <svg className="h-12 w-12 text-[var(--foreground-muted)] mb-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
            </svg>
            <p className="text-[var(--foreground-muted)] mb-4">Henüz yetenek eklemediniz.</p>
            <Button onClick={handleAddSkill} variant="primary">İlk Yeteneği Ekle</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {skills.map((skill) => (
            <div key={skill.id} className="flex items-end gap-4 p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
              <div className="flex-1">
                <Input
                  label="Yetenek Adı"
                  value={skill.name}
                  onChange={(e) => handleUpdateSkill(skill.id, "name", e.target.value)}
                  placeholder="Örn: React.js"
                  required
                />
              </div>
              <div className="flex-1 flex flex-col gap-1.5">
                <label className="text-sm font-medium text-foreground">Seviye</label>
                <select
                  value={skill.level}
                  onChange={(e) => handleUpdateSkill(skill.id, "level", e.target.value)}
                  className="w-full rounded-xl px-4 py-2.5 text-sm bg-[var(--surface)] text-foreground border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all duration-200"
                >
                  {SKILL_LEVELS.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveSkill(skill.id)}
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
