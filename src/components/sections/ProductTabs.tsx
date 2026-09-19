"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { motion } from "motion/react";
import { SNAP } from "@/components/motion/tokens";
import { Accent } from "@/components/ui/Accent";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowLink } from "@/components/motion/MotionCta";
import {
  ProductCard,
  ProductCardSkeleton,
} from "@/components/sections/ProductCard";
import type { Product } from "@/lib/products";

type Tab = "bestsellers" | "new";

/**
 * Best sellers / New arrivals, 8 products in a 4-up grid.
 *
 * This is the section the old homepage buried ~65% down the page; it now
 * sits directly after the collections.
 */
export function ProductTabs({
  bestSellers,
  newArrivals,
  loading = false,
}: {
  bestSellers: Product[];
  newArrivals: Product[];
  /** Render skeletons instead of cards. */
  loading?: boolean;
}) {
  const [tab, setTab] = useState<Tab>("bestsellers");
  const baseId = useId();

  const tabs: { id: Tab; label: string; href: string }[] = [
    { id: "bestsellers", label: "Best Sellers", href: "/collections/best-sellers" },
    { id: "new", label: "New Arrivals", href: "/collections/new-arrivals" },
  ];

  const items = (tab === "bestsellers" ? bestSellers : newArrivals).slice(0, 8);
  const active = tabs.find((t) => t.id === tab)!;

  return (
    <section
      className="bg-paper py-14 md:py-24 lg:py-28"
      aria-labelledby="products-heading"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="products-heading" className="type-h2">
              The <Accent>pieces</Accent> they come back for
            </h2>

            <div
              role="tablist"
              aria-label="Product list"
              className="mt-5 flex items-center gap-5"
            >
              {tabs.map((t) => {
                const selected = t.id === tab;
                return (
                  <button
                    key={t.id}
                    id={`${baseId}-tab-${t.id}`}
                    role="tab"
                    type="button"
                    aria-selected={selected}
                    aria-controls={`${baseId}-panel`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setTab(t.id)}
                    onKeyDown={(e) => {
                      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
                      e.preventDefault();
                      setTab((cur) =>
                        cur === "bestsellers" ? "new" : "bestsellers"
                      );
                    }}
                    className={`type-nav relative pb-1.5 ${
                      selected ? "text-ink" : "text-muted hover:text-ink"
                    }`}
                  >
                    {t.label}
                    {/* The rule slides from one tab to the other rather
                        than two borders swapping colour. */}
                    {selected ? (
                      <motion.span
                        layoutId="product-tab-rule"
                        transition={SNAP}
                        className="absolute inset-x-0 -bottom-px h-px bg-ink"
                      />
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>

          <ArrowLink href={active.href} className="shrink-0 text-gold-deep">
            View all
          </ArrowLink>
        </Reveal>

        <div
          id={`${baseId}-panel`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${tab}`}
          className="mt-10"
        >
          {loading ? (
            <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : items.length ? (
            <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 lg:grid-cols-4">
              {items.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <p className="type-body">
              This list is being restocked.{" "}
              <Link href={active.href} className="underline">
                Browse the full collection
              </Link>
              .
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
