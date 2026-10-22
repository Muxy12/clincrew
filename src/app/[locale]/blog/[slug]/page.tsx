import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft, ArrowUpRight, Clock } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getPost, getAllSlugs, formatDate } from "@/lib/blog";
import { siteConfig } from "@/config/site";
import { profile } from "@/config/profile";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(slug, locale as Locale);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/${locale}/blog/${slug}`,
      languages: {
        fr: `/fr/blog/${slug}`,
        en: `/en/blog/${slug}`,
        "x-default": `/fr/blog/${slug}`,
      },
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `/${locale}/blog/${slug}`,
      publishedTime: post.date,
      authors: [siteConfig.name],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale as Locale);

  const post = getPost(slug, locale as Locale);
  if (!post) notFound();

  const t = await getTranslations({ locale, namespace: "blog" });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: locale,
    author: { "@type": "Person", name: siteConfig.name },
    publisher: { "@type": "Person", name: siteConfig.name },
    mainEntityOfPage: `${siteConfig.url}/${locale}/blog/${slug}`,
  };

  return (
    <article className="wrap max-w-[760px] scroll-mt-24 pb-24 pt-36 md:pb-28 md:pt-44">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.14em] text-muted transition-colors hover:text-mint"
      >
        <ArrowLeft size={14} aria-hidden="true" />
        {t("backToList")}
      </Link>

      <header className="mt-8">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.12em] text-mint">
          <time dateTime={post.date}>{formatDate(post.date, locale as Locale)}</time>
          <span className="inline-flex items-center gap-1.5 text-muted">
            <Clock size={13} aria-hidden="true" />
            {t("readingTime", { minutes: post.readingMinutes })}
          </span>
        </div>
        <h1 className="mt-5 font-heading text-[clamp(30px,4.6vw,52px)] leading-[1.14] tracking-tightest">
          {post.title}
        </h1>
        {post.tags.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-muted"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
      </header>

      <div
        className="article-body mt-12"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />

      {/* End-of-article CTA */}
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

      {profile.linkedin.configured && (
        <p className="mt-10 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
          {siteConfig.name} —{" "}
          <a
            href={profile.linkedin.value}
            target="_blank"
            rel="noopener noreferrer"
            className="text-mint hover:underline"
          >
            LinkedIn
          </a>
        </p>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </article>
  );
}
