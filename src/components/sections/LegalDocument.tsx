import { useTranslations } from "next-intl";
import { AlertTriangle } from "lucide-react";

interface LegalDocumentProps {
  namespace: "legal" | "privacy";
  sectionKeys: readonly string[];
}

/**
 * Shared renderer for the legal notice and privacy policy. Paragraphs are
 * split on blank lines; bracketed "[À compléter …]" placeholders are kept
 * verbatim so it is obvious what must be filled in before publication.
 */
export function LegalDocument({ namespace, sectionKeys }: LegalDocumentProps) {
  const t = useTranslations(namespace);

  return (
    <section className="wrap max-w-[820px] scroll-mt-24 pb-24 pt-36 md:pb-32 md:pt-44">
      <p className="eyebrow">{t("title")}</p>
      <h1 className="mt-5 font-heading text-[clamp(34px,5vw,60px)] leading-[1.1] tracking-tightest">
        {t("title")}
      </h1>

      <div className="mt-8 flex items-start gap-3 rounded-lg border border-mint/30 bg-mint/[0.05] p-5">
        <AlertTriangle
          size={18}
          className="mt-0.5 shrink-0 text-mint"
          aria-hidden="true"
        />
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-mint">
            {t("toComplete")}
          </p>
          <p className="mt-2 text-[14px] leading-relaxed text-muted">
            {t("intro")}
          </p>
        </div>
      </div>

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
