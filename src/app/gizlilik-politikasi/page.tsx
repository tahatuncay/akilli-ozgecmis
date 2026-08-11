import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gizlilik Politikası | Akıllı Özgeçmiş",
  description: "Akıllı Özgeçmiş gizlilik politikası. Kişisel verilerinizin nasıl toplandığı, işlendiği ve korunduğu hakkında bilgi edinin.",
};

export default function GizlilikPolitikasiPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[var(--background)]">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[var(--foreground-muted)] mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">Ana Sayfa</Link>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
          <span className="text-foreground font-medium">Gizlilik Politikası</span>
        </nav>

        {/* Başlık */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-4">Gizlilik Politikası</h1>
          <p className="text-[var(--foreground-muted)]">Son güncelleme: 11 Ağustos 2026</p>
        </div>

        {/* İçerik */}
        <article className="prose prose-lg max-w-none space-y-8 text-[var(--foreground-secondary)] leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">1. Giriş</h2>
            <p>
              Akıllı Özgeçmiş (&quot;Platform&quot;, &quot;biz&quot; veya &quot;bize&quot;) olarak kişisel verilerinizin gizliliğine büyük önem veriyoruz. 
              Bu Gizlilik Politikası, platformumuzu kullanırken hangi bilgilerin toplandığını, bu bilgilerin nasıl kullanıldığını 
              ve korunduğunu açıklamaktadır.
            </p>
            <p>
              Platformumuzu kullanarak bu politikada belirtilen koşulları kabul etmiş sayılırsınız. 
              6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında haklarınız saklıdır.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">2. Toplanan Bilgiler</h2>
            <p>Platformumuzu kullanırken aşağıdaki veriler tarayıcınızda (istemci tarafında) işlenir:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li><strong>Kişisel Bilgiler:</strong> CV oluştururken girdiğiniz ad-soyad, e-posta, telefon numarası, konum, meslek unvanı gibi bilgiler.</li>
              <li><strong>Kariyer Bilgileri:</strong> İş deneyimleriniz, eğitim geçmişiniz, yetenekleriniz, sertifikalarınız ve profesyonel özetiniz.</li>
              <li><strong>Yüklenen Dosyalar:</strong> LinkedIn veya Kariyer.net&apos;ten içe aktarılan PDF dosyaları. Bu dosyalar yalnızca tarayıcınızda işlenir ve sunucularımıza kaydedilmez.</li>
              <li><strong>Fotoğraflar:</strong> CV&apos;nize eklediğiniz profil fotoğrafı.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">3. Verilerin İşlenme Amacı</h2>
            <p>Toplanan veriler yalnızca aşağıdaki amaçlarla işlenir:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>CV oluşturma ve önizleme hizmetinin sağlanması.</li>
              <li>Yapay zeka destekli CV analizi ve iyileştirme önerilerinin sunulması (Google Gemini API).</li>
              <li>PDF olarak CV indirme işleminin gerçekleştirilmesi.</li>
              <li>LinkedIn ve Kariyer.net PDF verilerinin otomatik form doldurmada kullanılması.</li>
              <li>CV içeriklerinin yapay zeka ile İngilizceye çevrilmesi.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">4. Verilerin Saklanması</h2>
            <p>
              Akıllı Özgeçmiş, kullanıcı verilerini <strong>herhangi bir sunucuda veya veritabanında saklamaz</strong>. 
              CV verileriniz yalnızca tarayıcınızın yerel depolama alanında (localStorage) tutulur ve cihazınızdan çıkmaz.
            </p>
            <p>
              Tarayıcı verilerinizi temizlediğinizde veya localStorage&apos;ı sildiğinizde tüm CV verileriniz kalıcı olarak silinir.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">5. Üçüncü Taraf Hizmetler</h2>
            <p>Platformumuz aşağıdaki üçüncü taraf hizmetlerle entegre çalışmaktadır:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li><strong>Google Gemini API:</strong> CV analizi, ATS uyumluluk kontrolü, içerik çevirisi ve LinkedIn/Kariyer.net PDF ayrıştırma işlemleri için kullanılır. Bu işlemler sırasında CV verileriniz Google&apos;ın sunucularına gönderilir. Detaylı bilgi için <a href="https://ai.google.dev/gemini-api/terms" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 underline">Google Gemini API Kullanım Koşulları</a>&apos;nı inceleyebilirsiniz.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">6. Çerezler</h2>
            <p>
              Platformumuz temel çalışması için zorunlu çerezler kullanabilir. Çerez kullanımı hakkında detaylı bilgi için 
              <Link href="/cerez-politikasi" className="text-primary-600 hover:text-primary-700 underline ml-1">Çerez Politikası</Link> sayfamızı ziyaret edebilirsiniz.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">7. Veri Güvenliği</h2>
            <p>
              Verilerinizin güvenliğini sağlamak için endüstri standardı güvenlik önlemleri uygulanmaktadır. 
              Tüm API iletişimleri HTTPS (SSL/TLS) şifrelemesi ile korunmaktadır. 
              Ancak internet üzerinden yapılan hiçbir veri iletiminin %100 güvenli olduğu garanti edilemez.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">8. KVKK Kapsamında Haklarınız</h2>
            <p>6698 sayılı KVKK kapsamında aşağıdaki haklara sahipsiniz:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme.</li>
              <li>Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme.</li>
              <li>Kişisel verilerinizin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme.</li>
              <li>Kişisel verilerinizin düzeltilmesini veya silinmesini isteme.</li>
              <li>İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">9. Politika Değişiklikleri</h2>
            <p>
              Bu Gizlilik Politikası zaman zaman güncellenebilir. Önemli değişiklikler yapıldığında 
              platform üzerinden bilgilendirileceksiniz. Güncel politikayı bu sayfadan her zaman takip edebilirsiniz.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">10. İletişim</h2>
            <p>
              Gizlilik politikamız hakkında sorularınız veya talepleriniz için bizimle iletişime geçebilirsiniz.
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}
