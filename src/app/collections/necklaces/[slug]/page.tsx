import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site/SiteShell";
import { ProductDetail } from "@/components/product/ProductDetail";
import { RelatedRail } from "@/components/product/RelatedRail";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { getProductBySlug, getProducts } from "@/lib/products";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug("necklaces", slug);
  if (!product) return { title: "Necklace — Kundan" };
  return {
    title: `${product.name} — Kundan`,
    description: product.description,
  };
}

export default async function NecklaceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug("necklaces", slug);
  if (!product) notFound();

  const related = (await getProducts({ category: "necklaces", limit: 5 }))
    .filter((r) => r.id !== product.id)
    .slice(0, 4);

  return (
    <SiteShell>
      <Breadcrumbs
        crumbs={[
          { label: "Necklaces", href: "/collections/necklaces" },
          { label: product.name },
        ]}
      />
      <ProductDetail product={product} />
      <RelatedRail
        title="More necklaces"
        href="/collections/necklaces"
        items={related}
      />
    </SiteShell>
  );
}
