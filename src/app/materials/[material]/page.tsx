import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHero } from "@/components/site/PageHero";
import { ProductCard } from "@/components/sections/ProductCard";
import { MaterialHero } from "@/components/MaterialHero";
import {
  MATERIALS,
  getProducts,
  isMaterial,
  materialMeta,
  type Material,
} from "@/lib/products";

type PageProps = {
  params: Promise<{ material: string }>;
};

export function generateStaticParams() {
  return MATERIALS.map((material) => ({ material }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { material: raw } = await params;
  if (!isMaterial(raw)) return { title: "Material — Kundan" };
  const meta = materialMeta[raw];
  return { title: `${meta.title} — Kundan`, description: meta.description };
}

export default async function MaterialPage({ params }: PageProps) {
  const { material: raw } = await params;
  if (!isMaterial(raw)) notFound();
  const material = raw as Material;
  const meta = materialMeta[material];
  const products = await getProducts({ material });
  const others = MATERIALS.filter((m) => m !== material);

  return (
    <SiteShell overlay>
      <MaterialHero material={material} />

      <PageHero
        eyebrow="The edit"
        title={meta.title}
        accent="pieces"
        description={meta.description}
        crumbs={[{ label: "Materials" }, { label: meta.title }]}
        headingLevel={2}
      />

      <div className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <p className="type-nav mb-10 text-muted">
          {products.length} {products.length === 1 ? "piece" : "pieces"}
        </p>

        {products.length === 0 ? (
          <div className="border border-border bg-card px-6 py-16 text-center">
            <p className="type-h3">
              Nothing set in {meta.title.toLowerCase()} yet
            </p>
            <p className="type-body mx-auto mt-3">
              New pieces are added as they leave the atelier.
            </p>
            <Link
              href="/collections/rings"
              className="type-button mt-7 inline-flex items-center gap-2 bg-ink px-7 py-3.5 text-ivory"
            >
              Browse the collection
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 lg:grid-cols-4">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} priority={i < 4} />
            ))}
          </div>
        )}

        <div className="mt-16 border-t border-border pt-10">
          <h2 className="type-nav text-muted">Continue exploring</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            {others.map((m) => (
              <Link
                key={m}
                href={`/materials/${m}`}
                className="type-button inline-flex items-center rounded-full border border-ink/25 px-6 py-3 text-ink transition-colors duration-200 hover:border-ink motion-reduce:transition-none"
              >
                {materialMeta[m].title}
              </Link>
            ))}
            <Link
              href="/collections/rings"
              className="type-button inline-flex items-center bg-ink px-6 py-3 text-ivory"
            >
              All collections
            </Link>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
