import Image from "next/image";
import { useTranslations } from "next-intl";
import { clients } from "@/config/clients";

export function TrustedBy() {
  const t = useTranslations("clients");

  return (
    <section
      aria-label={t("label")}
      className="border-b border-line bg-panel-strip"
    >
      <div className="wrap py-10 md:py-12">
        <p className="text-center font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
          {t("label")}
        </p>
        <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-16">
          {clients.map((client) => (
            <li
              key={client.name}
              className="opacity-75 transition-opacity duration-200 hover:opacity-100"
            >
              {client.logo ? (
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={130}
                  height={34}
                  className="h-7 w-auto object-contain md:h-8"
                />
              ) : (
                <span className="font-heading text-[19px] font-semibold tracking-tight text-[#b4c4c5] md:text-[22px]">
                  {client.name}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
