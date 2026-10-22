import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { routing } from "@/i18n/routing";
import { blogPosts } from "@/config/blog";

const STATIC_PATHS = [
  "",
  "/about",
  "/services",
  "/blog",
  "/legal",
  "/privacy",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const blogPaths = blogPosts.map((p) => `/blog/${p.slug}`);
  const allPaths = [...STATIC_PATHS, ...blogPaths];

  return allPaths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: `${siteConfig.url}/${locale}${path}`,
      lastModified: now,
      changeFrequency: path === "" ? ("monthly" as const) : ("monthly" as const),
      priority: path === "" ? 1 : path.startsWith("/blog/") ? 0.7 : 0.5,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${siteConfig.url}/${l}${path}`]),
        ),
      },
    })),
  );
}
