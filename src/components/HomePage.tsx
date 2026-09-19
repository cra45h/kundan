import { AnnouncementBar } from "@/components/site/AnnouncementBar";
import { SiteHeader } from "@/components/site/SiteHeader";
import { MobileStickyBar } from "@/components/site/MobileStickyBar";
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { CategoryGrid } from "@/components/sections/CategoryGrid";
import { CollectionCards } from "@/components/sections/CollectionCards";
import { ProductTabs } from "@/components/sections/ProductTabs";
import { CraftSection } from "@/components/sections/CraftSection";
import { ConsultationBanner } from "@/components/sections/ConsultationBanner";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { Newsletter } from "@/components/sections/Newsletter";
import { Footer } from "@/components/Footer";
import type { Product } from "@/lib/products";

/**
 * Homepage.
 *
 * Order is deliberate: hero, then proof, then a way in, then product. The
 * previous build ran six full-bleed editorial screens before the first
 * item; here product is reachable in two scrolls.
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
      <AnnouncementBar />
      <SiteHeader overlay />

      <main id="main">
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
      </main>

      <Footer />

      {/* Clears the sticky bar so the footer's last row is reachable. */}
      <div aria-hidden className="h-16 lg:hidden" />
      <MobileStickyBar />
    </>
  );
}
