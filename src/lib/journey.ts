import { profile } from "@/config/profile";
import type { Locale } from "@/i18n/routing";

/**
 * Values interpolated into the "Mon parcours" copy (about.journeyP1).
 * Pulls from profile config; when a value is not yet filled in, returns a
 * clearly-bracketed placeholder so it is obvious what remains to complete.
 * Nothing is invented.
 */
export function getJourneyValues(locale: Locale): {
  years: string;
  startRole: string;
  focus: string;
  clients: string;
} {
  const placeholder = {
    years: "[X]",
    startRole: locale === "fr" ? "[poste de départ]" : "[starting role]",
    focus:
      locale === "fr"
        ? "[phases / aires thérapeutiques]"
        : "[phases / therapeutic areas]",
    clients:
      locale === "fr"
        ? "[types de structures : CRO, promoteurs]"
        : "[types of organisations: CROs, sponsors]",
  };

  return {
    years: profile.yearsExperience ?? placeholder.years,
    startRole: profile.startingRole?.[locale] ?? placeholder.startRole,
    focus: profile.focusAreas?.[locale] ?? placeholder.focus,
    clients: profile.clientTypes?.[locale] ?? placeholder.clients,
  };
}
