"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales } from "@/i18n/routing";
import { useTransition } from "react";

/**
 * Premium FR | EN switcher. Preserves the current path and hash (section)
 * when switching locale. Fully keyboard accessible with aria-current.
 */
export function LanguageSwitcher({ className }: { className?: string }) {
  const t = useTranslations("languageSwitcher");
  const activeLocale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function switchTo(next: (typeof locales)[number]) {
    if (next === activeLocale) return;
    const hash =
      typeof window !== "undefined" ? window.location.hash : "";
    startTransition(() => {
      router.replace(`${pathname}${hash}`, { locale: next });
    });
  }

  return (
    <div
      className={className}
      role="group"
      aria-label={t("label")}
      data-pending={isPending ? "" : undefined}
    >
      <ul className="flex items-center gap-1 text-[12px] font-semibold tracking-[0.08em]">
        {locales.map((loc, i) => {
          const isActive = loc === activeLocale;
          return (
            <li key={loc} className="flex items-center">
              {i > 0 && (
                <span aria-hidden="true" className="px-1.5 text-line">
                  /
                </span>
              )}
              <button
                type="button"
                onClick={() => switchTo(loc)}
                aria-current={isActive ? "true" : undefined}
                aria-label={`${loc.toUpperCase()} — ${
                  loc === "fr" ? t("switchToFr") : t("switchToEn")
                }`}
                className={
                  "uppercase transition-colors duration-200 " +
                  (isActive
                    ? "text-mint"
                    : "text-muted hover:text-cream focus-visible:text-cream")
                }
              >
                {loc}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
