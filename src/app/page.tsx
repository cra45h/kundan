import { HomePage } from "@/components/HomePage";
import { getBestsellers, getNewArrivals } from "@/lib/products";

export default async function Page() {
  // Eight each — the grid shows 8 per tab.
  const [newArrivals, bestSellers] = await Promise.all([
    getNewArrivals(8),
    getBestsellers(8),
  ]);

  return <HomePage newArrivals={newArrivals} bestSellers={bestSellers} />;
}
