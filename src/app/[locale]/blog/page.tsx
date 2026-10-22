import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { Reveal } from "@/components/motion/Reveal";
import { getAllPosts, formatDate } from "@/lib/blog";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.blog" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}/blog`,
      languages: { fr: "/fr/blog", en: "/en/blog", "x-default": "/fr/blog" },
    },
    openGraph: {
      type: "website",
      title: t("title"),
      description: t("description"),
      url: `/${locale}/blog`,
    },
  };
}

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  return <BlogIndex locale={locale as Locale} />;
}

function BlogIndex({ locale }: { locale: Locale }) {
  const t = useTranslations("blog");
  const posts = getAllPosts(locale);

  return (
    <section className="wrap scroll-mt-24 pb-24 pt-36 md:pb-32 md:pt-44">
      <Reveal className="max-w-[760px]">
        <p className="eyebrow">{t("eyebrow")}</p>
        <h1 className="mt-5 font-heading text-[clamp(34px,5vw,64px)] leading-[1.12] tracking-tightest">
          {t("title")}
        </h1>
        <p className="mt-6 text-[16px] leading-[1.8] text-muted">
          {t("intro")}
        </p>
      </Reveal>

      {posts.length === 0 ? (
        <p className="mt-16 text-[15px] text-muted">{t("empty")}</p>
      ) : (
        <ul className="mt-14 grid gap-4 md:grid-cols-2">
          {posts.map((post, i) => (
            <Reveal as="li" key={post.slug} delay={(i % 2) * 0.08}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col rounded-sm border border-line bg-gradient-to-br from-panel to-[#0a1d26] p-8 transition-colors duration-300 hover:border-[#85cbb0]"
              >
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.12em] text-mint">
                  <time dateTime={post.date}>
                    {formatDate(post.date, locale)}
                  </time>
                  <span aria-hidden="true" className="text-line">
                    /
                  </span>
                  <span className="text-muted">
                    {t("readingTime", { minutes: post.readingMinutes })}
                  </span>
                </div>
                <h2 className="mt-5 font-heading text-[23px] leading-tight tracking-tighter2 transition-colors group-hover:text-mint">
                  {post.title}
                </h2>
                <p className="mt-3 flex-1 text-[14px] leading-[1.75] text-muted">
                  {post.excerpt}
                </p>
                <div className="mt-6 flex items-center justify-between">
                  {post.tags.length > 0 && (
                    <ul className="flex flex-wrap gap-2">
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
                  <ArrowUpRight
                    size={18}
                    className="ml-auto shrink-0 text-mint transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      )}
    </section>
  );
}
