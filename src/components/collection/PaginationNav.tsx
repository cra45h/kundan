import Link from "next/link";
import { ArrowIcon } from "@/components/site/icons";

/**
 * Collection pagination.
 *
 * Real links, so pages are crawlable and openable in a new tab, but with
 * `scroll={false}` and a scroll-margin anchor on the grid rather than the
 * old hash-plus-restore-position workaround.
 */
export function PaginationNav({
  basePath,
  page,
  totalPages,
  query,
}: {
  basePath: string;
  page: number;
  totalPages: number;
  query?: Record<string, string>;
}) {
  if (totalPages <= 1) return null;

  const href = (p: number) => {
    const params = new URLSearchParams(query);
    if (p > 1) params.set("page", String(p));
    const qs = params.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };

  // Window of pages around the current one, so long collections don't
  // produce an unreadable row of numbers.
  const window = 1;
  const pages: (number | "gap")[] = [];
  for (let p = 1; p <= totalPages; p++) {
    if (p === 1 || p === totalPages || Math.abs(p - page) <= window) {
      pages.push(p);
    } else if (pages[pages.length - 1] !== "gap") {
      pages.push("gap");
    }
  }

  return (
    <nav
      aria-label="Pagination"
      className="mt-14 flex items-center justify-between gap-4 border-t border-border pt-8"
    >
      {page > 1 ? (
        <Link
          href={href(page - 1)}
          scroll={false}
          rel="prev"
          className="type-nav group inline-flex items-center gap-2 text-ink"
        >
          <ArrowIcon size={14} className="rotate-180" />
          Previous
        </Link>
      ) : (
        <span className="type-nav text-muted/40">Previous</span>
      )}

      <ol className="hidden items-center gap-1 sm:flex">
        {pages.map((p, i) =>
          p === "gap" ? (
            <li key={`gap-${i}`} className="type-nav px-2 text-muted/60">
              …
            </li>
          ) : (
            <li key={p}>
              <Link
                href={href(p)}
                scroll={false}
                aria-current={p === page ? "page" : undefined}
                className={`type-nav inline-flex h-9 min-w-9 items-center justify-center px-2 ${
                  p === page
                    ? "bg-ink text-ivory"
                    : "text-muted hover:text-ink"
                }`}
              >
                {p}
              </Link>
            </li>
          )
        )}
      </ol>

      <p className="type-nav text-muted sm:hidden">
        {page} / {totalPages}
      </p>

      {page < totalPages ? (
        <Link
          href={href(page + 1)}
          scroll={false}
          rel="next"
          className="type-nav group inline-flex items-center gap-2 text-ink"
        >
          Next
          <ArrowIcon size={14} />
        </Link>
      ) : (
        <span className="type-nav text-muted/40">Next</span>
      )}
    </nav>
  );
}
