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
  readonly tags?: { readonly fr: readonly string[]; readonly en: readonly string[] };
  readonly translations: {
    readonly fr: { readonly title: string; readonly excerpt: string };
    readonly en: { readonly title: string; readonly excerpt: string };
  };
}

export const blogPosts: ReadonlyArray<BlogPostMeta> = [
  {
    slug: "role-cra-independant",
    date: "2026-09-18",
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
];
