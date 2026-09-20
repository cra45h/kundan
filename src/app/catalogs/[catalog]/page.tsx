import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site/SiteShell";
import { Reveal } from "@/components/ui/Reveal";
import { CatalogHero } from "@/components/CatalogHero";
import { CatalogLookbook } from "@/components/CatalogLookbook";
import {
  CATALOGS,
  catalogMeta,
  isCatalog,
  type Catalog,
} from "@/lib/catalogs";
import {
  MATERIALS,
  getProducts,
  materialMeta,
} from "@/lib/products";

type PageProps = {
  params: Promise<{ catalog: string }>;
};

export function generateStaticParams() {
  return CATALOGS.map((catalog) => ({ catalog }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { catalog: raw } = await params;
  if (!isCatalog(raw)) return { title: "Catalog — Kundan" };
  const meta = catalogMeta[raw];
  return {
    title: `${meta.title} — Kundan`,
    description: meta.description,
  };
}

export default async function CatalogPage({ params }: PageProps) {
  const { catalog: raw } = await params;
  if (!isCatalog(raw)) notFound();
  const catalog = raw as Catalog;
  const meta = catalogMeta[catalog];
  const products = await getProducts({ catalog });
  const others = CATALOGS.filter((c) => c !== catalog);

  return (
    <SiteShell overlay>
      <CatalogHero catalog={catalog} />

      <CatalogLookbook meta={meta} products={products} />

      <section
        className="border-t border-border bg-paper"
        aria-labelledby="continue-heading"
      >
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <Reveal className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 id="continue-heading" className="type-h2">
                Continue exploring
              </h2>
              <p className="type-body mt-3 max-w-sm">
                Other houses of the maison, and the materials that compose
                them.
              </p>
            </div>

            <nav aria-label="Related collections">
              <ul className="flex flex-wrap gap-x-8 gap-y-3">
                {others.map((c) => (
                  <li key={c}>
                    <Link
                      href={`/catalogs/${c}`}
                      className="type-nav inline-flex min-h-11 items-center text-muted hover:text-ink"
                    >
                      {catalogMeta[c].title}
                    </Link>
                  </li>
                ))}
                {MATERIALS.map((m) => (
                  <li key={m}>
                    <Link
                      href={`/materials/${m}`}
                      className="type-nav inline-flex min-h-11 items-center text-muted hover:text-ink"
                    >
                      {materialMeta[m].title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>
        </div>
      </section>

    </SiteShell>
  );
}
