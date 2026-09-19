import { createAnonClient } from "@/lib/supabase";
import type { Catalog } from "@/lib/catalogs";
import { kundanProductImages, resolveProductMedia } from "@/lib/product-assets";

export const MATERIALS = ["diamond", "gold", "ruby"] as const;
export const CATEGORIES = ["rings", "bracelets", "necklaces"] as const;

export type Material = (typeof MATERIALS)[number];
export type Category = (typeof CATEGORIES)[number];
export type { Catalog };

export const MATERIAL_FILTERS: { label: string; value: Material | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Gold", value: "gold" },
  { label: "Diamond", value: "diamond" },
  { label: "Ruby", value: "ruby" },
];

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  material: Material;
  category: Category;
  catalog: Catalog | null;
  price: number;
  metal: string;
  carat: string;
  sizes: string[];
  image: string;
  gallery: string[];
  badge: string | null;
  is_new: boolean;
  is_bestseller: boolean;
  is_featured: boolean;
  is_signature: boolean;
  new_arrival_rank: number | null;
  active: boolean;
  sort_order: number;
};

export const materialMeta: Record<
  Material,
  {
    title: string;
    subtitle: string;
    description: string;
    story: string;
    image: string;
    heroWide: string;
    secondaryImage: string;
    accent: string;
    campaign: {
      title: string;
      tagline: string;
      tag: string;
      imageAlt: string;
    };
  }
> = {
  diamond: {
    title: "Diamond",
    subtitle: "Light, forever",
    description:
      "Brilliant cuts and quiet pavé — diamond pieces composed for heirloom radiance.",
    story:
      "Cut for silence as much as sparkle. Our diamonds are chosen for proportion and fire — set so light seems to rest inside the piece rather than shout from it.",
    image: "/materials/diamond/river-of-lights.png",
    heroWide: "/materials/diamond/hero-wide.png",
    secondaryImage: kundanProductImages.rings,
    accent: "from-white/20 via-gold/10 to-transparent",
    campaign: {
      title: "River of Lights",
      tagline:
        "Crafted with fancy intense yellow and flawless white diamonds, in a composition of pure celestial elegance.",
      tag: "Elegance reimagined",
      imageAlt:
        "Diamond high jewellery necklace — fancy yellow and white diamonds",
    },
  },
  gold: {
    title: "Gold",
    subtitle: "Warm permanence",
    description:
      "Yellow, white, and rose gold — sculptural forms with soft everyday brilliance.",
    story:
      "Gold that feels lived-in from the first wear. We favour warm alloys and considered weight — architecture for the hand, the wrist, the neck.",
    image: "/materials/gold/river-of-warmth.png",
    heroWide: "/materials/gold/hero-wide.png",
    secondaryImage: kundanProductImages.bracelets,
    accent: "from-amber-200/25 via-gold/20 to-transparent",
    campaign: {
      title: "River of Warmth",
      tagline:
        "Sculptural 18k gold with soft everyday brilliance — warm alloys composed for the hand, the wrist, the neck.",
      tag: "Permanence reimagined",
      imageAlt: "Yellow gold high jewellery necklace on celestial campaign backdrop",
    },
  },
  ruby: {
    title: "Ruby",
    subtitle: "Living color",
    description:
      "Vivid stones set with restraint — ruby jewellery with atelier precision.",
    story:
      "Color held with discipline. Rubies are placed where a single note of red can carry an entire composition — intimate, never theatrical.",
    image: "/materials/ruby/river-of-fire.png",
    heroWide: "/materials/ruby/hero-wide.png",
    secondaryImage: kundanProductImages.necklaces,
    accent: "from-rose-400/25 via-gold/10 to-transparent",
    campaign: {
      title: "River of Fire",
      tagline:
        "Pigeon-blood rubies and white diamonds set with restraint — color that carries the entire composition.",
      tag: "Color reimagined",
      imageAlt:
        "Ruby and diamond high jewellery necklace on celestial campaign backdrop",
    },
  },
};

export const categoryMeta: Record<
  Category,
  { title: string; subtitle: string; description: string; image: string }
