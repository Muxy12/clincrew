/**
 * SERVICE DETAIL PAGES REGISTRY
 * -------------------------------------------------------------------------
 * Each entry produces a standalone, indexable page at /[locale]/services/<slug>
 * (shared slug across locales, like the blog). The long-form body for each
 * service lives in Markdown files:
 *     src/content/services/<slug>.fr.md
 *     src/content/services/<slug>.en.md
 *
 * Content is GENERIC and grounded in standard ICH-GCP (ICH E6) practice — no
 * fabricated clients, studies, numbers or credentials. The hub page
 * (/services) links to every entry below (hub-and-spoke internal linking).
 */

import type { LucideIcon } from "lucide-react";
import {
  Search,
  Rocket,
  Activity,
  CheckCircle2,
  Users,
  FileText,
  Workflow,
} from "lucide-react";
import type { Locale } from "@/i18n/routing";

export type ServiceGroup = "visits" | "support";

export interface ServicePageMeta {
  /** URL slug; must match the Markdown file names. */
  readonly slug: string;
  readonly group: ServiceGroup;
  readonly icon: LucideIcon;
  readonly translations: Record<
    Locale,
    {
      readonly title: string;
      readonly excerpt: string;
      readonly metaTitle: string;
      readonly metaDescription: string;
    }
  >;
}

