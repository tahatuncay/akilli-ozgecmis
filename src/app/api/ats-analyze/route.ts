import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

// ATS analiz sonucu JSON schema
const atsResultSchema = {
  type: Type.OBJECT,
  properties: {
    overallScore: {
      type: Type.NUMBER,
      description: "0-100 arası genel ATS uyumluluk skoru",
    },
    categoryScores: {
      type: Type.OBJECT,
      properties: {
        keywordMatch: {
          type: Type.NUMBER,
          description: "Anahtar kelime eşleşme skoru (0-100)",
        },
        formatStructure: {
          type: Type.NUMBER,
          description: "CV format ve yapı kalitesi (0-100)",
        },
        experienceRelevance: {
          type: Type.NUMBER,
          description: "İş deneyimi uyumu (0-100)",
        },
        educationRelevance: {
          type: Type.NUMBER,
          description: "Eğitim uyumu (0-100)",
        },
        overallQuality: {
          type: Type.NUMBER,
          description: "Genel CV kalitesi (0-100)",
        },
      },
      required: [
        "keywordMatch",
        "formatStructure",
        "experienceRelevance",
        "educationRelevance",
        "overallQuality",
      ],
    },
    matchedKeywords: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "İş ilanı ile eşleşen anahtar kelimeler",
    },
    missingKeywords: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "CV'de eksik olan önemli anahtar kelimeler",
    },
    strengths: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "CV'nin güçlü yanları (en az 2, en fazla 5 madde)",
    },
    improvements: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description:
        "İyileştirme önerileri — somut ve uygulanabilir (en az 2, en fazla 6 madde)",
    },
    summaryFeedback: {
      type: Type.STRING,
      description:
        "Genel değerlendirme — 2-3 cümlelik profesyonel özet değerlendirme",
    },
  },
  required: [
    "overallScore",
    "categoryScores",
    "matchedKeywords",
    "missingKeywords",
    "strengths",
    "improvements",
    "summaryFeedback",
  ],
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

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const jobDescription = formData.get("jobDescription") as string | null;

    if (!file) {
      return Response.json(
        { error: "Lütfen bir CV dosyası yükleyin." },
        { status: 400 }
      );
    }

    if (!jobDescription || !jobDescription.trim()) {
      return Response.json(
        { error: "Lütfen bir iş ilanı metni girin." },
        { status: 400 }
      );
    }

    // Dosyadan metin çıkar
    let cvText = "";
    const fileType = file.name.toLowerCase();

    if (fileType.endsWith(".txt")) {
      cvText = await file.text();
    } else if (fileType.endsWith(".pdf")) {
      const { PDFParse } = await import("pdf-parse");
      const path = await import("path");
      const workerPath = "file://" + path.resolve(process.cwd(), "node_modules/pdfjs-dist/legacy/build/pdf.worker.mjs");
      PDFParse.setWorker(workerPath);
      const arrayBuffer = await file.arrayBuffer();
      const pdf = new PDFParse({ 
        data: new Uint8Array(arrayBuffer),
        useWorkerFetch: false,
        isOffscreenCanvasSupported: false,
        isImageDecoderSupported: false,
        disableFontFace: true,
      });
      const textResult = await pdf.getText();
      cvText = textResult.text;
      await pdf.destroy();
    } else {
      return Response.json(
        {
          error:
            "Desteklenmeyen dosya formatı. Lütfen PDF veya TXT dosyası yükleyin.",
        },
        { status: 400 }
      );
    }

    if (!cvText.trim()) {
      return Response.json(
        {
          error:
            "CV dosyasından metin çıkarılamadı. Lütfen metin tabanlı bir PDF dosyası yükleyin (taranmış/görüntü tabanlı PDF'ler desteklenmemektedir).",
        },
        { status: 400 }
      );
    }

    const prompt = `Sen deneyimli bir İnsan Kaynakları uzmanı ve ATS (Applicant Tracking System) analiz motorusun.
Aşağıda bir adayın CV metni ve başvurduğu iş ilanı verilmiştir. Lütfen CV'yi iş ilanına göre detaylı bir ATS uyumluluk analizi yap.

Analiz yaparken şu kriterlere dikkat et:
1. **Anahtar Kelime Eşleşmesi**: İş ilanındaki teknik terimler, yetenekler, araçlar ve sektörel kavramların CV'de bulunup bulunmadığını kontrol et. Eşanlamlı kelimeleri de dikkate al.
2. **Format ve Yapı**: CV'nin ATS yazılımları tarafından okunabilirliğini değerlendir — bölüm başlıkları, kronolojik sıralama, iletişim bilgileri varlığı vb.
3. **Deneyim Uyumu**: İş deneyimlerinin ilan gereksinimleri ile ne kadar örtüştüğünü analiz et.
4. **Eğitim Uyumu**: Eğitim bilgilerinin pozisyon için uygun olup olmadığını değerlendir.
5. **Genel Kalite**: Yazım kalitesi, profesyonel ton, somut başarı metrikleri gibi faktörleri değerlendir.

Skorları gerçekçi ver. Eşleşme yoksa düşük skor ver, abartma.
İyileştirme önerilerini somut ve uygulanabilir yaz.

---

**CV METNİ:**
${cvText.substring(0, 8000)}

---

**İŞ İLANI:**
${jobDescription.substring(0, 4000)}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: atsResultSchema,
      },
    });

    const resultText = response.text || "";

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
  } catch (error) {
    console.error("ATS Analysis Error:", error);
    return Response.json(
      {
        error:
          "Analiz sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyin.",
      },
      { status: 500 }
    );
  }
}
