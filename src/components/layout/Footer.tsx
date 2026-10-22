import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowUp, Mail, Linkedin } from "lucide-react";
import { Monogram } from "@/components/ui/Monogram";
import { profile } from "@/config/profile";

const NAV_ITEMS = [
  { key: "expertise", href: "/#expertise" },
  { key: "prestations", href: "/services" },
  { key: "sectors", href: "/#sectors" },
  { key: "quiz", href: "/#quiz" },
  { key: "approach", href: "/#approach" },
  { key: "faq", href: "/#faq" },
  { key: "about", href: "/#about" },
  { key: "blog", href: "/blog" },
  { key: "contact", href: "/#contact" },
] as const;

export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-bg">
      <div className="wrap grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:py-20">
        <div>
          <div className="flex items-center gap-3">
            <Monogram size={40} />
            <div className="text-[13px] font-bold leading-tight tracking-[0.14em]">
              {profile.name.toUpperCase()}
            </div>
          </div>
          <p className="mt-5 max-w-xs text-[14px] leading-relaxed text-muted">
            {t("role")}
          </p>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-[#6f8788]">
            {t("tagline")}
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-mint">
            {t("navTitle")}
          </h2>
          <ul className="mt-5 space-y-3 text-[14px] text-muted">
            {NAV_ITEMS.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className="transition-colors hover:text-cream"
                >
                  {nav(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-mint">
            {t("legalTitle")}
          </h2>
          <ul className="mt-5 space-y-3 text-[14px] text-muted">
            <li>
              <Link
                href="/legal"
                className="transition-colors hover:text-cream"
              >
                {t("legalNotice")}
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="transition-colors hover:text-cream"
              >
                {t("privacy")}
              </Link>
            </li>
          </ul>

          {(profile.email.configured || profile.linkedin.configured) && (
            <>
              <h2 className="mt-8 font-mono text-[11px] uppercase tracking-[0.18em] text-mint">
                {t("contactTitle")}
              </h2>
              <ul className="mt-5 space-y-3 text-[14px] text-muted">
                {profile.email.configured && (
                  <li>
                    <a
                      href={`mailto:${profile.email.value}`}
                      className="inline-flex items-center gap-2 transition-colors hover:text-cream"
                    >
                      <Mail size={15} aria-hidden="true" />
                      {profile.email.value}
                    </a>
                  </li>
                )}
                {profile.linkedin.configured && (
                  <li>
                    <a
                      href={profile.linkedin.value}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 transition-colors hover:text-cream"
                    >
                      <Linkedin size={15} aria-hidden="true" />
                      LinkedIn
                    </a>
                  </li>
                )}
              </ul>
            </>
          )}
        </div>
      </div>

      <div className="border-t border-line">
        <div className="wrap flex flex-wrap items-center justify-between gap-4 py-6 text-[12px] text-[#8ea6a7]">
          <span>
            © {year} {profile.name} — {t("rights")}
          </span>
          <a
            href="#top"
            className="inline-flex items-center gap-2 transition-colors hover:text-mint"
          >
            {t("backToTop")}
            <ArrowUp size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
