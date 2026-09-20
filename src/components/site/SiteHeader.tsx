"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
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

gsap.registerPlugin(useGSAP);

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

  /* The seat/unseat is a GSAP tween on the backdrop rather than a CSS
     colour transition, so the fade is interruptible mid-scroll instead of
     restarting each time the boolean flips. */
  const barRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.to("[data-header-backdrop]", {
        autoAlpha: solid ? 1 : 0,
        duration: 0.35,
        ease: "power2.out",
      });

      /* The scrim is the inverse: it only exists while the bar is
         transparent, holding the nav legible over whatever photography is
         behind it. Without it the links wash out against a bright hero. */
      gsap.to("[data-header-scrim]", {
        autoAlpha: solid ? 0 : 1,
        duration: 0.35,
        ease: "power2.out",
      });
    },
    { scope: barRef, dependencies: [solid] }
  );

  const light = overlay && !solid;
  const left = PRIMARY_NAV.slice(0, 3);
  const right = PRIMARY_NAV.slice(3);

  return (
    /* Sticky, not fixed: a fixed header would sit on top of the
       announcement bar and hide it. The hero is pulled up under this with
       a negative margin so the transparent state has something to show. */
    <header ref={barRef} className="sticky top-0 z-50">
      {/* Separate layer so the ivory can fade without the bar's contents
          inheriting the opacity. */}
      <div
        data-header-backdrop
        aria-hidden
        className="absolute inset-0 border-b border-border bg-ivory/95 backdrop-blur-md"
        style={{ opacity: 0, visibility: "hidden" }}
      />

      {/* Legibility wash for the transparent state. Taller than the bar so
          it falls off rather than ending on a visible edge. */}
      <div
        data-header-scrim
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[linear-gradient(180deg,rgba(7,9,14,0.55)_0%,rgba(7,9,14,0.28)_45%,transparent_100%)]"
        style={{ opacity: overlay ? 1 : 0, visibility: overlay ? "visible" : "hidden" }}
      />
      <div
        className={`relative mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 ${
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
          className="font-display inline-flex shrink-0 items-center py-3 text-[1.35rem] leading-none tracking-[0.3em] uppercase"
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

            {/* Below lg these three live in the bottom action bar; six
                icons crowded the header and each was a small tap target. */}
            <Link
              href="/collections/signature"
              aria-label={`Wishlist${hydrated && wishCount ? `, ${wishCount} saved` : ""}`}
              className="relative hidden h-10 w-10 items-center justify-center lg:inline-flex"
            >
              <HeartIcon />
              {hydrated && wishCount > 0 ? <Badge>{wishCount}</Badge> : null}
            </Link>

            <button
              type="button"
              onClick={openCart}
              aria-label={`Open bag${bagCount ? `, ${bagCount} item${bagCount === 1 ? "" : "s"}` : ""}`}
              className="relative hidden h-10 w-10 items-center justify-center lg:inline-flex"
            >
              <BagIcon />
              {bagCount > 0 ? <Badge>{bagCount}</Badge> : null}
            </button>

            <a
              href={whatsappUrl(WHATSAPP_PRESETS.general)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with us on WhatsApp"
              className="hidden h-10 w-10 items-center justify-center lg:inline-flex"
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
                className="-mr-2 inline-flex h-11 w-11 items-center justify-center text-2xl leading-none"
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
                      className="type-h3 flex min-h-12 items-center py-2"
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
