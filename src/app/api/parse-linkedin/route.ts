import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

// LinkedIn profil verisinin JSON schema tanımı
const linkedinDataSchema = {
  type: Type.OBJECT,
  properties: {
    personalInfo: {
      type: Type.OBJECT,
      properties: {
        firstName: { type: Type.STRING, description: "Kişinin adı" },
        lastName: { type: Type.STRING, description: "Kişinin soyadı" },
        title: { type: Type.STRING, description: "Meslek ünvanı veya başlığı" },
        email: { type: Type.STRING, description: "E-posta adresi (varsa)" },
        phone: { type: Type.STRING, description: "Telefon numarası (varsa)" },
      },
      required: ["firstName", "lastName", "title"],
    },
    experience: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          company: { type: Type.STRING, description: "Şirket adı" },
          position: { type: Type.STRING, description: "Pozisyon / ünvan" },
          startDate: { type: Type.STRING, description: "Başlangıç tarihi (örn: 2020-01 veya Ocak 2020)" },
          endDate: { type: Type.STRING, description: "Bitiş tarihi (boş ise halen devam ediyor)" },
          description: { type: Type.STRING, description: "İş açıklaması" },
        },
        required: ["company", "position"],
      },
    },
    education: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          school: { type: Type.STRING, description: "Okul / üniversite adı" },
          degree: { type: Type.STRING, description: "Derece (Lisans, Yüksek Lisans vb.)" },
          fieldOfStudy: { type: Type.STRING, description: "Bölüm / alan" },
          startDate: { type: Type.STRING, description: "Başlangıç tarihi" },
          endDate: { type: Type.STRING, description: "Bitiş tarihi" },
        },
        required: ["school"],
      },
    },
    skills: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Yetenek listesi",
    },
    languages: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Konuşulan diller listesi",
    },
    certifications: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "Sertifika adı" },
          issuer: { type: Type.STRING, description: "Veren kurum (örn: Google, AWS, Coursera)" },
          date: { type: Type.STRING, description: "Alınma tarihi (YYYY-MM veya YYYY)" },
        },
        required: ["name"],
      },
      description: "Sertifika ve lisanslar listesi — Yeteneklerden (skills) ayrı tutulmalıdır",
    },
  },
  required: ["personalInfo", "experience", "education", "skills", "languages", "certifications"],
};

export async function POST(req: Request) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return Response.json(
        {
          error:
            "Gemini API Key bulunamadı. Lütfen .env.local dosyasında GEMINI_API_KEY tanımlayın.",
        },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { rawText } = body;

    if (!rawText || typeof rawText !== "string" || !rawText.trim()) {
      return Response.json(
        { error: "LinkedIn PDF'inden metin çıkarılamadı. Lütfen geçerli bir LinkedIn profil PDF'i yükleyin." },
        { status: 400 }
      );
    }

    // Metin çok kısa ise muhtemelen geçerli bir LinkedIn PDF değildir
    if (rawText.trim().length < 50) {
      return Response.json(
        { error: "Yüklenen PDF'den yeterli metin çıkarılamadı. Lütfen LinkedIn'den indirdiğiniz profil PDF'ini yükleyin." },
        { status: 400 }
      );
    }

    const systemPrompt = `Sana gönderilen metin, bir kullanıcının LinkedIn profilinin ham PDF çıktısıdır. Bu metni analiz et ve içindeki bilgileri ayıkla.

Kurallar:
- Metinde bulunmayan bilgileri UYDURMA, boş string ("") olarak bırak.
- Tarihleri mümkünse YYYY-MM formatında döndür (örn: 2020-01). Tam tarih bulunamazsa sadece yılı yaz.
- Deneyim açıklamalarını orijinal metindeki gibi koru, değiştirme.
- Diller ve yetenekler birer string dizisi olmalı.
- ÖNEMLİ: Sertifikalar (Licenses & Certifications) ile Yetenekler (Skills) birbirinden TAMAMEN FARKLI kategorilerdir. Sertifikaları kesinlikle "skills" dizisine YAZMA. Sertifikaları sadece "certifications" dizisine yaz. "skills" dizisine yalnızca teknik/kişisel yetenek isimlerini yaz.`;

    const prompt = `Aşağıdaki LinkedIn profil metnini analiz et ve yapılandırılmış veriye dönüştür:

---
${rawText.substring(0, 12000)}
---`;

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
            responseSchema: linkedinDataSchema,
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
            `[parse-linkedin] Gemini API yoğunluğu (${err?.status || "Bilinmeyen"}). ${delay}ms bekleniyor. Kalan deneme: ${retries - 1}`
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
    console.error("[parse-linkedin] Error:", error);

    const isOverloaded =
      error?.status === 503 ||
      error?.status === 429 ||
      error?.message?.includes("503") ||
      error?.message?.includes("UNAVAILABLE") ||
      error?.message?.includes("high demand");

    if (isOverloaded) {
      return Response.json(
        {
          error:
            "Yapay zeka analiz motorumuz şu anda geçici bir yoğunluk yaşıyor. Lütfen birkaç dakika bekleyip tekrar deneyin.",
        },
        { status: 503 }
      );
    }

    return Response.json(
      {
        error:
          "LinkedIn verisi işlenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.",
      },
      { status: 500 }
    );
  }
}
