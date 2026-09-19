"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Accent } from "@/components/ui/Accent";
import { Reveal } from "@/components/ui/Reveal";
import { CATEGORY_TILES, SEGMENTS, type Segment } from "@/data/mock";

/**
 * Shop by category — six equal tiles, 3×2 desktop / 2×3 mobile.
 *
 * The segmented toggle re-links the tiles rather than filtering a list,
 * so switching costs no request and cannot produce an empty grid.
 */
export function CategoryGrid() {
  const [segment, setSegment] = useState<Segment>("bridal");

  return (
    <section
      className="bg-paper py-14 md:py-24 lg:py-28"
      aria-labelledby="category-heading"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <h2 id="category-heading" className="type-h2">
            Shop by <Accent>category</Accent>
          </h2>

          <div
            role="tablist"
            aria-label="Occasion"
            className="inline-flex shrink-0 rounded-full border border-border bg-ivory p-1"
          >
            {SEGMENTS.map((s) => {
              const active = s.id === segment;
              return (
                <button
                  key={s.id}
                  role="tab"
                  type="button"
                  aria-selected={active}
                  onClick={() => setSegment(s.id)}
                  className={`type-nav rounded-full px-4 py-2 transition-colors duration-200 motion-reduce:transition-none ${
                    active ? "bg-ink text-ivory" : "text-muted hover:text-ink"
                  }`}
                >
                  {s.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {CATEGORY_TILES.map((tile, i) => (
            <li key={tile.label}>
              <Reveal delay={i * 60}>
                <Link
                  href={tile.href[segment]}
                  className="group block overflow-hidden bg-card"
                >
                  <div className="relative aspect-4/5 w-full overflow-hidden sm:aspect-square">
                    <Image
                      src={tile.image}
                      alt={`${tile.label} — Kundan`}
                      fill
                      loading="lazy"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    />
                    {/* Keeps the label legible over any photograph. */}
                    <div
                      aria-hidden
                      className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-void/65 to-transparent"
                    />
                    <span className="type-caption absolute bottom-4 left-4 text-ivory">
                      {tile.label}
                    </span>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
