import type { Metadata } from "next";
import { CollectionListing } from "@/components/collection/CollectionListing";
import { getProductsPage, parseMaterialFilter } from "@/lib/products";

export const metadata: Metadata = {
  title: "Bracelets — Kundan",
  description: "Cuffs, bangles and chains — weight you notice, never loud.",
};

type PageProps = {
  searchParams: Promise<{ page?: string; material?: string }>;
};

export default async function BraceletsCollectionPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const material = parseMaterialFilter(params.material);

  const requested = Number(params.page ?? "1");
  const { items, page, totalPages, total } = await getProductsPage(
    "bracelets",
    Number.isFinite(requested) ? requested : 1,
    8,
    material
  );

  return (
    <CollectionListing
      eyebrow="Shop by form"
      title="Bracelets"
      accent="soft"
      description="Cuffs, bangles and chains — weight you notice, never loud."
      crumbs={[{ label: "Collections", href: "/collections/rings" }, { label: "Bracelets" }]}
      items={items}
      total={total}
      page={page}
      totalPages={totalPages}
      basePath="/collections/bracelets"
      activeMaterial={material ?? "all"}
      query={material ? { material } : undefined}
    />
  );
}
