import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import type { Locale } from "@/i18n/routing";
import { getSolutionPage } from "@/lib/solution-content";
import { getAllSolutionSlugs, solutionPages } from "@/config/solution-pages";
import { servicePageNode } from "@/lib/schema";

export function generateStaticParams() {
  return getAllSolutionSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const page = getSolutionPage(slug, locale as Locale);
  if (!page) return {};

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: {
      canonical: `/${locale}/solutions/${slug}`,
      languages: {
        fr: `/fr/solutions/${slug}`,
        en: `/en/solutions/${slug}`,
        "x-default": `/fr/solutions/${slug}`,
      },
    },
    openGraph: {
      type: "article",
      title: page.metaTitle,
      description: page.metaDescription,
      url: `/${locale}/solutions/${slug}`,
    },
  };
}

export default async function SolutionDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale as Locale);

  const page = getSolutionPage(slug, locale as Locale);
  if (!page) notFound();

  const t = await getTranslations({ locale, namespace: "solutionPage" });
  const tb = await getTranslations({ locale, namespace: "breadcrumb" });

  const jsonLd = servicePageNode({
    locale: locale as Locale,
    slug,
    name: page.title,
    description: page.excerpt,
    section: "solutions",
  });

  // Spoke-to-spoke internal links: the other solutions.
  const related = solutionPages.filter((s) => s.slug !== slug).slice(0, 4);

  return (
    <article className="wrap max-w-[760px] scroll-mt-24 pb-24 pt-36 md:pb-28 md:pt-44">
      <Breadcrumb
        locale={locale as Locale}
        items={[
          { label: tb("home"), href: "/" },
          { label: tb("solutions"), href: "/solutions" },
          { label: page.title, href: `/solutions/${slug}` },
        ]}
      />

      <header className="mt-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-mint">
          {t("eyebrow")}
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

      {/* Related solutions — spoke-to-spoke internal linking */}
      <section className="mt-16 border-t border-line pt-10">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.14em] text-mint">
          {t("relatedTitle")}
        </h2>
        <ul className="mt-5 grid gap-x-10 gap-y-3 sm:grid-cols-2">
          {related.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/solutions/${s.slug}`}
                className="group inline-flex items-center gap-1.5 font-heading text-[16px] tracking-tighter2 transition-colors hover:text-mint"
              >
                {s.translations[locale as Locale].title}
                <ArrowUpRight
                  size={14}
                  aria-hidden="true"
                  className="-translate-x-1 text-mint opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                />
              </Link>
            </li>
          ))}
        </ul>
      </section>

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
