/**
 * ─────────────────────────────────────────────────────────────────────
 * MOCK DATA — replace before launch.
 *
 * Everything in this file is placeholder content standing in for data
 * the codebase does not have yet. Real product records come from
 * Supabase via `src/lib/products.ts`; nothing here touches that path.
 *
 * What is genuinely missing from the catalogue:
 *   • Earrings, Bangles and Sets — no products, images or routes exist
 *   • Reviews / testimonials — no source at all
 *   • FAQ copy — needs sign-off from the business
 * ─────────────────────────────────────────────────────────────────────
 */

import { catalogMeta } from "@/lib/catalogs";

/* ── Trust strip ──────────────────────────────────────────────────── */

export type TrustItem = {
  title: string;
  detail: string;
  icon: "karat" | "hallmark" | "shipping" | "warranty";
};

export const TRUST_ITEMS: TrustItem[] = [
  { title: "22K gold", detail: "Certified purity, every piece", icon: "karat" },
  {
    title: "Hallmark certified",
    detail: "Assayed and stamped",
    icon: "hallmark",
  },
  {
    title: "Free insured shipping",
    detail: "Across Pakistan",
    icon: "shipping",
  },
  {
    title: "Exchange & lifetime warranty",
    detail: "On craftsmanship",
    icon: "warranty",
  },
];

/* ── Shop by category ─────────────────────────────────────────────── */

export type Segment = "bridal" | "everyday" | "gifting";

export const SEGMENTS: { id: Segment; label: string }[] = [
  { id: "bridal", label: "Bridal" },
  { id: "everyday", label: "Everyday" },
  { id: "gifting", label: "Gifting" },
];

export type CategoryTile = {
  label: string;
  image: string;
  /** Per-segment destinations, so the toggle re-links rather than reloads. */
  href: Record<Segment, string>;
  /** TODO(kundan): true where no real listing exists for this category. */
  placeholder?: boolean;
};

export const CATEGORY_TILES: CategoryTile[] = [
  {
    label: "Rings",
    image: "/products/ring-halo.jpg",
    href: {
      bridal: "/collections/rings",
      everyday: "/collections/rings",
      gifting: "/collections/rings",
    },
  },
  {
    label: "Necklaces",
    image: "/products/necklace-set.jpg",
    href: {
      bridal: "/collections/necklaces",
      everyday: "/collections/necklaces",
      gifting: "/collections/necklaces",
    },
  },
  {
    label: "Earrings",
    image: "/catalogs/mehr/look-02.jpg",
    href: {
      bridal: "/catalogs/mehr",
      everyday: "/catalogs/rozana",
      gifting: "/catalogs/noor",
    },
    placeholder: true,
  },
  {
    label: "Bangles",
    image: "/products/bracelet-gold.jpg",
    href: {
      bridal: "/catalogs/mehr",
      everyday: "/collections/bracelets",
      gifting: "/collections/bracelets",
    },
    placeholder: true,
  },
  {
    label: "Bracelets",
    image: "/products/bracelet-chain.jpg",
    href: {
      bridal: "/collections/bracelets",
      everyday: "/collections/bracelets",
      gifting: "/collections/bracelets",
    },
  },
  {
    label: "Sets",
    image: "/catalogs/mehr/look-01.jpg",
    href: {
      bridal: "/catalogs/mehr",
      everyday: "/catalogs/rozana",
      gifting: "/catalogs/noor",
    },
    placeholder: true,
  },
];

/* ── Collections ──────────────────────────────────────────────────── */

/** Real collections, read from the catalogue rather than retyped. */
export const COLLECTION_CARDS = (["mehr", "noor", "rozana"] as const).map(
  (slug) => ({
    slug,
    title: catalogMeta[slug].title,
    subtitle: catalogMeta[slug].subtitle,
    description: catalogMeta[slug].tagline,
    image: catalogMeta[slug].image,
    href: `/catalogs/${slug}`,
  })
);

/* ── Craft ────────────────────────────────────────────────────────── */

export const CRAFT_STEPS = [
  {
    step: "01",
    title: "Sketch",
    detail: "Every commission begins on paper, drawn to the wearer.",
  },
  {
    step: "02",
    title: "Craft",
    detail: "Gold is drawn, set and shaped by hand at the bench.",
  },
  {
    step: "03",
    title: "Polish",
    detail: "Finished, assayed and hallmarked before it leaves us.",
  },
];

/* ── Testimonials — MOCK ──────────────────────────────────────────── */

export type Testimonial = {
  id: string;
  quote: string;
  /** One word inside `quote` to set as the italic gold accent. */
  accentWord: string;
  name: string;
  role: string;
  rating: number;
};

// TODO(kundan): replace with real, attributable customer reviews.
export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    quote:
      "The set arrived heavier and warmer than I expected. It photographed beautifully through the whole barat.",
    accentWord: "beautifully",
    name: "Ayesha R.",
    role: "Bridal client, Lahore",
    rating: 5,
  },
  {
    id: "t2",
    quote:
      "They sized the bangles twice without a word of complaint, and the finish is flawless.",
    accentWord: "flawless",
    name: "Hina S.",
    role: "Karachi",
    rating: 5,
  },
  {
    id: "t3",
    quote:
      "I wear the everyday chain constantly and it has not dulled once in two years.",
    accentWord: "constantly",
    name: "Sana M.",
    role: "Islamabad",
    rating: 4,
  },
  {
    id: "t4",
    quote:
      "The consultation was unhurried. They talked me out of a heavier piece, which I appreciated.",
    accentWord: "unhurried",
    name: "Fatima K.",
    role: "Bridal client, Multan",
    rating: 5,
  },
];

/* ── FAQ — MOCK ───────────────────────────────────────────────────── */

// TODO(kundan): every answer below needs business sign-off.
export const FAQ_ITEMS = [
  {
    q: "How do I find my ring or bangle size?",
    a: "Visit the salon for a fitting, or ask us on WhatsApp for a printable sizer. For bangles we need the widest point of the hand when the thumb is tucked in.",
  },
  {
    q: "How is the gold rate applied to pricing?",
    a: "Pieces are priced on the day's gold rate plus making charges, which vary with the complexity of the work. We confirm the final figure before any order is made.",
  },
  {
    q: "Can I return or exchange a piece?",
    a: "Unworn pieces can be exchanged within 14 days with proof of purchase. Commissioned and customised work is not returnable, since it is made to your specification.",
  },
  {
    q: "Do you take custom commissions?",
    a: "Yes. Bridal sets and bespoke work begin with a consultation, then a sketch for approval. Allow lead time for crafting and polish, especially around the wedding calendar.",
  },
  {
    q: "How does shipping work?",
    a: "Insured delivery is complimentary across Pakistan. Orders are confirmed by the atelier before dispatch and require a signature on arrival.",
  },
  {
    q: "Is every piece hallmarked?",
    a: "Yes. Gold is assayed and hallmarked for purity before it leaves us, and the certificate travels with the piece.",
  },
];
