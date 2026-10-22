"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Monogram } from "@/components/ui/Monogram";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { profile } from "@/config/profile";

const NAV_ITEMS = [
  { key: "expertise", href: "/#expertise" },
  { key: "prestations", href: "/services" },
  { key: "quiz", href: "/#quiz" },
  { key: "about", href: "/#about" },
  { key: "faq", href: "/#faq" },
  { key: "blog", href: "/blog" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll + close on Escape while the mobile drawer is open.
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <>
    <header
      className={
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300 " +
        (scrolled
          ? "bg-bg/85 backdrop-blur-md border-b border-line"
          : "bg-transparent border-b border-transparent")
      }
    >
      <div className="wrap flex h-[76px] items-center justify-between md:h-[86px]">
        <Link href="/" className="flex items-center gap-3">
          <Monogram className="grid place-items-center" size={38} />
          <span className="text-[12px] font-bold leading-tight tracking-[0.14em] md:text-[13px]">
            {profile.name.toUpperCase()}
            <span className="block text-[10px] font-normal tracking-[0.17em] text-[#8fa8a8]">
              CLINICAL RESEARCH
            </span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav
          className="hidden items-center gap-6 lg:flex"
          aria-label="Primary"
        >
          <ul className="flex items-center gap-6 text-[13px] text-[#bdcbcc]">
            {NAV_ITEMS.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className="transition-colors duration-200 hover:text-mint focus-visible:text-mint"
                >
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>
          <LanguageSwitcher />
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-full border border-[#9cd8bf] px-5 py-3 text-[12px] font-bold text-mint transition-colors duration-200 hover:bg-mint hover:text-bg"
          >
            {t("cta")}
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-4 lg:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label={t("menuOpen")}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="grid h-10 w-10 place-items-center rounded-full border border-line text-cream"
          >
            <Menu size={20} aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>

      {/* Mobile drawer — rendered outside the (backdrop-filtered) header so
          its `fixed` positioning is relative to the viewport, not the header. */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-[60] flex flex-col bg-bg lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <div className="wrap flex h-[76px] items-center justify-between">
            <Monogram size={38} />
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label={t("menuClose")}
              className="grid h-10 w-10 place-items-center rounded-full border border-line text-cream"
              autoFocus
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>
          <nav
            className="wrap flex flex-1 flex-col justify-center gap-2 pb-20"
            aria-label="Mobile"
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-line py-5 font-heading text-[28px] tracking-tightest text-cream transition-colors hover:text-mint"
              >
                {t(item.key)}
              </Link>
            ))}
            <Link
              href="/#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-mint px-6 py-4 text-[14px] font-bold text-bg"
            >
              {t("cta")}
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
