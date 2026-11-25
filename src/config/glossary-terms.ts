/**
 * GLOSSARY REGISTRY (semantic cocoon: /glossaire)
 * -------------------------------------------------------------------------
 * Each term either has its own definition page (Markdown fiche at
 * src/content/glossary/<slug>.<locale>.md) or an `href` that points to an
 * existing page (service/solution). Terms with an `href` are listed on the
 * hub but do NOT get a duplicate fiche — one canonical page per concept, to
 * avoid cannibalization.
 *
 * Content is generic, grounded in standard ICH-GCP (ICH E6) practice — no
 * fabricated facts.
 */

import type { Locale } from "@/i18n/routing";

export type GlossaryGroup = "monitoring";

export interface GlossaryTerm {
  readonly slug: string;
  readonly group: GlossaryGroup;
  /** When set, the hub links here instead of to a /glossaire/<slug> fiche. */
  readonly href?: string;
  readonly translations: Record<
    Locale,
    {
      readonly term: string;
      /** One-line definition (hub card + schema + fiche meta description). */
      readonly short: string;
    }
  >;
}

export const glossaryGroups: ReadonlyArray<GlossaryGroup> = ["monitoring"];

export const glossaryTerms: ReadonlyArray<GlossaryTerm> = [
  {
    slug: "monitoring-clinique",
    group: "monitoring",
    translations: {
      fr: {
        term: "Monitoring clinique",
        short:
          "La surveillance opérationnelle d'un essai clinique : protéger les participants et garantir des données fiables, conformément aux Bonnes Pratiques Cliniques.",
      },
      en: {
        term: "Clinical monitoring",
        short:
          "The operational oversight of a clinical trial: protecting participants and ensuring reliable data, in line with Good Clinical Practice.",
      },
    },
  },
  {
    slug: "plan-de-monitoring",
    group: "monitoring",
    translations: {
      fr: {
        term: "Plan de monitoring",
        short:
          "Le document qui définit la stratégie, la fréquence et le périmètre du monitoring d'un essai, selon une approche basée sur les risques.",
      },
      en: {
        term: "Monitoring plan",
        short:
          "The document that sets the strategy, frequency and scope of a trial's monitoring, following a risk-based approach.",
      },
    },
  },
  {
    slug: "visite-de-selection",
    group: "monitoring",
    href: "/services/visite-de-selection",
    translations: {
      fr: {
        term: "Visite de sélection",
        short:
          "Évaluer, avant toute ouverture, la capacité réelle d'un centre investigateur à mener l'étude.",
      },
      en: {
        term: "Site selection visit",
        short:
          "Assessing, before any activation, a site's real ability to run the study.",
      },
    },
  },
  {
    slug: "visite-d-initiation",
    group: "monitoring",
    href: "/services/visite-d-initiation",
    translations: {
      fr: {
        term: "Visite d'initiation (mise en place)",
        short:
          "Former l'équipe au protocole et vérifier que le centre est prêt à inclure, dans les règles.",
      },
      en: {
        term: "Site initiation visit (set-up)",
        short:
          "Training the team on the protocol and confirming the site is ready to enrol, by the book.",
      },
    },
  },
  {
    slug: "visite-de-monitoring",
    group: "monitoring",
    href: "/services/visites-de-monitoring",
    translations: {
      fr: {
        term: "Visite de monitoring",
        short:
          "Contrôler, pendant l'étude, la sécurité des patients, la conformité au protocole et la qualité des données.",
      },
      en: {
        term: "Interim monitoring visit",
        short:
          "Checking, during the study, patient safety, protocol compliance and data quality.",
      },
    },
  },
  {
    slug: "visite-de-cloture",
    group: "monitoring",
    href: "/services/visite-de-cloture",
    translations: {
      fr: {
        term: "Visite de clôture (fin d'essai)",
        short:
          "Clôturer un centre proprement : données résolues, documentation complète, archivage prêt.",
      },
      en: {
        term: "Close-out visit (end of trial)",
        short:
          "Closing a site cleanly: data resolved, documentation complete, archiving ready.",
      },
    },
  },
  {
    slug: "monitoring-a-distance",
    group: "monitoring",
    href: "/services/monitoring-a-distance",
    translations: {
      fr: {
        term: "Monitoring à distance",
        short:
          "Assurer un suivi continu des centres entre deux visites sur site, quand le protocole et les accès le permettent.",
      },
      en: {
        term: "Remote monitoring",
        short:
          "Keeping sites under continuous follow-up between on-site visits, where the protocol and access allow.",
      },
    },
  },
  {
    slug: "sdv",
    group: "monitoring",
    translations: {
      fr: {
        term: "SDV (vérification des données source)",
        short:
          "Comparer les données du cahier d'observation (CRF / eCRF) aux documents sources du centre, pour garantir des données fiables.",
      },
      en: {
        term: "SDV (source data verification)",
        short:
          "Comparing the data in the case report form (CRF / eCRF) with the site's source documents, to ensure reliable data.",
      },
    },
  },
  {
    slug: "rapport-de-monitoring",
    group: "monitoring",
    translations: {
      fr: {
        term: "Rapport de monitoring",
        short:
          "Le compte rendu rédigé par l'ARC après chaque visite : constats, écarts, actions correctives et points ouverts à suivre.",
      },
      en: {
        term: "Monitoring visit report",
        short:
          "The report written by the CRA after each visit: findings, deviations, corrective actions and open items to track.",
      },
    },
  },
];

export function getGlossaryTerm(slug: string): GlossaryTerm | undefined {
  return glossaryTerms.find((t) => t.slug === slug);
}

/** Slugs that have their own fiche (no `href`). */
export function getGlossaryFicheSlugs(): string[] {
  return glossaryTerms.filter((t) => !t.href).map((t) => t.slug);
}
