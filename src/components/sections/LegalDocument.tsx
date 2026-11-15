import { useLocale, useTranslations } from "next-intl";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import type { Locale } from "@/i18n/routing";

interface LegalDocumentProps {
  namespace: "legal" | "privacy";
  sectionKeys: readonly string[];
}

/**
 * Shared renderer for the legal notice and privacy policy. Paragraphs are
 * split on blank lines.
 */
export function LegalDocument({ namespace, sectionKeys }: LegalDocumentProps) {
  const t = useTranslations(namespace);
  const tb = useTranslations("breadcrumb");
  const locale = useLocale() as Locale;

  return (
    <section className="wrap max-w-[820px] scroll-mt-24 pb-24 pt-36 md:pb-32 md:pt-44">
      <div className="mb-7">
        <Breadcrumb
          locale={locale}
          items={[
            { label: tb("home"), href: "/" },
            { label: t("title"), href: `/${namespace}` },
          ]}
        />
      </div>
      <p className="eyebrow">{t("title")}</p>
      <h1 className="mt-5 font-heading text-[clamp(34px,5vw,60px)] leading-[1.1] tracking-tightest">
        {t("title")}
      </h1>

      <div className="mt-12 space-y-10">
        {sectionKeys.map((key) => {
          const body = t(`sections.${key}.body`);
          return (
            <div key={key}>
              <h2 className="font-heading text-[22px] tracking-tighter2 text-cream">
                {t(`sections.${key}.title`)}
              </h2>
              <div className="mt-3 space-y-3 text-[15px] leading-[1.8] text-muted">
                {body.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
