import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <div className="relative w-full bg-[url('/anasayfa.png')] bg-cover bg-center bg-no-repeat bg-fixed">
        <div className="relative z-10">
          {/* Hero Section */}
          <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 lg:py-32">
            <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                </span>
                TAMAMEN ÜCRETSİZ
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-foreground tracking-tight leading-tight">
                Özgeçmişiniz Akıllı <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">
                  İşiniz Garanti
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-[var(--foreground-muted)] max-w-2xl mx-auto leading-relaxed">
                Sizi diğer adaylardan ayıracak, İK dostu ve profesyonel özgeçmişinizi dakikalar içinde oluşturun. Yapay zeka ile kendinizi en iyi şekilde ifade edin.
              </p>

              <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/olustur">
                  <Button size="lg" className="h-14 px-8 text-lg w-full sm:w-auto shadow-xl shadow-primary-500/20 hover:shadow-primary-500/40 transition-all">
                    Hemen Ücretsiz Oluştur
                    <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Button>
                </Link>
                <Link href="/sablonlar">
                  <Button variant="outline" size="lg" className="h-14 px-8 text-lg w-full sm:w-auto">
                    Şablonları İncele
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Neden Akıllı Özgeçmiş?</h2>
                <p className="mt-4 text-lg text-[var(--foreground-muted)]">
                  Modern iş dünyasının ihtiyaçlarına göre tasarlanmış özelliklerle kariyerinize bir adım önde başlayın.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Feature 1 */}
                <div className="p-6 rounded-2xl bg-[var(--surface-hover)] border border-[var(--border)] hover:border-primary-300 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Yapay Zeka Desteği</h3>
                  <p className="text-[var(--foreground-muted)]">AI entegrasyonu ile profesyonel özetler yazdırın ve iş deneyimlerinizi İK diline çevirin.</p>
                </div>

                {/* Feature 2 */}
                <div className="p-6 rounded-2xl bg-[var(--surface-hover)] border border-[var(--border)] hover:border-primary-300 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Canlı Önizleme</h3>
                  <p className="text-[var(--foreground-muted)]">Verilerinizi girerken eş zamanlı olarak CV'nizin nasıl göründüğünü anında takip edin.</p>
                </div>

                {/* Feature 3 */}
                <div className="p-6 rounded-2xl bg-[var(--surface-hover)] border border-[var(--border)] hover:border-primary-300 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Profesyonel Şablonlar</h3>
                  <p className="text-[var(--foreground-muted)]">Klasik, Modern ve Minimal tasarımlar arasından tarzınıza en uygun olanı tek tıkla seçin.</p>
                </div>

                {/* Feature 4 */}
                <div className="p-6 rounded-2xl bg-[var(--surface-hover)] border border-[var(--border)] hover:border-primary-300 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Tek Tıkla PDF</h3>
                  <p className="text-[var(--foreground-muted)]">Hazırladığınız CV'yi yüksek kaliteli ve baskıya (A4) tam uyumlu PDF formatında hemen bilgisayarınıza indirin.</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* How it Works Section */}
      <section className="py-24 bg-[var(--surface-hover)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Nasıl Çalışır?</h2>
            <p className="mt-4 text-lg text-[var(--foreground-muted)]">
              Üç basit adımda hayalinizdeki özgeçmişe kavuşun.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Step Connecting Line (Desktop only) */}
            <div className="hidden md:block absolute top-8 left-[16.66%] right-[16.66%] h-0.5 bg-gradient-to-r from-primary-200 via-primary-400 to-primary-200" />

            {/* Step 1 */}
            <div className="relative text-center">
              <div className="w-16 h-16 mx-auto bg-white border-4 border-primary-100 text-primary-600 rounded-full flex items-center justify-center text-2xl font-bold mb-6 relative z-10 shadow-sm">
                1
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Bilgilerini Gir</h3>
              <p className="text-[var(--foreground-muted)]">Kişisel bilgilerinizi, eğitim ve iş geçmişinizi forma kolayca doldurun.</p>
            </div>

            {/* Step 2 */}
            <div className="relative text-center">
              <div className="w-16 h-16 mx-auto bg-white border-4 border-primary-100 text-primary-600 rounded-full flex items-center justify-center text-2xl font-bold mb-6 relative z-10 shadow-sm">
                2
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">AI ile Geliştir</h3>
              <p className="text-[var(--foreground-muted)]">Yapay zeka asistanımızı kullanarak metinlerinizi profesyonel bir İK diline çevirin.</p>
            </div>

            {/* Step 3 */}
            <div className="relative text-center">
              <div className="w-16 h-16 mx-auto bg-white border-4 border-primary-100 text-primary-600 rounded-full flex items-center justify-center text-2xl font-bold mb-6 relative z-10 shadow-sm">
                3
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Şablon Seç ve İndir</h3>
              <p className="text-[var(--foreground-muted)]">3 modern tasarımdan birini seçin ve kusursuz PDF'inizi anında indirin.</p>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}
