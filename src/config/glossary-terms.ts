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

export type GlossaryGroup = "monitoring" | "roles" | "regulatory";

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

export const glossaryGroups: ReadonlyArray<GlossaryGroup> = [
  "monitoring",
  "roles",
  "regulatory",
];

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

  // --- Rôles & écosystème ---
  {
    slug: "attache-de-recherche-clinique",
    group: "roles",
    href: "/blog/qu-est-ce-qu-un-arc-cra",
    translations: {
      fr: {
        term: "Attaché de Recherche Clinique (ARC / CRA)",
        short:
          "Le professionnel qui assure le monitoring et le suivi opérationnel des essais cliniques auprès des centres.",
      },
      en: {
        term: "Clinical Research Associate (CRA)",
        short:
          "The professional who handles the monitoring and operational follow-up of clinical trials at sites.",
      },
    },
  },
  {
    slug: "arc-promoteur",
    group: "roles",
    translations: {
      fr: {
        term: "ARC promoteur",
        short:
          "L'ARC qui monitore les centres pour le compte du promoteur ou de la CRO, de la sélection à la clôture.",
      },
      en: {
        term: "Sponsor CRA",
        short:
          "The CRA who monitors sites on behalf of the sponsor or CRO, from selection to close-out.",
      },
    },
  },
  {
    slug: "arc-investigateur",
    group: "roles",
    translations: {
      fr: {
        term: "ARC investigateur (ARC de site)",
        short:
          "L'ARC qui travaille au sein du centre investigateur, aux côtés de l'investigateur, pour organiser l'étude.",
      },
      en: {
        term: "Site CRA",
        short:
          "The CRA who works within the investigator site, alongside the investigator, to run the study locally.",
      },
    },
  },
  {
    slug: "tec",
    group: "roles",
    translations: {
      fr: {
        term: "TEC (Technicien d'Études Cliniques)",
        short:
          "Le technicien qui assiste l'investigateur au centre : logistique, recueil et saisie des données.",
      },
      en: {
        term: "Clinical trial technician (TEC)",
        short:
          "The technician who assists the investigator at the site: logistics, data collection and entry.",
      },
    },
  },
  {
    slug: "chef-de-projet-clinique",
    group: "roles",
    translations: {
      fr: {
        term: "Chef de projet clinique",
        short:
          "Le pilote d'un essai dans sa globalité : budget, délais, équipes, centres et prestataires.",
      },
      en: {
        term: "Clinical project manager",
        short:
          "The person who steers a trial as a whole: budget, timelines, teams, sites and vendors.",
      },
    },
  },
  {
    slug: "data-manager",
    group: "roles",
    translations: {
      fr: {
        term: "Data manager",
        short:
          "Le gestionnaire qui conçoit et pilote la base de données d'un essai et garantit la qualité des données.",
      },
      en: {
        term: "Clinical data manager",
        short:
          "The manager who designs and runs a trial's database and safeguards data quality.",
      },
    },
  },
  {
    slug: "investigateur",
    group: "roles",
    translations: {
      fr: {
        term: "Investigateur (principal)",
        short:
          "Le médecin responsable de la conduite de l'essai sur un centre et de la sécurité des participants.",
      },
      en: {
        term: "Investigator (principal)",
        short:
          "The physician responsible for running the trial at a site and for participant safety.",
      },
    },
  },
  {
    slug: "promoteur",
    group: "roles",
    translations: {
      fr: {
        term: "Promoteur (sponsor)",
        short:
          "La personne ou l'entité qui prend l'initiative d'un essai clinique et en assume la responsabilité.",
      },
      en: {
        term: "Sponsor",
        short:
          "The person or entity that initiates a clinical trial and takes responsibility for it.",
      },
    },
  },
  {
    slug: "cro",
    group: "roles",
    translations: {
      fr: {
        term: "CRO (Contract Research Organization)",
        short:
          "Le prestataire à qui un promoteur confie tout ou partie de la conduite d'un essai clinique.",
      },
      en: {
        term: "CRO (Contract Research Organization)",
        short:
          "The provider a sponsor entrusts with all or part of running a clinical trial.",
      },
    },
  },

  // --- Réglementaire & qualité ---
  {
    slug: "bonnes-pratiques-cliniques",
    group: "regulatory",
    translations: {
      fr: {
        term: "Bonnes Pratiques Cliniques (BPC / ICH-GCP)",
        short:
          "Le référentiel international (ICH E6) qui encadre la conduite éthique et scientifique des essais cliniques.",
      },
      en: {
        term: "Good Clinical Practice (GCP / ICH-GCP)",
        short:
          "The international standard (ICH E6) that governs the ethical and scientific conduct of clinical trials.",
      },
    },
  },
  {
    slug: "ansm",
    group: "regulatory",
    translations: {
      fr: {
        term: "ANSM",
        short:
          "L'Agence nationale de sécurité du médicament : l'autorité qui autorise et surveille les essais cliniques en France.",
      },
      en: {
        term: "ANSM",
        short:
          "France's medicines safety agency: the authority that authorises and oversees clinical trials in France.",
      },
    },
  },
  {
    slug: "ema",
    group: "regulatory",
    translations: {
      fr: {
        term: "EMA",
        short:
          "L'Agence européenne des médicaments : elle évalue et supervise les médicaments au niveau de l'Union européenne.",
      },
      en: {
        term: "EMA",
        short:
          "The European Medicines Agency: it evaluates and supervises medicines at European Union level.",
      },
    },
  },
  {
    slug: "cpp",
    group: "regulatory",
    translations: {
      fr: {
        term: "CPP (Comité de Protection des Personnes)",
        short:
          "Le comité d'éthique qui rend un avis sur un projet de recherche avant son démarrage, pour protéger les participants.",
      },
      en: {
        term: "Ethics committee (CPP)",
        short:
          "The ethics committee that gives an opinion on a research project before it starts, to protect participants.",
      },
    },
  },
  {
    slug: "pharmacovigilance",
    group: "regulatory",
    translations: {
      fr: {
        term: "Pharmacovigilance",
        short:
          "La surveillance des effets indésirables des médicaments, pendant et après l'essai, pour garantir la sécurité des patients.",
      },
      en: {
        term: "Pharmacovigilance",
        short:
          "The monitoring of medicines' adverse effects, during and after the trial, to safeguard patient safety.",
      },
    },
  },
  {
    slug: "evenement-indesirable",
    group: "regulatory",
    translations: {
      fr: {
        term: "Événement indésirable (EI / EIG)",
        short:
          "Toute manifestation médicale fâcheuse survenant chez un participant ; qualifiée de grave (EIG) selon ses conséquences.",
      },
      en: {
        term: "Adverse event (AE / SAE)",
        short:
          "Any untoward medical occurrence in a participant; classed as serious (SAE) depending on its consequences.",
      },
    },
  },
  {
    slug: "audit-et-inspection",
    group: "regulatory",
    translations: {
      fr: {
        term: "Audit et inspection clinique",
        short:
          "Le contrôle de conformité d'un essai : interne (audit, par le promoteur) ou externe (inspection, par une autorité).",
      },
      en: {
        term: "Clinical audit and inspection",
        short:
          "The compliance check of a trial: internal (audit, by the sponsor) or external (inspection, by an authority).",
      },
    },
  },
  {
    slug: "amm",
    group: "regulatory",
    translations: {
      fr: {
        term: "AMM (Autorisation de Mise sur le Marché)",
        short:
          "L'autorisation qui permet de commercialiser un médicament, délivrée après évaluation de son efficacité et de sa sécurité.",
      },
      en: {
        term: "Marketing authorisation",
        short:
          "The authorisation that allows a medicine to be marketed, granted after assessing its efficacy and safety.",
      },
    },
  },
  {
    slug: "reglement-europeen-essais-cliniques",
    group: "regulatory",
    translations: {
      fr: {
        term: "Règlement européen essais cliniques (CTR 536/2014)",
        short:
          "Le cadre européen qui harmonise l'autorisation et la conduite des essais de médicaments via le portail CTIS.",
      },
      en: {
        term: "EU Clinical Trials Regulation (CTR 536/2014)",
        short:
          "The European framework that harmonises the authorisation and conduct of medicine trials through the CTIS portal.",
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
