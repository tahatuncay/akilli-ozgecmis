"use client";

import { useCV } from "@/context/CVContext";
import { ClassicTemplate } from "./templates/ClassicTemplate";
import { ModernTemplate } from "./templates/ModernTemplate";
import { MinimalTemplate } from "./templates/MinimalTemplate";

import { CreativeTemplate } from "./templates/CreativeTemplate";
import { ProfessionalTemplate } from "./templates/ProfessionalTemplate";

import { CVData } from "@/types/cv";
import { DownloadPDFButton } from "@/components/ui/DownloadPDFButton";

export function CVPreview() {
  const { cvData } = useCV();

  const renderTemplate = () => {
    switch (cvData.templateId) {
      case "classic":
        return <ClassicTemplate data={cvData} />;
      case "modern":
        return <ModernTemplate data={cvData} />;
      case "minimal":
        return <MinimalTemplate data={cvData} />;
      case "creative":
        return <CreativeTemplate data={cvData} />;
      case "professional":
        return <ProfessionalTemplate data={cvData} />;
      default:
        return <ModernTemplate data={cvData} />;
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-6">
      <div className="w-full max-w-[794px] flex justify-end print:hidden">
        <DownloadPDFButton targetId="cv-preview-container" filename={`${cvData.personalInfo.fullName?.replace(/\s+/g, '-').toLowerCase() || 'ozgecmis'}-cv.pdf`} />
      </div>
      
      <div className="w-full flex justify-center bg-gray-100 rounded-2xl overflow-hidden shadow-inner p-4 md:p-8 print:!p-0 print:!m-0 print:!bg-transparent print:!shadow-none print:!rounded-none print:!overflow-visible">
        {/* 
          A4 Aspect ratio container: aspect-[1/1.414] 
        */}
        <div 
          id="cv-preview-container"
          className="w-full max-w-[794px] bg-white shadow-xl overflow-hidden relative print-container aspect-[1/1.414] print:!aspect-auto print:!overflow-visible print:!shadow-none print:!max-w-none"
        >
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
}
