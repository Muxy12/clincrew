import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getServicePage } from "@/lib/service-content";
import { getAllServiceSlugs } from "@/config/service-pages";
import { servicePageNode } from "@/lib/schema";

export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const page = getServicePage(slug, locale as Locale);
  if (!page) return {};

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: {
      canonical: `/${locale}/services/${slug}`,
      languages: {
        fr: `/fr/services/${slug}`,
        en: `/en/services/${slug}`,
        "x-default": `/fr/services/${slug}`,
      },
    },
    openGraph: {
      type: "article",
      title: page.metaTitle,
      description: page.metaDescription,
      url: `/${locale}/services/${slug}`,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale as Locale);

  const page = getServicePage(slug, locale as Locale);
  if (!page) notFound();

  const t = await getTranslations({ locale, namespace: "servicePage" });
  const tp = await getTranslations({ locale, namespace: "prestations" });

  const jsonLd = servicePageNode({
    locale: locale as Locale,
    slug,
    name: page.title,
    description: page.excerpt,
  });

  const groupLabel = page.group === "visits" ? tp("groupVisits") : tp("groupSupport");

  return (
    <article className="wrap max-w-[760px] scroll-mt-24 pb-24 pt-36 md:pb-28 md:pt-44">
      <Link
        href="/services"
        className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.14em] text-muted transition-colors hover:text-mint"
      >
        <ArrowLeft size={14} aria-hidden="true" />
        {t("backToServices")}
      </Link>

      <header className="mt-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-mint">
          {groupLabel}
        </p>
        <h1 className="mt-4 font-heading text-[clamp(30px,4.6vw,52px)] leading-[1.14] tracking-tightest">
          {page.title}
        </h1>
        <p className="mt-5 max-w-[620px] text-[17px] leading-[1.7] text-muted">
          {page.excerpt}
        </p>
      </header>

      <div
        className="article-body mt-12"
        dangerouslySetInnerHTML={{ __html: page.html }}
      />

      {/* End-of-page CTA */}
      <aside className="mt-16 rounded-lg border border-line bg-gradient-to-br from-panel to-[#0a1d26] p-8 text-center">
        <h2 className="font-heading text-[22px] tracking-tighter2">
          {t("ctaTitle")}
        </h2>
        <p className="mx-auto mt-3 max-w-[460px] text-[14px] leading-relaxed text-muted">
          {t("ctaText")}
        </p>
        <Link
          href="/#contact"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-mint px-6 py-3.5 text-[13px] font-extrabold text-bg transition-transform hover:-translate-y-0.5"
        >
          {t("ctaButton")}
          <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
      </aside>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </article>
  );
}
