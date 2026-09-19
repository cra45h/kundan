"use client";

import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import { useWishlist } from "@/components/WishlistProvider";
import { HeartIcon, WhatsAppIcon } from "@/components/site/icons";
import { formatPrice, type Product } from "@/lib/products";
import { whatsappUrl } from "@/config/site";

const CATEGORY_LABEL: Record<Product["category"], string> = {
  rings: "Rings",
  necklaces: "Necklaces",
  bracelets: "Bracelets",
};

/**
 * One detail view for every category.
 *
 * Replaces RingProductDetail / NecklaceProductDetail / BraceletProductDetail,
 * which were three copies of the same layout that had drifted apart.
 *
 * Changes beyond styling:
 *  - The piece can be saved from here. Previously the heart existed only on
 *    the grid, so the page you land on from search had no way to save.
 *  - "Ask about this piece" opens WhatsApp prefilled with the product name.
 *    WhatsApp is the primary channel for this market and was absent here.
 *  - The add-to-cart confirmation is announced, not just coloured.
 *  - The size control is omitted entirely when a piece has no sizes, rather
 *    than rendering an empty row.
 */
export function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { has, toggle, hydrated } = useWishlist();

  const gallery = product.gallery?.length ? product.gallery : [product.image];
  const [activeImage, setActiveImage] = useState(gallery[0]);
  const [size, setSize] = useState(product.sizes?.[1] ?? product.sizes?.[0]);
  const [added, setAdded] = useState(false);

  const liked = hydrated && has(product.id);
  const collectionPath = `/collections/${product.category}`;

  const handleAdd = () => {
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      priceLabel: formatPrice(product.price),
      image: product.image,
      size,
      collectionPath,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="mx-auto grid max-w-[1280px] gap-10 px-4 py-10 sm:px-6 md:py-14 lg:grid-cols-2 lg:gap-16 lg:px-8">
      {/* Gallery */}
      <div>
        <div className="relative aspect-4/5 w-full overflow-hidden bg-card">
          <Image
            src={activeImage}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          {product.badge ? (
            <span className="type-nav absolute top-4 left-4 bg-ivory px-3 py-1.5 text-ink">
              {product.badge}
            </span>
          ) : null}
        </div>

        {gallery.length > 1 ? (
          <ul className="mt-3 flex gap-3 overflow-x-auto pb-1">
            {gallery.map((src) => {
              const active = src === activeImage;
              return (
                <li key={src}>
                  <button
                    type="button"
                    onClick={() => setActiveImage(src)}
                    aria-label={`Show image ${gallery.indexOf(src) + 1} of ${gallery.length}`}
                    aria-pressed={active}
                    className={`relative h-20 w-20 shrink-0 overflow-hidden border bg-card ${
                      active ? "border-ink" : "border-border"
                    }`}
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>

      {/* Detail */}
      <div className="lg:py-4">
        <p className="type-nav text-muted">
          {CATEGORY_LABEL[product.category]}
        </p>

        <h1 className="type-h2 mt-3">{product.name}</h1>

        <p className="font-display mt-4 text-[1.75rem] tracking-[-0.02em] tabular-nums">
          {formatPrice(product.price)}
        </p>

        {product.description ? (
          <p className="type-body mt-6">{product.description}</p>
        ) : null}

        <dl className="mt-8 grid grid-cols-2 gap-6 border-y border-border py-6">
          {product.metal ? (
            <div>
              <dt className="type-nav text-muted">Metal</dt>
              <dd className="mt-1.5 text-[0.9rem] text-ink">{product.metal}</dd>
            </div>
          ) : null}
          {product.carat && product.carat !== "—" ? (
            <div>
              <dt className="type-nav text-muted">Stone</dt>
              <dd className="mt-1.5 text-[0.9rem] text-ink">{product.carat}</dd>
            </div>
          ) : null}
        </dl>

        {product.sizes?.length ? (
          <fieldset className="mt-8">
            <legend className="type-nav text-muted">Select size</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  aria-pressed={size === s}
                  className={`type-nav flex h-11 min-w-11 items-center justify-center rounded-full border px-4 transition-colors duration-200 motion-reduce:transition-none ${
                    size === s
                      ? "border-ink bg-ink text-ivory"
                      : "border-border text-ink hover:border-ink"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </fieldset>
        ) : null}

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleAdd}
            className="type-button inline-flex min-w-48 items-center justify-center bg-ink px-7 py-4 text-ivory transition-transform duration-200 hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            {added ? "Added to bag" : "Add to bag"}
          </button>

          <button
            type="button"
            onClick={() =>
              toggle({
                id: product.id,
                slug: product.slug,
                name: product.name,
                price: product.price,
                image: product.image,
                collectionPath,
              })
            }
            aria-pressed={liked}
            aria-label={
              liked
                ? `Remove ${product.name} from wishlist`
                : `Save ${product.name} to wishlist`
            }
            className="inline-flex h-13 w-13 items-center justify-center rounded-full border border-border text-ink hover:border-ink"
          >
            <HeartIcon size={18} filled={liked} />
          </button>
        </div>

        {/* Screen readers get the confirmation too, not just the button label. */}
        <p role="status" aria-live="polite" className="sr-only">
          {added ? `${product.name} added to your bag` : ""}
        </p>

        <a
          href={whatsappUrl(
            `Assalam o Alaikum — I would like to ask about the ${product.name}.`
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="type-nav mt-6 inline-flex items-center gap-2 text-gold-deep hover:text-ink"
        >
          <WhatsAppIcon size={16} />
          Ask about this piece
        </a>
      </div>
    </div>
  );
}
