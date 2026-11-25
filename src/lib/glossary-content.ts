import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";
import { getGlossaryTerm } from "@/config/glossary-terms";
import type { Locale } from "@/i18n/routing";

const CONTENT_DIR = path.join(process.cwd(), "src", "content", "glossary");

export interface GlossaryArticle {
  slug: string;
  term: string;
  short: string;
  html: string;
}

function readBody(slug: string, locale: Locale): string | null {
  try {
    return fs.readFileSync(path.join(CONTENT_DIR, `${slug}.${locale}.md`), "utf8");
  } catch {
    return null;
  }
}

/** A rendered glossary fiche, or null if the slug has no fiche / body. */
export function getGlossaryFiche(
  slug: string,
  locale: Locale,
): GlossaryArticle | null {
  const meta = getGlossaryTerm(slug);
  if (!meta || meta.href) return null; // href terms have no fiche
  const body = readBody(slug, locale);
  if (body == null) return null;

  const t = meta.translations[locale];
  return {
    slug,
    term: t.term,
    short: t.short,
    html: marked.parse(body, { async: false }) as string,
  };
}