> = {
  rings: {
    title: "Rings",
    subtitle: "Eternal bands",
    description: "Solitaires, halos, and sculptural bands for forever.",
    image: "/products/kundan-ring.png",
  },
  bracelets: {
    title: "Bracelets",
    subtitle: "Soft brilliance",
    description: "Cuffs and tennis lines with quiet radiance.",
    image: "/products/kundan-bracelet.png",
  },
  necklaces: {
    title: "Necklaces",
    subtitle: "Statement grace",
    description: "Pendants and cascades composed for the collarbone.",
    image: "/products/kundan-necklace.png",
  },
};

export function isMaterial(value: string): value is Material {
  return (MATERIALS as readonly string[]).includes(value);
}

export function parseMaterialFilter(
  value: string | undefined
): Material | undefined {
  const v = value?.toLowerCase() ?? "all";
  if (v === "all" || !isMaterial(v)) return undefined;
  return v;
}

export function isCategory(value: string): value is Category {
  return (CATEGORIES as readonly string[]).includes(value);
}

/**
 * Prices render in PKR for the Pakistani market.
 *
 * TODO(kundan): the stored figures are still on the old USD scale (a
 * bridal set reads as ₨4,280). The format is correct; the numbers are
 * not. They need re-basing in Supabase before launch — converting them
 * here would invent pricing.
 */
export function formatPrice(amount: number) {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function productHref(product: Pick<Product, "category" | "slug">) {
  return `/collections/${product.category}/${product.slug}`;
}

/** Adapt DB product → existing Rings UI components */
export function toRingProduct(p: Product) {
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    price: p.price,
    priceLabel: formatPrice(p.price),
    description: p.description,
    metal: p.metal,
    carat: p.carat,
    size: p.sizes,
    image: p.image,
    gallery: p.gallery.length ? p.gallery : [p.image],
    badge: p.badge ?? undefined,
  };
}

export function toNecklaceProduct(p: Product) {
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    price: p.price,
    priceLabel: formatPrice(p.price),
    description: p.description,
    metal: p.metal,
    carat: p.carat,
    length: p.sizes,
    image: p.image,
    gallery: p.gallery.length ? p.gallery : [p.image],
    badge: p.badge ?? undefined,
  };
}

export function toBraceletProduct(p: Product) {
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    price: p.price,
    priceLabel: formatPrice(p.price),
    description: p.description,
    metal: p.metal,
    carat: p.carat,
    size: p.sizes,
    image: p.image,
    gallery: p.gallery.length ? p.gallery : [p.image],
    badge: p.badge ?? undefined,
  };
}

function mapProduct(row: Record<string, unknown>): Product {
  const slug = String(row.slug);
  const rawImage = String(row.image);
  const rawGallery = Array.isArray(row.gallery)
    ? (row.gallery as string[])
    : [];
  const media = resolveProductMedia(row.category as Category, slug, rawImage);

  return {
    id: String(row.id),
    slug,
    name: String(row.name),
    description: String(row.description ?? ""),
    material: row.material as Material,
    category: row.category as Category,
    catalog: (row.catalog as Catalog | null) ?? null,
    price: Number(row.price),
    metal: String(row.metal ?? ""),
    carat: String(row.carat ?? ""),
    sizes: Array.isArray(row.sizes) ? (row.sizes as string[]) : [],
    image: media.image,
    gallery: media.gallery.length ? media.gallery : rawGallery.length ? rawGallery : [media.image],
    badge: (row.badge as string | null) ?? null,
    is_new: Boolean(row.is_new),
    is_bestseller: Boolean(row.is_bestseller),
    is_featured: Boolean(row.is_featured),
    is_signature: Boolean(row.is_signature),
    new_arrival_rank:
      row.new_arrival_rank == null ? null : Number(row.new_arrival_rank),
    active: row.active !== false,
    sort_order: Number(row.sort_order ?? 0),
  };
}

function logProductQueryError(scope: string, error: unknown) {
  const message =
    error instanceof Error
      ? error.message
      : typeof error === "object" &&
          error &&
          "message" in error &&
          typeof (error as { message: unknown }).message === "string"
        ? (error as { message: string }).message
        : String(error);

  const unreachable =
    /fetch failed|Failed to fetch|ENOTFOUND|ECONNREFUSED|ECONNRESET|ETIMEDOUT|network/i.test(
      message
    );

  if (unreachable) {
    // Network/DNS outages (paused or deleted project) — warn, don't trip the error overlay.
    console.warn(
      `[${scope}] Supabase unreachable (${message}). Restore/unpause the project and confirm NEXT_PUBLIC_SUPABASE_URL resolves.`
    );
    return;
  }

  console.error(`[${scope}]`, message);
}

