import { siteConfig } from "@/config/site";
import { profile } from "@/config/profile";
import { servicePages } from "@/config/service-pages";
import { solutionPages } from "@/config/solution-pages";
import { glossaryTerms, glossaryGroups } from "@/config/glossary-terms";
import { blogPosts } from "@/config/blog";

export const dynamic = "force-static";

const GROUP_EN: Record<string, string> = {
  monitoring: "Monitoring & visits",
  roles: "Roles & ecosystem",
  regulatory: "Regulatory & quality",
  methodology: "Methodology & design",
};

/**
 * /llms.txt — a concise, machine-readable overview for AI systems
 * (llmstxt.org). Built from the config so it stays accurate. English is used
 * as the universal context language; the site itself is FR + EN.
 */
export function GET() {
  const url = siteConfig.url;
  const en = (path: string) => `${url}/en${path}`;
  const areas = profile.therapeuticAreas.map((a) => a.en).join(", ");
  const coverage = profile.geographicCoverage.map((c) => c.en).join(", ");
  const languages = profile.languages.map((l) => l.en).join(", ");
  const b = siteConfig.business;

  const servicesList = servicePages.map(
    (s) => `- ${s.translations.en.title}: ${en(`/services/${s.slug}`)}`,
  );
  const solutionsList = solutionPages.map(
    (s) => `- ${s.translations.en.title}: ${en(`/solutions/${s.slug}`)}`,
  );
  const blogList = blogPosts.map(
    (p) => `- ${p.translations.en.title}: ${en(`/blog/${p.slug}`)}`,
  );
  const glossaryList = glossaryGroups.flatMap((group) => {
    const terms = glossaryTerms
      .filter((t) => t.group === group)
      .map((t) => {
        const href = t.href ?? `/glossaire/${t.slug}`;
        return `- ${t.translations.en.term}: ${en(href)}`;
      });
    return [`### ${GROUP_EN[group] ?? group}`, ...terms, ""];
  });

  const lines = [
    `# ${profile.name} · Clinical Research Associate (CRA), freelance`,
    "",
    `> Independent freelance Clinical Research Associate (${b.name}, ${b.legalForm}) supporting clinical trials for ${profile.clientTypes?.en ?? "sponsors and CROs"}: monitoring, GCP quality and operational coordination, from site selection to close-out. The site includes service pages, audience solutions, a clinical research glossary and guides. Available in French and English.`,
    "",
    "## About",
    `- Freelance CRA with ${profile.yearsExperience ?? "several"} years of experience in clinical trial monitoring.`,
    "- Certifications: ICH-GCP (up to date); CRA training (RNCP level 7, De Vinci Executive Education, 2018).",
    "- Rate: on request (custom quote per assignment).",
    profile.award ? `- Distinction: ${profile.award.label.en} (${profile.award.url}).` : null,
    areas ? `- Therapeutic areas: ${areas}. Study phases: ${profile.phases?.en ?? "multiple"}.` : null,
    coverage ? `- Coverage: ${coverage}.` : null,
    languages ? `- Languages: ${languages}.` : null,
    "",
    "## Services",
    `Hub: ${en("/services")}`,
    ...servicesList,
    "",
    "## Solutions (by audience: CRO, biotech, sponsor)",
    `Hub: ${en("/solutions")}`,
    ...solutionsList,
    "",
    "## Glossary (clinical research definitions)",
    `Hub: ${en("/glossaire")}`,
    ...glossaryList,
    "## Guides (blog)",
    `Hub: ${en("/blog")}`,
    ...blogList,
    "",
    "## Key pages",
    `- Home: ${en("")}`,
    `- About / journey: ${en("/about")}`,
    `- Services: ${en("/services")}`,
    `- Solutions: ${en("/solutions")}`,
    `- Glossary: ${en("/glossaire")}`,
    `- Blog: ${en("/blog")}`,
    `- Legal notice: ${en("/legal")}`,
    `- Privacy policy: ${en("/privacy")}`,
    "",
    "## Contact",
    profile.email.configured ? `- Email: ${profile.email.value}` : null,
    profile.phone.configured ? `- Phone: ${profile.phone.value}` : null,
    profile.linkedin.configured ? `- LinkedIn: ${profile.linkedin.value}` : null,
    `- Based in ${b.address.addressLocality}, France. ${b.name} (${b.legalForm}), ${b.address.streetAddress}, ${b.address.postalCode} ${b.address.addressLocality}.`,
    "",
  ];

  const body = lines.filter((l) => l !== null).join("\n") + "\n";

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
