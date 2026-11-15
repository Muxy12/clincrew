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
 * The starter posts below are GENERIC editorial drafts (no fabricated
 * credentials, employers, studies or client references). Review, edit or
 * replace them before publication — see PRELAUNCH.md.
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
    slug: "role-cra-independant",
    date: "2026-09-18",
    updated: "2026-11-01",
    tags: {
      fr: ["Recherche clinique", "Collaboration"],
      en: ["Clinical research", "Collaboration"],
    },
    translations: {
      fr: {
        title:
          "Le rôle d'un CRA indépendant dans le bon déroulement d'un essai",
        excerpt:
          "Pourquoi un Attaché de Recherche Clinique freelance peut apporter souplesse et proximité aux équipes opérationnelles, sans rien céder à la rigueur.",
      },
      en: {
        title:
          "The role of an independent CRA in a well-run clinical trial",
        excerpt:
          "Why a freelance Clinical Research Associate can bring flexibility and proximity to operational teams, without compromising on rigor.",
      },
    },
  },
  {
    slug: "qualite-donnees-monitoring",
    date: "2026-10-06",
    updated: "2026-11-01",
    tags: {
      fr: ["Monitoring", "Qualité"],
      en: ["Monitoring", "Quality"],
    },
    translations: {
      fr: {
        title: "Qualité des données : ce que le monitoring sur site change",
        excerpt:
          "Le suivi des centres ne se résume pas à vérifier des cases. Retour sur ce qu'un monitoring attentif apporte à la fiabilité d'une étude.",
      },
      en: {
        title: "Data quality: what on-site monitoring really changes",
        excerpt:
          "Site monitoring is more than ticking boxes. A look at what attentive monitoring brings to the reliability of a study.",
      },
    },
  },
  {
    slug: "visites-monitoring-essai-clinique",
    date: "2026-10-20",
    updated: "2026-11-01",
    tags: {
      fr: ["Monitoring", "BPC"],
      en: ["Monitoring", "GCP"],
    },
    translations: {
      fr: {
        title:
          "Les visites de monitoring d'un essai clinique : à quoi servent-elles ?",
        excerpt:
          "Sélection, initiation, suivi, clôture : le rôle de chaque visite de monitoring et ce que le monitoring basé sur les risques (ICH E6) a changé.",
      },
      en: {
        title: "Clinical trial monitoring visits: what are they for?",
        excerpt:
          "Selection, initiation, routine, close-out: the role of each monitoring visit and what risk-based monitoring (ICH E6) changed.",
      },
    },
  },
  {
    slug: "cadrer-mission-cra-freelance",
    date: "2026-10-28",
    updated: "2026-11-01",
    tags: {
      fr: ["CRA freelance", "Collaboration"],
      en: ["Freelance CRA", "Collaboration"],
    },
    translations: {
      fr: {
        title: "CRA freelance : comment bien cadrer une mission",
        excerpt:
          "Périmètre, livrables, accès et responsabilités BPC : les points à clarifier pour qu'une mission de CRA freelance démarre sans friction.",
      },
      en: {
        title: "Freelance CRA: how to scope an assignment well",
        excerpt:
          "Scope, deliverables, access and GCP responsibilities: what to clarify so a freelance CRA assignment starts without friction.",
      },
    },
  },
];
