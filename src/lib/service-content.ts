import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";
import { servicePages, getServicePageMeta } from "@/config/service-pages";
import type { Locale } from "@/i18n/routing";

const CONTENT_DIR = path.join(process.cwd(), "src", "content", "services");

export interface ServiceArticle {
  slug: string;
  group: "visits" | "support";
  title: string;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  html: string;
}

function readBody(slug: string, locale: Locale): string | null {
  try {
    return fs.readFileSync(
      path.join(CONTENT_DIR, `${slug}.${locale}.md`),
      "utf8",
    );
  } catch {
    return null;
  }
}

/** A single rendered service page, or null if the slug or body is missing. */
export function getServicePage(
  slug: string,
  locale: Locale,
): ServiceArticle | null {
  const meta = getServicePageMeta(slug);
  if (!meta) return null;
  const body = readBody(slug, locale);
  if (body == null) return null;

  const t = meta.translations[locale];
  return {
    slug,
    group: meta.group,
    title: t.title,
    excerpt: t.excerpt,
    metaTitle: t.metaTitle,
    metaDescription: t.metaDescription,
    html: marked.parse(body, { async: false }) as string,
  };
}

/** Hub listing: every service's card data for a locale. */
export function getServiceList(locale: Locale) {
  return servicePages.map((s) => ({
    slug: s.slug,
    group: s.group,
    icon: s.icon,
    title: s.translations[locale].title,
    excerpt: s.translations[locale].excerpt,
  }));
}
