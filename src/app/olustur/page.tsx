"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Button } from "@/components/ui/Button";
import { CV_SECTIONS } from "@/lib/constants";
import { PersonalInfoForm } from "@/components/forms/PersonalInfoForm";
import { SummaryForm } from "@/components/forms/SummaryForm";
import { ExperienceForm } from "@/components/forms/ExperienceForm";
import { EducationForm } from "@/components/forms/EducationForm";
import { SkillsForm } from "@/components/forms/SkillsForm";
import { LanguagesForm } from "@/components/forms/LanguagesForm";
import { CertificatesForm } from "@/components/forms/CertificatesForm";
import { TemplateSelector } from "@/components/cv-preview/TemplateSelector";
import { CVPreview } from "@/components/cv-preview/CVPreview";

// Define the steps in order
const STEPS = [
  { id: "personal-info", label: CV_SECTIONS.PERSONAL_INFO, component: PersonalInfoForm },
  { id: "summary", label: CV_SECTIONS.SUMMARY, component: SummaryForm },
  { id: "experience", label: CV_SECTIONS.EXPERIENCE, component: ExperienceForm },
  { id: "education", label: CV_SECTIONS.EDUCATION, component: EducationForm },
  { id: "skills", label: CV_SECTIONS.SKILLS, component: SkillsForm },
  { id: "languages", label: CV_SECTIONS.LANGUAGES, component: LanguagesForm },
  { id: "certificates", label: CV_SECTIONS.CERTIFICATES, component: CertificatesForm },
];

export default function CreateCVPage() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const currentStep = STEPS[currentStepIndex];
  const StepComponent = currentStep.component;

  const handleNext = () => {
    if (currentStepIndex < STEPS.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSectionSelect = (id: string) => {
    const index = STEPS.findIndex((step) => step.id === id);
    if (index !== -1) {
      setCurrentStepIndex(index);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-4rem)]">
      {/* Sidebar for Navigation */}
      <div className="print:hidden">
        <Sidebar
          activeSectionId={currentStep.id}
          onSectionSelect={handleSectionSelect}
        />
      </div>

      {/* Main Content Area (Form) */}
      <div className="w-full lg:w-[45%] flex flex-col p-4 sm:p-6 lg:p-8 border-r border-[var(--border)] overflow-y-auto print:hidden">
        
        {/* Template Selector */}
        <TemplateSelector />

        {/* Header & Progress */}
        <div className="mb-8 space-y-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{currentStep.label}</h1>
            <p className="text-sm text-[var(--foreground-muted)]">
              Adım {currentStepIndex + 1} / {STEPS.length}
            </p>
          </div>
          <ProgressBar
            currentStep={currentStepIndex + 1}
            totalSteps={STEPS.length}
            showLabels={false}
          />
        </div>

        {/* Form Container */}
        <div className="flex-1">
          <StepComponent />
        </div>

        {/* Navigation Buttons */}
        <div className="mt-8 pt-6 border-t border-[var(--border)] flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStepIndex === 0}
            leftIcon={
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
            }
          >
            Geri
          </Button>

          <Button
            variant="primary"
            onClick={handleNext}
            rightIcon={
              currentStepIndex === STEPS.length - 1 ? (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              ) : (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              )
            }
          >
            {currentStepIndex === STEPS.length - 1 ? "Tamamla" : "İleri"}
          </Button>
        </div>

      </div>

      {/* Preview Area */}
      <div className="flex w-full lg:w-[55%] flex-1 p-4 sm:p-8 bg-[var(--background-tertiary)] overflow-y-auto items-start justify-center border-t lg:border-t-0 border-[var(--border)] print:block print:w-full print:p-0 print:m-0 print:border-none print:bg-white print:overflow-visible">
        <CVPreview />
      </div>
    </div>
  );
}
