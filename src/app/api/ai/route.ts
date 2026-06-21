import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

// Ensure the API key is set in .env.local
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function POST(req: Request) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Gemini API Key bulunamadı. Lütfen .env.local dosyasında GEMINI_API_KEY tanımlayın." },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { action, payload } = body;

    let prompt = "";

    if (action === "summary") {
      const { title, keywords } = payload;
      prompt = `
Sen uzman bir İnsan Kaynakları profesyonelisin. 
Adayın Unvanı: ${title || "Belirtilmemiş"}
Adayın Sağladığı Anahtar Kelimeler/Notlar: ${keywords || "Yok"}

Bu bilgilere dayanarak adayın özgeçmişinin en üstünde yer alacak, profesyonel, etkili ve akıcı bir Türkçe profil özeti (summary) yaz. 
En fazla 3 cümle uzunluğunda olsun. Sadece üretilen özeti döndür, yorum veya ekstra metin ekleme.
      `;
    } else if (action === "experience") {
      const { position, company, description } = payload;
      prompt = `
Sen uzman bir İnsan Kaynakları profesyonelisin.
Adayın Şirketi: ${company || "Belirtilmemiş"}
Adayın Pozisyonu: ${position || "Belirtilmemiş"}
Adayın Yazdığı Kaba Taslak Açıklama: "${description || ""}"

Adayın girdiği bu kaba taslak iş açıklamasını alıp profesyonel, kurumsal ve etkili bir İK diline çevir. 
Etkili eylem fiilleri kullan ve adayın o pozisyondaki değerini vurgula. 
Madde imleri (bullet points) kullanmadan, akıcı bir paragraf şeklinde (en fazla 3-4 cümle) yaz. 
Sadece yeni açıklamayı döndür, yorum veya ekstra metin ekleme.
      `;
    } else {
      return NextResponse.json({ error: "Geçersiz işlem (action) türü." }, { status: 400 });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const resultText = response.text || "";

    return NextResponse.json({ result: resultText.trim() });
  } catch (error) {
    console.error("AI Error:", error);
    return NextResponse.json(
      { error: "Yapay zeka yanıt oluştururken bir hata meydana geldi." },
      { status: 500 }
    );
  }
}
