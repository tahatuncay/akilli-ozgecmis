"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { APP_NAME } from "@/lib/constants";

/**
 * Header navigasyon linkleri
 */
const navLinks = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/olustur", label: "CV Oluştur" },
  { href: "/sablonlar", label: "Şablonlar" },
  { href: "/ats-analizi", label: "ATS Analizi" },
];

/**
 * Header layout bileşeni.
 * Sticky header, scroll'da glass efekti, mobil hamburger menü.
 */
export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mobil menü açıkken body scroll'u engelle
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      id="main-header"
      className={cn(
        "sticky top-0 z-50 w-full",
        "transition-all duration-300 ease-out",
        isScrolled
          ? "bg-[var(--glass-bg)] backdrop-blur-xl border-b border-[var(--glass-border)] shadow-sm"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 shrink-0"
            aria-label={APP_NAME}
          >
            {/* Logo ikonu */}
            <div className="relative h-9 w-9 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
              <Image 
                src="/akilli-ozgecmis-logo.png" 
                alt="Akıllı Özgeçmiş Logo" 
                width={36} 
                height={36} 
                className="object-contain"
                priority
              />
            </div>
            <span className="text-lg font-bold tracking-tight text-foreground">
              <span className="gradient-text">Akıllı</span>{" "}
              <span className="text-foreground">Özgeçmiş</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center gap-1"
            aria-label="Ana navigasyon"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-lg",
                  "text-[var(--foreground-secondary)]",
                  "hover:text-foreground hover:bg-neutral-100",
                  "dark:hover:bg-neutral-800",
                  "transition-all duration-200",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/olustur">
              <Button variant="primary" size="md">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z"
                  />
                </svg>
                CV Oluştur
              </Button>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            className={cn(
              "md:hidden inline-flex items-center justify-center",
              "h-10 w-10 rounded-xl",
              "text-[var(--foreground-secondary)]",
              "hover:bg-neutral-100 dark:hover:bg-neutral-800",
              "transition-colors duration-200",
              "cursor-pointer",
            )}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={isMobileMenuOpen}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              aria-hidden="true"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden overflow-hidden",
          "transition-all duration-300 ease-out",
          isMobileMenuOpen
            ? "max-h-80 opacity-100"
            : "max-h-0 opacity-0",
        )}
      >
        <nav
          className="px-4 pb-4 pt-2 space-y-1 border-t border-[var(--border)]"
          aria-label="Mobil navigasyon"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "block px-4 py-3 text-sm font-medium rounded-xl",
                "text-[var(--foreground-secondary)]",
                "hover:text-foreground hover:bg-neutral-100",
                "dark:hover:bg-neutral-800",
                "transition-all duration-200",
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2">
            <Link href="/olustur" onClick={() => setIsMobileMenuOpen(false)}>
              <Button variant="primary" size="md" className="w-full">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z"
                  />
                </svg>
                CV Oluştur
              </Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
