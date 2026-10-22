import { useLocale, useTranslations } from "next-intl";
import { Mail, Phone, Linkedin, MapPin } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { ContactForm } from "./ContactForm";
import { profile } from "@/config/profile";
import type { Locale } from "@/i18n/routing";

export function Contact() {
  const t = useTranslations("contact");
  const locale = useLocale() as Locale;
  const hasCoordinates =
    profile.email.configured ||
    profile.phone.configured ||
    profile.linkedin.configured ||
    profile.city !== null;

  return (
    <section
      id="contact"
      className="contact-aura relative scroll-mt-24 overflow-hidden py-24 md:py-32"
    >
      <div className="wrap">
        <Reveal className="mx-auto max-w-[900px] text-center">
          <p className="eyebrow eyebrow--center">{t("eyebrow")}</p>
          <h2 className="mx-auto mt-6 max-w-[900px] font-heading text-[clamp(38px,7vw,88px)] leading-[1.08] tracking-tightest">
            {t("title")}{" "}
            <span className="text-mint">{t("titleEmphasis")}</span>
          </h2>
          <p className="mx-auto mt-7 max-w-[560px] text-[16px] leading-[1.8] text-[#b0c4c2]">
            {t("copy", { responseTime: profile.responseTime ?? "[24–48 h]" })}
          </p>

          {hasCoordinates && (
            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 font-mono text-[13px] tracking-[0.04em] text-muted">
              {profile.email.configured && (
                <a
                  href={`mailto:${profile.email.value}`}
                  className="inline-flex items-center gap-2 transition-colors hover:text-mint"
                >
                  <Mail size={15} aria-hidden="true" />
                  {profile.email.value}
                </a>
              )}
              {profile.phone.configured && (
                <a
                  href={`tel:${profile.phone.value.replace(/\s+/g, "")}`}
                  className="inline-flex items-center gap-2 transition-colors hover:text-mint"
                >
                  <Phone size={15} aria-hidden="true" />
                  {profile.phone.value}
                </a>
              )}
              {profile.linkedin.configured && (
                <a
                  href={profile.linkedin.value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-mint"
                >
                  <Linkedin size={15} aria-hidden="true" />
                  LinkedIn
                </a>
              )}
              {profile.city && (
                <span className="inline-flex items-center gap-2">
                  <MapPin size={15} aria-hidden="true" />
                  {profile.city[locale]}
                </span>
              )}
            </div>
          )}
        </Reveal>

        <Reveal delay={0.1} className="mt-14">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
