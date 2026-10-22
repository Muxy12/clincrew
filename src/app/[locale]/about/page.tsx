import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { ArrowUpRight, Linkedin, Award } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { Reveal } from "@/components/motion/Reveal";
import { profile } from "@/config/profile";
import { getJourneyValues } from "@/lib/journey";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.about" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}/about`,
      languages: { fr: "/fr/about", en: "/en/about", "x-default": "/fr/about" },
    },
    openGraph: {
      type: "profile",
      title: t("title"),
      description: t("description"),
      url: `/${locale}/about`,
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  return <AboutContent locale={locale as Locale} />;
}

function AboutContent({ locale }: { locale: Locale }) {
  const t = useTranslations("about");
  const journey = getJourneyValues(locale);

  const details: Array<{ label: string; values: string[] }> = [];
  const pick = (arr: ReadonlyArray<{ fr: string; en: string }>) =>
    arr.map((x) => x[locale]);
  if (profile.therapeuticAreas.length)
    details.push({
      label: t("details.therapeuticAreas"),
      values: pick(profile.therapeuticAreas),
    });
  if (profile.geographicCoverage.length)
    details.push({
      label: t("details.geographicCoverage"),
      values: pick(profile.geographicCoverage),
    });
  if (profile.languages.length)
    details.push({ label: t("details.languages"), values: pick(profile.languages) });
  if (profile.certifications.length)
    details.push({
      label: t("details.certifications"),
      values: pick(profile.certifications),
    });

  return (
    <section className="wrap max-w-[860px] scroll-mt-24 pb-24 pt-36 md:pb-32 md:pt-44">
      <Reveal>
        <p className="eyebrow">{t("eyebrow")}</p>
        <h1 className="mt-5 max-w-[760px] font-heading text-[clamp(32px,5vw,60px)] leading-[1.12] tracking-tightest">
          {t("journeyTitle")}
        </h1>
      </Reveal>

      {profile.award && (
        <Reveal>
          <a
            href={profile.award.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 flex items-start gap-4 rounded-lg border border-mint/30 bg-mint/[0.05] p-5 transition-colors hover:border-mint/60"
          >
            <Award size={22} className="mt-0.5 shrink-0 text-mint" aria-hidden="true" />
            <div>
              <p className="font-heading text-[17px] tracking-tighter2 text-cream">
                {profile.award.label[locale]}
              </p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                {profile.award.detail[locale]}
              </p>
            </div>
            <ArrowUpRight
              size={16}
              className="ml-auto shrink-0 text-mint"
              aria-hidden="true"
            />
          </a>
        </Reveal>
      )}

      <div className="mt-10 grid gap-12 md:grid-cols-[1fr_300px] md:gap-16">
        <Reveal>
          <p className="text-[17px] leading-[1.9] text-cream">
            {t("journeyP1", journey)}
          </p>
          <p className="mt-5 text-[16px] leading-[1.9] text-muted">
            {t("journeyP2")}
          </p>

          {profile.linkedin.configured && (
            <a
              href={profile.linkedin.value}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 border-b border-mint pb-1 text-[14px] font-semibold text-mint transition-colors hover:text-cream"
            >
              <Linkedin size={16} aria-hidden="true" />
              {t("linkedinCta")}
            </a>
          )}
        </Reveal>

        {/* Portrait: real image when provided, elegant placeholder otherwise. */}
        <Reveal delay={0.08}>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[300px] overflow-hidden rounded-sm border border-line bg-gradient-to-br from-panel to-[#0a1d26]">
            {profile.portrait ? (
              <Image
                src={profile.portrait}
                alt={t("portraitAlt")}
                fill
                sizes="(max-width: 768px) 80vw, 300px"
                className="object-cover"
              />
            ) : (
              <>
                <div className="abstract absolute inset-0" aria-hidden="true" />
                <span className="absolute bottom-5 left-6 z-[2] font-heading text-[72px] font-extrabold leading-none tracking-[-0.12em] text-[#e6fff3]">
                  MD.
                </span>
                <span className="absolute left-6 top-5 z-[2] font-mono text-[10px] uppercase tracking-[0.2em] text-[#0a2428]/70">
                  {t("portraitPlaceholder")}
                </span>
              </>
            )}
          </div>
        </Reveal>
      </div>

      {/* Verified details — rendered only when filled in */}
      {details.length > 0 && (
        <Reveal>
          <dl className="mt-14 grid gap-x-10 gap-y-7 border-t border-line pt-10 sm:grid-cols-2">
            {details.map((d) => (
              <div key={d.label}>
                <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-mint">
                  {d.label}
                </dt>
                <dd className="mt-2 text-[15px] leading-relaxed text-cream">
                  {d.values.join(" · ")}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      )}

      {/* Experience timeline — rendered only when filled in */}
      {profile.experience.length > 0 && (
        <Reveal>
          <div className="mt-14 border-t border-line pt-10">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-mint">
              {t("details.experience")}
            </h2>
            <ol className="mt-8 space-y-8">
              {profile.experience.map((xp, i) => (
                <li
                  key={i}
                  className="grid gap-2 border-l border-line pl-6 sm:grid-cols-[140px_1fr] sm:gap-6"
                >
                  <span className="font-mono text-[12px] tracking-[0.1em] text-muted">
                    {xp.period}
                  </span>
                  <div>
                    <h3 className="font-heading text-[18px] tracking-tighter2">
                      {xp.role[locale]}
                    </h3>
                    <p className="mt-1 text-[14px] leading-relaxed text-muted">
                      {xp.detail[locale]}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      )}

      {/* Closing CTA */}
      <Reveal>
        <aside className="mt-16 rounded-lg border border-line bg-gradient-to-br from-panel to-[#0a1d26] p-8 text-center">
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-full bg-mint px-7 py-4 text-[14px] font-extrabold text-bg transition-transform hover:-translate-y-0.5"
          >
            {t("contactCta")}
            <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </aside>
      </Reveal>
    </section>
  );
}
