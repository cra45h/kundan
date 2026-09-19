"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/components/CartProvider";
import { useWishlist } from "@/components/WishlistProvider";
import { PRIMARY_NAV } from "@/data/navigation";
import { whatsappUrl, WHATSAPP_PRESETS } from "@/config/site";
import {
  BagIcon,
  HeartIcon,
  SearchIcon,
  WhatsAppIcon,
} from "@/components/site/icons";

/**
 * Sticky header — centred wordmark, nav split around it, actions right.
 *
 * Over a full-bleed hero it sits transparent with light text; past 80px it
 * becomes solid ivory with a hairline. The swap is a plain class toggle on
 * a scroll listener rather than a ScrollTrigger, so it still works if GSAP
 * never initialises.
 */
export function SiteHeader({
  /** True on pages that open with a full-bleed hero behind the header. */
  overlay = false,
}: {
  overlay?: boolean;
}) {
  const [solid, setSolid] = useState(!overlay);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { count: bagCount, openCart } = useCart();
  const { count: wishCount, hydrated } = useWishlist();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!overlay) {
      setSolid(true);
      return;
    }
    const onScroll = () => setSolid(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [overlay]);

  useEffect(() => setMenuOpen(false), [pathname]);

  // Lock the page and trap Escape while the mobile drawer is open.
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const light = overlay && !solid;
  const left = PRIMARY_NAV.slice(0, 3);
  const right = PRIMARY_NAV.slice(3);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 motion-reduce:transition-none ${
        solid
          ? "border-b border-border bg-ivory/95 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div
        className={`mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 ${
          light ? "text-ivory" : "text-ink"
        }`}
      >
        {/* Left — nav (desktop) / menu button (mobile) */}
        <div className="flex flex-1 items-center gap-6">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            className="-ml-2 inline-flex h-10 w-10 items-center justify-center lg:hidden"
          >
            <span className="relative block h-3 w-5" aria-hidden>
              <span className="absolute top-0 left-0 h-px w-full bg-current" />
              <span className="absolute top-1.5 left-0 h-px w-full bg-current" />
              <span className="absolute top-3 left-0 h-px w-full bg-current" />
            </span>
          </button>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-6">
              {left.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="type-nav hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Centre — wordmark */}
        <Link
          href="/"
          aria-label="Kundan — home"
          className="font-display shrink-0 text-[1.35rem] leading-none tracking-[0.3em] uppercase"
        >
          Kundan
        </Link>

        {/* Right — rest of nav + actions */}
        <div className="flex flex-1 items-center justify-end gap-6">
          <nav aria-label="Collections" className="hidden lg:block">
            <ul className="flex items-center gap-6">
              {right.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="type-nav hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-0.5">
            <Link
              href="/collections/new-arrivals"
              aria-label="Search the collection"
              className="inline-flex h-10 w-10 items-center justify-center"
            >
              <SearchIcon />
            </Link>

            <Link
              href="/collections/signature"
              aria-label={`Wishlist${hydrated && wishCount ? `, ${wishCount} saved` : ""}`}
              className="relative inline-flex h-10 w-10 items-center justify-center"
            >
              <HeartIcon />
              {hydrated && wishCount > 0 ? <Badge>{wishCount}</Badge> : null}
            </Link>

            <button
              type="button"
              onClick={openCart}
              aria-label={`Open bag${bagCount ? `, ${bagCount} item${bagCount === 1 ? "" : "s"}` : ""}`}
              className="relative inline-flex h-10 w-10 items-center justify-center"
            >
              <BagIcon />
              {bagCount > 0 ? <Badge>{bagCount}</Badge> : null}
            </button>

            <a
              href={whatsappUrl(WHATSAPP_PRESETS.general)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with us on WhatsApp"
              className="inline-flex h-10 w-10 items-center justify-center"
            >
              <WhatsAppIcon />
            </a>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            className="absolute inset-0 bg-void/50"
          />
          <div
            id="mobile-nav"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="absolute inset-y-0 left-0 w-[84%] max-w-sm overflow-y-auto bg-ivory px-6 py-6 text-ink"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-[1.2rem] tracking-[0.3em] uppercase">
                Kundan
              </span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="-mr-2 inline-flex h-10 w-10 items-center justify-center text-2xl leading-none"
              >
                ×
              </button>
            </div>

            <nav aria-label="Mobile" className="mt-8">
              <ul className="space-y-1">
                {PRIMARY_NAV.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="type-h3 block py-2.5"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <a
              href={whatsappUrl(WHATSAPP_PRESETS.bridal)}
              target="_blank"
              rel="noopener noreferrer"
              className="type-button mt-8 inline-flex items-center gap-2 rounded-full bg-gold-deep px-5 py-3 text-ivory"
            >
              <WhatsAppIcon />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="absolute top-1 right-0.5 min-w-4 rounded-full bg-gold-deep px-1 text-center text-[9px] leading-4 font-medium text-ivory">
      {children}
    </span>
  );
}
