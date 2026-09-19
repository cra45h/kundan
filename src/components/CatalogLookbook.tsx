"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { CatalogMeta } from "@/lib/catalogs";
import type { Product } from "@/lib/products";
import { ProductCard } from "@/components/sections/ProductCard";
import { isLocalPublicSrc } from "@/lib/local-image";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type CatalogLookbookProps = {
  meta: CatalogMeta;
  products: Product[];
};

/**
 * Clean maison lookbook — story, photography, then the product edit.
 */
export function CatalogLookbook({ meta, products }: CatalogLookbookProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const feature = meta.scenes[0];
  const closer = meta.scenes[2] ?? meta.scenes[1];

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduce) return;

      const root = rootRef.current;
      if (!root) return;

      gsap.from(".lb-intro > *", {
        y: 24,
        autoAlpha: 0,
        duration: 0.85,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".lb-intro",
          start: "top 88%",
          once: true,
        },
      });

      gsap.utils.toArray<HTMLElement>(".lb-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 28, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              once: true,
            },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>(".lb-products").forEach((grid) => {
        const cards = grid.querySelectorAll(".lb-card");
        gsap.set(cards, { y: 32, autoAlpha: 0 });
        ScrollTrigger.batch(cards, {
          start: "top 92%",
          once: true,
          onEnter: (batch) => {
            gsap.to(batch, {
              y: 0,
              autoAlpha: 1,
              duration: 0.75,
              stagger: 0.06,
              ease: "power2.out",
              overwrite: true,
            });
          },
        });
      });

      const safety = window.setTimeout(() => {
        root.querySelectorAll(".lb-card, .lb-reveal").forEach((el) => {
          if (getComputedStyle(el).opacity === "0") {
            gsap.set(el, { autoAlpha: 1, clearProps: "transform" });
          }
        });
      }, 2400);

      requestAnimationFrame(() => ScrollTrigger.refresh());
      return () => window.clearTimeout(safety);
    },
    { scope: rootRef, dependencies: [meta.slug] }
  );

  return (
    <div ref={rootRef} className="bg-white">
      <section className="container-luxury border-b border-border py-16 md:py-20 lg:py-24">
        <div className="lb-intro grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-5">
            <h2
              id="catalog-grid"
              className="scroll-mt-28 font-display text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.08] tracking-[0.01em] text-ink"
            >
              Inside {meta.title}
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="max-w-xl text-[15px] leading-[1.8] text-muted">
              {meta.story}
            </p>
            <p className="mt-5 max-w-xl text-[15px] leading-[1.8] text-muted">
              {meta.description}
            </p>
          </div>
        </div>
      </section>

      {feature ? (
        <section className="lb-reveal container-luxury py-16 md:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="relative aspect-[4/5] overflow-hidden bg-white lg:col-span-7 lg:aspect-[5/4]">
              <Image
                src={feature.image}
                alt={feature.title}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                unoptimized={isLocalPublicSrc(feature.image)}
                className="object-cover"
                style={{ objectPosition: feature.objectPosition ?? "50% 20%" }}
              />
            </div>
            <div className="max-w-md lg:col-span-5">
              <p className="text-[11px] tracking-[0.22em] text-gold uppercase">
                {feature.caption}
              </p>
              <h3 className="mt-4 font-display text-[clamp(1.85rem,3vw,2.75rem)] leading-[1.12] text-ink">
                {feature.title}
              </h3>
              <p className="mt-5 text-[15px] leading-[1.8] text-muted">
                {feature.body}
              </p>
              <span className="mt-8 block h-px w-10 bg-gold" aria-hidden />
            </div>
          </div>
        </section>
      ) : null}

      <section className="container-luxury py-16 md:py-24">
        <div className="lb-reveal mb-12 flex flex-col gap-3 border-b border-border pb-8 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <h3 className="font-display text-[clamp(2rem,3.5vw,2.85rem)] leading-[1.1] text-ink">
              The collection
            </h3>
            <p className="mt-3 max-w-md text-[14px] leading-relaxed text-muted">
              Pieces selected for {meta.title} — composed for ceremony and
              lasting wear.
            </p>
          </div>
          <p className="text-[11px] tracking-[0.18em] text-muted uppercase">
            {products.length} {products.length === 1 ? "piece" : "pieces"}
          </p>
        </div>

        {products.length > 0 ? (
          <div className="lb-products grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 lg:grid-cols-4">
            {products.map((product) => (
              <div key={product.id} className="lb-card">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <p className="py-12 text-center text-sm text-muted">
            Pieces in {meta.title} are arriving soon.
          </p>
        )}
      </section>

      {closer ? (
        <section className="lb-reveal border-t border-border bg-white">
          <div className="container-luxury grid items-center gap-10 py-16 md:py-24 lg:grid-cols-12 lg:gap-16">
            <div className="max-w-md lg:col-span-5 lg:order-1">
              <p className="text-[11px] tracking-[0.22em] text-gold uppercase">
                {closer.caption}
              </p>
              <h3 className="mt-4 font-display text-[clamp(1.85rem,3vw,2.75rem)] leading-[1.12] text-ink">
                {closer.title}
              </h3>
              <p className="mt-5 text-[15px] leading-[1.8] text-muted">
                {closer.body}
              </p>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden bg-white lg:col-span-7 lg:order-2 lg:aspect-[5/4]">
              <Image
                src={closer.image}
                alt={closer.title}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                unoptimized={isLocalPublicSrc(closer.image)}
                className="object-cover"
                style={{ objectPosition: closer.objectPosition ?? "50% 20%" }}
              />
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
