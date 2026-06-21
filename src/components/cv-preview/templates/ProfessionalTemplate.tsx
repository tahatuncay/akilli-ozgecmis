import { CVData } from "@/types/cv";

interface Props {
  data: CVData;
}

export function ProfessionalTemplate({ data }: Props) {
  const { personalInfo, summary, experiences, education, skills, languages, certificates } = data;

  return (
    <div className="w-full min-h-full bg-white text-gray-900 p-10 font-sans flex flex-col text-[11px] leading-relaxed">
      {/* Header */}
      <header className="flex flex-col items-center text-center border-b-[3px] border-gray-900 pb-6 mb-6">
        <h1 className="text-4xl font-black uppercase tracking-[0.15em] mb-2 text-gray-900">{personalInfo.fullName || "İsim Soyisim"}</h1>
        <h2 className="text-sm font-semibold tracking-[0.2em] text-gray-500 uppercase mb-4">{personalInfo.title || "Meslek / Ünvan"}</h2>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-gray-600 text-[10px] font-medium">
          {personalInfo.email && <span className="flex items-center gap-1.5"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>{personalInfo.email}</span>}
          {personalInfo.phone && <span className="flex items-center gap-1.5"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>{personalInfo.phone}</span>}
          {personalInfo.location && <span className="flex items-center gap-1.5"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>{personalInfo.location}</span>}
          {personalInfo.linkedIn && <span className="flex items-center gap-1.5"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>{personalInfo.linkedIn}</span>}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col gap-6">
        
        {/* Summary */}
        {summary && (
          <section>
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900 border-b border-gray-300 pb-2 mb-3">Profil Özeti</h3>
            <p className="text-justify text-gray-700 leading-[1.6]">{summary}</p>
          </section>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <section>
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900 border-b border-gray-300 pb-2 mb-4">Profesyonel Deneyim</h3>
            <div className="flex flex-col gap-5">
              {experiences.map((exp) => (
                <div key={exp.id} className="print:break-inside-avoid">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-bold text-gray-900 text-sm">{exp.position}</h4>
                    <span className="text-gray-500 font-medium text-[10px] tracking-wide uppercase">
                      {exp.startDate} — {exp.isCurrentJob ? "Devam" : exp.endDate}
                    </span>
                  </div>
                  <div className="font-semibold text-gray-600 mb-2">{exp.company}</div>
                  {exp.description && <p className="leading-[1.6] text-gray-700 whitespace-pre-wrap">{exp.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education & Skills Grid */}
        <div className="grid grid-cols-2 gap-8 mt-2">
          
          {/* Education */}
          {education.length > 0 && (
            <section>
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900 border-b border-gray-300 pb-2 mb-4">Eğitim Geçmişi</h3>
              <div className="flex flex-col gap-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h4 className="font-bold text-gray-900">{edu.degree} in {edu.field}</h4>
                    <div className="text-gray-600 mt-0.5">{edu.institution}</div>
                    <div className="text-gray-500 text-[10px] mt-1 tracking-wide uppercase">
                      {edu.startDate} — {edu.endDate || "Devam"}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          <div className="flex flex-col gap-6">
            {/* Skills */}
            {skills.length > 0 && (
              <section>
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900 border-b border-gray-300 pb-2 mb-4">Temel Yetkinlikler</h3>
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  {skills.map((skill) => (
                    <div key={skill.id} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                      <span className="font-medium text-gray-800">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Languages & Certificates */}
            <div className="grid grid-cols-2 gap-4">
              {languages.length > 0 && (
                <section>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900 border-b border-gray-300 pb-2 mb-3">Yabancı Diller</h3>
                  <ul className="flex flex-col gap-1.5">
                    {languages.map((lang) => (
                      <li key={lang.id} className="flex justify-between items-center text-gray-800 font-medium">
                        {lang.name} <span className="text-gray-500 text-[10px]">{lang.proficiency}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {certificates.length > 0 && (
                <section>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900 border-b border-gray-300 pb-2 mb-3">Sertifikalar</h3>
                  <ul className="flex flex-col gap-2">
                    {certificates.map((cert) => (
                      <li key={cert.id} className="text-gray-800">
                        <div className="font-bold leading-tight">{cert.name}</div>
                        <div className="text-gray-500 text-[9px] mt-0.5">{cert.issuer}</div>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
