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
    logo: `${siteConfig.url}/icon.svg`,
    image: `${siteConfig.url}/icon.svg`,
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

/** Service node for a service detail page, linked to the Organization by @id. */
export function servicePageNode(params: {
  locale: Locale;
  slug: string;
  name: string;
  description: string;
}) {
  const { locale, slug, name, description } = params;
  const b = siteConfig.business;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType: name,
    url: `${siteConfig.url}/${locale}/services/${slug}`,
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
      logo: { "@type": "ImageObject", url: `${siteConfig.url}/icon.svg` },
    },
    mainEntityOfPage: pageUrl,
  };
}
