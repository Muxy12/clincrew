import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { Reveal } from "@/components/motion/Reveal";

const GROUPS = [
  { label: "groupVisits", items: ["selection", "initiation", "monitoring", "closeout"] },
  { label: "groupSupport", items: ["siteFollowup", "docControl", "opsSupport"] },
] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.services" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}/services`,
      languages: {
        fr: "/fr/services",
        en: "/en/services",
        "x-default": "/fr/services",
      },
    },
    openGraph: {
      type: "website",
      title: t("title"),
      description: t("description"),
      url: `/${locale}/services`,
    },
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  return <ServicesContent />;
}

function ServicesContent() {
  const t = useTranslations("prestations");

  return (
    <section className="wrap max-w-[920px] scroll-mt-24 pb-24 pt-36 md:pb-32 md:pt-44">
      <Reveal>
        <p className="eyebrow">{t("eyebrow")}</p>
        <h1 className="mt-5 max-w-[780px] font-heading text-[clamp(32px,5vw,60px)] leading-[1.12] tracking-tightest">
          {t("title")}
        </h1>
        <p className="mt-6 max-w-[560px] text-[16px] leading-[1.8] text-muted">
          {t("intro")}
        </p>
      </Reveal>

      {GROUPS.map((group, gi) => (
        <div key={group.label} className="mt-14">
          <Reveal>
            <h2 className="font-mono text-[12px] uppercase tracking-[0.16em] text-mint">
              {t(group.label)}
            </h2>
          </Reveal>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {group.items.map((item, i) => (
              <Reveal
                as="li"
                key={item}
                delay={(i % 2) * 0.06}
                className="service-card flex flex-col p-7"
              >
                <span className="font-mono text-[12px] text-mint">
                  {String(gi === 0 ? i + 1 : GROUPS[0].items.length + i + 1).padStart(
                    2,
                    "0",
                  )}
                </span>
                <h3 className="mt-5 font-heading text-[20px] leading-tight tracking-tighter2">
                  {t(`items.${item}.title`)}
                </h3>
                <p className="mt-3 text-[14px] leading-[1.7] text-muted">
                  {t(`items.${item}.description`)}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      ))}

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
