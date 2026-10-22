/**
 * SITE CONFIGURATION
 * -------------------------------------------------------------------------
 * Global, non-localized site settings and SEO defaults. Localized text
 * (titles, descriptions, keywords) lives in the i18n message files under
 * the `metadata` key.
 */

export const siteConfig = {
  /** Resolved from NEXT_PUBLIC_SITE_URL, falling back to localhost in dev. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(
    /\/$/,
    "",
  ),
  name: "Mohamed Debbah",
  brandShort: "MD. / Clinical Research",
  // Used for structured data (schema.org Person / ProfessionalService).
  jobTitle: {
    fr: "Senior Clinical Research Associate (Attaché de Recherche Clinique) freelance",
    en: "Senior Clinical Research Associate",
  },
  // Open Graph image dimensions (matches the dynamic OG route).
  ogImage: {
    width: 1200,
    height: 630,
  },
} as const;

export type SiteConfig = typeof siteConfig;
