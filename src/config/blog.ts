/**
 * BLOG CONTENT REGISTRY
 * -------------------------------------------------------------------------
 * Metadata for each blog post (type-safe, bilingual). The article body for
 * each post lives in Markdown files:
 *     src/content/blog/<slug>.fr.md
 *     src/content/blog/<slug>.en.md
 *
 * To add a post:
 *   1. Add an entry here (slug, date, tags, FR/EN title + excerpt).
 *   2. Create the two Markdown files above with the article body.
 *
 * Posts are evergreen, informational guides grounded in standard ICH-GCP
 * (ICH E6) practice — no fabricated credentials, employers, studies or client
 * references. They form the informational cluster around the homepage pillar.
 */

export interface BlogPostMeta {
  /** URL slug; must match the Markdown file names. */
  readonly slug: string;
  /** ISO date (YYYY-MM-DD). Used for ordering and structured data. */
  readonly date: string;
  /** Optional last-updated date (YYYY-MM-DD); drives dateModified + display. */
  readonly updated?: string;
  readonly tags?: { readonly fr: readonly string[]; readonly en: readonly string[] };
  readonly translations: {
    readonly fr: { readonly title: string; readonly excerpt: string };
    readonly en: { readonly title: string; readonly excerpt: string };
  };
}

export const blogPosts: ReadonlyArray<BlogPostMeta> = [
  {
    slug: "acteurs-de-la-recherche-clinique",
    date: "2026-11-25",
    updated: "2026-11-25",
    tags: {
      fr: ["Recherche clinique", "Métier"],
      en: ["Clinical research", "Profession"],
    },
    translations: {
      fr: {
        title: "Les acteurs de la recherche clinique : qui fait quoi ?",
        excerpt:
          "Promoteur, CRO, ARC, investigateur, TEC, data manager : le rôle de chaque acteur d'un essai clinique et comment ils s'articulent.",
      },
      en: {
        title: "The players in clinical research: who does what?",
        excerpt:
          "Sponsor, CRO, CRA, investigator, technician, data manager: the role of each player in a clinical trial and how they fit together.",
      },
    },
  },
  {
    slug: "randomisation-insu-placebo",
    date: "2026-11-25",
    updated: "2026-11-25",
    tags: {
      fr: ["Méthodologie", "Design"],
      en: ["Methodology", "Design"],
    },
    translations: {
      fr: {
        title:
          "Randomisation, insu et placebo : comprendre le design d'un essai",
        excerpt:
          "Les trois piliers méthodologiques qui limitent les biais d'un essai clinique : randomisation, insu (aveugle) et placebo, expliqués simplement.",
      },
      en: {
        title:
          "Randomisation, blinding and placebo: understanding trial design",
        excerpt:
          "The three methodological pillars that limit bias in a clinical trial: randomisation, blinding and placebo, explained simply.",
      },
    },
  },
  {
    slug: "arc-promoteur-ou-arc-investigateur",
    date: "2026-11-25",
    updated: "2026-11-25",
    tags: {
      fr: ["Métier", "ARC"],
      en: ["Profession", "CRA"],
    },
    translations: {
      fr: {
        title: "ARC promoteur ou ARC investigateur : quelles différences ?",
        excerpt:
          "Deux métiers d'ARC souvent confondus : l'ARC promoteur qui monitore de l'extérieur, l'ARC investigateur qui travaille au centre. Rôles, différences et place du TEC.",
      },
      en: {
        title: "Sponsor CRA or site CRA: what's the difference?",
        excerpt:
          "Two often-confused CRA roles: the sponsor CRA who monitors from outside, the site CRA who works within the site. Roles, differences and where the technician fits.",
      },
    },
  },
  {
    slug: "cra-freelance-ou-cro",
    date: "2026-11-25",
    updated: "2026-11-25",
    tags: {
      fr: ["CRA freelance", "CRO"],
      en: ["Freelance CRA", "CRO"],
    },
    translations: {
      fr: {
        title: "CRA freelance ou CRO : quelle solution pour votre étude ?",
        excerpt:
          "Externaliser le monitoring à une CRO ou faire appel à un CRA freelance : les différences de périmètre, de coût et de flexibilité, et quand choisir l'un ou l'autre.",
      },
      en: {
        title: "Freelance CRA or CRO: which solution for your study?",
        excerpt:
          "Outsourcing monitoring to a CRO or calling on a freelance CRA: the differences in scope, cost and flexibility, and when to choose each.",
      },
    },
  },
  {
    slug: "les-4-visites-de-monitoring",
    date: "2026-11-25",
    updated: "2026-11-25",
    tags: {
      fr: ["Monitoring", "Visites de centre"],
      en: ["Monitoring", "Site visits"],
    },
    translations: {
      fr: {
        title:
          "Les 4 visites de monitoring : sélection, initiation, suivi, clôture",
        excerpt:
          "Le cycle de vie d'un centre investigateur, visite par visite : sélection, initiation, monitoring et clôture, et comment elles s'articulent.",
      },
      en: {
        title:
          "The 4 clinical trial monitoring visits: selection, initiation, interim, close-out",
        excerpt:
          "An investigator site's life cycle, visit by visit: selection, initiation, monitoring and close-out, and how they fit together.",
      },
    },
  },
  {
    slug: "qu-est-ce-qu-un-arc-cra",
    date: "2026-11-15",
    updated: "2026-11-15",
    tags: {
      fr: ["Recherche clinique", "Métier"],
      en: ["Clinical research", "Profession"],
    },
    translations: {
      fr: {
        title: "Qu'est-ce qu'un Attaché de Recherche Clinique (ARC / CRA) ?",
        excerpt:
          "Définition, rôle, missions et compétences de l'Attaché de Recherche Clinique (ARC / CRA), et la différence entre ARC promoteur et ARC hospitalier.",
      },
      en: {
        title: "What is a Clinical Research Associate (CRA)?",
        excerpt:
          "Definition, role, duties and skills of a Clinical Research Associate (CRA), and the difference between a sponsor CRA and a site-based CRA.",
      },
    },
  },
  {
    slug: "arc-freelance-vs-chef-de-projet-clinique",
    date: "2026-11-15",
    updated: "2026-11-15",
    tags: {
      fr: ["CRA freelance", "Gestion de projet"],
      en: ["Freelance CRA", "Project management"],
    },
    translations: {
      fr: {
        title:
          "ARC freelance ou chef de projet clinique : quelles différences ?",
        excerpt:
          "Périmètre, responsabilités et quand choisir un ARC freelance plutôt qu'un chef de projet clinique pour votre étude.",
      },
      en: {
        title:
          "Freelance CRA vs clinical project manager: what's the difference?",
        excerpt:
          "Scope, responsibilities and when to choose a freelance CRA rather than a clinical project manager for your study.",
      },
    },
  },
  {
    slug: "tjm-arc-freelance",
    date: "2026-11-15",
    updated: "2026-11-15",
    tags: {
      fr: ["CRA freelance", "Tarif"],
      en: ["Freelance CRA", "Rates"],
    },
    translations: {
      fr: {
        title: "Tarif et TJM d'un ARC freelance : comment ça marche ?",
        excerpt:
          "Ce que recouvre le taux journalier d'un ARC freelance, les facteurs qui l'influencent et pourquoi le tarif se fait sur devis.",
      },
      en: {
        title: "Freelance CRA rates and daily rate: how it works",
        excerpt:
          "What a freelance CRA's daily rate covers, the factors that drive it, and why pricing is quoted per assignment.",
      },
    },
  },
  {
    slug: "recruter-arc-freelance",
    date: "2026-11-15",
    updated: "2026-11-15",
    tags: {
      fr: ["CRA freelance", "Collaboration"],
      en: ["Freelance CRA", "Collaboration"],
    },
    translations: {
      fr: {
        title: "Comment recruter un ARC freelance pour votre étude ?",
        excerpt:
          "Définir le besoin, où trouver un ARC freelance, le processus de contractualisation et les points BPC à vérifier avant de démarrer.",
      },
      en: {
        title: "How to hire a freelance CRA for your study",
        excerpt:
          "Define the need, where to find a freelance CRA, the contracting process and the GCP points to check before starting.",
      },
    },
  },
  {
    slug: "monitoring-base-sur-les-risques",
    date: "2026-11-15",
    updated: "2026-11-15",
    tags: {
      fr: ["Monitoring", "BPC"],
      en: ["Monitoring", "GCP"],
    },
    translations: {
      fr: {
        title: "Le monitoring basé sur les risques (RBM) : ce qu'il change",
        excerpt:
          "Comment le monitoring basé sur les risques (ICH E6 R2/R3) recentre le suivi sur les données et les processus critiques d'un essai clinique.",
      },
      en: {
        title: "Risk-based monitoring (RBM): what it changes",
        excerpt:
          "How risk-based monitoring (ICH E6 R2/R3) refocuses oversight on the critical data and processes of a clinical trial.",
      },
    },
  },
  {
    slug: "monitoring-a-distance",
    date: "2026-11-15",
    updated: "2026-11-15",
    tags: {
      fr: ["Monitoring", "Remote"],
      en: ["Monitoring", "Remote"],
    },
    translations: {
      fr: {
        title: "Le monitoring à distance : possibilités et limites",
        excerpt:
          "Ce que le remote monitoring permet (revue des données, queries, suivi du TMF) et pourquoi certaines vérifications restent sur site.",
      },
      en: {
        title: "Remote monitoring: what it can and can't do",
        excerpt:
          "What remote monitoring covers (data review, queries, TMF follow-up) and why some checks still require on-site visits.",
      },
    },
  },
  {
    slug: "preparer-audit-inspection",
    date: "2026-11-15",
    updated: "2026-11-15",
    tags: {
      fr: ["Audit", "Conformité"],
      en: ["Audit", "Compliance"],
    },
    translations: {
      fr: {
        title: "Préparer un audit ou une inspection clinique (ANSM, EMA, FDA)",
        excerpt:
          "Les réflexes pour garder un centre prêt à tout moment : documentation, données source, déviations et plans d'action.",
      },
      en: {
        title: "Preparing for a clinical audit or inspection (ANSM, EMA, FDA)",
        excerpt:
          "The habits that keep a site inspection-ready: documentation, source data, deviations and action plans.",
      },
    },
  },
  {
    slug: "qualite-donnees-sdv",
    date: "2026-11-15",
    updated: "2026-11-15",
    tags: {
      fr: ["Qualité", "Données"],
      en: ["Quality", "Data"],
    },
    translations: {
      fr: {
        title: "Qualité des données : SDV, SDR et gestion des queries",
        excerpt:
          "Comment la vérification des données source (SDV/SDR) et le traitement des queries protègent l'intégrité des données d'un essai clinique.",
      },
      en: {
        title: "Data quality: SDV, SDR and query management",
        excerpt:
          "How source data verification (SDV/SDR) and query handling protect the integrity of a clinical trial's data.",
      },
    },
  },
];
