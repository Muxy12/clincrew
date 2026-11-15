import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/Reveal";

export const PRESTATION_ITEMS = [
  "selection",
  "initiation",
  "monitoring",
  "closeout",
  "siteFollowup",
  "docControl",
  "opsSupport",
] as const;

// Each home prestation links to its detail page (keyword-anchored internal
// linking: the service name is the anchor text).
const SLUG_BY_ITEM: Record<(typeof PRESTATION_ITEMS)[number], string> = {
  selection: "visite-de-selection",
  initiation: "visite-d-initiation",
  monitoring: "visites-de-monitoring",
  closeout: "visite-de-cloture",
  siteFollowup: "suivi-des-centres",
  docControl: "controle-documentation",
  opsSupport: "support-operationnel",
};

export function Prestations() {
  const t = useTranslations("prestations");

  return (
    <section
      id="prestations"
      className="scroll-mt-24 border-y border-line bg-panel py-24 md:py-32"
    >
      <div className="wrap">
        <Reveal className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">{t("eyebrow")}</p>
            <h2 className="mt-5 max-w-[760px] font-heading text-[clamp(32px,4.6vw,60px)] leading-[1.12] tracking-tightest">
              {t("title")}
            </h2>
          </div>
          <p className="max-w-[340px] text-[15px] leading-[1.8] text-muted">
            {t("intro")}
          </p>
        </Reveal>

        <ul className="mt-12 grid gap-x-10 gap-y-7 sm:grid-cols-2">
          {PRESTATION_ITEMS.map((item, i) => (
            <Reveal
              as="li"
              key={item}
              delay={(i % 2) * 0.06}
              className="border-t border-line pt-6"
            >
              <Link
                href={`/services/${SLUG_BY_ITEM[item]}`}
                className="group grid grid-cols-[auto_1fr] gap-5"
              >
                <span className="font-mono text-[12px] text-mint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="flex items-center gap-1.5 font-heading text-[18px] tracking-tighter2 transition-colors group-hover:text-mint">
                    {t(`items.${item}.title`)}
                    <ArrowRight
                      size={14}
                      aria-hidden="true"
                      className="-translate-x-1 text-mint opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                    />
                  </h3>
                  <p className="mt-2 text-[14px] leading-[1.7] text-muted">
                    {t(`items.${item}.description`)}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-full border border-[#9cd8bf] px-6 py-3.5 text-[13px] font-bold text-mint transition-colors hover:bg-mint hover:text-bg"
          >
            {t("cta")}
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
