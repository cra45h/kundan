import Link from "next/link";
import { ProductCard } from "@/components/sections/ProductCard";
import { ArrowIcon } from "@/components/site/icons";
import type { Product } from "@/lib/products";

/** "You may also like" — same card as everywhere else on the site. */
export function RelatedRail({
  title,
  href,
  items,
}: {
  title: string;
  href: string;
  items: Product[];
}) {
  if (!items.length) return null;

  return (
    <section
      className="border-t border-border bg-ivory py-14 md:py-20"
      aria-labelledby="related-heading"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between gap-4">
          <h2 id="related-heading" className="type-h2">
            {title}
          </h2>
          <Link
            href={href}
            className="type-nav group inline-flex shrink-0 items-center gap-2 text-gold-deep"
          >
            View all
            <ArrowIcon
              size={14}
              className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
            />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 lg:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
