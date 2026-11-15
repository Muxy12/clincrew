import { siteConfig } from "@/config/site";
import { profile } from "@/config/profile";

export const dynamic = "force-static";

/**
 * /llms.txt — a concise, machine-readable overview for AI systems
 * (llmstxt.org). Built from the config so it stays accurate. English is used
 * as the universal context language; the site itself is FR + EN.
 */
export function GET() {
  const url = siteConfig.url;
  const areas = profile.therapeuticAreas.map((a) => a.en).join(", ");
  const coverage = profile.geographicCoverage.map((c) => c.en).join(", ");
  const languages = profile.languages.map((l) => l.en).join(", ");
  const b = siteConfig.business;

  const lines = [
    `# ${profile.name} · Clinical Research Associate (CRA), freelance`,
    "",
    `> Independent freelance Clinical Research Associate (${b.name}, ${b.legalForm}) supporting clinical trials for ${profile.clientTypes?.en ?? "sponsors and CROs"}: monitoring, GCP quality and operational coordination, from site selection to close-out. Website available in French and English.`,
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
    "- Clinical site monitoring (selection, initiation, routine and close-out visits)",
    "- Investigator site management and follow-up",
    "- Clinical documentation control (Trial Master File / Investigator Site File)",
    "- Quality and GCP compliance support",
    "- Operational coordination between sites, project managers and data teams",
    "- Study start-up support",
    "",
    "## Key pages",
    `- Home: ${url}/en`,
    `- About / journey: ${url}/en/about`,
    `- Services: ${url}/en/services`,
    `- Blog: ${url}/en/blog`,
    `- Legal notice: ${url}/en/legal`,
    `- Privacy policy: ${url}/en/privacy`,
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
