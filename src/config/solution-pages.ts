/**
 * SOLUTION PAGES REGISTRY (commercial hub: /solutions)
 * -------------------------------------------------------------------------
 * Audience-oriented commercial pages at /[locale]/solutions/<slug>, linked
 * from the /solutions hub. Long-form bodies live in Markdown:
 *     src/content/solutions/<slug>.fr.md
 *     src/content/solutions/<slug>.en.md
 *
 * Content is GENERIC positioning grounded in standard ICH-GCP practice — no
 * fabricated clients, numbers or credentials. Keyword focus: "solutions de
 * monitoring clinique" (not the service/visit pages, not the home page).
 */

import type { LucideIcon } from "lucide-react";
import { Users, FlaskConical, Landmark, Workflow } from "lucide-react";
import type { Locale } from "@/i18n/routing";

export interface SolutionPageMeta {
  readonly slug: string;
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

export const solutionPages: ReadonlyArray<SolutionPageMeta> = [
  {
    slug: "cra-freelance-cro",
    icon: Users,
    translations: {
      fr: {
        title: "Renfort CRA pour CRO",
        excerpt:
          "Absorber un pic de charge de monitoring sans recruter : un CRA freelance intégré à votre équipe projet.",
        metaTitle: "Renfort CRA freelance pour CRO",
        metaDescription:
          "Renforcez la capacité de monitoring de votre CRO avec un ARC / CRA freelance : mission ponctuelle ou projet défini, intégré à vos procédures et outils.",
      },
      en: {
        title: "CRA backup for CROs",
        excerpt:
          "Absorbing a monitoring workload peak without hiring: a freelance CRA embedded in your project team.",
        metaTitle: "Freelance CRA backup for CROs",
        metaDescription:
          "Reinforce your CRO's monitoring capacity with a freelance CRA: one-off assignment or defined project, integrated into your procedures and tools.",
      },
    },
  },
  {
    slug: "monitoring-biotech",
    icon: FlaskConical,
    translations: {
      fr: {
        title: "Monitoring pour biotechs",
        excerpt:
          "Conduire votre essai sans constituer d'équipe CRA : externalisez les activités de monitoring choisies.",
        metaTitle: "Monitoring clinique pour biotechs | CRA freelance",
        metaDescription:
          "Biotechs : externalisez tout ou partie du monitoring de votre essai auprès d'un ARC / CRA freelance, en gardant la main sur votre stratégie d'étude.",
      },
      en: {
        title: "Monitoring for biotechs",
        excerpt:
          "Running your trial without building a CRA team: outsource the monitoring activities you choose.",
        metaTitle: "Clinical monitoring for biotechs | Freelance CRA",
        metaDescription:
          "Biotechs: outsource all or part of your trial's monitoring to a freelance CRA, while keeping control of your study strategy.",
      },
    },
  },
  {
    slug: "monitoring-promoteur",
    icon: Landmark,
    translations: {
      fr: {
        title: "Support aux promoteurs",
        excerpt:
          "Appuyer la supervision de vos centres : des activités de monitoring réalisées pour le compte du promoteur.",
        metaTitle: "Support monitoring pour promoteurs | CRA freelance",
        metaDescription:
          "Promoteurs : confiez des activités de monitoring à un ARC / CRA freelance, selon le périmètre et les responsabilités convenus, en gardant la supervision de l'étude.",
      },
      en: {
        title: "Support for sponsors",
        excerpt:
          "Backing your oversight of sites: monitoring activities carried out on the sponsor's behalf.",
        metaTitle: "Monitoring support for sponsors | Freelance CRA",
        metaDescription:
          "Sponsors: entrust monitoring activities to a freelance CRA, within the agreed scope and responsibilities, while keeping oversight of the study.",
      },
    },
  },
  {
    slug: "renfort-clinical-operations",
    icon: Workflow,
    translations: {
      fr: {
        title: "Renfort Clinical Operations",
        excerpt:
          "Maintenir l'activité quand une ressource manque : reprise de centres et continuité du suivi.",
        metaTitle: "Renfort Clinical Operations | CRA freelance",
        metaDescription:
          "Un renfort opérationnel pour vos Clinical Operations : reprise de centres, continuité du monitoring et livrables définis avec votre équipe. Par un ARC / CRA freelance.",
      },
      en: {
        title: "Clinical Operations backup",
        excerpt:
          "Keeping activity going when a resource is missing: site hand-overs and continuity of follow-up.",
        metaTitle: "Clinical Operations backup | Freelance CRA",
        metaDescription:
          "Operational backup for your Clinical Operations: site hand-overs, continuity of monitoring and deliverables defined with your team. By a freelance CRA.",
      },
    },
  },
];

export function getSolutionPageMeta(slug: string): SolutionPageMeta | undefined {
  return solutionPages.find((s) => s.slug === slug);
}

export function getAllSolutionSlugs(): string[] {
  return solutionPages.map((s) => s.slug);
}