export async function getProducts(filters?: {
  material?: Material;
  category?: Category;
  catalog?: Catalog;
  isNew?: boolean;
  isBestseller?: boolean;
  isSignature?: boolean;
  limit?: number;
}) {
  try {
    const supabase = createAnonClient();
    let query = supabase.from("products").select("*").eq("active", true);

    if (filters?.material) query = query.eq("material", filters.material);
    if (filters?.category) query = query.eq("category", filters.category);
    if (filters?.catalog) query = query.eq("catalog", filters.catalog);
    if (filters?.isNew) query = query.eq("is_new", true);
    if (filters?.isBestseller) query = query.eq("is_bestseller", true);
    if (filters?.isSignature) query = query.eq("is_signature", true);

    if (filters?.isNew) {
      query = query
        .order("new_arrival_rank", { ascending: true, nullsFirst: false })
        .order("created_at", { ascending: false });
    } else {
      query = query
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });
    }

    if (filters?.limit) query = query.limit(filters.limit);

    const { data, error } = await query;
    if (error) {
      logProductQueryError("getProducts", error);
      return [];
    }
    return (data ?? []).map(mapProduct);
  } catch (error) {
    logProductQueryError("getProducts", error);
    return [];
  }
}

/** Products flagged `is_new`, ordered by `new_arrival_rank`. */
export async function getNewArrivals(limit?: number) {
  return getProducts({ isNew: true, limit });
}

export async function getProductBySlug(category: Category, slug: string) {
  try {
    const supabase = createAnonClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("active", true)
      .eq("category", category)
      .eq("slug", slug)
      .maybeSingle();

    if (error) {
      logProductQueryError("getProductBySlug", error);
      return null;
    }
    return data ? mapProduct(data) : null;
  } catch (error) {
    logProductQueryError("getProductBySlug", error);
    return null;
  }
}

export async function getProductsPage(
  category: Category,
  page: number,
  perPage = 8,
  material?: Material
) {
  const supabase = createAnonClient();
  const safePage = Math.max(1, page);
  const from = (safePage - 1) * perPage;
  const to = from + perPage - 1;

  let query = supabase
    .from("products")
    .select("*", { count: "exact" })
    .eq("active", true)
    .eq("category", category);

  if (material) query = query.eq("material", material);

  const { data, error, count } = await query
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true })
    .range(from, to);

  if (error) {
      logProductQueryError("getProductsPage", error);
      return {
      items: [] as Product[],
      page: 1,
      totalPages: 1,
      total: 0,
      hasPrev: false,
      hasNext: false,
    };
  }

  const total = count ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const current = Math.min(safePage, totalPages);

  return {
    items: (data ?? []).map(mapProduct),
    page: current,
    totalPages,
    total,
    hasPrev: current > 1,
    hasNext: current < totalPages,
  };
}

export function getAdjacentCategories(current: Category) {
  const index = CATEGORIES.indexOf(current);
  return {
    prev: index > 0 ? CATEGORIES[index - 1] : null,
    next: index < CATEGORIES.length - 1 ? CATEGORIES[index + 1] : null,
  };
}

export type BestsellerProduct = Product & {
  rank: number;
  units_sold: number;
};

/** Ranked best sellers from the `bestsellers` table (future: driven by purchases). */
export async function getBestsellers(limit?: number): Promise<BestsellerProduct[]> {
  try {
    const supabase = createAnonClient();
    let query = supabase
      .from("bestsellers")
      .select("rank, units_sold, products(*)")
      .eq("active", true)
      .order("rank", { ascending: true });

    if (limit) query = query.limit(limit);

    const { data, error } = await query;
    if (error) {
      logProductQueryError("getBestsellers", error);
      return [];
    }

    return (data ?? [])
      .map((row) => {
        const productRow = Array.isArray(row.products)
          ? row.products[0]
          : row.products;
        if (!productRow || typeof productRow !== "object") return null;
        const product = mapProduct(productRow as Record<string, unknown>);
        if (!product.active) return null;
        return {
          ...product,
          rank: Number(row.rank),
          units_sold: Number(row.units_sold ?? 0),
        };
      })
      .filter((p): p is BestsellerProduct => p !== null);
  } catch (error) {
    logProductQueryError("getBestsellers", error);
    return [];
  }
}
