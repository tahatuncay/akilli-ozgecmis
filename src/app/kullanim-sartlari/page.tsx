import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kullanım Şartları | Akıllı Özgeçmiş",
  description: "Akıllı Özgeçmiş kullanım şartları. Platformun kullanım koşulları, sorumluluklar ve yasal bilgiler.",
};

export default function KullanimSartlariPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[var(--background)]">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[var(--foreground-muted)] mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">Ana Sayfa</Link>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
          <span className="text-foreground font-medium">Kullanım Şartları</span>
        </nav>

        {/* Başlık */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-4">Kullanım Şartları</h1>
          <p className="text-[var(--foreground-muted)]">Son güncelleme: 11 Ağustos 2026</p>
        </div>

        {/* İçerik */}
        <article className="prose prose-lg max-w-none space-y-8 text-[var(--foreground-secondary)] leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">1. Genel Hükümler</h2>
            <p>
              Bu Kullanım Şartları, Akıllı Özgeçmiş (&quot;Platform&quot;) web sitesinin ve sunduğu hizmetlerin kullanımına 
              ilişkin koşulları düzenlemektedir. Platformu kullanarak bu şartları okuduğunuzu, anladığınızı ve 
              kabul ettiğinizi beyan etmiş olursunuz.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">2. Hizmet Tanımı</h2>
            <p>Akıllı Özgeçmiş, kullanıcılara aşağıdaki hizmetleri ücretsiz olarak sunmaktadır:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Farklı şablonlar ile profesyonel CV (özgeçmiş) oluşturma.</li>
              <li>LinkedIn ve Kariyer.net PDF dosyalarından otomatik veri aktarımı.</li>
              <li>Yapay zeka destekli ATS (Başvuru Takip Sistemi) uyumluluk analizi.</li>
              <li>CV içeriklerinin yapay zeka ile İngilizceye çevirisi.</li>
              <li>Oluşturulan CV&apos;lerin PDF formatında indirilmesi.</li>
              <li>Tema rengi ve şablon kişiselleştirme.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">3. Kullanıcı Sorumlulukları</h2>
            <p>Platform kullanıcıları aşağıdaki kurallara uymayı kabul eder:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>CV&apos;de girilen bilgilerin doğruluğundan yalnızca kullanıcı sorumludur.</li>
              <li>Platform, yanıltıcı veya sahte bilgilerle oluşturulan CV&apos;lerden dolayı sorumluluk kabul etmez.</li>
              <li>Platformun kötü amaçlı kullanımı (spam, zararlı içerik yükleme, API istismarı vb.) yasaktır.</li>
              <li>Başka kullanıcıların bilgilerine müdahale etmek veya platformun güvenliğini tehlikeye atacak eylemler yasaktır.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">4. Yapay Zeka Kullanımı</h2>
            <p>
              Platform, CV analizi, içerik önerileri ve çeviri gibi özellikler için Google Gemini yapay zeka modellerini 
              kullanmaktadır. Bu bağlamda:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Yapay zeka tarafından üretilen öneriler ve çeviriler bilgilendirme amaçlıdır; kesin doğruluk garanti edilmez.</li>
              <li>AI çıktılarını kullanmadan önce gözden geçirmeniz ve doğrulamanız önerilir.</li>
              <li>AI analiz sonuçları iş başvurularınızda başarı garantisi vermez.</li>
              <li>CV verileriniz analiz amacıyla Google Gemini API&apos;ye iletilir ve Google&apos;ın kullanım koşullarına tabidir.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">5. Fikri Mülkiyet Hakları</h2>
            <p>
              Platformun tasarımı, kaynak kodu, logosu, şablonları ve diğer özgün içerikleri fikri mülkiyet haklarıyla korunmaktadır.
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Kullanıcılar, oluşturdukları CV içeriklerinin tüm haklarına sahiptir.</li>
              <li>Platform şablonları ve tasarımları yalnızca kişisel CV oluşturma amacıyla kullanılabilir.</li>
              <li>Platformun kaynak kodunun, şablonlarının veya tasarım öğelerinin izinsiz olarak kopyalanması, dağıtılması veya ticari amaçla kullanılması yasaktır.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">6. Veri Saklama ve Güvenlik</h2>
            <p>
              Kullanıcı verileri yalnızca tarayıcının yerel depolama alanında (localStorage) saklanır. 
              Platform herhangi bir merkezi sunucuda kullanıcı verisi barındırmaz. Detaylı bilgi için 
              <Link href="/gizlilik-politikasi" className="text-primary-600 hover:text-primary-700 underline ml-1">Gizlilik Politikası</Link> sayfamızı inceleyebilirsiniz.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">7. Sorumluluk Sınırlandırması</h2>
            <p>Platform aşağıdaki durumlarda sorumluluk kabul etmez:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Tarayıcı verileri temizlenerek kaybedilen CV bilgileri.</li>
              <li>Yapay zeka tarafından üretilen hatalı veya eksik çeviri/analiz sonuçları.</li>
              <li>Platformun geçici veya kalıcı olarak erişilemez olması.</li>
              <li>Üçüncü taraf hizmetlerin (Google Gemini API vb.) kesintileri veya hataları.</li>
              <li>Kullanıcının platformu kullanması sonucu doğabilecek doğrudan veya dolaylı zararlar.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">8. Hizmet Değişiklikleri</h2>
            <p>
              Platform, herhangi bir önceden bildirimde bulunmaksızın hizmetlerinde değişiklik yapma, yeni özellikler ekleme 
              veya mevcut özellikleri kaldırma hakkını saklı tutar. Ücretsiz olarak sunulan hizmetler, ilerleyen dönemlerde 
              ücretli hale getirilebilir.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">9. Kullanım Şartları Değişiklikleri</h2>
            <p>
              Bu Kullanım Şartları zaman zaman güncellenebilir. Önemli değişiklikler yapıldığında platform üzerinden 
              bilgilendirileceksiniz. Platformu kullanmaya devam etmeniz, güncellenmiş şartları kabul ettiğiniz anlamına gelir.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">10. Uygulanacak Hukuk</h2>
            <p>
              Bu Kullanım Şartları Türkiye Cumhuriyeti kanunlarına tabidir. Herhangi bir uyuşmazlık durumunda 
              Türkiye Cumhuriyeti mahkemeleri yetkilidir.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">11. İletişim</h2>
            <p>
              Kullanım şartları hakkında sorularınız için bizimle iletişime geçebilirsiniz.
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}
