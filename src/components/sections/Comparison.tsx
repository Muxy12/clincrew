import { useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/Reveal";

const ROWS = ["commitment", "flexibility", "rampup", "cost", "bestfor"] as const;

export function Comparison() {
  const t = useTranslations("comparison");

  return (
    <section id="comparison" className="wrap scroll-mt-24 py-24 md:py-32">
      <Reveal className="max-w-[720px]">
        <p className="eyebrow">{t("eyebrow")}</p>
        <h2 className="mt-5 font-heading text-[clamp(32px,4.6vw,60px)] leading-[1.12] tracking-tightest">
          {t("title")}
        </h2>
        <p className="mt-6 text-[15px] leading-[1.8] text-muted">{t("intro")}</p>
      </Reveal>

      {/* Desktop: a true comparison table. */}
      <Reveal className="mt-12 hidden md:block">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-line">
              <th className="py-4 pr-6 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
                {t("colCriterion")}
              </th>
              <th className="rounded-t-md bg-mint/[0.06] px-6 py-4 font-heading text-[16px] tracking-tighter2 text-mint">
                {t("colFreelance")}
              </th>
              <th className="py-4 pl-6 font-heading text-[16px] tracking-tighter2 text-muted">
                {t("colEmployed")}
              </th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r} className="border-b border-line align-top">
                <th
                  scope="row"
                  className="py-5 pr-6 font-heading text-[15px] font-normal tracking-tighter2 text-cream"
                >
                  {t(`rows.${r}.c`)}
                </th>
                <td className="bg-mint/[0.04] px-6 py-5 text-[14px] leading-relaxed text-cream">
                  {t(`rows.${r}.f`)}
                </td>
                <td className="py-5 pl-6 text-[14px] leading-relaxed text-muted">
                  {t(`rows.${r}.e`)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>

      {/* Mobile: stacked cards so both columns stay readable without
          horizontal scroll (the table above overflows < md). */}
      <Reveal className="mt-10 space-y-4 md:hidden">
        {ROWS.map((r) => (
          <div key={r} className="rounded-lg border border-line p-5">
            <p className="font-heading text-[15px] tracking-tighter2 text-cream">
              {t(`rows.${r}.c`)}
            </p>
            <div className="mt-4 space-y-3">
              <div className="rounded-md bg-mint/[0.05] p-3.5">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-mint">
                  {t("colFreelance")}
                </p>
                <p className="mt-1.5 text-[14px] leading-relaxed text-cream">
                  {t(`rows.${r}.f`)}
                </p>
              </div>
              <div className="p-3.5">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                  {t("colEmployed")}
                </p>
                <p className="mt-1.5 text-[14px] leading-relaxed text-muted">
                  {t(`rows.${r}.e`)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
