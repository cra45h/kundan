import Image from "next/image";
import type { CatalogMeta } from "@/lib/catalogs";
import type { Product } from "@/lib/products";
import { ProductCard } from "@/components/sections/ProductCard";
import { Accent } from "@/components/ui/Accent";
import { Reveal } from "@/components/ui/Reveal";
import { Parallax } from "@/components/ui/Parallax";
import { isLocalPublicSrc } from "@/lib/local-image";

/**
 * Catalog body — the house's story, two editorial scenes, and its pieces.
 *
 * Rebuilt on the shared system. It used to run its own ScrollTriggers over
 * `.lb-intro`, `.lb-reveal` and `.lb-card`, which duplicated the page-wide
 * reveal controller and gave catalog pages a different rhythm from every
 * other route; those markers are now plain `<Reveal>` and the one batched
 * trigger in SiteShell drives them.
 *
 * Server component — nothing here needs client state, and the page's LCP
 * plate sits directly above it.
 */
export function CatalogLookbook({
  meta,
  products,
}: {
  meta: CatalogMeta;
  products: Product[];
}) {
  const feature = meta.scenes[0];
  const closer = meta.scenes[2] ?? meta.scenes[1];

  return (
    <div className="bg-paper">
      {/* The house, in its own words */}
      <section className="border-b border-border bg-ivory">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <Reveal className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-12">
            <div className="lg:col-span-5">
              <h2 id="catalog-story" className="type-h2 scroll-mt-24">
                {meta.title}
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="type-body">{meta.description}</p>
              <p className="type-body mt-5">{meta.story}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Feature scene */}
      {feature ? (
        <Scene
          image={feature.image}
          objectPosition={feature.objectPosition}
          caption={feature.caption}
          title={feature.title}
          body={feature.body}
        />
      ) : null}

      {/* The pieces */}
      <section
        className="py-14 md:py-20"
        aria-labelledby="catalog-grid-heading"
      >
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-10 flex flex-col gap-3 border-b border-border pb-8 md:mb-12 md:flex-row md:items-end md:justify-between">
            <div>
              <h3 id="catalog-grid-heading" className="type-h2 scroll-mt-24">
                Pieces from <Accent>{meta.title}</Accent>
              </h3>
              <p className="type-body mt-3">{meta.tagline}</p>
            </div>
            <p className="type-nav shrink-0 text-muted">
              {products.length} {products.length === 1 ? "piece" : "pieces"}
            </p>
          </Reveal>

          {/* scroll-mt clears the sticky header when the hero CTA lands here */}
          <div id="catalog-grid" className="scroll-mt-24">
            {products.length > 0 ? (
              <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 lg:grid-cols-4">
                {products.map((product, i) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    priority={i < 4}
                  />
                ))}
              </div>
            ) : (
              <div className="border border-border bg-card px-6 py-16 text-center">
                <p className="type-h3">
                  {meta.title} is being restocked
                </p>
                <p className="type-body mx-auto mt-3">
                  New pieces are added as they leave the atelier.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Closing scene */}
      {closer && closer !== feature ? (
        <Scene
          image={closer.image}
          objectPosition={closer.objectPosition}
          caption={closer.caption}
          title={closer.title}
          body={closer.body}
          flip
        />
      ) : null}
    </div>
  );
}

/**
 * One editorial scene — image one side, copy the other, alternating.
 * The plate drifts on scroll, the same treatment the homepage gives its
 * large images.
 */
function Scene({
  image,
  objectPosition,
  caption,
  title,
  body,
  flip = false,
}: {
  image: string;
  objectPosition?: string;
  caption: string;
  title: string;
  body: string;
  flip?: boolean;
}) {
  return (
    <section className="border-b border-border bg-ivory">
      <div className="mx-auto grid max-w-[1280px] items-center gap-10 px-4 py-14 sm:px-6 md:py-20 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <Reveal
          className={`lg:col-span-7 ${flip ? "lg:order-2" : ""}`}
        >
          <Parallax
            amount={9}
            className="relative aspect-4/5 w-full bg-card sm:aspect-5/4"
          >
            <div className="absolute inset-[-6%]">
              <Image
                src={image}
                alt={`${title} — ${caption}`}
                fill
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 58vw"
                unoptimized={isLocalPublicSrc(image)}
                className="object-cover"
                style={objectPosition ? { objectPosition } : undefined}
              />
            </div>
          </Parallax>
        </Reveal>

        <Reveal
          delay={80}
          className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}
        >
          <p className="type-nav text-muted">{caption}</p>
          <h3 className="type-h2 mt-4">{title}</h3>
          <p className="type-body mt-5">{body}</p>
          <span className="mt-8 block h-px w-10 bg-gold-deep" aria-hidden />
        </Reveal>
      </div>
    </section>
  );
}
