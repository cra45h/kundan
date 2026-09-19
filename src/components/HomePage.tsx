import { IntroLoader } from "@/components/site/IntroLoader";
import { SiteShell } from "@/components/site/SiteShell";
import { Hero } from "@/components/sections/Hero";
import { HeroIntro } from "@/components/sections/HeroIntro";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { CategoryGrid } from "@/components/sections/CategoryGrid";
import { CollectionCards } from "@/components/sections/CollectionCards";
import { ProductTabs } from "@/components/sections/ProductTabs";
import { CraftSection } from "@/components/sections/CraftSection";
import { ConsultationBanner } from "@/components/sections/ConsultationBanner";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { Newsletter } from "@/components/sections/Newsletter";
import type { Product } from "@/lib/products";

/**
 * Homepage.
 *
 * Order is deliberate: hero, then proof, then a way in, then product. The
 * previous build ran six full-bleed editorial screens before the first
 * item; here product is reachable in two scrolls.
 *
 * Renders through SiteShell like every other route. It used to assemble
 * its own chrome, which is how it ended up without <ScrollReveals> — every
 * scroll reveal on the homepage silently did nothing. One frame, one place
 * to mount page-wide behaviour.
 */
export function HomePage({
  newArrivals,
  bestSellers,
}: {
  newArrivals: Product[];
  bestSellers: Product[];
}) {
  return (
    <>
      {/* Homepage only — interior pages should not sit behind a loader. */}
      <IntroLoader />

      <SiteShell overlay>
        <HeroIntro />
        <Hero />
        <TrustStrip />
        <CategoryGrid />
        <CollectionCards />
        <ProductTabs bestSellers={bestSellers} newArrivals={newArrivals} />
        <CraftSection />
        <ConsultationBanner />
        <Testimonials />
        <Faq />
        <Newsletter />
      </SiteShell>
    </>
  );
}
