import { useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/Reveal";
import { enabledServices } from "@/config/services";

export function Services() {
  const t = useTranslations("services");

  return (
    <section id="expertise" className="wrap scroll-mt-24 py-24 md:py-32">
      <Reveal className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <div>
          <p className="eyebrow">{t("eyebrow")}</p>
          <h2 className="mt-5 max-w-[800px] font-heading text-[clamp(34px,5vw,64px)] leading-[1.12] tracking-tightest">
            {t("title")}
          </h2>
        </div>
        <p className="max-w-[360px] text-[15px] leading-[1.8] text-muted">
          {t("intro")}
        </p>
      </Reveal>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {enabledServices.map((service, i) => {
          const Icon = service.icon;
          return (
            <Reveal
              as="li"
              key={service.id}
              delay={(i % 3) * 0.08}
              className="service-card flex min-h-[340px] flex-col p-9"
            >
              <span className="font-mono text-[12px] tracking-[0.12em] text-mint">
                {String(i + 1).padStart(2, "0")} — {t("cardLabel").toUpperCase()}
              </span>
              <Icon
                size={34}
                strokeWidth={1.4}
                className="my-8 text-mint"
                aria-hidden="true"
              />
              <h3 className="mb-4 font-heading text-[22px] leading-tight tracking-tighter2">
                {t(`items.${service.messages}.title`)}
              </h3>
              <p className="text-[14px] leading-[1.75] text-[#a6bdbe]">
                {t(`items.${service.messages}.description`)}
              </p>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
