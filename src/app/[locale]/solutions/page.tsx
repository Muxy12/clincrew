import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { Reveal } from "@/components/motion/Reveal";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { solutionPages } from "@/config/solution-pages";
import { profile } from "@/config/profile";
import { getAllPosts } from "@/lib/blog";

/** Cross-topic guides surfaced as "resources" (no duplicate pages). */
const RESOURCE_SLUGS = [
  "recruter-arc-freelance",
  "arc-freelance-vs-chef-de-projet-clinique",
  "tjm-arc-freelance",
] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.solutions" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}/solutions`,
      languages: {
        fr: "/fr/solutions",
        en: "/en/solutions",
        "x-default": "/fr/solutions",
      },
    },
    openGraph: {
      type: "website",
      title: t("title"),
      description: t("description"),
      url: `/${locale}/solutions`,
    },
  };
}

export default async function SolutionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  return <SolutionsHub locale={locale as Locale} />;
}

function SolutionsHub({ locale }: { locale: Locale }) {
  const t = useTranslations("solutionsHub");
  const ts = useTranslations("solutionPage");
  const tb = useTranslations("breadcrumb");

  const situations = t.raw("situations") as { title: string; body: string }[];
  const methodSteps = t.raw("methodSteps") as { title: string; body: string }[];
  const faqItems = t.raw("faq") as { q: string; a: string }[];

  // Differentiation facts — sourced only from the verified profile config.
  const whyItems: { label: string; value: string }[] = [];
  if (profile.yearsExperience)
    whyItems.push({
      label: t("whyExperienceLabel"),
      value: t("whyExperienceValue", { years: profile.yearsExperience }),
    });
  if (profile.phases && profile.therapeuticAreas.length)
    whyItems.push({
      label: t("whyScopeLabel"),
      value: `${profile.phases[locale]} · ${profile.therapeuticAreas
        .slice(0, 6)
        .map((a) => a[locale])
        .join(", ")}`,
    });
  if (profile.geographicCoverage.length)
    whyItems.push({
      label: t("whyCoverageLabel"),
      value: profile.geographicCoverage.map((g) => g[locale]).join(" · "),
    });
  if (profile.certifications.length)
    whyItems.push({
      label: t("whyTrainingLabel"),
      value: profile.certifications.map((c) => c[locale]).join(" · "),
    });

  const posts = getAllPosts(locale);
  const resources = RESOURCE_SLUGS.map((slug) =>
    posts.find((p) => p.slug === slug),
  ).filter((p): p is NonNullable<typeof p> => Boolean(p));

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section className="wrap max-w-[960px] scroll-mt-24 pb-24 pt-36 md:pb-32 md:pt-44">
      <div className="mb-7">
        <Breadcrumb
          locale={locale}
          items={[
            { label: tb("home"), href: "/" },
            { label: tb("solutions"), href: "/solutions" },
          ]}
        />
      </div>

      {/* Hero */}
      <Reveal>
        <p className="eyebrow">{t("eyebrow")}</p>
        <h1 className="mt-5 max-w-[880px] font-heading text-[clamp(32px,5vw,58px)] leading-[1.12] tracking-tightest">
          {t("heroTitle")}
        </h1>
        <p className="mt-6 max-w-[680px] text-[16px] leading-[1.85] text-muted">
          {t("heroIntro")}
        </p>
      </Reveal>

      {/* Client situations */}
      <div className="mt-16 border-t border-line pt-12">
        <Reveal>
          <h2 className="max-w-[760px] font-heading text-[clamp(24px,3.4vw,38px)] leading-[1.18] tracking-tighter2">
            {t("situationsTitle")}
          </h2>
          <p className="mt-5 max-w-[640px] text-[15px] leading-[1.8] text-muted">
            {t("situationsIntro")}
          </p>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {situations.map((s, i) => (
            <Reveal key={s.title} delay={(i % 2) * 0.06}>
              <div className="h-full rounded-lg border border-line bg-gradient-to-br from-panel to-[#0a1d26] p-7">
                <h3 className="font-heading text-[19px] tracking-tighter2 text-cream">
                  {s.title}
                </h3>
                <p className="mt-3 text-[14px] leading-[1.75] text-muted">
                  {s.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Solution cards */}
      <div className="mt-16 border-t border-line pt-12">
        <Reveal>
          <h2 className="font-heading text-[clamp(24px,3.4vw,38px)] leading-[1.18] tracking-tighter2">
            {t("cardsTitle")}
          </h2>
          <p className="mt-5 max-w-[640px] text-[15px] leading-[1.8] text-muted">
            {t("cardsIntro")}
          </p>
        </Reveal>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {solutionPages.map((item, i) => {
            const Icon = item.icon;
            const tr = item.translations[locale];
            return (
              <Reveal as="li" key={item.slug} delay={(i % 2) * 0.06}>
                <Link
                  href={`/solutions/${item.slug}`}
                  className="service-card group flex h-full flex-col p-7"
                >
                  <Icon size={22} aria-hidden="true" className="text-mint" />
                  <h3 className="mt-5 font-heading text-[20px] leading-tight tracking-tighter2">
                    {tr.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[14px] leading-[1.7] text-muted">
                    {tr.excerpt}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-[12px] uppercase tracking-[0.1em] text-mint">
                    {ts("detailCta")}
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

      {/* Method */}
      <div className="mt-16 border-t border-line pt-12">
        <Reveal>
          <h2 className="font-heading text-[clamp(24px,3.4vw,38px)] leading-[1.18] tracking-tighter2">
            {t("methodTitle")}
          </h2>
        </Reveal>
        <ol className="mt-8 grid gap-6 sm:grid-cols-2">
          {methodSteps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={(i % 2) * 0.06}>
              <div className="flex gap-5">
                <span className="font-mono text-[13px] font-semibold text-mint">
                  {`0${i + 1}`}
                </span>
                <div>
                  <h3 className="font-heading text-[18px] tracking-tighter2">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-[1.75] text-muted">
                    {step.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>

      {/* Differentiation — verified facts only */}
      {whyItems.length > 0 && (
        <div className="mt-16 border-t border-line pt-12">
          <Reveal>
            <h2 className="font-heading text-[clamp(24px,3.4vw,38px)] leading-[1.18] tracking-tighter2">
              {t("whyTitle")}
            </h2>
            <p className="mt-5 max-w-[640px] text-[15px] leading-[1.8] text-muted">
              {t("whyIntro")}
            </p>
          </Reveal>
          <Reveal>
            <dl className="mt-8 grid gap-x-10 gap-y-7 sm:grid-cols-2">
              {whyItems.map((item) => (
                <div key={item.label}>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-mint">
                    {item.label}
                  </dt>
                  <dd className="mt-2 text-[15px] leading-relaxed text-cream">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      )}

      {/* FAQ */}
      <div className="mt-16 border-t border-line pt-12">
        <Reveal>
          <h2 className="font-heading text-[clamp(24px,3.4vw,38px)] leading-[1.18] tracking-tighter2">
            {t("faqTitle")}
          </h2>
        </Reveal>
        <dl className="mt-8 divide-y divide-line border-y border-line">
          {faqItems.map((f) => (
            <Reveal key={f.q}>
              <div className="py-6">
                <dt className="font-heading text-[18px] leading-snug tracking-tighter2 text-cream">
                  {f.q}
                </dt>
                <dd className="mt-3 max-w-[720px] text-[15px] leading-[1.8] text-muted">
                  {f.a}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>

      {/* Resources */}
      {resources.length > 0 && (
        <div className="mt-16 border-t border-line pt-12">
          <Reveal>
            <h2 className="font-heading text-[clamp(24px,3.4vw,38px)] leading-[1.18] tracking-tighter2">
              {t("resourcesTitle")}
            </h2>
          </Reveal>
          <ul className="mt-8 grid gap-x-10 gap-y-3 sm:grid-cols-2">
            {resources.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="group inline-flex items-start gap-1.5 font-heading text-[16px] leading-snug tracking-tighter2 transition-colors hover:text-mint"
                >
                  {p.title}
                  <ArrowUpRight
                    size={14}
                    aria-hidden="true"
                    className="mt-1 shrink-0 text-mint opacity-0 transition-all duration-200 group-hover:opacity-100"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Final CTA */}
      <Reveal>
        <aside className="mt-16 rounded-lg border border-line bg-gradient-to-br from-panel to-[#0a1d26] p-9 text-center">
          <h2 className="mx-auto max-w-[560px] font-heading text-[clamp(22px,2.8vw,30px)] leading-[1.2] tracking-tighter2">
            {t("finalTitle")}
          </h2>
          <p className="mx-auto mt-4 max-w-[520px] text-[15px] leading-relaxed text-muted">
            {t("finalBody")}
          </p>
          <Link
            href="/#contact"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-mint px-7 py-4 text-[14px] font-extrabold text-bg transition-transform hover:-translate-y-0.5"
          >
            {t("finalButton")}
            <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </aside>
      </Reveal>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </section>
  );
}
