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

export function ClassicTemplate({ data }: Props) {
  const { personalInfo, summary, experiences, education, skills, languages, certificates } = data;

  return (
    <div className="w-full min-h-full bg-[#ffffff] text-[#000000] p-8 font-serif flex flex-col text-[11px]">
      {/* Header */}
      <header className="border-b-2 border-[#1f2937] pb-4 mb-4 text-center">
        {/* Profile Photo */}
        {personalInfo.photoUrl && (
          <div className="flex justify-center mb-3">
            <img
              src={personalInfo.photoUrl}
              alt="Profil"
              className="w-16 h-16 rounded-full object-cover border-2 border-[#d1d5db]"
              style={{ imageRendering: "high-quality" as never }}
            />
          </div>
        )}
        <h1 className="text-3xl font-bold uppercase tracking-wider mb-1">{personalInfo.fullName || "İsim Soyisim"}</h1>
        <h2 className="text-lg text-[#4b5563] font-medium mb-3">{personalInfo.title || "Meslek / Ünvan"}</h2>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[#4b5563] text-[10px]">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
          {personalInfo.linkedIn && <span>• {personalInfo.linkedIn}</span>}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex gap-6">
        {/* Left Column */}
        <div className="w-2/3 flex flex-col gap-4">
          {/* Summary */}
          {summary && (
            <section className="print:break-inside-avoid">
              <h3 className="text-sm font-bold uppercase border-b border-[#d1d5db] mb-2 pb-1">Profesyonel Özet</h3>
              <p className="text-justify leading-relaxed">{summary}</p>
            </section>
          )}

          {/* Experience */}
          {experiences.length > 0 && (
            <section>
              <h3 className="text-sm font-bold uppercase border-b border-[#d1d5db] mb-2 pb-1">İş Deneyimi</h3>
              <div className="flex flex-col gap-3">
                {experiences.map((exp) => (
                  <div key={exp.id} className="print:break-inside-avoid">
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="font-bold">{exp.position}</h4>
                      <span className="text-[#6b7280] text-[10px]">
                        {exp.startDate} - {exp.isCurrentJob ? "Devam Ediyor" : exp.endDate}
                      </span>
                    </div>
                    <div className="font-medium text-[#374151] italic mb-1">{exp.company}</div>
                    {exp.description && <p className="leading-relaxed whitespace-pre-wrap">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column */}
        <div className="w-1/3 flex flex-col gap-4">
          {/* Education */}
          {education.length > 0 && (
            <section>
              <h3 className="text-sm font-bold uppercase border-b border-[#d1d5db] mb-2 pb-1">Eğitim</h3>
              <div className="flex flex-col gap-3">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h4 className="font-bold leading-tight">{edu.degree} - {edu.field}</h4>
                    <div className="text-[#374151]">{edu.institution}</div>
                    <div className="text-[#6b7280] text-[10px]">
                      {edu.startDate} - {edu.endDate || "Devam"}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <section>
              <h3 className="text-sm font-bold uppercase border-b border-[#d1d5db] mb-2 pb-1">Yetenekler</h3>
              <ul className="list-disc list-inside flex flex-col gap-1">
                {skills.map((skill) => (
                  <li key={skill.id}>{skill.name} <span className="text-[#6b7280] text-[10px]">({SKILL_LEVEL_MAP[skill.level] || skill.level})</span></li>
                ))}
              </ul>
            </section>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <section>
              <h3 className="text-sm font-bold uppercase border-b border-[#d1d5db] mb-2 pb-1">Yabancı Diller</h3>
              <ul className="flex flex-col gap-1">
                {languages.map((lang) => (
                  <li key={lang.id} className="flex justify-between">
                    <span>{lang.name}</span>
                    <span className="text-[#6b7280] text-[10px]">{LANG_LEVEL_MAP[lang.proficiency] || lang.proficiency}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Certificates */}
          {certificates.length > 0 && (
            <section>
              <h3 className="text-sm font-bold uppercase border-b border-[#d1d5db] mb-2 pb-1">Sertifikalar</h3>
              <div className="flex flex-col gap-2">
                {certificates.map((cert) => (
                  <div key={cert.id}>
                    <div className="font-bold">{cert.name}</div>
                    <div className="text-[#374151] text-[10px]">{cert.issuer} • {cert.date}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
