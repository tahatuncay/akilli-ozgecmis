import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sık Sorulan Sorular | Akıllı Özgeçmiş",
  description: "Akıllı Özgeçmiş platformu hakkında en çok merak edilen sorular ve cevapları.",
};

export default function SssPage() {
  const faqs = [
    {
      question: "Akıllı Özgeçmiş tamamen ücretsiz mi?",
      answer: "Evet, Akıllı Özgeçmiş tamamen ücretsiz bir platformdur. Özgeçmiş oluşturma, farklı şablonları kullanma, yapay zeka ile ATS analizi ve PDF olarak indirme işlemlerinin tümü ücretsizdir."
    },
    {
      question: "CV bilgilerim nerede saklanıyor?",
      answer: "Gizliliğinize önem veriyoruz. Girdiğiniz tüm CV bilgileri sadece kendi cihazınızda (tarayıcınızın localStorage alanında) saklanır. Sunucularımıza hiçbir kişisel veri kaydedilmez. Daha fazla bilgi için Gizlilik Politikamızı inceleyebilirsiniz."
    },
    {
      question: "LinkedIn veya Kariyer.net profilimi nasıl içe aktarabilirim?",
      answer: "CV Oluşturma sayfasında üst kısımda bulunan 'LinkedIn'den Veri Aktar' veya 'Kariyer.net'ten Veri Aktar' butonlarına tıklayın. Ardından ilgili platformlardan indirdiğiniz profil PDF dosyanızı yükleyerek tüm bilgilerinizin otomatik olarak forma dolmasını sağlayabilirsiniz."
    },
    {
      question: "ATS (Başvuru Takip Sistemi) Analizi nedir?",
      answer: "ATS analizi, oluşturduğunuz CV'nin hedeflediğiniz pozisyon için işverenlerin kullandığı otomatik filtreleme sistemlerinden geçme olasılığını yapay zeka ile ölçen bir özelliktir. CV'nizdeki eksiklikleri tespit eder ve iyileştirme önerileri sunar."
    },
    {
      question: "CV'mi İngilizceye nasıl çevirebilirim?",
      answer: "Şablon seçimi bölümünde yer alan 'CV Dili' kısmından 'English'i seçebilir ve altındaki 'CV'yi İngilizceye Çevir (AI)' butonuna tıklayarak tüm içeriklerinizin yapay zeka tarafından profesyonel iş İngilizcesine çevrilmesini sağlayabilirsiniz."
    },
    {
      question: "Farklı bir cihaza geçtiğimde CV'me ulaşabilir miyim?",
      answer: "Verileriniz sunucuda değil, cihazınızın yerel depolamasında tutulduğu için farklı bir cihaza veya farklı bir tarayıcıya geçtiğinizde eski CV'nizi göremezsiniz. Önemli CV'lerinizi her zaman PDF olarak indirip yedeklemenizi öneririz."
    },
    {
      question: "Oluşturduğum CV'yi nasıl indirebilirim?",
      answer: "CV Oluşturma veya Şablonlar sayfasındayken, sağ üst köşede veya menüde bulunan 'PDF İndir' butonuna tıklayarak özgeçmişinizi cihazınıza indirebilirsiniz."
    }
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[var(--background)]">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[var(--foreground-muted)] mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">Ana Sayfa</Link>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
          <span className="text-foreground font-medium">Sık Sorulan Sorular</span>
        </nav>

        {/* Başlık */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-4">Sık Sorulan Sorular</h1>
          <p className="text-[var(--foreground-muted)] text-lg">Platformumuz hakkında en çok merak edilen soruları sizin için derledik.</p>
        </div>

        {/* SSS Listesi */}
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
              <h3 className="text-lg font-bold text-foreground mb-3">{faq.question}</h3>
              <p className="text-[var(--foreground-secondary)] leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>

        {/* İletişim Yönlendirme */}
        <div className="mt-16 bg-primary-50 border border-primary-100 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-primary-900 mb-4">Aradığınız cevabı bulamadınız mı?</h2>
          <p className="text-primary-700 mb-6">Sorularınız, görüşleriniz veya geri bildirimleriniz için bize her zaman ulaşabilirsiniz.</p>
          <Link 
            href="/destek" 
            className="inline-flex items-center justify-center rounded-xl bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-colors"
          >
            Destek Ekibine Ulaşın
          </Link>
        </div>

      </div>
    </div>
  );
}
