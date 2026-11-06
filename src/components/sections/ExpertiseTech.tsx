import { useTranslations } from "next-intl";
import { FlaskConical, ShieldCheck, Wrench, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Technical & regulatory expertise — trial phases, industry tools and the
 * French/EU regulatory framework. Rendered on the FR homepage only (long-form
 * SEO content); the EN page keeps the shorter structure.
 */
const BLOCKS: ReadonlyArray<{ key: string; Icon: LucideIcon }> = [
  { key: "phases", Icon: FlaskConical },
  { key: "tools", Icon: Wrench },
  { key: "regulatory", Icon: ShieldCheck },
];

export function ExpertiseTech() {
  const t = useTranslations("expertiseTech");

  return (
    <section id="expertise-tech" className="wrap scroll-mt-24 py-24 md:py-32">
      <Reveal className="max-w-[720px]">
        <p className="eyebrow">{t("eyebrow")}</p>
        <h2 className="mt-5 font-heading text-[clamp(32px,4.6vw,60px)] leading-[1.12] tracking-tightest">
          {t("title")}
        </h2>
        <p className="mt-6 text-[15px] leading-[1.8] text-muted">{t("intro")}</p>
      </Reveal>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {BLOCKS.map(({ key, Icon }, i) => (
          <Reveal as="div" key={key} delay={(i % 3) * 0.06} className="h-full">
            <div className="group flex h-full flex-col rounded-sm border border-line bg-gradient-to-br from-panel to-[#0a1d26] p-7 transition-colors duration-300 hover:border-mint/40">
              <Icon
                size={22}
                strokeWidth={1.5}
                aria-hidden="true"
                className="text-mint"
              />
              <h3 className="mt-5 font-heading text-[19px] tracking-tighter2 text-cream">
                {t(`blocks.${key}.title`)}
              </h3>
              <p className="mt-3 text-[14px] leading-[1.7] text-muted">
                {t(`blocks.${key}.body`)}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {t(`blocks.${key}.tags`)
                  .split(", ")
                  .map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-muted"
                    >
                      {tag}
                    </li>
                  ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
