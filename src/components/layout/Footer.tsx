import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowUp, ArrowUpRight, Mail, Phone, Linkedin } from "lucide-react";
import Image from "next/image";
import { profile } from "@/config/profile";
import { siteConfig } from "@/config/site";

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
  const biz = siteConfig.business;

  return (
    <footer className="border-t border-line bg-bg">
      {/* Closing call to action — the last conversion point on the page. */}
      <div className="border-b border-line">
        <div className="wrap flex flex-col gap-7 py-14 md:flex-row md:items-end md:justify-between md:py-16">
          <div className="max-w-xl">
            <h2 className="font-heading text-[clamp(26px,3.6vw,42px)] leading-[1.1] tracking-tightest text-cream">
              {t("ctaTitle")}
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">
              {t("ctaSubtitle")}
            </p>
          </div>
          <Link
            href="/#contact"
            className="group inline-flex shrink-0 items-center gap-2.5 self-start rounded-full bg-mint px-7 py-4 text-[14px] font-extrabold text-bg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(182,244,215,0.22)] md:self-auto"
          >
            {nav("cta")}
            <ArrowUpRight
              size={16}
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>

      <div className="wrap grid gap-12 py-16 md:grid-cols-[1.2fr_1.4fr_1fr] md:py-20">
        <div>
          <div className="flex items-center">
            <Image
              src="/images/clincrew-logo.png"
              alt={profile.brand}
              width={720}
              height={176}
              className="h-9 w-auto"
            />
          </div>
          <p className="mt-5 max-w-xs text-[14px] leading-relaxed text-muted">
            {t("role")}
          </p>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-[#6f8788]">
            {t("tagline")}
          </p>
          <address className="mt-6 text-[13px] not-italic leading-relaxed text-[#6f8788]">
            <span className="block font-semibold text-muted">
              {biz.name} · {biz.legalForm}
            </span>
            <span className="block">{biz.address.streetAddress}</span>
            <span className="block">
              {biz.address.postalCode} {biz.address.addressLocality}, France
            </span>
          </address>
        </div>

        <nav aria-label="Footer">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-mint">
            {t("navTitle")}
          </h2>
          <div className="mt-5 grid grid-cols-2 gap-x-8">
            {[NAV_ITEMS.slice(0, 5), NAV_ITEMS.slice(5)].map((col, ci) => (
              <ul key={ci} className="space-y-3 text-[14px] text-muted">
                {col.map((item) => (
                  <li key={item.key}>
                    <Link
                      href={item.href}
                      className="group inline-flex items-center gap-1.5 transition-colors hover:text-cream"
                    >
                      <ArrowUpRight
                        size={13}
                        aria-hidden="true"
                        className="-ml-[18px] text-mint opacity-0 transition-all duration-200 group-hover:ml-0 group-hover:opacity-100"
                      />
                      {nav(item.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
          </div>
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

          {(profile.phone.configured ||
            profile.email.configured ||
            profile.linkedin.configured) && (
            <>
              <h2 className="mt-8 font-mono text-[11px] uppercase tracking-[0.18em] text-mint">
                {t("contactTitle")}
              </h2>
              <ul className="mt-5 space-y-3 text-[14px] text-muted">
                {profile.phone.configured && (
                  <li>
                    <a
                      href={`tel:${profile.phone.value.replace(/\s+/g, "")}`}
                      className="inline-flex items-center gap-2 transition-colors hover:text-cream"
                    >
                      <Phone size={15} aria-hidden="true" />
                      {profile.phone.value}
                    </a>
                  </li>
                )}
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
            © {year} {profile.name} · {t("rights")}
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
