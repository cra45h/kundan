import { AnnouncementBar } from "@/components/site/AnnouncementBar";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { CategoryGrid } from "@/components/sections/CategoryGrid";
import { CollectionCards } from "@/components/sections/CollectionCards";
import { ProductTabs } from "@/components/sections/ProductTabs";
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
      <SiteHeader />

      <main id="main">
        <Hero />
        <TrustStrip />
        <CategoryGrid />
        <CollectionCards />
        <ProductTabs bestSellers={bestSellers} newArrivals={newArrivals} />
      </main>

      <Footer />
    </>
  );
}
