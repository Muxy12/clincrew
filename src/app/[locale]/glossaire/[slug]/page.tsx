import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import type { Locale } from "@/i18n/routing";
import { getGlossaryFiche } from "@/lib/glossary-content";
import {
  getGlossaryFicheSlugs,
  getGlossaryTerm,
  getTermArticle,
  glossaryTerms,
} from "@/config/glossary-terms";
import { blogPosts } from "@/config/blog";
import { definedTermNode } from "@/lib/schema";

export function generateStaticParams() {
  return getGlossaryFicheSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const fiche = getGlossaryFiche(slug, locale as Locale);
  if (!fiche) return {};
  const title = `${fiche.term} : définition`;
  return {
    title,
    description: fiche.short,
    alternates: {
      canonical: `/${locale}/glossaire/${slug}`,
      languages: {
        fr: `/fr/glossaire/${slug}`,
        en: `/en/glossaire/${slug}`,
        "x-default": `/fr/glossaire/${slug}`,
      },
    },
    openGraph: {
      type: "article",
      title,
      description: fiche.short,
      url: `/${locale}/glossaire/${slug}`,
    },
  };
}

export default async function GlossaryTermPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale as Locale);

  const fiche = getGlossaryFiche(slug, locale as Locale);
  const meta = getGlossaryTerm(slug);
  if (!fiche || !meta) notFound();

  const t = await getTranslations({ locale, namespace: "glossaryTerm" });
  const tb = await getTranslations({ locale, namespace: "breadcrumb" });

  const jsonLd = definedTermNode({
    locale: locale as Locale,
    slug,
    term: fiche.term,
    description: fiche.short,
  });

  // Related terms: same group, excluding self.
  const related = glossaryTerms
    .filter((x) => x.group === meta.group && x.slug !== slug)
    .slice(0, 6);

  // "Further reading" blog article tied to this term.
  const articleSlug = getTermArticle(slug);
  const article = articleSlug
    ? blogPosts.find((p) => p.slug === articleSlug)
    : undefined;

  return (
    <article className="wrap max-w-[760px] scroll-mt-24 pb-24 pt-36 md:pb-28 md:pt-44">
      <Breadcrumb
        locale={locale as Locale}
        items={[
          { label: tb("home"), href: "/" },
          { label: tb("glossaire"), href: "/glossaire" },
          { label: fiche.term, href: `/glossaire/${slug}` },
        ]}
      />

      <header className="mt-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-mint">
          {t("eyebrow")}
        </p>
        <h1 className="mt-4 font-heading text-[clamp(30px,4.6vw,52px)] leading-[1.14] tracking-tightest">
          {fiche.term}
        </h1>
        <p className="mt-5 max-w-[620px] text-[17px] leading-[1.7] text-muted">
          {fiche.short}
        </p>
      </header>

      <div
        className="article-body mt-12"
        dangerouslySetInnerHTML={{ __html: fiche.html }}
      />

      {/* Further reading */}
      {article && (
        <p className="mt-10 text-[15px] leading-relaxed text-muted">
          {t("furtherReading")} :{" "}
          <Link
            href={`/blog/${article.slug}`}
            className="border-b border-mint pb-0.5 font-semibold text-mint transition-colors hover:text-cream"
          >
            {article.translations[locale as Locale].title}
          </Link>
        </p>
      )}

      {/* Related terms */}
      <section className="mt-16 border-t border-line pt-10">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.14em] text-mint">
          {t("relatedTitle")}
        </h2>
        <ul className="mt-5 grid gap-x-10 gap-y-3 sm:grid-cols-2">
          {related.map((r) => (
            <li key={r.slug}>
              <Link
                href={r.href ?? `/glossaire/${r.slug}`}
                className="group inline-flex items-center gap-1.5 font-heading text-[16px] tracking-tighter2 transition-colors hover:text-mint"
              >
                {r.translations[locale as Locale].term}
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

      {/* CTA */}
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
