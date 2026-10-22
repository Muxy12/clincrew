import Image from "next/image";
import { useTranslations } from "next-intl";
import { clients, type ClientRef } from "@/config/clients";

function LogoTile({ client }: { client: ClientRef }) {
  if (!client.logo) {
    return (
      <span className="font-heading text-[19px] font-semibold tracking-tight text-[#b4c4c5] md:text-[22px]">
        {client.name}
      </span>
    );
  }
  return (
    <div className="flex h-[58px] w-[150px] items-center justify-center rounded-md bg-white p-4 md:w-[160px]">
      <div className="relative h-full w-full">
        <Image
          src={client.logo}
          alt={client.name}
          fill
          sizes="128px"
          className="object-contain"
        />
      </div>
    </div>
  );
}

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

        {/* Mobile: auto-scrolling band (wraps cleanly if motion is reduced) */}
        <div className="mt-7 overflow-hidden motion-reduce:overflow-visible md:hidden">
          <div className="flex w-max gap-4 motion-safe:animate-marquee motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center">
            <ul className="flex shrink-0 gap-4 motion-reduce:flex-wrap motion-reduce:justify-center">
              {clients.map((client) => (
                <li key={client.name} className="shrink-0">
                  <LogoTile client={client} />
                </li>
              ))}
            </ul>
            <ul
              aria-hidden="true"
              className="flex shrink-0 gap-4 motion-reduce:hidden"
            >
              {clients.map((client) => (
                <li key={client.name} className="shrink-0">
                  <LogoTile client={client} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Desktop: static centered row */}
        <ul className="mt-7 hidden flex-wrap items-center justify-center gap-5 md:flex">
          {clients.map((client) => (
            <li key={client.name}>
              <LogoTile client={client} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
