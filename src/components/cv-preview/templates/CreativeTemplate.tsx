import { CVData } from "@/types/cv";

interface Props {
  data: CVData;
}

export function CreativeTemplate({ data }: Props) {
  const { personalInfo, summary, experiences, education, skills, languages, certificates } = data;

  return (
    <div className="w-full min-h-full bg-white text-gray-800 p-0 font-sans flex flex-col text-[11px]">
      {/* Header with gradient background */}
      <header className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-8 pb-12 rounded-br-[80px]">
        <div className="flex gap-6 items-center">
          {personalInfo.photoUrl && (
            <div className="shrink-0">
              <img
                src={personalInfo.photoUrl}
                alt="Profil"
                className="w-24 h-24 rounded-2xl object-cover border-4 border-white/30 shadow-lg"
                style={{ imageRendering: "high-quality" as never }}
              />
            </div>
          )}
          <div className="flex flex-col">
            <h1 className="text-4xl font-black tracking-tight mb-1">{personalInfo.fullName || "İsim Soyisim"}</h1>
            <h2 className="text-xl font-medium text-white/90 mb-4">{personalInfo.title || "Meslek / Ünvan"}</h2>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-white/80 text-[10px] font-medium">
              {personalInfo.email && <span className="flex items-center gap-1">✉ {personalInfo.email}</span>}
              {personalInfo.phone && <span className="flex items-center gap-1">☎ {personalInfo.phone}</span>}
              {personalInfo.location && <span className="flex items-center gap-1">📍 {personalInfo.location}</span>}
              {personalInfo.linkedIn && <span className="flex items-center gap-1">🔗 {personalInfo.linkedIn}</span>}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex px-8 py-6 gap-8">
        {/* Left Column (Main Info) */}
        <div className="w-2/3 flex flex-col gap-6 -mt-8 relative z-10">
          
          {/* Summary */}
          {summary && (
            <section className="bg-white p-5 rounded-2xl shadow-md border border-gray-100">
              <h3 className="text-sm font-bold text-indigo-600 mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center">👤</span> 
                Hakkımda
              </h3>
              <p className="leading-relaxed text-gray-600">{summary}</p>
            </section>
          )}

          {/* Experience */}
          {experiences.length > 0 && (
            <section className="bg-white p-5 rounded-2xl shadow-md border border-gray-100">
              <h3 className="text-sm font-bold text-purple-600 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">💼</span>
                Deneyim
              </h3>
              <div className="flex flex-col gap-5">
                {experiences.map((exp) => (
                  <div key={exp.id} className="relative pl-4 border-l-2 border-purple-200">
                    <div className="absolute w-2 h-2 bg-purple-500 rounded-full -left-[5px] top-1.5 ring-4 ring-white"></div>
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-gray-800 text-sm">{exp.position}</h4>
                      <span className="text-purple-600 font-semibold text-[10px] bg-purple-50 px-2 py-0.5 rounded-full">
                        {exp.startDate} - {exp.isCurrentJob ? "Devam" : exp.endDate}
                      </span>
                    </div>
                    <div className="font-medium text-gray-500 mb-2">{exp.company}</div>
                    {exp.description && <p className="leading-relaxed text-gray-600 whitespace-pre-wrap">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section className="bg-white p-5 rounded-2xl shadow-md border border-gray-100">
              <h3 className="text-sm font-bold text-pink-600 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center">🎓</span>
                Eğitim
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {education.map((edu) => (
                  <div key={edu.id} className="p-3 bg-pink-50/50 rounded-xl border border-pink-100">
                    <h4 className="font-bold text-gray-800 leading-tight mb-1">{edu.degree}</h4>
                    <div className="text-pink-600 font-medium mb-1">{edu.field}</div>
                    <div className="text-gray-500">{edu.institution}</div>
                    <div className="text-gray-400 text-[10px] mt-1">
                      {edu.startDate} - {edu.endDate || "Devam"}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column (Sidebar Stats) */}
        <div className="w-1/3 flex flex-col gap-6 pt-4">
          
          {/* Skills */}
          {skills.length > 0 && (
            <section>
              <h3 className="text-sm font-bold text-gray-800 mb-3">Uzmanlık</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <div key={skill.id} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-[10px] font-medium border border-gray-200">
                    {skill.name}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <section>
              <h3 className="text-sm font-bold text-gray-800 mb-3">Diller</h3>
              <div className="flex flex-col gap-2">
                {languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-700">{lang.name}</span>
                    <span className="text-[10px] font-bold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-md">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certificates */}
          {certificates.length > 0 && (
            <section>
              <h3 className="text-sm font-bold text-gray-800 mb-3">Sertifikalar</h3>
              <div className="flex flex-col gap-3">
                {certificates.map((cert) => (
                  <div key={cert.id} className="relative pl-3 border-l-2 border-gray-200">
                    <div className="font-bold text-gray-700 leading-tight">{cert.name}</div>
                    <div className="text-gray-500 text-[10px] mt-1">{cert.issuer}</div>
                    <div className="text-gray-400 text-[9px]">{cert.date}</div>
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
