import { ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";
import type { Locale } from "@/i18n/routing";

export interface Crumb {
  label: string;
  /** Locale-relative path, e.g. "/" or "/services" or "/services/<slug>". */
  href: string;
}

/**
 * Breadcrumb trail: a visible, accessible nav plus a schema.org BreadcrumbList
 * (so Google can show the breadcrumb rich result in the SERP). The last item is
 * the current page and is not a link.
 */
export function Breadcrumb({
  items,
  locale,
}: {
  items: Crumb[];
  locale: Locale;
}) {
  const abs = (href: string) =>
    `${siteConfig.url}/${locale}${href === "/" ? "" : href}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: abs(c.href),
    })),
  };

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[12px] uppercase tracking-[0.12em] text-muted">
        {items.map((c, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={c.href} className="flex items-center gap-x-2">
              {isLast ? (
                <span aria-current="page" className="text-cream">
                  {c.label}
                </span>
              ) : (
                <Link href={c.href} className="transition-colors hover:text-mint">
                  {c.label}
                </Link>
              )}
              {!isLast && (
                <ChevronRight
                  size={12}
                  aria-hidden="true"
                  className="text-muted/50"
                />
              )}
            </li>
          );
        })}
      </ol>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </nav>
  );
}
