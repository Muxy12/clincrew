import { useLocale, useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/Reveal";
import { profile } from "@/config/profile";
import type { Locale } from "@/i18n/routing";

/**
 * Therapeutic areas the CRA has worked in. Data comes from the profile config
 * (single source, shared with the Sectors fact row, the About page and the
 * schema.org knowsAbout list). Areas with a `detail` (e.g. oncology tumour
 * types) render those as small tags.
 */
export function TherapeuticAreas() {
  const t = useTranslations("areas");
  const locale = useLocale() as Locale;

  if (!profile.therapeuticAreas.length) return null;

  return (
    <section
      id="therapeutic-areas"
      className="wrap scroll-mt-24 py-24 md:py-32"
    >
      <Reveal className="max-w-[720px]">
        <p className="eyebrow">{t("eyebrow")}</p>
        <h2 className="mt-5 font-heading text-[clamp(32px,4.6vw,60px)] leading-[1.12] tracking-tightest">
          {t("title")}
        </h2>
        <p className="mt-6 text-[15px] leading-[1.8] text-muted">
          {t("intro")}
        </p>
      </Reveal>

      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {profile.therapeuticAreas.map((area, i) => (
          <Reveal
            as="li"
            key={area.en}
            delay={(i % 3) * 0.06}
            className="rounded-sm border border-line bg-gradient-to-br from-panel to-[#0a1d26] p-7"
          >
            <span className="font-mono text-[13px] leading-none text-mint">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-4 font-heading text-[19px] tracking-tighter2 text-cream">
              {area[locale]}
            </h3>
            {area.detail && (
              <ul className="mt-4 flex flex-wrap gap-2">
                {area.detail[locale].split(", ").map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-line px-3 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-muted"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            )}
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
