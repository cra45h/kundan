import type { Metadata } from "next";
import { CollectionListing } from "@/components/collection/CollectionListing";
import { getProductsPage, parseMaterialFilter } from "@/lib/products";

export const metadata: Metadata = {
  title: "Rings — Kundan",
  description: "Bands and solitaires, set by hand and sized to the wearer.",
};

type PageProps = {
  searchParams: Promise<{ page?: string; material?: string }>;
};

export default async function RingsCollectionPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const material = parseMaterialFilter(params.material);

  const requested = Number(params.page ?? "1");
  const { items, page, totalPages, total } = await getProductsPage(
    "rings",
    Number.isFinite(requested) ? requested : 1,
    8,
    material
  );

  return (
    <CollectionListing
      eyebrow="Shop by form"
      title="Rings"
      accent="eternal"
      description="Bands and solitaires, set by hand and sized to the wearer."
      crumbs={[{ label: "Collections", href: "/collections/rings" }, { label: "Rings" }]}
      items={items}
      total={total}
      page={page}
      totalPages={totalPages}
      basePath="/collections/rings"
      activeMaterial={material ?? "all"}
      query={material ? { material } : undefined}
    />
  );
}
