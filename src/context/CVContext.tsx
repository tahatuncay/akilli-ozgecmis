"use client";

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from "react";
import { CVData, PersonalInfo, Experience, Education, Skill, Language, Certificate } from "@/types/cv";

// Initial empty state for CV
const initialCVState: CVData = {
  id: "",
  personalInfo: {
    fullName: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    linkedIn: "",
    website: "",
    photoUrl: "",
  },
  summary: "",
  experiences: [],
  education: [],
  skills: [],
  languages: [],
  certificates: [],
  projects: [],
  references: [],
  templateId: "modern",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

// Actions
// LinkedIn'den ayrıştırılan ham veri tipi
export interface LinkedInParsedData {
  personalInfo: {
    firstName: string;
    lastName: string;
    title: string;
    email: string;
    phone: string;
  };
  experience: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  education: Array<{
    school: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate: string;
  }>;
  skills: string[];
  languages: string[];
  certifications?: Array<{
    name: string;
    issuer: string;
    date: string;
  }>;
}

export type CVAction =
  | { type: "LOAD_DATA"; payload: CVData }
  | { type: "UPDATE_PERSONAL_INFO"; payload: Partial<PersonalInfo> }
  | { type: "UPDATE_SUMMARY"; payload: string }
  | { type: "RESET_FORM" }
  | { type: "ADD_EXPERIENCE"; payload: Experience }
  | { type: "UPDATE_EXPERIENCE"; payload: Experience }
  | { type: "REMOVE_EXPERIENCE"; payload: string }
  | { type: "ADD_EDUCATION"; payload: Education }
  | { type: "UPDATE_EDUCATION"; payload: Education }
  | { type: "REMOVE_EDUCATION"; payload: string }
  | { type: "ADD_SKILL"; payload: Skill }
  | { type: "UPDATE_SKILL"; payload: Skill }
  | { type: "REMOVE_SKILL"; payload: string }
  | { type: "ADD_LANGUAGE"; payload: Language }
  | { type: "UPDATE_LANGUAGE"; payload: Language }
  | { type: "REMOVE_LANGUAGE"; payload: string }
  | { type: "ADD_CERTIFICATE"; payload: Certificate }
  | { type: "UPDATE_CERTIFICATE"; payload: Certificate }
  | { type: "REMOVE_CERTIFICATE"; payload: string }
  | { type: "UPDATE_TEMPLATE"; payload: string }
  | { type: "IMPORT_LINKEDIN_DATA"; payload: LinkedInParsedData };

// Reducer
function cvReducer(state: CVData, action: CVAction): CVData {
  const updateTime = () => new Date().toISOString();

  switch (action.type) {
    case "LOAD_DATA":
      return action.payload;
    case "UPDATE_TEMPLATE":
      return { ...state, templateId: action.payload, updatedAt: updateTime() };
    case "UPDATE_PERSONAL_INFO":
      return {
        ...state,
        personalInfo: { ...state.personalInfo, ...action.payload },
        updatedAt: updateTime(),
      };
    case "UPDATE_SUMMARY":
      return {
        ...state,
        summary: action.payload,
        updatedAt: updateTime(),
      };
    case "ADD_EXPERIENCE":
      return { ...state, experiences: [...state.experiences, action.payload], updatedAt: updateTime() };
    case "UPDATE_EXPERIENCE":
      return {
        ...state,
        experiences: state.experiences.map((exp) => (exp.id === action.payload.id ? action.payload : exp)),
        updatedAt: updateTime(),
      };
    case "REMOVE_EXPERIENCE":
      return { ...state, experiences: state.experiences.filter((exp) => exp.id !== action.payload), updatedAt: updateTime() };
    case "ADD_EDUCATION":
      return { ...state, education: [...state.education, action.payload], updatedAt: updateTime() };
    case "UPDATE_EDUCATION":
      return {
        ...state,
        education: state.education.map((edu) => (edu.id === action.payload.id ? action.payload : edu)),
        updatedAt: updateTime(),
      };
    case "REMOVE_EDUCATION":
      return { ...state, education: state.education.filter((edu) => edu.id !== action.payload), updatedAt: updateTime() };
    case "ADD_SKILL":
      return { ...state, skills: [...state.skills, action.payload], updatedAt: updateTime() };
    case "UPDATE_SKILL":
      return {
        ...state,
        skills: state.skills.map((skill) => (skill.id === action.payload.id ? action.payload : skill)),
        updatedAt: updateTime(),
      };
    case "REMOVE_SKILL":
      return { ...state, skills: state.skills.filter((skill) => skill.id !== action.payload), updatedAt: updateTime() };
    case "ADD_LANGUAGE":
      return { ...state, languages: [...state.languages, action.payload], updatedAt: updateTime() };
    case "UPDATE_LANGUAGE":
      return {
        ...state,
        languages: state.languages.map((lang) => (lang.id === action.payload.id ? action.payload : lang)),
        updatedAt: updateTime(),
      };
    case "REMOVE_LANGUAGE":
      return { ...state, languages: state.languages.filter((lang) => lang.id !== action.payload), updatedAt: updateTime() };
    case "ADD_CERTIFICATE":
      return { ...state, certificates: [...state.certificates, action.payload], updatedAt: updateTime() };
    case "UPDATE_CERTIFICATE":
      return {
        ...state,
        certificates: state.certificates.map((cert) => (cert.id === action.payload.id ? action.payload : cert)),
        updatedAt: updateTime(),
      };
    case "REMOVE_CERTIFICATE":
      return { ...state, certificates: state.certificates.filter((cert) => cert.id !== action.payload), updatedAt: updateTime() };
    case "RESET_FORM":
      return {
        ...initialCVState,
        id: crypto.randomUUID(),
        createdAt: updateTime(),
        updatedAt: updateTime(),
      };
    case "IMPORT_LINKEDIN_DATA": {
      const li = action.payload;

      // fullName: firstName + lastName birleştirme
      const fullName = [li.personalInfo.firstName, li.personalInfo.lastName]
        .filter(Boolean)
        .join(" ")
        .trim();

      // Deneyimleri CVData formatına dönüştür
      const newExperiences: Experience[] = (li.experience || []).map((exp) => {
        const rawEndDate = (exp.endDate || "").trim();
        const isCurrent = 
          !rawEndDate || 
          rawEndDate.toLowerCase().includes("present") || 
          rawEndDate.toLowerCase().includes("devam") ||
          rawEndDate.toLowerCase().includes("halen");

        return {
          id: crypto.randomUUID(),
          company: exp.company || "",
          position: exp.position || "",
          startDate: exp.startDate || "",
          endDate: isCurrent ? "" : rawEndDate,
          isCurrentJob: isCurrent,
          description: exp.description || "",
          highlights: [],
        };
      });

      // Eğitimleri CVData formatına dönüştür
      const newEducation: Education[] = (li.education || []).map((edu) => ({
        id: crypto.randomUUID(),
        institution: edu.school || "",
        degree: edu.degree || "",
        field: edu.fieldOfStudy || "",
        startDate: edu.startDate || "",
        endDate: edu.endDate || "",
      }));

      // Yetenekleri CVData formatına dönüştür
      const newSkills: Skill[] = (li.skills || []).map((skillName) => ({
        id: crypto.randomUUID(),
        name: skillName,
        level: "intermediate" as const,
      }));

      // Dilleri CVData formatına dönüştür
      const newLanguages: Language[] = (li.languages || []).map((langName) => ({
        id: crypto.randomUUID(),
        name: langName,
        proficiency: "B2" as const,
      }));

      // Sertifikaları CVData formatına dönüştür
      const newCertificates: Certificate[] = (li.certifications || []).map((cert) => ({
        id: crypto.randomUUID(),
        name: cert.name || "",
        issuer: cert.issuer || "",
        date: cert.date || "",
      }));

      return {
        ...state,
        personalInfo: {
          ...state.personalInfo,
          ...(fullName && { fullName }),
          ...(li.personalInfo.title && { title: li.personalInfo.title }),
          ...(li.personalInfo.email && { email: li.personalInfo.email }),
          ...(li.personalInfo.phone && { phone: li.personalInfo.phone }),
        },
        experiences: newExperiences.length > 0 ? newExperiences : state.experiences,
        education: newEducation.length > 0 ? newEducation : state.education,
        skills: newSkills.length > 0 ? newSkills : state.skills,
        languages: newLanguages.length > 0 ? newLanguages : state.languages,
        certificates: newCertificates.length > 0 ? newCertificates : state.certificates,
        updatedAt: updateTime(),
      };
    }
    default:
      return state;
  }
}

// Context
interface CVContextType {
  cvData: CVData;
  dispatch: React.Dispatch<CVAction>;
}

const CVContext = createContext<CVContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "akilli-ozgecmis-data";

export function CVProvider({ children }: { children: ReactNode }) {
  const [cvData, dispatch] = useReducer(cvReducer, initialCVState);

  // Load from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        dispatch({ type: "LOAD_DATA", payload: parsed });
      } catch (error) {
        console.error("Failed to parse CV data from local storage", error);
      }
    } else {
      // If no data, initialize with a new ID
      dispatch({ type: "RESET_FORM" });
    }
  }, []);

  // Save to localStorage when cvData changes
  useEffect(() => {
    // Only save if we have a valid ID (meaning initial mount/reset has happened)
    if (cvData.id) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cvData));
    }
  }, [cvData]);

  return (
    <CVContext.Provider value={{ cvData, dispatch }}>
      {children}
    </CVContext.Provider>
  );
}

// Hook
export function useCV() {
  const context = useContext(CVContext);
  if (context === undefined) {
    throw new Error("useCV must be used within a CVProvider");
  }
  return context;
}
