import { useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/Reveal";

const ITEMS = [
  "flexibility",
  "responsiveness",
  "expertise",
  "personalized",
] as const;

export function ValueProp() {
  const t = useTranslations("value");

  return (
    <section
      id="value"
      className="scroll-mt-24 border-y border-line bg-panel py-24 md:py-32"
    >
      <div className="wrap grid gap-14 md:grid-cols-[0.85fr_1.15fr] md:gap-16">
        <Reveal>
          <p className="eyebrow">{t("eyebrow")}</p>
          <h2 className="mt-5 font-heading text-[clamp(32px,4.5vw,56px)] leading-[1.1] tracking-tightest">
            {t("title")}
          </h2>
          <p className="mt-6 max-w-[380px] text-[15px] leading-[1.8] text-muted">
            {t("intro")}
          </p>
          <p className="mt-8 max-w-[400px] border-l-2 border-mint pl-5 text-[15px] leading-[1.75] text-cream">
            {t("closing")}
          </p>
        </Reveal>

        <ul>
          {ITEMS.map((item, i) => (
            <Reveal as="li" key={item} delay={i * 0.06}>
              <div className="group grid grid-cols-[auto_1fr] gap-6 border-b border-line py-7 first:border-t">
                <span className="font-mono text-[13px] text-mint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-heading text-[21px] tracking-tighter2 transition-colors group-hover:text-mint">
                    {t(`items.${item}.title`)}
                  </h3>
                  <p className="mt-2 max-w-[520px] text-[14px] leading-[1.75] text-muted">
                    {t(`items.${item}.description`)}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
