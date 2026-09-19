import type { Metadata } from "next";
import { CollectionListing } from "@/components/collection/CollectionListing";
import { getNewArrivals } from "@/lib/products";

export const metadata: Metadata = {
  title: "New Arrivals — Kundan",
  description: "The most recent work to leave the atelier bench.",
};

export default async function NewArrivalsPage() {
  const products = await getNewArrivals();

  return (
    <CollectionListing
      eyebrow="The edit"
      title="New"
      accent="arrivals"
      description="The most recent work to leave the atelier bench."
      crumbs={[{ label: "New Arrivals" }]}
      items={products}
      total={products.length}
      basePath="/collections/new-arrivals"
    />
  );
}
