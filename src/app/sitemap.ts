import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { routing } from "@/i18n/routing";
import { blogPosts } from "@/config/blog";
import { servicePages } from "@/config/service-pages";
import { solutionPages } from "@/config/solution-pages";
import { getGlossaryFicheSlugs } from "@/config/glossary-terms";

const STATIC_PATHS = [
  "",
  "/about",
  "/services",
  "/solutions",
  "/glossaire",
  "/blog",
  "/legal",
  "/privacy",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const blogPaths = blogPosts.map((p) => `/blog/${p.slug}`);
  const servicePaths = servicePages.map((s) => `/services/${s.slug}`);
  const solutionPaths = solutionPages.map((s) => `/solutions/${s.slug}`);
  const glossaryPaths = getGlossaryFicheSlugs().map((s) => `/glossaire/${s}`);
  const allPaths = [
    ...STATIC_PATHS,
    ...servicePaths,
    ...solutionPaths,
    ...glossaryPaths,
    ...blogPaths,
  ];

  // Note: hreflang alternates are intentionally NOT emitted here. They are
  // declared once per page via <link rel="alternate"> in the document <head>
  // (page metadata). Repeating them in the sitemap is a redundant second
  // implementation with no SEO benefit and extra risk of drift, so we keep a
  // single source of truth in the head.
  return allPaths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: `${siteConfig.url}/${locale}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : path.startsWith("/blog/") ? 0.7 : 0.5,
    })),
  );
}
