/**
 * Centralized schema.org (JSON-LD) builders. Everything is derived from the
 * config (profile / site), so the structured data stays accurate and in one
 * place. Rendered server-side in the relevant layout/pages.
 */

import { siteConfig } from "@/config/site";
import { profile } from "@/config/profile";
import type { Locale } from "@/i18n/routing";

const PERSON_ID = `${siteConfig.url}/#mohamed`;
const ORG_ID = `${siteConfig.url}/#meedwise`;

const ORG_DESCRIPTION: Record<Locale, string> = {
  fr: "Prestations freelance d'Attaché de Recherche Clinique senior : monitoring, qualité GCP et coordination des essais cliniques.",
  en: "Senior freelance Clinical Research Associate services: monitoring, GCP quality and coordination of clinical trials.",
};

/** schema.org ProfessionalService — the MeedWise legal entity. */
export function organizationNode(locale: Locale) {
  const b = siteConfig.business;
  return {
    "@type": "ProfessionalService",
    "@id": ORG_ID,
    name: b.name,
    legalName: `${b.name} (${b.legalForm})`,
    description: ORG_DESCRIPTION[locale],
    url: siteConfig.url,
    logo: `${siteConfig.url}/icon.png`,
    image: `${siteConfig.url}/icon.png`,
    ...(profile.email.configured ? { email: profile.email.value } : {}),
    ...(profile.phone.configured ? { telephone: profile.phone.value } : {}),
    founder: { "@id": PERSON_ID },
    address: {
      "@type": "PostalAddress",
      streetAddress: b.address.streetAddress,
      postalCode: b.address.postalCode,
      addressLocality: b.address.addressLocality,
      addressCountry: b.address.addressCountry,
    },
    areaServed: [...b.areaServed],
  };
}

/** schema.org Person — Mohamed Debbah, enriched with verified facts only. */
export function personNode(locale: Locale) {
  const node: Record<string, unknown> = {
    "@type": "Person",
    "@id": PERSON_ID,
    name: profile.name,
    jobTitle: siteConfig.jobTitle[locale],
    url: `${siteConfig.url}/${locale}`,
    worksFor: { "@id": ORG_ID },
  };

  const sameAs: string[] = [];
  if (profile.linkedin.configured) sameAs.push(profile.linkedin.value);
  sameAs.push(...profile.sameAs);
  if (profile.orcid) {
    sameAs.push(profile.orcid);
    node.identifier = {
      "@type": "PropertyValue",
      propertyID: "https://orcid.org",
      value: profile.orcid,
    };
  }
  if (sameAs.length) node.sameAs = sameAs;
  if (profile.email.configured) node.email = profile.email.value;
  if (profile.phone.configured) node.telephone = profile.phone.value;
  if (profile.portrait) node.image = `${siteConfig.url}${profile.portrait}`;
  if (profile.languageCodes.length) node.knowsLanguage = [...profile.languageCodes];

  const topics = [
    "Clinical research",
    "Clinical monitoring",
    "Good Clinical Practice (GCP)",
    ...profile.therapeuticAreas.map((a) => a.en),
  ];
  if (topics.length) node.knowsAbout = topics;
  if (profile.certifications.length) {
    node.hasCredential = profile.certifications.map((c) => ({
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "certification",
      name: c[locale],
    }));
  }
  if (profile.award) node.award = profile.award.label.en;

  return node;
}

/** Site-wide @graph (Person + Organization) injected on every page. */
export function siteGraph(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@graph": [personNode(locale), organizationNode(locale)],
  };
}

/** Service node for a service/solution detail page, linked to the Org by @id. */
export function servicePageNode(params: {
  locale: Locale;
  slug: string;
  name: string;
  description: string;
  section?: "services" | "solutions";
}) {
  const { locale, slug, name, description, section = "services" } = params;
  const b = siteConfig.business;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType: name,
    url: `${siteConfig.url}/${locale}/${section}/${slug}`,
    provider: {
      "@type": "ProfessionalService",
      "@id": ORG_ID,
      name: b.name,
    },
    areaServed: [...b.areaServed],
    inLanguage: locale,
  };
}

/** BlogPosting node, linked to the site-wide Person/Organization by @id. */
export function blogPostingNode(params: {
  locale: Locale;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  updated?: string;
}) {
  const { locale, slug, title, excerpt, date, updated } = params;
  const pageUrl = `${siteConfig.url}/${locale}/blog/${slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: excerpt,
    datePublished: date,
    dateModified: updated ?? date,
    inLanguage: locale,
    // The blog posts inherit the locale-level Open Graph image.
    image: `${siteConfig.url}/${locale}/opengraph-image`,
    author: {
      "@type": "Person",
      "@id": PERSON_ID,
      name: profile.name,
      url: `${siteConfig.url}/${locale}/about`,
    },
    publisher: {
      "@type": "Organization",
      "@id": ORG_ID,
      name: siteConfig.business.name,
      logo: { "@type": "ImageObject", url: `${siteConfig.url}/icon.png` },
    },
    mainEntityOfPage: pageUrl,
  };
}

/** DefinedTerm node for a glossary fiche, linked to the glossary set by @id. */
export function definedTermNode(params: {
  locale: Locale;
  slug: string;
  term: string;
  description: string;
}) {
  const { locale, slug, term, description } = params;
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: term,
    description,
    url: `${siteConfig.url}/${locale}/glossaire/${slug}`,
    inDefinedTermSet: `${siteConfig.url}/${locale}/glossaire`,
    inLanguage: locale,
  };
}

/** DefinedTermSet node for the glossary hub (AEO-friendly). */
export function definedTermSetNode(
  locale: Locale,
  name: string,
  terms: ReadonlyArray<{ term: string; url: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "@id": `${siteConfig.url}/${locale}/glossaire`,
    name,
    url: `${siteConfig.url}/${locale}/glossaire`,
    inLanguage: locale,
    hasDefinedTerm: terms.map((t) => ({
      "@type": "DefinedTerm",
      name: t.term,
      url: t.url,
    })),
  };
}
