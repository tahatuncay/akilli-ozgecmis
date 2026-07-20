"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

// Import actual templates
import { ClassicTemplate } from "@/components/cv-preview/templates/ClassicTemplate";
import { ModernTemplate } from "@/components/cv-preview/templates/ModernTemplate";
import { MinimalTemplate } from "@/components/cv-preview/templates/MinimalTemplate";
import { CreativeTemplate } from "@/components/cv-preview/templates/CreativeTemplate";
import { ProfessionalTemplate } from "@/components/cv-preview/templates/ProfessionalTemplate";
import { CVData } from "@/types/cv";

// Mock CV Data for realistic previews
const mockCVData: CVData = {
  id: "mock",
  templateId: "modern",
  primaryColor: "#0f766e",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  personalInfo: {
    fullName: "Ahmet Yılmaz",
    title: "Kıdemli Yazılım Mühendisi",
    email: "ahmet.yilmaz@example.com",
    phone: "+90 555 123 4567",
    location: "İstanbul, Türkiye",
    linkedIn: "linkedin.com/in/ahmetyilmaz",
    website: "ahmetyilmaz.dev"
  },
  summary: "10 yılı aşkın deneyime sahip, ölçeklenebilir web uygulamaları ve mikroservis mimarileri konusunda uzmanlaşmış Kıdemli Yazılım Mühendisi. Ekip yönetimi, teknik liderlik ve yüksek performanslı sistemler tasarlama konularında güçlü bir geçmişe sahibim.",
  experiences: [
    {
      id: "exp1",
      company: "TechNova Çözümleri",
      position: "Yazılım Takım Lideri",
      startDate: "Oca 2020",
      isCurrentJob: true,
      description: "5 kişilik mühendislik ekibine liderlik ettim. Şirketin ana SaaS platformunun mikroservis mimarisine geçişini yöneterek sistem performansını %40 artırdım.",
      highlights: []
    },
    {
      id: "exp2",
      company: "Dijital Finans A.Ş.",
      position: "Full Stack Geliştirici",
      startDate: "Mar 2016",
      endDate: "Ara 2019",
      isCurrentJob: false,
      description: "React ve Node.js kullanarak yüksek trafikli finansal analiz panelleri geliştirdim. CI/CD süreçlerini otomatikleştirerek dağıtım sürelerini %60 azalttım.",
      highlights: []
    }
  ],
  education: [
    {
      id: "edu1",
      institution: "İstanbul Teknik Üniversitesi",
      degree: "Lisans",
      field: "Bilgisayar Mühendisliği",
      startDate: "Eyl 2011",
      endDate: "Haz 2015",
      gpa: "3.6/4.0"
    }
  ],
  skills: [
    { id: "sk1", name: "JavaScript / TypeScript", level: "expert" },
    { id: "sk2", name: "React & Next.js", level: "expert" },
    { id: "sk3", name: "Node.js & Express", level: "advanced" },
    { id: "sk4", name: "PostgreSQL & MongoDB", level: "advanced" },
    { id: "sk5", name: "Docker & Kubernetes", level: "intermediate" }
  ],
  languages: [
    { id: "lan1", name: "İngilizce", proficiency: "C1" },
    { id: "lan2", name: "Almanca", proficiency: "A2" }
  ],
  certificates: [
    { id: "cert1", name: "AWS Certified Solutions Architect", issuer: "Amazon Web Services", date: "2022" }
  ],
  projects: [],
  references: []
};

const templates = [
  {
    id: "modern",
    name: "Modern Şablon",
    description: "Renkli sol şerit ve dinamik yerleşim ile yenilikçi sektörler için ideal.",
    component: ModernTemplate
  },
  {
    id: "classic",
    name: "Klasik Şablon",
    description: "Geleneksel, kurumsal ve ciddi görünümüyle resmi pozisyonlar için mükemmel.",
    component: ClassicTemplate
  },
  {
    id: "minimal",
    name: "Minimal Şablon",
    description: "Bol beyaz alanlı, zarif ve tipografi odaklı modern bir tasarım.",
    component: MinimalTemplate
  },
  {
    id: "creative",
    name: "Yaratıcı Şablon",
    description: "Dikkat çekici gradient renkleri ve asimetrik detaylarıyla tasarımcılar için.",
    component: CreativeTemplate
  },
  {
    id: "professional",
    name: "Profesyonel Şablon",
    description: "Tek sütunlu, ferah ve güçlü tipografisiyle yönetici pozisyonları için.",
    component: ProfessionalTemplate
  }
];

function TemplatePreview({ templateId, Component }: { templateId: string, Component: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.35); // Default initial scale

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        // A4 Genişliği: 794px. Container genişliğine göre scale hesapla.
        const newScale = entry.contentRect.width / 794;
        setScale(newScale);
      }
    });
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full aspect-[1/1.414] relative overflow-hidden bg-white">
      <div 
        className="absolute top-0 left-0 w-[794px] min-h-[1122px] origin-top-left pointer-events-none bg-white"
        style={{ transform: `scale(${scale})` }}
      >
        <Component data={{ ...mockCVData, templateId }} />
      </div>
      
      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-10">
        <Link href="/olustur">
          <Button variant="primary" className="shadow-2xl translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            Bu Şablonu Kullan
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default function TemplatesPage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] bg-[var(--background-secondary)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full flex-1">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-foreground sm:text-5xl tracking-tight mb-4">Şablon Galerisi</h1>
          <p className="text-xl text-[var(--foreground-muted)]">
            Tarzınıza ve sektörünüze en uygun profesyonel CV şablonunu seçin. Beş farklı estetik tasarımımızla hemen fark yaratmaya başlayın.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {templates.map((tpl) => (
            <div 
              key={tpl.id} 
              className="bg-white rounded-2xl border border-[var(--border)] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col"
            >
              {/* Template Realistic Preview */}
              <TemplatePreview templateId={tpl.id} Component={tpl.component} />

              {/* Info */}
              <div className="p-6 flex-1 flex flex-col border-t border-[var(--border)]">
                <h2 className="text-xl font-bold text-foreground mb-2">{tpl.name}</h2>
                <p className="text-[var(--foreground-muted)] text-sm flex-1">{tpl.description}</p>
                <div className="mt-6">
                  <Link href="/olustur">
                    <Button variant="outline" className="w-full group-hover:bg-[var(--background-secondary)] transition-colors">
                      Seç ve Başla
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

