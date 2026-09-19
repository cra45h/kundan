import type { Metadata } from "next";
import { CollectionListing } from "@/components/collection/CollectionListing";
import { getBestsellers } from "@/lib/products";

export const metadata: Metadata = {
  title: "Best Sellers — Kundan",
  description:
    "The pieces clients return for, ranked by demand across the maison.",
};

export default async function BestSellersPage() {
  const products = await getBestsellers();

  return (
    <CollectionListing
      eyebrow="The edit"
      title="Best"
      accent="sellers"
      description="The pieces clients return for, ranked by demand across the maison."
      crumbs={[{ label: "Best Sellers" }]}
      items={products}
      total={products.length}
      basePath="/collections/best-sellers"
    />
  );
}
