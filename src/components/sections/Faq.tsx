import { useLocale, useTranslations } from "next-intl";
import { Plus, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/Reveal";

// Pillar -> cluster links: some answers point to the matching long-form guide.
const GUIDE_BY_ITEM: Record<string, string> = {
  what: "qu-est-ce-qu-un-arc-cra",
  cost: "tjm-arc-freelance",
  when: "recruter-arc-freelance",
  hire: "recruter-arc-freelance",
};

// The FR homepage runs a longer, SEO-oriented FAQ; EN keeps the core three.
const FR_ITEMS = [
  "what",
  "why",
  "cost",
  "arcVsCra",
  "multiStudies",
  "regions",
  "remote",
  "obligations",
  "when",
] as const;
const EN_ITEMS = [
  "what",
  "why",
  "cost",
  "hire",
  "intlCro",
  "remote",
  "trialTypes",
  "craVsConsultant",
  "startTime",
] as const;

export function Faq() {
  const t = useTranslations("faq");
  const locale = useLocale();
  const ITEMS = locale === "fr" ? FR_ITEMS : EN_ITEMS;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: ITEMS.map((item) => ({
      "@type": "Question",
      name: t(`items.${item}.q`),
      acceptedAnswer: { "@type": "Answer", text: t(`items.${item}.a`) },
    })),
  };

  return (
    <section id="faq" className="wrap scroll-mt-24 py-24 md:py-32">
      <Reveal className="max-w-[720px]">
        <p className="eyebrow">{t("eyebrow")}</p>
        <h2 className="mt-5 font-heading text-[clamp(32px,4.6vw,60px)] leading-[1.12] tracking-tightest">
          {t("title")}
        </h2>
        <p className="mt-6 text-[15px] leading-[1.8] text-muted">
          {t("intro")}
        </p>
      </Reveal>

      <div className="mx-auto mt-12 max-w-[820px]">
        {ITEMS.map((item, i) => (
          <Reveal key={item} delay={i * 0.06}>
            <details className="group border-t border-line last:border-b">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
                <span className="font-heading text-[19px] leading-snug tracking-tighter2 text-cream transition-colors group-hover:text-mint md:text-[21px]">
                  {t(`items.${item}.q`)}
                </span>
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line text-mint transition-transform duration-300 group-open:rotate-45">
                  <Plus size={16} aria-hidden="true" />
                </span>
              </summary>
              <div className="max-w-[680px] pb-7">
                <p className="text-[15px] leading-[1.85] text-muted">
                  {t(`items.${item}.a`)}
                </p>
                {GUIDE_BY_ITEM[item] && (
                  <Link
                    href={`/blog/${GUIDE_BY_ITEM[item]}`}
                    className="mt-3 inline-flex items-center gap-1.5 text-[14px] font-semibold text-mint transition-colors hover:text-cream"
                  >
                    {t("readMore")}
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                )}
              </div>
            </details>
          </Reveal>
        ))}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
