/**
 * CENTRALIZED PROFILE CONFIGURATION
 * -------------------------------------------------------------------------
 * This is the single source of truth for every factual detail about
 * Mohamed Debbah. Edit values here — no component contains hardcoded facts.
 *
 * IMPORTANT (credibility policy):
 * - Do NOT invent years of experience, employers, certifications, study
 *   counts, therapeutic areas, countries, or client references.
 * - Leave a field as `null` or `[]` when the information is not yet
 *   confirmed. The UI is built to hide empty fields entirely, so the site
 *   never shows blank stats or fake placeholders on the published page.
 * - Fill these in only with information Mohamed has verified.
 */

export interface ProfileLink {
  /** Whether this contact channel is configured and should be displayed. */
  readonly configured: boolean;
  readonly value: string;
}

export interface ProfileConfig {
  readonly name: string;
  readonly monogram: string;
  /** Localized professional title shown under the name. */
  readonly title: { readonly fr: string; readonly en: string };

  // --- Contact channels. Set configured:true once a real value exists. ---
  readonly email: ProfileLink;
  readonly linkedin: ProfileLink;
  readonly phone: ProfileLink;
  /** City / coverage shown in the contact details. */
  readonly city: { fr: string; en: string } | null;
  /** Typical reply time shown in the contact copy (e.g. "24–48 h"). */
  readonly responseTime: string | null;
  /** Award / distinction shown in the hero and on the About page. */
  readonly award: {
    readonly url: string;
    readonly label: { fr: string; en: string };
    readonly detail: { fr: string; en: string };
  } | null;

  // --- Optional media. Provide a path in /public when available. ---
  readonly portrait: string | null;

  /**
   * "Mon parcours" narrative values (About section & page). Fill these with
   * verified information. While null, the UI shows a clearly-bracketed
   * placeholder (e.g. "[X]") so it is obvious what remains to complete —
   * nothing is invented.
   */
  readonly yearsExperience: string | null;
  readonly startingRole: { fr: string; en: string } | null;
  readonly focusAreas: { fr: string; en: string } | null;
  readonly clientTypes: { fr: string; en: string } | null;
  /** Study phases covered (used by the qualification quiz, question 3). */
  readonly phases: { fr: string; en: string } | null;

  /**
   * Verified details only. Empty arrays are not rendered.
   * Each entry is locale-aware so FR/EN can differ where needed.
   */
  readonly therapeuticAreas: ReadonlyArray<{ fr: string; en: string }>;
  readonly geographicCoverage: ReadonlyArray<{ fr: string; en: string }>;
  readonly languages: ReadonlyArray<{ fr: string; en: string }>;
  readonly experience: ReadonlyArray<{
    period: string;
    role: { fr: string; en: string };
    detail: { fr: string; en: string };
  }>;
  readonly certifications: ReadonlyArray<{ fr: string; en: string }>;
}

export const profile: ProfileConfig = {
  name: "Mohamed Debbah",
  monogram: "MD",
  title: {
    fr: "Attaché de Recherche Clinique senior · Freelance",
    en: "Senior Clinical Research Associate · Freelance",
  },

  email: {
    configured: true,
    value: "mohamed.debbah@clincrew.net",
  },
  linkedin: {
    configured: true,
    value: "https://www.linkedin.com/in/md213/",
  },
  phone: {
    configured: true,
    value: "+33 7 68 01 52 91",
  },
  city: { fr: "Paris · France", en: "Paris · France" },
  // ⚠️ Typical reply time shown in the contact copy; null → "[24–48 h]".
  responseTime: "24–48 h",
  // Finalist (not winner) — PharmaTimes "International Clinical Research
  // Associate of the Year 2024", CRA category. Verified on the results page.
  award: {
    url: "https://intcr.pharmatimes.com/international-clinical-researcher-of-the-year-2024-results/",
    label: {
      fr: "Finaliste — International Clinical Researcher of the Year 2024",
      en: "Finalist — International Clinical Researcher of the Year 2024",
    },
    detail: {
      fr: "Catégorie Clinical Research Associate · PharmaTimes",
      en: "Clinical Research Associate category · PharmaTimes",
    },
  },

  // ⚠️ Add a portrait at e.g. /public/images/mohamed-debbah.jpg then set the path.
  portrait: null,

  // ⚠️ Fill these with real values to complete the "Mon parcours" copy.
  yearsExperience: "7",
  startingRole: {
    fr: "Attaché de Recherche Clinique (CRA)",
    en: "Clinical Research Associate (CRA)",
  },
  focusAreas: {
    fr: "phases I à IV, notamment en oncologie, hématologie et vaccins",
    en: "phase I to IV, notably in oncology, haematology and vaccines",
  },
  clientTypes: {
    fr: "CRO, laboratoires pharmaceutiques, biotechs et promoteurs académiques",
    en: "CROs, pharmaceutical companies, biotechs and academic sponsors",
  },
  phases: { fr: "Phases I à IV", en: "Phase I to IV" },

  // All of the following are intentionally empty until verified.
  therapeuticAreas: [
    { fr: "Oncologie", en: "Oncology" },
    { fr: "Hématologie", en: "Haematology" },
    { fr: "Vaccins", en: "Vaccines" },
    { fr: "Cardiologie", en: "Cardiology" },
    { fr: "Maladies rares", en: "Rare diseases" },
  ],
  geographicCoverage: [
    { fr: "France", en: "France" },
    { fr: "Belgique (FR)", en: "Belgium (FR)" },
    { fr: "Suisse (FR)", en: "Switzerland (FR)" },
    { fr: "Luxembourg", en: "Luxembourg" },
    {
      fr: "Missions hybrides (présentiel / à distance)",
      en: "Hybrid assignments (on-site / remote)",
    },
  ],
  languages: [
    { fr: "Français", en: "French" },
    { fr: "Anglais", en: "English" },
    { fr: "Arabe", en: "Arabic" },
  ],
  experience: [],
  certifications: [],
};

/** True when at least one real contact channel is configured. */
export const hasAnyContactChannel =
  profile.email.configured || profile.linkedin.configured;
