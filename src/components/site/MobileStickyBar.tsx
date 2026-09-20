"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { useWishlist } from "@/components/WishlistProvider";
import { BagIcon, HeartIcon } from "@/components/site/icons";

/**
 * Mobile-only action bar — Book / Favourites / Bag.
 *
 * Favourites and the bag live here rather than in the header on small
 * screens, where six icons crowded the bar and each one was a small tap
 * target. WhatsApp moved out of this row because the floating button
 * already covers it; keeping both put the same action on screen twice.
 */
export function MobileStickyBar() {
  const { count, openCart } = useCart();
  const { count: wishCount, hydrated } = useWishlist();

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-ivory/95 backdrop-blur-md lg:hidden">
      <div className="grid grid-cols-3 pb-[env(safe-area-inset-bottom)]">
        <Link
          href="/contact"
          className="type-nav flex min-h-14 flex-col items-center justify-center gap-1 text-ink"
        >
          <CalendarIcon />
          Book
        </Link>

        <Link
          href="/collections/signature"
          aria-label={`Favourites${hydrated && wishCount ? `, ${wishCount} saved` : ""}`}
          className="type-nav flex min-h-14 flex-col items-center justify-center gap-1 border-x border-border text-ink"
        >
          <span className="relative">
            <HeartIcon size={18} filled={hydrated && wishCount > 0} />
            {hydrated && wishCount > 0 ? <Badge>{wishCount}</Badge> : null}
          </span>
          Favourites
        </Link>

        <button
          type="button"
          onClick={openCart}
          aria-label={`Open bag${count ? `, ${count} item${count === 1 ? "" : "s"}` : ""}`}
          className="type-nav relative flex min-h-14 flex-col items-center justify-center gap-1 text-ink"
        >
          <span className="relative">
            <BagIcon size={18} />
            {count > 0 ? <Badge>{count}</Badge> : null}
          </span>
          Bag
        </button>
      </div>
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="absolute -top-1 -right-2 min-w-4 rounded-full bg-gold-deep px-1 text-center text-[9px] leading-4 font-medium text-ivory">
      {children}
    </span>
  );
}

function CalendarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="3"
        y="5"
        width="18"
        height="16"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M8 3v4M16 3v4M3 10h18"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
