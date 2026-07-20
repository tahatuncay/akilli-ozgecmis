import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

// Çevrilecek CV verisinin JSON schema tanımı
const translatedCVSchema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: "Translated job title" },
    summary: { type: Type.STRING, description: "Translated professional summary" },
    experiences: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          position: { type: Type.STRING, description: "Translated position title" },
          description: { type: Type.STRING, description: "Translated job description with strong action verbs" },
        },
        required: ["id", "position"],
      },
    },
    education: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          degree: { type: Type.STRING, description: "Translated degree name" },
          field: { type: Type.STRING, description: "Translated field of study" },
        },
        required: ["id", "degree", "field"],
      },
    },
  },
  required: ["title", "summary", "experiences", "education"],
};

export async function POST(req: Request) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return Response.json(
        { error: "Gemini API Key bulunamadı. Lütfen .env.local dosyasında GEMINI_API_KEY tanımlayın." },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { cvData } = body;

    if (!cvData) {
      return Response.json(
        { error: "CV verisi bulunamadı." },
        { status: 400 }
      );
    }

    // Çevrilecek alanları hazırla
    const dataToTranslate = {
      title: cvData.personalInfo?.title || "",
      summary: cvData.summary || "",
      experiences: (cvData.experiences || []).map((exp: any) => ({
        id: exp.id,
        position: exp.position || "",
        description: exp.description || "",
      })),
      education: (cvData.education || []).map((edu: any) => ({
        id: edu.id,
        degree: edu.degree || "",
        field: edu.field || "",
      })),
    };

    const systemPrompt = `Sen profesyonel bir CV çevirmenisin. Sana gönderilen Türkçe CV JSON verisini profesyonel iş dünyası İngilizcesine (Business English) çevir.

Kurallar:
- İş deneyimi açıklamalarındaki eylemleri güçlü İngilizce aksiyon fiilleriyle (achieved, developed, managed, spearheaded, orchestrated, implemented vb.) ifade et.
- Özel isimleri (şirket isimleri, okul adları, sertifika isimleri) DEĞİŞTİRME. Oldukları gibi bırak.
- Her "id" alanını orijinal haliyle koru, değiştirme.
- Akademik derece isimlerini İngilizce karşılıklarına çevir (Lisans → Bachelor's, Yüksek Lisans → Master's, Doktora → Ph.D., Ön Lisans → Associate's).
- Çıktıyı SADECE aynı JSON formatında geri döndür, ek açıklama veya yorum ekleme.
- Boş string gelen alanları boş bırak.`;

    const prompt = `Aşağıdaki CV verisini profesyonel İngilizceye çevir:\n\n${JSON.stringify(dataToTranslate, null, 2)}`;

    let response;
    let retries = 3;
    let delay = 1500;

    while (retries > 0) {
      try {
        response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: prompt,
          config: {
            systemInstruction: systemPrompt,
            responseMimeType: "application/json",
            responseSchema: translatedCVSchema,
          },
        });
        break;
      } catch (err: any) {
        const isRetryable =
          err?.status === 503 ||
          err?.status === 429 ||
          err?.message?.includes("503") ||
          err?.message?.includes("429") ||
          err?.message?.includes("UNAVAILABLE") ||
          err?.message?.includes("high demand");

        if (isRetryable && retries > 1) {
          console.warn(
            `[translate-cv] Gemini API yoğunluğu (${err?.status || "Bilinmeyen"}). ${delay}ms bekleniyor. Kalan deneme: ${retries - 1}`
          );
          await new Promise((resolve) => setTimeout(resolve, delay));
          retries--;
          delay *= 2;
        } else {
          throw err;
        }
      }
    }

    const resultText = response?.text || "";

    let result;
    try {
      result = JSON.parse(resultText);
    } catch {
      return Response.json(
        { error: "Yapay zeka yanıtı işlenemedi. Lütfen tekrar deneyin." },
        { status: 500 }
      );
    }

    return Response.json({ result });
  } catch (error: any) {
    console.error("[translate-cv] Error:", error);

    const isOverloaded =
      error?.status === 503 ||
      error?.status === 429 ||
      error?.message?.includes("503") ||
      error?.message?.includes("UNAVAILABLE") ||
      error?.message?.includes("high demand");

    if (isOverloaded) {
      return Response.json(
        { error: "Yapay zeka analiz motorumuz şu anda geçici bir yoğunluk yaşıyor. Lütfen birkaç dakika bekleyip tekrar deneyin." },
        { status: 503 }
      );
    }

    return Response.json(
      { error: "CV çevirisi sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyin." },
      { status: 500 }
    );
  }
}
