import { CVData } from "@/types/cv";

interface Props {
  data: CVData;
}

export function MinimalTemplate({ data }: Props) {
  const { personalInfo, summary, experiences, education, skills, languages, certificates } = data;

  return (
    <div className="w-full min-h-full bg-[#ffffff] text-[#262626] p-10 font-sans flex flex-col text-[11px] max-w-3xl mx-auto tracking-wide">
      
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-4xl font-light tracking-widest text-[#171717] mb-2 uppercase">{personalInfo.fullName || "İsim Soyisim"}</h1>
            <h2 className="text-sm font-medium tracking-widest text-[#737373] uppercase mb-4">{personalInfo.title || "Meslek / Ünvan"}</h2>
          </div>
          {personalInfo.photoUrl && (
            <img
              src={personalInfo.photoUrl}
              alt="Profil"
              className="w-14 h-14 rounded-full object-cover border border-[#e5e5e5] ml-4 shrink-0"
              style={{ imageRendering: "high-quality" as never }}
            />
          )}
        </div>
        <div className="flex flex-wrap gap-4 text-[#a3a3a3] text-[10px]">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedIn && <span>{personalInfo.linkedIn}</span>}
        </div>
      </header>

      <div className="flex-1 flex flex-col gap-8">
        
        {/* Summary */}
        {summary && (
          <section className="flex gap-8">
            <h3 className="w-1/4 text-xs font-semibold uppercase tracking-widest text-[#a3a3a3] shrink-0">Profil</h3>
            <p className="w-3/4 text-[#525252] leading-loose text-justify">{summary}</p>
          </section>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <section className="flex gap-8">
            <h3 className="w-1/4 text-xs font-semibold uppercase tracking-widest text-[#a3a3a3] shrink-0">Deneyim</h3>
            <div className="w-3/4 flex flex-col gap-6">
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-semibold text-[#171717] text-sm">{exp.position}</h4>
                    <span className="text-[#a3a3a3] text-[10px] tracking-wider">
                      {exp.startDate} — {exp.isCurrentJob ? "Devam" : exp.endDate}
                    </span>
                  </div>
                  <div className="text-[#737373] mb-2">{exp.company}</div>
                  {exp.description && <p className="text-[#525252] leading-relaxed whitespace-pre-wrap">{exp.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className="flex gap-8">
            <h3 className="w-1/4 text-xs font-semibold uppercase tracking-widest text-[#a3a3a3] shrink-0">Eğitim</h3>
            <div className="w-3/4 flex flex-col gap-4">
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-baseline">
                  <div>
                    <h4 className="font-semibold text-[#171717]">{edu.degree} - {edu.field}</h4>
                    <div className="text-[#737373]">{edu.institution}</div>
                  </div>
                  <span className="text-[#a3a3a3] text-[10px] tracking-wider">
                    {edu.startDate} — {edu.endDate || "Devam"}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills & Languages Row */}
        <div className="flex gap-8">
          <h3 className="w-1/4 text-xs font-semibold uppercase tracking-widest text-[#a3a3a3] shrink-0">Yetenekler</h3>
          
          <div className="w-3/4 flex gap-8">
            {skills.length > 0 && (
              <div className="flex-1">
                <ul className="flex flex-col gap-1.5 text-[#525252]">
                  {skills.map((skill) => (
                    <li key={skill.id} className="flex justify-between">
                      <span>{skill.name}</span>
                      <span className="text-[#a3a3a3]">{skill.level}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {languages.length > 0 && (
              <div className="flex-1">
                <ul className="flex flex-col gap-1.5 text-[#525252]">
                  {languages.map((lang) => (
                    <li key={lang.id} className="flex justify-between">
                      <span>{lang.name}</span>
                      <span className="text-[#a3a3a3]">{lang.proficiency}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Certificates */}
        {certificates.length > 0 && (
          <section className="flex gap-8">
            <h3 className="w-1/4 text-xs font-semibold uppercase tracking-widest text-[#a3a3a3] shrink-0">Sertifikalar</h3>
            <div className="w-3/4 flex flex-col gap-3">
              {certificates.map((cert) => (
                <div key={cert.id} className="flex justify-between items-baseline">
                  <div>
                    <h4 className="font-semibold text-[#171717]">{cert.name}</h4>
                    <div className="text-[#737373]">{cert.issuer}</div>
                  </div>
                  {cert.date && (
                    <span className="text-[#a3a3a3] text-[10px] tracking-wider">{cert.date}</span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
