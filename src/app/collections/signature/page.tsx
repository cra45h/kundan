import type { Metadata } from "next";
import { CollectionListing } from "@/components/collection/CollectionListing";
import { getProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Signature Collection — Kundan",
  description:
    "Limited pieces composed with museum precision — the defining works of the maison.",
};

export default async function SignatureCollectionPage() {
  const products = await getProducts({ isSignature: true });

  return (
    <CollectionListing
      eyebrow="The edit"
      title="The signature"
      accent="collection"
      description="Limited pieces composed with museum precision — the defining works of the maison."
      crumbs={[{ label: "Signature" }]}
      items={products}
      total={products.length}
      basePath="/collections/signature"
    />
  );
}
