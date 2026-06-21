"use client";

import { useState } from "react";
import { useCV } from "@/context/CVContext";
import { Textarea } from "@/components/ui/Textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export function SummaryForm() {
  const { cvData, dispatch } = useCV();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({
      type: "UPDATE_SUMMARY",
      payload: e.target.value,
    });
  };

  const handleGenerateSummary = async () => {
    try {
      setIsGenerating(true);
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "summary",
          payload: {
            title: cvData.personalInfo.title,
            keywords: cvData.summary, // Send whatever they typed as hints/keywords
          },
        }),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      dispatch({ type: "UPDATE_SUMMARY", payload: data.result });
    } catch (err: any) {
      alert(err.message || "Bir hata oluştu.");
    } finally {
      setIsGenerating(false);
    }
  };

  const AiIcon = isGenerating ? (
    <svg className="animate-spin h-4 w-4 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  ) : (
    <svg className="h-4 w-4 text-primary-500" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
    </svg>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <Card variant="default">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>Özet / Profil</CardTitle>
              <CardDescription>
                Kariyer hedeflerinizi ve profesyonel geçmişinizi özetleyen kısa bir paragraf yazın. İsterseniz sadece anahtar kelimeleri yazıp yapay zekanın sizin için toparlamasını isteyebilirsiniz.
              </CardDescription>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="hidden sm:flex shrink-0 ml-4" 
              onClick={handleGenerateSummary}
              disabled={isGenerating}
              leftIcon={AiIcon}
            >
              {isGenerating ? "Üretiliyor..." : "Yapay Zeka ile Yaz"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Textarea
            label="Profesyonel Özet"
            placeholder="Örn: 5 yıldan fazla deneyime sahip, modern web teknolojileri konusunda uzmanlaşmış Frontend Geliştirici..."
            value={cvData.summary}
            onChange={handleChange}
            rows={6}
            charCount
            maxLength={600}
            hint="Ortalama 3-4 cümlelik, yeteneklerinizi ve vizyonunuzu anlatan etkili bir özet yazmanız tavsiye edilir."
          />
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-4 sm:hidden w-full" 
            onClick={handleGenerateSummary}
            disabled={isGenerating}
            leftIcon={AiIcon}
          >
            {isGenerating ? "Üretiliyor..." : "Yapay Zeka ile Yaz"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
