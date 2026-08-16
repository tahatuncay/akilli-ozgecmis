import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://akilliozgecmis.com'),
  title: {
    default: "Akıllı Özgeçmiş | Ücretsiz ve Yapay Zeka Destekli CV Oluşturucu",
    template: "%s | Akıllı Özgeçmiş"
  },
  description: "İnternet üzerinden profesyonel, ücretsiz ve yapay zeka (AI) destekli özgeçmiş (CV) oluşturun. Hazır şablonlarla dakikalar içinde iş başvurularınız için mükemmel CV'nizi hazırlayın.",
  keywords: [
    "cv hazırlama", "online cv", "özgeçmiş oluşturma", "ücretsiz cv yap", 
    "cv şablonları", "yapay zeka cv", "internetten cv hazırlama", 
    "profesyonel özgeçmiş", "resume builder", "AI cv oluşturucu",
    "cv yapma programı", "hazır cv", "ats uyumlu cv", "internetten cv yapmak",
    "cv oluştur ücretsiz", "hızlı cv oluştur", "cv örnekleri"
  ],
  authors: [{ name: "Akıllı Özgeçmiş Ekibi" }],
  creator: "Akıllı Özgeçmiş",
  publisher: "Akıllı Özgeçmiş",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Akıllı Özgeçmiş | Yapay Zeka Destekli Ücretsiz CV Oluşturucu",
    description: "İnternet üzerinden profesyonel ve etkileyici bir özgeçmiş (CV) hazırlamak artık çok kolay. Yapay zeka ile dakikalar içinde CV'nizi ücretsiz oluşturun ve PDF olarak indirin.",
    url: '/',
    siteName: 'Akıllı Özgeçmiş',
    locale: 'tr_TR',
    type: 'website',
    images: [
      {
        url: '/anasayfa.png',
        width: 1200,
        height: 630,
        alt: 'Akıllı Özgeçmiş - Ücretsiz ve Yapay Zeka Destekli CV Oluşturucu',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Akıllı Özgeçmiş | Ücretsiz CV Hazırlama",
    description: "Yapay zeka (AI) destekli, profesyonel özgeçmiş (CV) oluşturma platformu. Dakikalar içinde online, ücretsiz ve etkileyici bir CV hazırlayın.",
    images: ['/anasayfa.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/akilli-ozgecmis-logo.png",
    apple: "/akilli-ozgecmis-logo.png",
  },
  alternates: {
    canonical: '/',
  },
};

import { Providers } from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
