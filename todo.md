# 📋 Akıllı Özgeçmiş — MVP Yol Haritası

> Yapay zeka destekli, profesyonel özgeçmiş oluşturma platformu.

---

## 🏗️ Adım 1: Proje Kurulumu (Boilerplate)

- [x] Next.js 16 + TypeScript projesi oluştur
- [x] Tailwind CSS v4 kurulumu
- [x] Klasör yapısını oluştur (`components/`, `lib/`, `types/`, `hooks/`, `context/`, `services/`, `data/`)
- [x] Temel tip tanımlarını oluştur (`CVData`, `PersonalInfo`, `Experience` vb.)
- [x] Yardımcı fonksiyonları oluştur (`cn()` utility)
- [x] Sabit değerler dosyası oluştur (`constants.ts`)
- [x] `todo.md` yol haritası dosyasını yarat

---

## 🎨 Adım 2: UI Tasarım Sistemi & Layout

- [x] Global renk paleti ve tema değişkenleri tanımla (`globals.css`)
- [x] Google Fonts entegrasyonu (Inter / Outfit)
- [x] Ortak UI bileşenleri oluştur:
  - [x] `Button` (varyantlar: primary, secondary, ghost, outline)
  - [x] `Input` / `Textarea`
  - [x] `Card`
  - [x] `Badge`
  - [x] `Modal`
  - [x] `Tabs`
  - [x] `ProgressBar` (form ilerleme göstergesi)
- [x] Layout bileşenleri:
  - [x] `Header` (logo + navigasyon)
  - [x] `Footer`
  - [x] `Sidebar` (CV oluşturma sayfasında)

---

## 📝 Adım 3: CV Form Sistemi (Çok Adımlı Form)

- [x] `CVContext` oluştur — form state yönetimi (React Context + useReducer)
- [x] Çok adımlı form yapısı (stepper / wizard):
  - [x] Adım 1: Kişisel Bilgiler formu
  - [x] Adım 2: Özet / Profil yazımı
  - [x] Adım 3: İş Deneyimleri (dinamik ekleme/silme)
  - [x] Adım 4: Eğitim Bilgileri (dinamik ekleme/silme)
  - [x] Adım 5: Yetenekler (kategori bazlı, seviye seçimi)
  - [x] Adım 6: Yabancı Diller
  - [x] Adım 7: Sertifikalar & Projeler
- [ ] Form validasyonu (client-side)
- [x] LocalStorage'a otomatik kaydetme (auto-save)
- [ ] Adımlar arası geçiş animasyonları

---

## 👁️ Adım 4: CV Önizleme & Şablonlar

- [x] Gerçek zamanlı CV önizleme paneli (sağ tarafta canlı görüntü)
- [x] En az 3 farklı CV şablonu tasarla:
  - [x] **Klasik** — Geleneksel, kurumsal görünüm
  - [x] **Modern** — Renkli, yaratıcı tasarım
  - [x] **Minimal** — Temiz, sade ve zarif
- [x] Şablon seçim galerisi
- [x] Şablonlar arası geçiş (veri kaybı olmadan)

---

## 📄 Adım 5: PDF Dışa Aktarma

- [x] PDF oluşturma motoru entegrasyonu (react-pdf veya html2pdf.js)
- [x] Sayfa boyutu ve margin ayarları (A4)
- [x] PDF indirme butonu
- [x] Baskı optimizasyonu (print-friendly CSS)

---

## 🤖 Adım 6: Yapay Zeka Entegrasyonu (AI)

- [x] AI servisi altyapısı (API route: `/api/ai/...`)
- [x] Profil özeti otomatik yazma (AI ile)
- [x] İş deneyimi açıklamalarını iyileştirme
- [ ] Yetenek önerisi (pozisyona göre)
- [ ] Genel CV puanlama ve iyileştirme önerileri

---

## 🏠 Adım 7: Landing Page & Sayfa Yönlendirme

- [x] Ana sayfa (landing page) tasarımı:
  - [x] Hero bölümü (CTA butonu)
  - [x] Özellikler bölümü
  - [x] Nasıl çalışır (adımlar)
  - [x] Şablon galerisi önizlemesi
  - [x] Footer
- [x] Sayfa yönlendirme yapısı:
  - [x] `/` — Ana sayfa
  - [x] `/olustur` — CV oluşturma sayfası (form + önizleme)
  - [x] `/sablonlar` — Şablon galerisi

---

## ✅ Adım 8: Son Kontroller & Polish

- [x] Responsive tasarım kontrolü (mobil, tablet, masaüstü)
- [ ] Erişilebilirlik (a11y) kontrolleri
- [x] SEO meta tag'leri
- [ ] Performans optimizasyonu
- [x] Loading state'leri ve skeleton UI
- [x] Hata durumları (error boundaries)
- [x] Son kullanıcı testi ve bug fix

---

## 🔮 Gelecek Sürümler (Post-MVP)

- [ ] Kullanıcı hesap sistemi (kayıt/giriş)
- [ ] Birden fazla CV kaydetme
- [ ] CV paylaşım linki oluşturma
- [x] ATS (Applicant Tracking System) uyumluluk analizi
- [ ] Çoklu dil desteği (TR / EN)
- [ ] Premium şablonlar ve ödeme sistemi
- [ ] LinkedIn'den veri çekme
- [ ] Kapak mektubu oluşturma

---

> **Not:** Her adım, bir önceki adımın onaylanmasından sonra başlayacaktır.
> Mevcut durum: ✅ **Tüm temel adımlar (Adım 1-7) başarıyla tamamlandı!** Proje yayına hazır.
