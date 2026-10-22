import { useLocale, useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { getJourneyValues } from "@/lib/journey";
import type { Locale } from "@/i18n/routing";

export function About() {
  const t = useTranslations("about");
  const locale = useLocale() as Locale;
  const journey = getJourneyValues(locale);

  return (
    <section
      id="about"
      className="scroll-mt-24 bg-light-bg py-24 text-light-ink md:py-32"
    >
      <div className="wrap grid items-center gap-12 md:grid-cols-2 md:gap-24">
        <Reveal>
          <div
            className="abstract relative h-[350px] md:h-[520px]"
            role="img"
            aria-label={t("journeyTitle")}
          >
            <span className="absolute bottom-6 left-7 z-[2] font-heading text-[85px] font-extrabold leading-none tracking-[-0.12em] text-[#e6fff3] md:text-[120px]">
              MD.
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="eyebrow eyebrow--light">{t("eyebrow")}</p>
          <h2 className="mt-5 font-heading text-[clamp(30px,4.2vw,52px)] leading-[1.14] tracking-tightest">
            {t("journeyTitle")}
          </h2>

          <p className="mt-7 text-[16px] leading-[1.9] text-light-muted">
            {t("journeyP1", journey)}
          </p>
          <p className="mt-4 text-[16px] leading-[1.9] text-light-muted">
            {t("journeyP2")}
          </p>

          <Link
            href="/about"
            className="mt-9 inline-flex items-center gap-2 border-b border-[#277665] pb-1 text-[14px] font-semibold text-[#277665] transition-colors hover:text-light-ink"
          >
            {t("journeyCta")}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