export const servicePages: ReadonlyArray<ServicePageMeta> = [
  {
    slug: "visite-de-selection",
    group: "visits",
    icon: Search,
    translations: {
      fr: {
        title: "Visite de sélection",
        excerpt:
          "Évaluer, avant toute ouverture, la capacité réelle d'un centre investigateur à mener votre étude.",
        metaTitle: "Visite de sélection d'un centre investigateur | CRA freelance",
        metaDescription:
          "La visite de sélection (SV) évalue l'équipe, la patientèle, les moyens et la conformité d'un centre avant son ouverture. Déroulé et livrables, par un CRA freelance senior.",
      },
      en: {
        title: "Site selection visit",
        excerpt:
          "Assessing, before any activation, a site's real ability to run your study.",
        metaTitle: "Site selection visit (SSV) | Freelance CRA",
        metaDescription:
          "A site selection visit (SSV) assesses the team, patient pool, resources and compliance of a site before activation. Process and deliverables, by a senior freelance CRA.",
      },
    },
  },
  {
    slug: "visite-d-initiation",
    group: "visits",
    icon: Rocket,
    translations: {
      fr: {
        title: "Visite d'initiation",
        excerpt:
          "Former l'équipe au protocole et vérifier que le centre est prêt à inclure, dans les règles.",
        metaTitle: "Visite d'initiation (SIV) d'un essai clinique | CRA freelance",
        metaDescription:
          "La visite d'initiation (SIV) forme l'équipe investigatrice au protocole et aux procédures, et confirme que le centre peut démarrer les inclusions. Déroulé, par un CRA freelance senior.",
      },
      en: {
        title: "Site initiation visit",
        excerpt:
          "Training the team on the protocol and confirming the site is ready to enrol, by the book.",
        metaTitle: "Site initiation visit (SIV) | Freelance CRA",
        metaDescription:
          "A site initiation visit (SIV) trains the investigator team on the protocol and procedures, and confirms the site can start enrolment. Process, by a senior freelance CRA.",
      },
    },
  },
  {
    slug: "visites-de-monitoring",
    group: "visits",
    icon: Activity,
    translations: {
      fr: {
        title: "Visites de monitoring",
        excerpt:
          "Protéger la sécurité des patients et la fiabilité des données tout au long de l'étude.",
        metaTitle: "Visites de monitoring (IMV) d'un essai clinique | CRA freelance",
        metaDescription:
          "Les visites de monitoring (IMV) contrôlent la sécurité des patients, la conformité au protocole et la qualité des données. Monitoring basé sur les risques (ICH E6), par un CRA freelance senior.",
      },
      en: {
        title: "Monitoring visits",
        excerpt:
          "Protecting patient safety and data reliability throughout the study.",
        metaTitle: "Interim monitoring visits (IMV) | Freelance CRA",
        metaDescription:
          "Interim monitoring visits (IMV) verify patient safety, protocol compliance and data quality. Risk-based monitoring (ICH E6), by a senior freelance CRA.",
      },
    },
  },
  {
    slug: "visite-de-cloture",
    group: "visits",
    icon: CheckCircle2,
    translations: {
      fr: {
        title: "Visite de clôture",
        excerpt:
          "Clôturer un centre proprement : données résolues, documentation complète, archivage prêt.",
        metaTitle: "Visite de clôture (COV) d'un centre investigateur | CRA freelance",
        metaDescription:
          "La visite de clôture (COV) confirme que les données sont résolues, le TMF complet et l'archivage organisé avant la fermeture d'un centre. Déroulé, par un CRA freelance senior.",
      },
      en: {
        title: "Close-out visit",
        excerpt:
          "Closing a site cleanly: data resolved, documentation complete, archiving ready.",
        metaTitle: "Site close-out visit (COV) | Freelance CRA",
        metaDescription:
          "A close-out visit (COV) confirms data are resolved, the TMF is complete and archiving is organised before a site is closed. Process, by a senior freelance CRA.",
      },
    },
  },
  {
    slug: "suivi-des-centres",
    group: "support",
    icon: Users,
    translations: {
      fr: {
        title: "Suivi des centres investigateurs",
        excerpt:
          "Entre deux visites, garder chaque centre actif, à jour et sans point bloquant.",
        metaTitle: "Suivi des centres investigateurs | CRA freelance",
        metaDescription:
          "Le suivi des centres investigateurs maintient le contact entre les visites : relances, résolution des écarts, suivi des actions et des recrutements. Par un CRA freelance senior.",
      },
      en: {
        title: "Investigator site management",
        excerpt:
          "Between visits, keeping every site active, up to date and unblocked.",
        metaTitle: "Investigator site management | Freelance CRA",
        metaDescription:
          "Investigator site management keeps sites moving between visits: follow-ups, deviation resolution, action tracking and recruitment support. By a senior freelance CRA.",
      },
    },
  },
  {
    slug: "controle-documentation",
    group: "support",
    icon: FileText,
    translations: {
      fr: {
        title: "Contrôle de la documentation clinique",
        excerpt:
          "Un TMF et des classeurs centre toujours prêts pour un audit ou une inspection.",
        metaTitle: "Contrôle de la documentation clinique (TMF / ISF) | CRA freelance",
        metaDescription:
          "Le contrôle de la documentation clinique garde le TMF et le classeur investigateur (ISF) complets, à jour et traçables, prêts pour une inspection. Par un CRA freelance senior.",
      },
      en: {
        title: "Clinical documentation control",
        excerpt:
          "A TMF and site files that stay audit- and inspection-ready at all times.",
        metaTitle: "Clinical documentation & TMF control | Freelance CRA",
        metaDescription:
          "Clinical documentation control keeps the TMF and investigator site file (ISF) complete, current and traceable, ready for inspection. By a senior freelance CRA.",
      },
    },
  },
  {
    slug: "support-operationnel",
    group: "support",
    icon: Workflow,
    translations: {
      fr: {
        title: "Support aux opérations cliniques",
        excerpt:
          "Un renfort opérationnel flexible pour absorber un pic de charge ou combler un manque.",
        metaTitle: "Support aux opérations cliniques | CRA freelance",
        metaDescription:
          "Un support aux opérations cliniques flexible : renfort de monitoring, coordination, reprise de centres ou appui ponctuel sur une étude. Par un CRA freelance senior.",
      },
      en: {
        title: "Clinical operations support",
        excerpt:
          "Flexible operational backup to absorb a workload peak or fill a gap.",
        metaTitle: "Clinical operations support | Freelance CRA",
        metaDescription:
          "Flexible clinical operations support: monitoring overflow, coordination, site hand-overs or ad-hoc study backup. By a senior freelance CRA.",
      },
    },
  },
];

export function getServicePageMeta(slug: string): ServicePageMeta | undefined {
  return servicePages.find((s) => s.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return servicePages.map((s) => s.slug);
}
