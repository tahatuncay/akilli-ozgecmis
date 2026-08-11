import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Çerez Politikası | Akıllı Özgeçmiş",
  description: "Akıllı Özgeçmiş çerez politikası. Web sitemizde çerez kullanımı hakkında detaylı bilgi edinin.",
};

export default function CerezPolitikasiPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[var(--background)]">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[var(--foreground-muted)] mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">Ana Sayfa</Link>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
          <span className="text-foreground font-medium">Çerez Politikası</span>
        </nav>

        {/* Başlık */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-4">Çerez Politikası</h1>
          <p className="text-[var(--foreground-muted)]">Son güncelleme: 11 Ağustos 2026</p>
        </div>

        {/* İçerik */}
        <article className="prose prose-lg max-w-none space-y-8 text-[var(--foreground-secondary)] leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">1. Çerez Nedir?</h2>
            <p>
              Çerezler (cookies), web sitelerinin tarayıcınıza kaydettiği küçük metin dosyalarıdır. 
              Bu dosyalar, web sitesinin düzgün çalışmasını sağlamak, kullanıcı deneyimini iyileştirmek 
              ve site kullanımını analiz etmek amacıyla kullanılır.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">2. Kullandığımız Çerez Türleri</h2>
            <p>Akıllı Özgeçmiş platformu aşağıdaki çerez ve depolama teknolojilerini kullanmaktadır:</p>

            {/* Tablo */}
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-[var(--border)]">
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Tür</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Amaç</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Süre</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-medium text-foreground">Yerel Depolama (localStorage)</td>
                    <td className="py-3 px-4">CV form verilerinizin tarayıcınızda saklanması. Sayfayı yenilediğinizde veya tarayıcıyı kapattığınızda verileriniz kaybolmaz.</td>
                    <td className="py-3 px-4">Kalıcı (kullanıcı silene kadar)</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-medium text-foreground">Zorunlu Çerezler</td>
                    <td className="py-3 px-4">Platformun temel işlevlerinin çalışması için gerekli çerezler (oturum yönetimi, güvenlik vb.).</td>
                    <td className="py-3 px-4">Oturum süresi</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-medium text-foreground">Tercih Çerezleri</td>
                    <td className="py-3 px-4">Seçtiğiniz tema rengi, şablon tercihi ve dil ayarı gibi kişiselleştirme tercihlerinizin hatırlanması.</td>
                    <td className="py-3 px-4">Kalıcı (kullanıcı silene kadar)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">3. Kullanmadığımız Çerez Türleri</h2>
            <p>Akıllı Özgeçmiş aşağıdaki çerez türlerini <strong>kullanmamaktadır</strong>:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li><strong>Analitik/İstatistik Çerezleri:</strong> Google Analytics veya benzeri izleme araçları kullanılmamaktadır.</li>
              <li><strong>Reklam Çerezleri:</strong> Platformumuzda reklam gösterilmez ve reklam çerezleri kullanılmaz.</li>
              <li><strong>Üçüncü Taraf İzleme Çerezleri:</strong> Kullanıcıların farklı web sitelerindeki etkinliklerini izleyen çerezler kullanılmamaktadır.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">4. localStorage Kullanımı</h2>
            <p>
              Platformumuz, teknik olarak bir çerez olmamakla birlikte benzer işleve sahip olan <strong>localStorage</strong> teknolojisini 
              kullanmaktadır. CV formuna girdiğiniz tüm veriler (kişisel bilgiler, deneyimler, eğitimler, yetenekler vb.) 
              yalnızca tarayıcınızın localStorage alanında saklanır.
            </p>
            <p>Bu veriler:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Sunucularımıza hiçbir zaman gönderilmez veya kaydedilmez.</li>
              <li>Sadece sizin cihazınızda kalır.</li>
              <li>Tarayıcı verilerini temizlediğinizde tamamen silinir.</li>
              <li>Farklı tarayıcılar veya cihazlar arasında senkronize edilmez.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">5. Çerezleri Yönetme</h2>
            <p>
              Tarayıcınızın ayarlarından çerezleri ve yerel depolama verilerini istediğiniz zaman yönetebilirsiniz. 
              Aşağıda popüler tarayıcılar için çerez yönetim sayfalarına bağlantılar bulunmaktadır:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 underline">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/tr/kb/cerezleri-silme-web-sitelerinin-bilgilerini-kaldirma" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 underline">Mozilla Firefox</a></li>
              <li><a href="https://support.apple.com/tr-tr/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 underline">Apple Safari</a></li>
              <li><a href="https://support.microsoft.com/tr-tr/microsoft-edge" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 underline">Microsoft Edge</a></li>
            </ul>
            <div className="mt-4 p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
              <p className="text-sm">
                <strong>⚠️ Uyarı:</strong> Çerezleri veya localStorage verilerini silmeniz durumunda, 
                kaydettiğiniz CV bilgileriniz kalıcı olarak silinecektir. Bu işlem geri alınamaz.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">6. Politika Değişiklikleri</h2>
            <p>
              Bu Çerez Politikası zaman zaman güncellenebilir. Önemli değişiklikler yapıldığında platform üzerinden 
              bilgilendirileceksiniz. Güncel politikayı bu sayfadan her zaman takip edebilirsiniz.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">7. İletişim</h2>
            <p>
              Çerez politikamız hakkında sorularınız için bizimle iletişime geçebilirsiniz. 
              Ayrıca kişisel verilerinizin korunması hakkında detaylı bilgi için 
              <Link href="/gizlilik-politikasi" className="text-primary-600 hover:text-primary-700 underline ml-1">Gizlilik Politikası</Link> sayfamızı ziyaret edebilirsiniz.
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}
