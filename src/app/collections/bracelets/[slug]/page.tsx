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
  const product = await getProductBySlug("bracelets", slug);
  if (!product) return { title: "Bracelet — Kundan" };
  return {
    title: `${product.name} — Kundan`,
    description: product.description,
  };
}

export default async function BraceletDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug("bracelets", slug);
  if (!product) notFound();

  const related = (await getProducts({ category: "bracelets", limit: 5 }))
    .filter((r) => r.id !== product.id)
    .slice(0, 4);

  return (
    <SiteShell>
      <Breadcrumbs
        crumbs={[
          { label: "Bracelets", href: "/collections/bracelets" },
          { label: product.name },
        ]}
      />
      <ProductDetail product={product} />
      <RelatedRail
        title="More bracelets"
        href="/collections/bracelets"
        items={related}
      />
    </SiteShell>
  );
}
