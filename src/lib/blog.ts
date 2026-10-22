import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";
import { blogPosts } from "@/config/blog";
import type { Locale } from "@/i18n/routing";

const CONTENT_DIR = path.join(process.cwd(), "src", "content", "blog");

export interface BlogListItem {
  slug: string;
  date: string;
  title: string;
  excerpt: string;
  tags: string[];
  readingMinutes: number;
}

export interface BlogArticle extends BlogListItem {
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

function readingMinutes(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/** All posts for a locale, newest first. */
export function getAllPosts(locale: Locale): BlogListItem[] {
  return [...blogPosts]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((p) => {
      const body = readBody(p.slug, locale) ?? "";
      return {
        slug: p.slug,
        date: p.date,
        title: p.translations[locale].title,
        excerpt: p.translations[locale].excerpt,
        tags: p.tags ? [...p.tags[locale]] : [],
        readingMinutes: readingMinutes(body),
      };
    });
}

/** A single rendered article, or null if the slug or body is missing. */
export function getPost(slug: string, locale: Locale): BlogArticle | null {
  const meta = blogPosts.find((p) => p.slug === slug);
  if (!meta) return null;
  const body = readBody(slug, locale);
  if (body == null) return null;

  const html = marked.parse(body, { async: false }) as string;
  return {
    slug,
    date: meta.date,
    title: meta.translations[locale].title,
    excerpt: meta.translations[locale].excerpt,
    tags: meta.tags ? [...meta.tags[locale]] : [],
    readingMinutes: readingMinutes(body),
    html,
  };
}

export function getAllSlugs(): string[] {
  return blogPosts.map((p) => p.slug);
}

export function formatDate(date: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}
