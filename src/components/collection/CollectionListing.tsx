import Link from "next/link";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHero, type Crumb } from "@/components/site/PageHero";
import { ProductCard } from "@/components/sections/ProductCard";
import { FilterChips } from "@/components/collection/FilterChips";
import { PaginationNav } from "@/components/collection/PaginationNav";
import type { Product } from "@/lib/products";

/**
 * Every product listing on the site — the three form collections and the
 * three curated edits — renders through here.
 *
 * Previously each was its own 100–200 line page with its own hero, filter
 * row, grid and pagination, which is why they had drifted apart. One
 * component means one set of behaviours to get right.
 */
export function CollectionListing({
  eyebrow,
  title,
  accent,
  description,
  crumbs,
  items,
  total,
  page = 1,
  totalPages = 1,
  basePath,
  activeMaterial,
  query,
  emptyHref = "/collections/rings",
}: {
  eyebrow?: string;
  title: string;
  accent?: string;
  description?: string;
  crumbs?: Crumb[];
  items: Product[];
  total: number;
  page?: number;
  totalPages?: number;
  basePath: string;
  /** Omit to hide the filter row (curated edits are not filterable). */
  activeMaterial?: string;
  query?: Record<string, string>;
  emptyHref?: string;
}) {
  const filtered = Boolean(activeMaterial && activeMaterial !== "all");

  return (
    <SiteShell>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        accent={accent}
        description={description}
        crumbs={crumbs}
      />

      <div className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          {activeMaterial ? (
            <FilterChips basePath={basePath} active={activeMaterial} />
          ) : (
            <span />
          )}

          <p className="type-nav shrink-0 text-muted">
            {total} {total === 1 ? "piece" : "pieces"}
            {totalPages > 1 ? ` · page ${page} of ${totalPages}` : ""}
          </p>
        </div>

        {/* scroll-mt keeps the grid clear of the sticky header when a
            pagination link lands on it. */}
        <div id="grid" className="scroll-mt-24">
          {items.length === 0 ? (
            <EmptyState filtered={filtered} basePath={basePath} href={emptyHref} />
          ) : (
            <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 lg:grid-cols-4">
              {items.map((product, i) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  // First row is above the fold on most screens.
                  priority={i < 4}
                />
              ))}
            </div>
          )}
        </div>

        <PaginationNav
          basePath={basePath}
          page={page}
          totalPages={totalPages}
          query={query}
        />
      </div>
    </SiteShell>
  );
}

/**
 * An empty grid used to be a single grey sentence with nowhere to go.
 * Always offer the way out — clearing the filter is the likely intent.
 */
function EmptyState({
  filtered,
  basePath,
  href,
}: {
  filtered: boolean;
  basePath: string;
  href: string;
}) {
  return (
    <div className="border border-border bg-card px-6 py-16 text-center">
      <p className="type-h3">
        {filtered ? "Nothing in this material yet" : "This edit is being restocked"}
      </p>
      <p className="type-body mx-auto mt-3">
        {filtered
          ? "We have not set a piece in this stone for this form. The full collection is still worth a look."
          : "New pieces are added as they leave the atelier."}
      </p>
      <Link
        href={filtered ? basePath : href}
        className="type-button mt-7 inline-flex items-center gap-2 bg-ink px-7 py-3.5 text-ivory"
      >
        {filtered ? "Show all materials" : "Browse the collection"}
      </Link>
    </div>
  );
}
