import { useLocale, useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/Reveal";
import { profile } from "@/config/profile";
import type { Locale } from "@/i18n/routing";

const ACTORS = ["cro", "pharma", "biotech", "sponsors"] as const;

export function Sectors() {
  const t = useTranslations("sectors");
  const locale = useLocale() as Locale;

  // Therapeutic areas & coverage come from profile config (single source,
  // shared with the About page). While empty, a clearly-bracketed placeholder
  // is shown so nothing is fabricated.
  const areas = profile.therapeuticAreas.length
    ? profile.therapeuticAreas.map((x) => x[locale]).join(", ")
    : t("areasPlaceholder");
  const zones = profile.geographicCoverage.length
    ? profile.geographicCoverage.map((x) => x[locale]).join(" · ")
    : t("zonesPlaceholder");

  return (
    <section id="sectors" className="wrap scroll-mt-24 py-24 md:py-32">
      <Reveal className="max-w-[720px]">
        <p className="eyebrow">{t("eyebrow")}</p>
        <h2 className="mt-5 font-heading text-[clamp(32px,4.6vw,60px)] leading-[1.12] tracking-tightest">
          {t("title")}
        </h2>
        <p className="mt-6 text-[15px] leading-[1.8] text-muted">
          {t("intro")}
        </p>
      </Reveal>

      <ul className="mt-12 grid gap-4 sm:grid-cols-2">
        {ACTORS.map((actor, i) => (
          <Reveal
            as="li"
            key={actor}
            delay={(i % 2) * 0.08}
            className="flex gap-5 rounded-sm border border-line bg-gradient-to-br from-panel to-[#0a1d26] p-7"
          >
            <span className="font-mono text-[13px] leading-none text-mint">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="text-[15px] leading-[1.7] text-muted">
              <span className="font-heading text-[17px] tracking-tighter2 text-cream">
                {t(`actors.${actor}.title`)}
              </span>{" "}
              {t(`actors.${actor}.description`)}
            </p>
          </Reveal>
        ))}
      </ul>

      <Reveal>
        <dl className="mt-10 grid gap-x-10 gap-y-6 border-t border-line pt-8 sm:grid-cols-2">
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-mint">
              {t("areasLabel")}
            </dt>
            <dd className="mt-2 text-[15px] leading-relaxed text-cream">
              {areas}
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-mint">
              {t("zonesLabel")}
            </dt>
            <dd className="mt-2 text-[15px] leading-relaxed text-cream">
              {zones}
            </dd>
          </div>
        </dl>
      </Reveal>
    </section>
  );
}
