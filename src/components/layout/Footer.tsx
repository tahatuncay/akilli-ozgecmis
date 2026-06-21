import Link from "next/link";
import Image from "next/image";
import { APP_NAME } from "@/lib/constants";

/**
 * Footer navigasyon link grupları
 */
const footerLinks = {
  product: {
    title: "Ürün",
    links: [
      { href: "/olustur", label: "CV Oluştur" },
      { href: "/sablonlar", label: "Şablonlar" },
      { href: "#", label: "Özellikler" },
      { href: "#", label: "Fiyatlandırma" },
    ],
  },
  resources: {
    title: "Kaynaklar",
    links: [
      { href: "#", label: "CV Yazım Rehberi" },
      { href: "#", label: "Kariyer Blogu" },
      { href: "#", label: "Sık Sorulan Sorular" },
      { href: "#", label: "Destek" },
    ],
  },
  legal: {
    title: "Yasal",
    links: [
      { href: "#", label: "Gizlilik Politikası" },
      { href: "#", label: "Kullanım Şartları" },
      { href: "#", label: "Çerez Politikası" },
    ],
  },
};

/**
 * Footer layout bileşeni.
 * Link grupları, sosyal medya ikonları ve copyright bilgisi içerir.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="main-footer"
      className="border-t border-[var(--border)] bg-[var(--background-secondary)]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Üst kısım — Logo + Linkler */}
        <div className="grid grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Marka alanı */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="relative h-9 w-9 flex items-center justify-center shrink-0">
                <Image
                  src="/akilli-ozgecmis-logo.png"
                  alt="Akıllı Özgeçmiş Logo"
                  width={36}
                  height={36}
                  className="object-contain"
                />
              </div>
              <span className="text-lg font-bold tracking-tight text-foreground">
                {APP_NAME}
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--foreground-secondary)]">
              Yapay zeka destekli özgeçmiş oluşturucu ile profesyonel CV'nizi
              dakikalar içinde hazırlayın. Modern şablonlar ve akıllı önerilerle
              kariyerinizde fark yaratın.
            </p>
            {/* Sosyal Medya */}
            <div className="mt-6 flex items-center gap-3">
              {[
                {
                  label: "Twitter",
                  icon: (
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  ),
                },
                {
                  label: "LinkedIn",
                  icon: (
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  ),
                },
                {
                  label: "GitHub",
                  icon: (
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  ),
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  className="h-9 w-9 rounded-lg bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center text-[var(--foreground-muted)] hover:text-foreground hover:border-[var(--border-hover)] hover:shadow-sm transition-all duration-200"
                  aria-label={social.label}
                >
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    {social.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link grupları */}
          {Object.values(footerLinks).map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold text-foreground mb-4">
                {group.title}
              </h3>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--foreground-secondary)] hover:text-foreground transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Alt kısım — Ayırıcı çizgi + Copyright */}
        <div className="border-t border-[var(--border)] py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--foreground-muted)]">
            &copy; {currentYear} {APP_NAME}. Tüm hakları saklıdır.
          </p>
          <p className="text-xs text-[var(--foreground-muted)] flex items-center gap-1">
            Taha Tuncay tarafından geliştirildi.
            <svg
              className="h-3.5 w-3.5 text-primary-500"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
            </svg>
          </p>
        </div>
      </div>
    </footer>
  );
}
