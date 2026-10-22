import { useTranslations } from "next-intl";
import { Plus } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

const ITEMS = ["what", "why", "cost"] as const;

export function Faq() {
  const t = useTranslations("faq");

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
              <p className="max-w-[680px] pb-7 text-[15px] leading-[1.85] text-muted">
                {t(`items.${item}.a`)}
              </p>
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
