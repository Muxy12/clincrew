import { defineRouting } from "next-intl/routing";

export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: "fr",
  // Always show the locale prefix (e.g. /fr, /en) for clean, predictable URLs.
  localePrefix: "always",
  // Do NOT emit hreflang via the middleware `Link` HTTP header. hreflang is
  // declared once per page through <link rel="alternate"> in the <head>
  // (page metadata). The middleware header was a redundant second
  // implementation AND pointed x-default at the bare root "/", which
  // redirects — flagged by crawlers as a non-200 hreflang URL.
  alternateLinks: false,
});
