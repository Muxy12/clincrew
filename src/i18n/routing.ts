import { defineRouting } from "next-intl/routing";

export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: "fr",
  // Always show the locale prefix (e.g. /fr, /en) for clean, predictable URLs.
  localePrefix: "always",
});
