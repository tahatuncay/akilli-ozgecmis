import { CVData } from "@/types/cv";

interface Props {
  data: CVData;
}

const SKILL_LEVEL_MAP: Record<string, string> = {
  beginner: "Başlangıç",
  intermediate: "Orta",
  advanced: "İleri",
  expert: "Uzman",
};

const LANG_LEVEL_MAP: Record<string, string> = {
  A1: "A1",
  A2: "A2",
  B1: "B1",
  B2: "B2",
  C1: "C1",
  C2: "C2",
  native: "Anadil",
};

/**
 * Hex rengi HSL'ye çevirip parlaklık / opaklık varyasyonları üretir.
 * Bu sayede tek bir primaryColor'dan sidebar, border, badge gibi
 * farklı tonlar otomatik türetilir.
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const clean = hex.replace("#", "");
  return {
    r: parseInt(clean.substring(0, 2), 16),
    g: parseInt(clean.substring(2, 4), 16),
    b: parseInt(clean.substring(4, 6), 16),
  };
}

/** Ana rengin belirli opaklıkta versiyonunu döndürür */
function withOpacity(hex: string, opacity: number): string {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

/** Rengi beyaza karıştırarak açık ton üretir (tint) */
function lighten(hex: string, amount: number): string {
  const { r, g, b } = hexToRgb(hex);
  const lr = Math.round(r + (255 - r) * amount);
  const lg = Math.round(g + (255 - g) * amount);
  const lb = Math.round(b + (255 - b) * amount);
  return `rgb(${lr}, ${lg}, ${lb})`;
}

/** Rengi siyaha karıştırarak koyu ton üretir (shade) */
function darken(hex: string, amount: number): string {
  const { r, g, b } = hexToRgb(hex);
  const dr = Math.round(r * (1 - amount));
  const dg = Math.round(g * (1 - amount));
  const db = Math.round(b * (1 - amount));
  return `rgb(${dr}, ${dg}, ${db})`;
}

export function ModernTemplate({ data }: Props) {
  const { personalInfo, summary, experiences, education, skills, languages, certificates } = data;
  const color = data.primaryColor || "#0f766e";

  // Türetilmiş renk tonları
  const sidebarBg = color;
  const sidebarBorderLight = withOpacity(lighten(color, 0.35), 0.53);
  const textMuted = lighten(color, 0.85);      // #f0fdfa benzeri
  const textAccent = lighten(color, 0.6);       // #99f6e4 benzeri
  const badgeBg = darken(color, 0.25);          // #115e59 benzeri
  const iconBubbleBg = lighten(color, 0.8);     // #ccfbf1 benzeri
  const timelineBorder = lighten(color, 0.8);   // #ccfbf1
  const dotColor = lighten(color, 0.3);         // #14b8a6 benzeri

  return (
    <div className="w-full bg-[#ffffff] text-[#1f2937] font-sans flex text-[10px] min-h-full">
      {/* Left Sidebar - Colored */}
      <div className="w-[30%] text-[#ffffff] p-6 flex flex-col gap-6" style={{ backgroundColor: sidebarBg }}>
        {/* Profile Image */}
        <div className="flex flex-col items-center text-center">
          {personalInfo.photoUrl ? (
            <img src={personalInfo.photoUrl} alt="Profil" className="w-24 h-24 rounded-full object-cover border-[3px] border-white/80 ring-2 ring-white/20 mb-2" style={{ imageRendering: "high-quality" as never }} />
          ) : (
            <div className="w-24 h-24 rounded-full border-2 flex items-center justify-center mb-2 text-2xl font-bold" style={{ backgroundColor: withOpacity("#ffffff", 0.1), borderColor: withOpacity("#ffffff", 0.3) }}>
              {personalInfo.fullName?.charAt(0) || "CV"}
            </div>
          )}
        </div>

        {/* İletişim Bilgileri */}
        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-wider mb-3 pb-1" style={{ borderBottom: `1px solid ${sidebarBorderLight}` }}>İletişim</h3>
          <div className="w-full flex flex-col gap-2.5 text-left text-[8.5px]" style={{ color: textMuted }}>
            {personalInfo.email && (
              <div className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <span className="whitespace-nowrap">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <span className="whitespace-nowrap">{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-start gap-2">
                <svg className="w-3.5 h-3.5 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span className="leading-tight">{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.linkedIn && (
              <div className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                <span className="whitespace-nowrap">{personalInfo.linkedIn}</span>
              </div>
            )}
          </div>
        </div>

        {/* Education (Left Column) */}
        {education.length > 0 && (
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-wider mb-3 pb-1" style={{ borderBottom: `1px solid ${sidebarBorderLight}` }}>Eğitim</h3>
            <div className="flex flex-col gap-3">
              {education.map((edu) => (
                <div key={edu.id} className="flex flex-col gap-0.5">
                  <h4 className="font-bold text-[10px] text-[#ffffff] leading-tight">{edu.degree} - {edu.field}</h4>
                  <span className="text-[9px] font-medium leading-snug" style={{ color: textMuted }}>{edu.institution}</span>
                  <span className="text-[8px] font-semibold" style={{ color: textAccent }}>{edu.startDate} - {edu.endDate || "Devam"}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-wider mb-3 pb-1" style={{ borderBottom: `1px solid ${sidebarBorderLight}` }}>Yetenekler</h3>
            <div className="flex flex-col gap-2.5">
              {skills.map((skill) => (
                <div key={skill.id}>
                  <div className="flex justify-between items-center text-[9px] mb-1">
                    <span className="font-medium" style={{ color: textMuted }}>{skill.name}</span>
                    <span className="opacity-90" style={{ color: textAccent }}>{SKILL_LEVEL_MAP[skill.level] || skill.level}</span>
                  </div>
                  <div className="w-full rounded-full h-1" style={{ backgroundColor: badgeBg }}>
                    <div className="bg-[#ffffff] h-1 rounded-full" style={{ width: skill.level === 'expert' ? '100%' : skill.level === 'advanced' ? '75%' : skill.level === 'intermediate' ? '50%' : '25%' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-wider mb-3 pb-1" style={{ borderBottom: `1px solid ${sidebarBorderLight}` }}>Yabancı Diller</h3>
            <ul className="flex flex-col gap-2">
              {languages.map((lang) => (
                <li key={lang.id} className="flex justify-between items-center text-[9px]">
                  <span className="font-medium" style={{ color: textMuted }}>{lang.name}</span>
                  <span className="px-1.5 py-0.5 rounded font-medium" style={{ backgroundColor: badgeBg, color: textMuted }}>{LANG_LEVEL_MAP[lang.proficiency] || lang.proficiency}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Certificates */}
        {certificates.length > 0 && (
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-wider mb-3 pb-1" style={{ borderBottom: `1px solid ${sidebarBorderLight}` }}>Sertifikalar</h3>
            <div className="flex flex-col gap-2.5">
              {certificates.map((cert) => (
                <div key={cert.id} className="flex flex-col gap-0.5">
                  <span className="font-bold text-[10px] text-[#ffffff] leading-tight">{cert.name}</span>
                  <span className="text-[9px] font-medium leading-snug" style={{ color: textMuted }}>{cert.issuer}</span>
                  {cert.date && <span className="text-[8px] font-semibold" style={{ color: textAccent }}>{cert.date}</span>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Content */}
      <div className="w-[70%] p-8 bg-[#f9fafb] flex flex-col gap-6">
        {/* Name and Title */}
        <div className="mb-2 border-b-2 border-[#e5e7eb] pb-5">
          <h1 className="text-3xl font-black text-[#111827] tracking-tight leading-none mb-1.5">{personalInfo.fullName || "İsim Soyisim"}</h1>
          <h2 className="text-[15px] font-semibold tracking-wide" style={{ color }}>{personalInfo.title || "Meslek / Ünvan"}</h2>
        </div>

        {/* Summary */}
        {summary && (
          <section>
            <h3 className="flex items-center text-[11px] font-bold text-[#111827] uppercase tracking-wider mb-2.5">
              <span className="w-5 h-5 rounded-full flex items-center justify-center mr-2" style={{ backgroundColor: iconBubbleBg, color }}>
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              </span>
              Profil
            </h3>
            <p className="text-[#4b5563] text-[9.5px] leading-relaxed text-justify w-full">{summary}</p>
          </section>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <section>
            <h3 className="flex items-center text-[11px] font-bold text-[#111827] uppercase tracking-wider mb-3">
              <span className="w-5 h-5 rounded-full flex items-center justify-center mr-2" style={{ backgroundColor: iconBubbleBg, color }}>
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </span>
              İş Deneyimi
            </h3>
            <div className="flex flex-col gap-4 ml-2.5 pl-3.5" style={{ borderLeft: `2px solid ${timelineBorder}` }}>
              {experiences.map((exp) => (
                <div key={exp.id} className="relative w-full">
                  <div className="absolute -left-[19px] top-1 w-2.5 h-2.5 rounded-full ring-4 ring-[#f9fafb]" style={{ backgroundColor: dotColor }} />
                  <h4 className="font-bold text-[#111827] text-[11px]">{exp.position}</h4>
                  <div className="flex justify-between items-center mb-1 mt-0.5">
                    <span className="font-semibold text-[9.5px]" style={{ color }}>{exp.company}</span>
                    <span className="text-[#4b5563] text-[8.5px] font-medium bg-[#e5e7eb] px-1.5 py-0.5 rounded-full">
                      {exp.startDate} - {exp.isCurrentJob ? "Devam Ediyor" : exp.endDate}
                    </span>
                  </div>
                  {exp.description && <p className="text-[#4b5563] text-[9.5px] mt-1.5 whitespace-pre-wrap leading-relaxed w-full">{exp.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
