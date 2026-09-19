"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { BagIcon, WhatsAppIcon } from "@/components/site/icons";
import { whatsappUrl, WHATSAPP_PRESETS } from "@/config/site";

/**
 * Mobile-only action bar. Book / WhatsApp / Bag, pinned to the bottom.
 * Hidden from large screens, where the header already carries these.
 */
export function MobileStickyBar() {
  const { count, openCart } = useCart();

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-ivory/95 backdrop-blur-md lg:hidden">
      <div className="grid grid-cols-3 pb-[env(safe-area-inset-bottom)]">
        <Link
          href="/contact"
          className="type-nav flex flex-col items-center gap-1 py-3 text-ink"
        >
          <CalendarIcon />
          Book
        </Link>

        <a
          href={whatsappUrl(WHATSAPP_PRESETS.general)}
          target="_blank"
          rel="noopener noreferrer"
          className="type-nav flex flex-col items-center gap-1 border-x border-border py-3 text-ink"
        >
          <WhatsAppIcon size={18} />
          WhatsApp
        </a>

        <button
          type="button"
          onClick={openCart}
          aria-label={`Open bag${count ? `, ${count} item${count === 1 ? "" : "s"}` : ""}`}
          className="type-nav relative flex flex-col items-center gap-1 py-3 text-ink"
        >
          <span className="relative">
            <BagIcon size={18} />
            {count > 0 ? (
              <span className="absolute -top-1 -right-2 min-w-4 rounded-full bg-gold-deep px-1 text-center text-[9px] leading-4 font-medium text-ivory">
                {count}
              </span>
            ) : null}
          </span>
          Bag
        </button>
      </div>
    </div>
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
