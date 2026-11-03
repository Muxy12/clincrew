import { useLocale, useTranslations } from "next-intl";
import {
  Activity,
  Dna,
  Droplet,
  Filter,
  HeartPulse,
  Ribbon,
  Syringe,
  Wind,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { profile } from "@/config/profile";
import type { Locale } from "@/i18n/routing";

/**
 * Therapeutic areas the CRA has worked in. Data comes from the profile config
 * (single source, shared with the Sectors fact row, the About page and the
 * schema.org knowsAbout list). Areas with a `detail` (e.g. oncology tumour
 * types) render those as small tags.
 *
 * Each card carries a large, faint area icon as a watermark so cards without a
 * `detail` still read as complete and each area keeps its own identity.
 */

// Keyed by the English label (stable across locales). Falls back to Activity.
const AREA_ICONS: Record<string, LucideIcon> = {
  Oncology: Ribbon,
  "Hemato-oncology": Droplet,
  Nephrology: Filter,
  Pulmonology: Wind,
  Vaccines: Syringe,
  Cardiology: HeartPulse,
  "Rare diseases": Dna,
};

export function TherapeuticAreas() {
  const t = useTranslations("areas");
  const locale = useLocale() as Locale;

  if (!profile.therapeuticAreas.length) return null;

  return (
    <section id="therapeutic-areas" className="wrap scroll-mt-24 py-24 md:py-32">
      <Reveal className="max-w-[720px]">
        <p className="eyebrow">{t("eyebrow")}</p>
        <h2 className="mt-5 font-heading text-[clamp(32px,4.6vw,60px)] leading-[1.12] tracking-tightest">
          {t("title")}
        </h2>
        <p className="mt-6 text-[15px] leading-[1.8] text-muted">{t("intro")}</p>
      </Reveal>

      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {profile.therapeuticAreas.map((area, i) => {
          const Icon = AREA_ICONS[area.en] ?? Activity;
          const num = String(i + 1).padStart(2, "0");
          return (
            <Reveal
              as="li"
              key={area.en}
              delay={(i % 3) * 0.06}
              className="h-full"
            >
              <div className="group relative flex h-full min-h-[172px] flex-col overflow-hidden rounded-sm border border-line bg-gradient-to-br from-panel to-[#0a1d26] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-mint/40 hover:shadow-[0_16px_44px_rgba(0,0,0,0.3)]">
                {/* Watermark icon — fills the card and gives the area identity. */}
                <Icon
                  aria-hidden="true"
                  strokeWidth={1.25}
                  className="pointer-events-none absolute -bottom-3 -right-3 h-24 w-24 text-mint/[0.06] transition-all duration-500 group-hover:scale-105 group-hover:text-mint/[0.11]"
                />

                <span className="font-mono text-[13px] leading-none text-mint">
                  {num}
                </span>
                <h3 className="relative mt-5 font-heading text-[19px] tracking-tighter2 text-cream">
                  {area[locale]}
                </h3>

                {area.detail && (
                  <ul className="relative mt-4 flex flex-wrap gap-2">
                    {area.detail[locale].split(", ").map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-line bg-bg/40 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-muted transition-colors duration-300 group-hover:border-mint/30"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
