/**
 * CV şablonları için çok dilli (TR/EN) lokalizasyon sözlüğü.
 * Tüm şablon başlıkları, seviye etiketleri ve placeholder metinler
 * bu merkezi dosyadan çekilir.
 */

export type CVLanguage = "tr" | "en";

export interface CVLabels {
  // Bölüm başlıkları
  contact: string;
  education: string;
  educationHistory: string;
  skills: string;
  coreSkills: string;
  expertise: string;
  languages: string;
  certificates: string;
  experience: string;
  professionalExperience: string;
  profile: string;
  summary: string;
  about: string;

  // Dinamik metinler
  present: string;
  presentShort: string;

  // Placeholder metinler
  fullNamePlaceholder: string;
  titlePlaceholder: string;

  // Seviye haritaları
  skillLevels: Record<string, string>;
  langLevels: Record<string, string>;
}

const tr: CVLabels = {
  contact: "İletişim",
  education: "Eğitim",
  educationHistory: "Eğitim Geçmişi",
  skills: "Yetenekler",
  coreSkills: "Temel Yetkinlikler",
  expertise: "Uzmanlık",
  languages: "Yabancı Diller",
  certificates: "Sertifikalar",
  experience: "İş Deneyimi",
  professionalExperience: "Profesyonel Deneyim",
  profile: "Profil",
  summary: "Profesyonel Özet",
  about: "Hakkımda",

  present: "Devam Ediyor",
  presentShort: "Devam",

  fullNamePlaceholder: "İsim Soyisim",
  titlePlaceholder: "Meslek / Ünvan",

  skillLevels: {
    beginner: "Başlangıç",
    intermediate: "Orta",
    advanced: "İleri",
    expert: "Uzman",
  },
  langLevels: {
    A1: "A1",
    A2: "A2",
    B1: "B1",
    B2: "B2",
    C1: "C1",
    C2: "C2",
    native: "Anadil",
  },
};

const en: CVLabels = {
  contact: "Contact",
  education: "Education",
  educationHistory: "Education",
  skills: "Skills",
  coreSkills: "Core Competencies",
  expertise: "Expertise",
  languages: "Languages",
  certificates: "Certifications",
  experience: "Work Experience",
  professionalExperience: "Professional Experience",
  profile: "Profile",
  summary: "Professional Summary",
  about: "About Me",

  present: "Present",
  presentShort: "Present",

  fullNamePlaceholder: "Full Name",
  titlePlaceholder: "Job Title",

  skillLevels: {
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
    expert: "Expert",
  },
  langLevels: {
    A1: "A1",
    A2: "A2",
    B1: "B1",
    B2: "B2",
    C1: "C1",
    C2: "C2",
    native: "Native",
  },
};

const dictionaries: Record<CVLanguage, CVLabels> = { tr, en };

/**
 * Belirtilen dil için tüm CV etiketlerini döndürür.
 * Geçersiz dil verilirse varsayılan olarak Türkçe kullanılır.
 */
export function getLabels(lang?: CVLanguage | string): CVLabels {
  return dictionaries[(lang as CVLanguage)] || dictionaries.tr;
}
