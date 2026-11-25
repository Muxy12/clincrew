import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { Reveal } from "@/components/motion/Reveal";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { glossaryTerms, glossaryGroups } from "@/config/glossary-terms";
import { siteConfig } from "@/config/site";
import { definedTermSetNode } from "@/lib/schema";

const GROUP_LABEL: Record<string, string> = { monitoring: "groupMonitoring" };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.glossary" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}/glossaire`,
      languages: {
        fr: "/fr/glossaire",
        en: "/en/glossaire",
        "x-default": "/fr/glossaire",
      },
    },
    openGraph: {
      type: "website",
      title: t("title"),
      description: t("description"),
      url: `/${locale}/glossaire`,
    },
  };
}

export default async function GlossaryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  return <GlossaryHub locale={locale as Locale} />;
}

function GlossaryHub({ locale }: { locale: Locale }) {
  const t = useTranslations("glossaryHub");
  const tb = useTranslations("breadcrumb");

  const abs = (term: (typeof glossaryTerms)[number]) =>
    `${siteConfig.url}/${locale}${term.href ?? `/glossaire/${term.slug}`}`;
  const jsonLd = definedTermSetNode(
    locale,
    t("title"),
    glossaryTerms.map((term) => ({
      term: term.translations[locale].term,
      url: abs(term),
    })),
  );

  return (
    <section className="wrap max-w-[960px] scroll-mt-24 pb-24 pt-36 md:pb-32 md:pt-44">
      <div className="mb-7">
        <Breadcrumb
          locale={locale}
          items={[
            { label: tb("home"), href: "/" },
            { label: tb("glossaire"), href: "/glossaire" },
          ]}
        />
      </div>

      <Reveal>
        <p className="eyebrow">{t("eyebrow")}</p>
        <h1 className="mt-5 max-w-[820px] font-heading text-[clamp(32px,5vw,58px)] leading-[1.12] tracking-tightest">
          {t("title")}
        </h1>
        <p className="mt-6 max-w-[660px] text-[16px] leading-[1.85] text-muted">
          {t("intro")}
        </p>
      </Reveal>

      {glossaryGroups.map((group) => {
        const items = glossaryTerms.filter((x) => x.group === group);
        return (
          <div key={group} className="mt-14">
            <Reveal>
              <h2 className="font-mono text-[12px] uppercase tracking-[0.16em] text-mint">
                {t(GROUP_LABEL[group])}
              </h2>
            </Reveal>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {items.map((term, i) => {
                const tr = term.translations[locale];
                const href = term.href ?? `/glossaire/${term.slug}`;
                return (
                  <Reveal as="li" key={term.slug} delay={(i % 2) * 0.05}>
                    <Link
                      href={href}
                      className="service-card group flex h-full flex-col p-7"
                    >
                      <h3 className="font-heading text-[19px] leading-tight tracking-tighter2">
                        {tr.term}
                      </h3>
                      <p className="mt-3 flex-1 text-[14px] leading-[1.7] text-muted">
                        {tr.short}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-[12px] uppercase tracking-[0.1em] text-mint">
                        {term.href ? t("seeService") : t("readDefinition")}
                        <ArrowUpRight
                          size={14}
                          aria-hidden="true"
                          className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </span>
                    </Link>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        );
      })}

      <Reveal>
        <aside className="mt-16 rounded-lg border border-line bg-gradient-to-br from-panel to-[#0a1d26] p-9 text-center">
          <h2 className="mx-auto max-w-[520px] font-heading text-[clamp(22px,2.8vw,30px)] leading-[1.2] tracking-tighter2">
            {t("ctaTitle")}
          </h2>
          <p className="mx-auto mt-4 max-w-[480px] text-[15px] leading-relaxed text-muted">
            {t("ctaBody")}
          </p>
          <Link
            href="/#contact"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-mint px-7 py-4 text-[14px] font-extrabold text-bg transition-transform hover:-translate-y-0.5"
          >
            {t("ctaButton")}
            <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </aside>
      </Reveal>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
