"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { MATERIAL_FILTERS } from "@/lib/products";

/**
 * Material filter chips.
 *
 * The old version was a row of <Link>s carrying `?material=…#rings-grid`,
 * plus a `KeepGridInView` component whose whole job was to undo the scroll
 * jump those anchors caused. Routing through `useTransition` with
 * `scroll: false` keeps the URL shareable and the data server-filtered,
 * but the page no longer moves under you — so the anchor hack goes away.
 *
 * The pending state dims the grid rather than swapping in a spinner, so
 * the layout never changes height mid-filter.
 */
export function FilterChips({
  basePath,
  active,
}: {
  basePath: string;
  active: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const go = (value: string) => {
    const url = value === "all" ? basePath : `${basePath}?material=${value}`;
    startTransition(() => router.push(url, { scroll: false }));
  };

  return (
    <div
      className="flex flex-wrap gap-2"
      role="group"
      aria-label="Filter by material"
      data-pending={pending ? "true" : undefined}
    >
      {MATERIAL_FILTERS.map((filter) => {
        const isActive = filter.value === active;
        return (
          <button
            key={filter.value}
            type="button"
            onClick={() => go(filter.value)}
            aria-pressed={isActive}
            className={`type-nav rounded-full border px-4 py-2 transition-colors duration-200 motion-reduce:transition-none ${
              isActive
                ? "border-ink bg-ink text-ivory"
                : "border-border text-muted hover:border-ink hover:text-ink"
            }`}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}
