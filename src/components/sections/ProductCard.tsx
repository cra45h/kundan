"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import { useWishlist } from "@/components/WishlistProvider";
import { HeartIcon, PlusIcon } from "@/components/site/icons";
import { formatPrice, productHref, type Product } from "@/lib/products";

/**
 * Product card — 4:5 plate on an off-white tile, caption beneath.
 *
 * Quick-add and wishlist are always visible on touch (where there is no
 * hover to reveal them) and fade in on pointer devices.
 */
export function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const { addItem } = useCart();
  const { has, toggle, hydrated } = useWishlist();
  const [imgError, setImgError] = useState(false);

  const href = productHref(product);
  const liked = hydrated && has(product.id);

  /** Second angle for the hover swap, when the gallery has one. */
  const alt = product.gallery?.find((g) => g && g !== product.image);

  return (
    <article className="group relative">
      <div className="relative aspect-4/5 w-full overflow-hidden bg-card">
        <Link href={href} className="block h-full w-full" tabIndex={-1} aria-hidden>
          {imgError ? (
            <span className="flex h-full w-full items-center justify-center text-[0.7rem] tracking-[0.1em] text-muted uppercase">
              Kundan
            </span>
          ) : (
            <>
              <Image
                src={product.image}
                alt=""
                fill
                priority={priority}
                loading={priority ? undefined : "lazy"}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                onError={() => setImgError(true)}
                className={`object-cover transition-opacity duration-500 motion-reduce:transition-none ${
                  alt ? "group-hover:opacity-0" : ""
                }`}
              />
              {alt ? (
                <Image
                  src={alt}
                  alt=""
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:transition-none"
                />
              ) : null}
            </>
          )}
        </Link>

        <button
          type="button"
          onClick={() =>
            toggle({
              id: product.id,
              slug: product.slug,
              name: product.name,
              price: product.price,
              image: product.image,
              collectionPath: `/collections/${product.category}`,
            })
          }
          aria-pressed={liked}
          aria-label={
            liked
              ? `Remove ${product.name} from wishlist`
              : `Save ${product.name} to wishlist`
          }
          className="absolute top-2.5 right-2.5 z-10 inline-flex h-9 w-9 items-center justify-center bg-ivory/90 text-ink hover:text-gold-deep"
        >
          <HeartIcon size={15} filled={liked} />
        </button>

        <button
          type="button"
          onClick={() =>
            addItem({
              id: product.id,
              slug: product.slug,
              name: product.name,
              price: product.price,
              priceLabel: formatPrice(product.price),
              image: product.image,
              collectionPath: `/collections/${product.category}`,
            })
          }
          aria-label={`Add ${product.name} to bag`}
          className="type-nav absolute inset-x-2.5 bottom-2.5 z-10 inline-flex items-center justify-center gap-2 bg-ink py-3 text-ivory opacity-100 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100 motion-reduce:transition-none"
        >
          <PlusIcon size={14} />
          Quick add
        </button>
      </div>

      <div className="mt-3">
        <h3 className="type-caption">
          <Link href={href} className="hover:underline">
            {/* Stretches the link over the plate without nesting anchors. */}
            <span className="absolute inset-0 z-0" aria-hidden />
            {product.name}
          </Link>
        </h3>
        {product.metal || product.carat ? (
          <p className="mt-1 text-[0.7rem] tracking-[0.08em] text-muted uppercase">
            {[product.metal, product.carat].filter(Boolean).join(" · ")}
          </p>
        ) : null}
        <p className="type-price mt-1.5 text-ink">
          {formatPrice(product.price)}
        </p>
      </div>
    </article>
  );
}

/** Matching skeleton — same box model, so swapping in costs no layout shift. */
export function ProductCardSkeleton() {
  return (
    <div aria-hidden className="animate-pulse">
      <div className="aspect-4/5 w-full bg-stone/50" />
      <div className="mt-3 h-2.5 w-3/4 bg-stone/50" />
      <div className="mt-2 h-2 w-1/2 bg-stone/40" />
      <div className="mt-2 h-2.5 w-1/3 bg-stone/50" />
    </div>
  );
}
