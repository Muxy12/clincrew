import { useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Educational "what is a CRA" block: definition, sponsor vs site CRA, and CRA
 * vs clinical project manager. FR homepage only (long-form SEO); the EN page
 * keeps the shorter structure.
 */
const BLOCKS = ["definition", "sponsorVsSite", "arcVsCpc"] as const;

export function Metier() {
  const t = useTranslations("metier");

  return (
    <section id="metier" className="wrap scroll-mt-24 py-24 md:py-32">
      <Reveal className="max-w-[720px]">
        <p className="eyebrow">{t("eyebrow")}</p>
        <h2 className="mt-5 font-heading text-[clamp(32px,4.6vw,60px)] leading-[1.12] tracking-tightest">
          {t("title")}
        </h2>
        <p className="mt-6 text-[15px] leading-[1.8] text-muted">{t("intro")}</p>
      </Reveal>

      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {BLOCKS.map((b, i) => (
          <Reveal key={b} delay={(i % 3) * 0.06}>
            <div className="border-t-2 border-mint/30 pt-6">
              <h3 className="font-heading text-[19px] leading-snug tracking-tighter2 text-cream">
                {t(`blocks.${b}.title`)}
              </h3>
              <p className="mt-3 text-[14px] leading-[1.75] text-muted">
                {t(`blocks.${b}.body`)}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
