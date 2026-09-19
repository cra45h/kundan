/**
 * Header and footer link sets.
 *
 * Category routes: `rings`, `necklaces` and `bracelets` are real listing
 * pages backed by Supabase. Earrings, Bangles and Sets do not exist in the
 * catalogue yet — see `src/data/mock.ts`. Their links point at the closest
 * real page so nothing 404s.
 */

export type NavLink = {
  label: string;
  href: string;
  /** True where the destination is a placeholder, not a real listing. */
  placeholder?: boolean;
};

export const PRIMARY_NAV: NavLink[] = [
  { label: "Bridal", href: "/catalogs/mehr" },
  { label: "Necklaces", href: "/collections/necklaces" },
  { label: "Earrings", href: "/collections/necklaces", placeholder: true },
  { label: "Rings", href: "/collections/rings" },
  { label: "Bangles", href: "/collections/bracelets", placeholder: true },
  { label: "Collections", href: "/catalogs/mehr" },
];

export const FOOTER_SHOP: NavLink[] = [
  { label: "Rings", href: "/collections/rings" },
  { label: "Necklaces", href: "/collections/necklaces" },
  { label: "Bracelets", href: "/collections/bracelets" },
  { label: "New Arrivals", href: "/collections/new-arrivals" },
  { label: "Best Sellers", href: "/collections/best-sellers" },
];

export const FOOTER_MATERIALS: NavLink[] = [
  { label: "Gold", href: "/materials/gold" },
  { label: "Diamond", href: "/materials/diamond" },
  { label: "Ruby", href: "/materials/ruby" },
];

export const FOOTER_COLLECTIONS: NavLink[] = [
  { label: "Mehr", href: "/catalogs/mehr" },
  { label: "Noor", href: "/catalogs/noor" },
  { label: "Rozana", href: "/catalogs/rozana" },
  { label: "Signature", href: "/collections/signature" },
];

export const FOOTER_CARE: NavLink[] = [
  { label: "Book a viewing", href: "/contact" },
  { label: "The atelier", href: "/atelier" },
  { label: "Shipping & delivery", href: "/legal/shipping" },
  { label: "Returns & exchanges", href: "/legal/returns" },
  { label: "Lifetime warranty", href: "/legal/warranty" },
];

export const FOOTER_COMMITMENTS: NavLink[] = [
  { label: "Commitments", href: "/atelier" },
  { label: "Provenance & Assay", href: "/legal/warranty" },
  { label: "Bridal & Occasion", href: "/catalogs/mehr" },
];

export const FOOTER_LEGAL: NavLink[] = [
  { label: "Terms", href: "/legal/terms" },
  { label: "Privacy", href: "/legal/privacy" },
  { label: "Shipping", href: "/legal/shipping" },
  { label: "Returns", href: "/legal/returns" },
];
