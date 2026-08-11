import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Destek | Akıllı Özgeçmiş",
  description: "Akıllı Özgeçmiş platformu için destek ve iletişim bilgileri.",
};

export default function DestekPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[var(--background)]">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[var(--foreground-muted)] mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">Ana Sayfa</Link>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
          <span className="text-foreground font-medium">Destek</span>
        </nav>

        {/* Başlık */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-4">Destek ve İletişim</h1>
          <p className="text-[var(--foreground-muted)] text-lg">Size yardımcı olmak için buradayız. Her türlü soru, görüş ve öneriniz için bize ulaşabilirsiniz.</p>
        </div>

        {/* İçerik */}
        <div className="grid gap-8 md:grid-cols-2 mb-12">
          
          {/* Email Card */}
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-8 shadow-sm flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-primary-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">E-posta ile Ulaşın</h3>
            <p className="text-[var(--foreground-secondary)] mb-6">Teknik destek, hata bildirimi veya işbirlikleri için bize doğrudan e-posta gönderebilirsiniz.</p>
            <a 
              href="mailto:taha.tuncay@icloud.com" 
              className="text-primary-600 font-semibold hover:text-primary-700 text-lg transition-colors"
            >
              taha.tuncay@icloud.com
            </a>
          </div>

          {/* SSS Card */}
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-8 shadow-sm flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">Sık Sorulan Sorular</h3>
            <p className="text-[var(--foreground-secondary)] mb-6">Sorunuzun cevabı zaten burada olabilir. İletişime geçmeden önce SSS sayfamızı inceleyebilirsiniz.</p>
            <Link 
              href="/sss" 
              className="inline-flex items-center justify-center rounded-xl bg-secondary-100 px-6 py-2.5 text-sm font-semibold text-secondary-900 shadow-sm hover:bg-secondary-200 transition-colors mt-auto"
            >
              SSS'ları Görüntüle
            </Link>
          </div>

        </div>

        {/* Destek Kapsamı */}
        <div className="prose prose-lg max-w-none text-[var(--foreground-secondary)]">
          <h2 className="text-2xl font-bold text-foreground mb-4">Size Hangi Konularda Yardımcı Olabiliriz?</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Teknik Sorunlar:</strong> Platformda karşılaştığınız hatalar, PDF oluşturma sorunları veya sayfa yükleme problemleri.</li>
            <li><strong>Özellik Talepleri:</strong> Görmek istediğiniz yeni şablon tasarımları veya özellik önerileri.</li>
            <li><strong>Veri ve Gizlilik:</strong> Kişisel verilerinizin yönetimi hakkındaki sorularınız.</li>
            <li><strong>Geri Bildirimler:</strong> Yapay zeka çevirileri veya ATS analizi sonuçları hakkındaki değerlendirmeleriniz.</li>
          </ul>
          <p className="mt-6 text-sm text-[var(--foreground-muted)]">
            E-postalarınıza genellikle 24-48 saat içerisinde geri dönüş yapmaya çalışıyoruz. Anlayışınız için teşekkür ederiz.
          </p>
        </div>

      </div>
    </div>
  );
}
