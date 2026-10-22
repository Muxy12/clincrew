import { useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/Reveal";

const STEPS = ["s1", "s2", "s3", "s4"] as const;

export function Approach() {
  const t = useTranslations("approach");

  return (
    <section id="approach" className="wrap scroll-mt-24 py-24 md:py-32">
      <Reveal>
        <p className="eyebrow">{t("eyebrow")}</p>
        <h2 className="mt-5 max-w-[820px] font-heading text-[clamp(34px,5vw,64px)] leading-[1.12] tracking-tightest">
          {t("title")}
        </h2>
        <p className="mt-6 max-w-[520px] text-[15px] leading-[1.8] text-muted">
          {t("intro")}
        </p>
      </Reveal>

      <ol className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, i) => (
          <Reveal as="li" key={step} delay={i * 0.1} className="group">
            <div className="h-px w-full bg-gradient-to-r from-mint/60 to-line transition-all duration-500 group-hover:from-mint" />
            <div className="pt-6">
              <span className="font-mono text-[12px] tracking-[0.14em] text-mint">
                {t(`steps.${step}.num`)} /{" "}
                <span className="text-muted">
                  {t(`steps.${step}.label`).toUpperCase()}
                </span>
              </span>
              <h3 className="mt-6 font-heading text-[23px] leading-tight tracking-tighter2">
                {t(`steps.${step}.title`)}
              </h3>
              <p className="mt-4 text-[14px] leading-[1.8] text-muted">
                {t(`steps.${step}.description`)}
              </p>
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
