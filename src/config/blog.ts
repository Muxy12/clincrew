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
    slug: "cta-clinical-trial-application",
    date: "2026-11-26",
    updated: "2026-11-26",
    tags: { fr: ["Réglementaire", "Autorisation"], en: ["Regulatory", "Authorisation"] },
    translations: {
      fr: {
        title: "Le CTA (Clinical Trial Application) : la demande d'autorisation d'essai",
        excerpt:
          "Le CTA est le dossier de demande d'autorisation d'un essai clinique. Son contenu, le portail CTIS et sa différence avec le Clinical Trial Agreement.",
      },
      en: {
        title: "The CTA (Clinical Trial Application): the trial authorisation request",
        excerpt:
          "The CTA is the application dossier to authorise a clinical trial. Its content, the CTIS portal, and how it differs from a Clinical Trial Agreement.",
      },
    },
  },
  {
    slug: "cnil-recherche-clinique",
    date: "2026-11-26",
    updated: "2026-11-26",
    tags: { fr: ["Réglementaire", "Données personnelles"], en: ["Regulatory", "Personal data"] },
    translations: {
      fr: {
        title: "La CNIL et la protection des données en recherche clinique",
        excerpt:
          "RGPD, méthodologies de référence (MR-001/MR-004) : le rôle de la CNIL dans la protection des données personnelles des participants à un essai clinique.",
      },
      en: {
        title: "The CNIL and data protection in clinical research",
        excerpt:
          "GDPR and reference methodologies (MR-001/MR-004): the role of France's CNIL in protecting participants' personal data in a clinical trial.",
      },
    },
  },
  {
    slug: "queries-recherche-clinique",
    date: "2026-11-26",
    updated: "2026-11-26",
    tags: { fr: ["Données", "Qualité"], en: ["Data", "Quality"] },
    translations: {
      fr: {
        title: "Les queries en recherche clinique : définition et gestion",
        excerpt:
          "Une query est une demande de clarification sur une donnée d'un essai. À quoi elles servent, qui les émet et comment elles protègent la qualité des données.",
      },
      en: {
        title: "Queries in clinical research: definition and handling",
        excerpt:
          "A query is a request to clarify a data point in a trial. What they are for, who raises them, and how they protect data quality.",
      },
    },
  },
  {
    slug: "susar-recherche-clinique",
    date: "2026-11-26",
    updated: "2026-11-26",
    tags: { fr: ["Sécurité", "Pharmacovigilance"], en: ["Safety", "Pharmacovigilance"] },
    translations: {
      fr: {
        title: "Le SUSAR en recherche clinique : définition et déclaration",
        excerpt:
          "Un SUSAR est une suspicion d'effet indésirable grave et inattendu. Définition, critères, délais de déclaration et rôle de l'ARC.",
      },
      en: {
        title: "SUSAR in clinical research: definition and reporting",
        excerpt:
          "A SUSAR is a suspected unexpected serious adverse reaction. Definition, criteria, reporting timelines and the CRA's role.",
      },
    },
  },
  {
    slug: "convention-unique",
    date: "2026-11-26",
    updated: "2026-11-26",
    tags: { fr: ["Réglementaire", "France"], en: ["Regulatory", "France"] },
    translations: {
      fr: {
        title: "La convention unique en recherche clinique : à quoi ça sert ?",
        excerpt:
          "La convention unique encadre les essais à promotion industrielle dans les établissements de santé en France. Principe, objectifs et impact sur la mise en place.",
      },
      en: {
        title: "The single agreement (convention unique) in clinical research",
        excerpt:
          "The French single agreement frames industry-sponsored trials in healthcare facilities. Principle, objectives and impact on site set-up.",
      },
    },
  },
  {
    slug: "crf-ecrf-cahier-d-observation",
    date: "2026-11-26",
    updated: "2026-11-26",
    tags: { fr: ["Données", "Outils"], en: ["Data", "Tools"] },
    translations: {
      fr: {
        title: "Le CRF et l'eCRF (cahier d'observation) en recherche clinique",
        excerpt:
          "Qu'est-ce que le cahier d'observation (CRF), sa version électronique (eCRF), à quoi il sert et comment l'ARC le contrôle lors du monitoring.",
      },
      en: {
        title: "The CRF and eCRF (case report form) in clinical research",
        excerpt:
          "What the case report form (CRF) and its electronic version (eCRF) are, what they are for, and how the CRA checks them during monitoring.",
      },
    },
  },
  {
    slug: "ctms-recherche-clinique",
    date: "2026-11-26",
    updated: "2026-11-26",
    tags: { fr: ["Outils", "Gestion d'étude"], en: ["Tools", "Study management"] },
    translations: {
      fr: {
        title: "Le CTMS (Clinical Trial Management System) en recherche clinique",
        excerpt:
          "À quoi sert un CTMS, ce qu'il permet de piloter (centres, visites, recrutement) et comment il s'articule avec l'eCRF et l'eTMF.",
      },
      en: {
        title: "The CTMS (Clinical Trial Management System) in clinical research",
        excerpt:
          "What a CTMS is for, what it helps steer (sites, visits, recruitment) and how it connects with the eCRF and eTMF.",
      },
    },
  },
  {
    slug: "qu-est-ce-que-la-recherche-clinique",
    date: "2026-11-26",
    updated: "2026-11-26",
    tags: { fr: ["Recherche clinique", "Définition"], en: ["Clinical research", "Definition"] },
    translations: {
      fr: {
        title: "Qu'est-ce que la recherche clinique ?",
        excerpt:
          "Définition, objectifs et grandes catégories de la recherche clinique (interventionnelle, non interventionnelle), et comment un essai se déroule.",
      },
      en: {
        title: "What is clinical research?",
        excerpt:
          "Definition, objectives and main categories of clinical research (interventional, non-interventional), and how a trial unfolds.",
      },
    },
  },
  {
    slug: "etude-interventionnelle",
    date: "2026-11-26",
    updated: "2026-11-26",
    tags: { fr: ["Méthodologie", "Réglementaire"], en: ["Methodology", "Regulatory"] },
    translations: {
      fr: {
        title: "Qu'est-ce qu'une étude interventionnelle ?",
        excerpt:
          "Définition d'une étude interventionnelle, ce qui la distingue d'une recherche non interventionnelle, et les obligations réglementaires associées.",
      },
      en: {
        title: "What is an interventional study?",
        excerpt:
          "Definition of an interventional study, how it differs from a non-interventional one, and the regulatory obligations that come with it.",
      },
    },
  },
  {
    slug: "recherche-non-interventionnelle",
    date: "2026-11-26",
    updated: "2026-11-26",
    tags: { fr: ["Méthodologie", "Observationnel"], en: ["Methodology", "Observational"] },
    translations: {
      fr: {
        title: "La recherche non interventionnelle (observationnelle) : définition",
        excerpt:
          "Ce qu'est une recherche non interventionnelle, aussi appelée observationnelle : principe, exemples et différences avec une étude interventionnelle.",
      },
      en: {
        title: "Non-interventional (observational) research: definition",
        excerpt:
          "What non-interventional research, also called observational, is: principle, examples and differences from an interventional study.",
      },
    },
  },
  {
    slug: "recherche-translationnelle",
    date: "2026-11-26",
    updated: "2026-11-26",
    tags: { fr: ["Recherche clinique", "Définition"], en: ["Clinical research", "Definition"] },
    translations: {
      fr: {
        title: "La recherche translationnelle : définition et enjeux",
        excerpt:
          "La recherche translationnelle fait le pont entre la recherche fondamentale et la recherche clinique. Définition, exemples et place dans le développement d'un médicament.",
      },
      en: {
        title: "Translational research: definition and stakes",
        excerpt:
          "Translational research bridges basic research and clinical research. Definition, examples and its place in a medicine's development.",
      },
    },
  },
  {
    slug: "etude-monocentrique-ou-multicentrique",
    date: "2026-11-26",
    updated: "2026-11-26",
    tags: { fr: ["Méthodologie", "Design"], en: ["Methodology", "Design"] },
    translations: {
      fr: {
        title: "Étude monocentrique ou multicentrique : quelles différences ?",
        excerpt:
          "Définition d'une étude monocentrique et d'une étude multicentrique, leurs avantages, leurs limites et leur impact sur le monitoring.",
      },
      en: {
        title: "Single-centre or multicentre study: what's the difference?",
        excerpt:
          "Definition of single-centre and multicentre studies, their advantages, limits and impact on monitoring.",
      },
    },
  },
  {
    slug: "loi-jarde",
    date: "2026-11-26",
    updated: "2026-11-26",
    tags: { fr: ["Réglementaire", "France"], en: ["Regulatory", "France"] },
    translations: {
      fr: {
        title: "La loi Jardé : ce qu'elle change pour la recherche clinique",
        excerpt:
          "La loi Jardé encadre les recherches impliquant la personne humaine en France. Les trois catégories de recherche, le rôle du CPP et ce que cela implique.",
      },
      en: {
        title: "The Jardé law: what it changes for clinical research",
        excerpt:
          "The Jardé law governs research involving human participants in France. The three research categories, the ethics committee's role and what it implies.",
      },
    },
  },
  {
    slug: "c-est-quoi-un-cpp",
    date: "2026-11-26",
    updated: "2026-11-26",
    tags: { fr: ["Réglementaire", "Éthique"], en: ["Regulatory", "Ethics"] },
    translations: {
      fr: {
        title: "C'est quoi un CPP (Comité de Protection des Personnes) ?",
        excerpt:
          "Rôle, composition et fonctionnement d'un Comité de Protection des Personnes, l'instance qui donne son avis éthique avant un essai clinique en France.",
      },
      en: {
        title: "What is a CPP (French ethics committee)?",
        excerpt:
          "Role, composition and workings of a French ethics committee (CPP), the body that gives its ethical opinion before a clinical trial in France.",
      },
    },
  },
  {
    slug: "le-role-du-promoteur",
    date: "2026-11-26",
    updated: "2026-11-26",
    tags: { fr: ["Rôles", "Réglementaire"], en: ["Roles", "Regulatory"] },
    translations: {
      fr: {
        title: "Le rôle du promoteur dans un essai clinique",
        excerpt:
          "Qui est le promoteur d'un essai clinique, quelles sont ses responsabilités légales et comment il délègue le monitoring à une CRO ou à un ARC.",
      },
      en: {
        title: "The sponsor's role in a clinical trial",
        excerpt:
          "Who the sponsor of a clinical trial is, their legal responsibilities, and how they delegate monitoring to a CRO or a CRA.",
      },
    },
  },
  {
    slug: "etude-randomisee",
    date: "2026-11-26",
    updated: "2026-11-26",
    tags: { fr: ["Méthodologie", "Design"], en: ["Methodology", "Design"] },
    translations: {
      fr: {
        title: "L'étude randomisée : principe, intérêt et variantes",
        excerpt:
          "Pourquoi randomise-t-on un essai clinique ? Principe du tirage au sort, apport contre les biais, et variantes (bras parallèles, cross-over).",
      },
      en: {
        title: "The randomised study: principle, value and variants",
        excerpt:
          "Why randomise a clinical trial? The principle of random allocation, its value against bias, and variants (parallel arms, cross-over).",
      },
    },
  },
  {
    slug: "devenir-infirmiere-de-recherche-clinique",
    date: "2026-11-26",
    updated: "2026-11-26",
    tags: { fr: ["Métier", "Carrière"], en: ["Profession", "Career"] },
    translations: {
      fr: {
        title: "Comment devenir infirmière de recherche clinique ?",
        excerpt:
          "Missions, compétences, formations et passerelles pour devenir infirmière (IDE) de recherche clinique, et sa place dans l'équipe d'un centre.",
      },
      en: {
        title: "How to become a clinical research nurse?",
        excerpt:
          "Duties, skills, training and pathways to become a clinical research nurse, and their place in a site's team.",
      },
    },
  },
  {
    slug: "qui-peut-faire-de-la-recherche-clinique",
    date: "2026-11-26",
    updated: "2026-11-26",
    tags: { fr: ["Métier", "Recherche clinique"], en: ["Profession", "Clinical research"] },
    translations: {
      fr: {
        title: "Qui peut faire de la recherche clinique ?",
        excerpt:
          "Médecins, ARC, TEC, infirmières, data managers, biostatisticiens : les profils et parcours qui permettent de travailler en recherche clinique.",
      },
      en: {
        title: "Who can work in clinical research?",
        excerpt:
          "Physicians, CRAs, technicians, nurses, data managers, biostatisticians: the profiles and pathways to work in clinical research.",
      },
    },
  },
  {
    slug: "pourquoi-devenir-arc",
    date: "2026-11-26",
    updated: "2026-11-26",
    tags: { fr: ["Métier", "Carrière"], en: ["Profession", "Career"] },
    translations: {
      fr: {
        title: "Pourquoi devenir Attaché de Recherche Clinique ?",
        excerpt:
          "Sens du métier, compétences développées, perspectives et passage en freelance : les raisons de se tourner vers le métier d'ARC.",
      },
      en: {
        title: "Why become a Clinical Research Associate?",
        excerpt:
          "The meaning of the job, the skills developed, prospects and the move to freelance: the reasons to choose the CRA profession.",
      },
    },
  },
  {
    slug: "reglementation-des-essais-cliniques",
    date: "2026-11-26",
    updated: "2026-11-26",
    tags: {
      fr: ["Réglementaire", "BPC"],
      en: ["Regulatory", "GCP"],
    },
    translations: {
      fr: {
        title:
          "La réglementation des essais cliniques en France et en Europe",
        excerpt:
          "BPC, ANSM, CPP, EMA, règlement européen (CTR) : le cadre qui encadre un essai clinique, et la place de l'ARC dans son application.",
      },
      en: {
        title: "Clinical trial regulation in France and Europe",
        excerpt:
          "GCP, ANSM, ethics committee, EMA, EU regulation (CTR): the framework that governs a clinical trial, and the CRA's place in applying it.",
      },
    },
  },
  {
    slug: "journee-type-d-un-arc",
    date: "2026-11-26",
    updated: "2026-11-26",
    tags: {
      fr: ["Métier", "Monitoring"],
      en: ["Profession", "Monitoring"],
    },
    translations: {
      fr: {
        title: "La journée type d'un ARC en monitoring",
        excerpt:
          "À quoi ressemble une journée de monitoring sur le terrain : préparation, visite, vérifications, reporting et suivi des actions.",
      },
      en: {
        title: "A day in the life of a CRA in monitoring",
        excerpt:
          "What a monitoring day looks like in the field: preparation, visit, checks, reporting and action follow-up.",
      },
    },
  },
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
