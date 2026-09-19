import type { ReactNode } from "react";
import { AnnouncementBar } from "@/components/site/AnnouncementBar";
import { SiteHeader } from "@/components/site/SiteHeader";
import { MobileStickyBar } from "@/components/site/MobileStickyBar";
import { Footer } from "@/components/Footer";
import { ScrollReveals } from "@/components/ui/ScrollReveals";

/**
 * The page frame every route shares.
 *
 * Before this, interior pages assembled their own chrome: the old mega-nav,
 * no announcement bar, no mobile action bar, and a `bg-white` page ground
 * that clashed with the homepage's warm ivory. Those differences made the
 * site feel like two sites.
 *
 * `overlay` is for routes that open on a full-bleed hero and want the
 * header transparent over it; everything else gets a seated header.
 */
export function SiteShell({
  children,
  overlay = false,
  /** Page ground. Defaults to the warm ivory used across the homepage. */
  tone = "paper",
}: {
  children: ReactNode;
  overlay?: boolean;
  tone?: "paper" | "ivory";
}) {
  return (
    <div className={tone === "ivory" ? "bg-ivory" : "bg-paper"}>
      {/* First tab stop on every page — the header has a lot of links. */}
      <a
        href="#main"
        className="type-nav sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-100 focus:bg-ink focus:px-4 focus:py-2 focus:text-ivory"
      >
        Skip to content
      </a>

      {/* Drives every <Reveal> on the page from one batched trigger. */}
      <ScrollReveals />

      <AnnouncementBar />
      <SiteHeader overlay={overlay} />

      <main id="main" className="min-h-[50vh]">
        {children}
      </main>

      <Footer />

      {/* Clears the mobile action bar so the footer's last row stays reachable. */}
      <div aria-hidden className="h-16 lg:hidden" />
      <MobileStickyBar />
    </div>
  );
}
