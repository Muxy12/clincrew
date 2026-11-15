import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";
import { getSolutionPageMeta } from "@/config/solution-pages";
import type { Locale } from "@/i18n/routing";

const CONTENT_DIR = path.join(process.cwd(), "src", "content", "solutions");

export interface SolutionArticle {
  slug: string;
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

/** A single rendered solution page, or null if the slug or body is missing. */
export function getSolutionPage(
  slug: string,
  locale: Locale,
): SolutionArticle | null {
  const meta = getSolutionPageMeta(slug);
  if (!meta) return null;
  const body = readBody(slug, locale);
  if (body == null) return null;

  const t = meta.translations[locale];
  return {
    slug,
    title: t.title,
    excerpt: t.excerpt,
    metaTitle: t.metaTitle,
    metaDescription: t.metaDescription,
    html: marked.parse(body, { async: false }) as string,
  };
}
