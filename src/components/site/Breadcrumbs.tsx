import Link from "next/link";
import type { Crumb } from "@/components/site/PageHero";

/**
 * Standalone breadcrumb row, for pages that have no PageHero to carry it
 * (product detail leads with the gallery, not a masthead).
 */
export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mx-auto max-w-[1280px] px-4 pt-8 sm:px-6 lg:px-8"
    >
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <li>
          <Link href="/" className="type-nav text-muted hover:text-ink">
            Home
          </Link>
        </li>
        {crumbs.map((c, i) => (
          <li key={`${c.label}-${i}`} className="flex items-center gap-2">
            <span aria-hidden className="text-muted/50">
              /
            </span>
            {c.href ? (
              <Link href={c.href} className="type-nav text-muted hover:text-ink">
                {c.label}
              </Link>
            ) : (
              <span className="type-nav text-ink" aria-current="page">
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
