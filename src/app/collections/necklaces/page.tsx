import type { Metadata } from "next";
import { CollectionListing } from "@/components/collection/CollectionListing";
import { getProductsPage, parseMaterialFilter } from "@/lib/products";

export const metadata: Metadata = {
  title: "Necklaces — Kundan",
  description: "Full-neck ceremony pieces and everyday chains in warm 22K.",
};

type PageProps = {
  searchParams: Promise<{ page?: string; material?: string }>;
};

export default async function NecklacesCollectionPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const material = parseMaterialFilter(params.material);

  const requested = Number(params.page ?? "1");
  const { items, page, totalPages, total } = await getProductsPage(
    "necklaces",
    Number.isFinite(requested) ? requested : 1,
    8,
    material
  );

  return (
    <CollectionListing
      eyebrow="Shop by form"
      title="Necklaces"
      accent="statement"
      description="Full-neck ceremony pieces and everyday chains in warm 22K."
      crumbs={[{ label: "Collections", href: "/collections/rings" }, { label: "Necklaces" }]}
      items={items}
      total={total}
      page={page}
      totalPages={totalPages}
      basePath="/collections/necklaces"
      activeMaterial={material ?? "all"}
      query={material ? { material } : undefined}
    />
  );
}
