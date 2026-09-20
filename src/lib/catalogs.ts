/** Maison catalogs — named lines like Hanif house collections / Gold Bank edits. */

export const CATALOGS = ["mehr", "noor", "rozana"] as const;

export type Catalog = (typeof CATALOGS)[number];

export type CatalogScene = {
  image: string;
  objectPosition?: string;
  caption: string;
  title: string;
  body: string;
};

export type CatalogMeta = {
  slug: Catalog;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  story: string;
  /** Homepage catalog stage poster */
  image: string;
  /** Catalog page hero — full-bleed poster, distinct from homepage */
  heroImage: string;
  secondaryImage: string;
  accent: string;
  /** CSS object-position for homepage poster */
  objectPosition: string;
  /** CSS object-position for catalog page hero poster */
  heroObjectPosition: string;
  /** Editorial lookbook scenes — fill the page between / around pieces */
  scenes: CatalogScene[];
  /** Extra stills for side panels / pair strips */
  gallery: string[];
};

export const catalogMeta: Record<Catalog, CatalogMeta> = {
  mehr: {
    slug: "mehr",
    title: "Mehr",
    subtitle: "Bridal",
    tagline: "For the dulhan’s first light",
    description:
      "Bridal sets and heirloom gold composed for Pakistani weddings — sehra-soft radiance, jhumka weight, and full-neck ceremony pieces.",
    story:
      "Mehr is affection made tangible. Polki, kundan, and warm 22K lines for mehndi, barat, and walima — jewellery that photographs like memory and travels from mother to daughter.",
    image: "/catalogs/mehr/homepage.jpg",
    heroImage: "/catalogs/mehr/hero.jpg",
    secondaryImage: "/catalogs/mehr/look-01.jpg",
    accent: "from-rose-900/40 via-void/20 to-transparent",
    objectPosition: "50% 45%",
    heroObjectPosition: "68% 15%",
    scenes: [
      {
        image: "/catalogs/mehr/look-01.jpg",
        objectPosition: "50% 18%",
        caption: "Sehra hour",
        title: "Gold that holds the ceremony",
        body: "Layered haar, nath, and choora — composed for the first photographs of the day, when light is soft and every detail must read.",
      },
      {
        image: "/catalogs/mehr/look-02.jpg",
        objectPosition: "48% 20%",
        caption: "Barat light",
        title: "Presence without noise",
        body: "Statement sets that read clearly in motion — full neck, strong silhouette, warm gold that photographs as heirloom.",
      },
      {
        image: "/catalogs/mehr/look-04.jpg",
        objectPosition: "42% 22%",
        caption: "Walima evening",
        title: "After the vows",
        body: "Softer layers for the second night — still bridal, still Kundan, ready to travel from one generation to the next.",
      },
    ],
    gallery: [
      "/catalogs/mehr/homepage.jpg",
      "/catalogs/mehr/look-01.jpg",
      "/catalogs/mehr/look-02.jpg",
      "/catalogs/mehr/look-03.jpg",
      "/catalogs/mehr/look-04.jpg",
      "/catalogs/mehr/feature.jpg",
    ],
  },
  noor: {
    slug: "noor",
    title: "Noor",
    subtitle: "High jewellery",
    tagline: "Statement light for the maison",
    description:
      "Bespoke-scale diamonds and sculptural gold — the high jewellery edit for soirées, shaadi guest looks, and pieces that lead the room.",
    story:
      "Noor is light held with discipline. Fewer stones, clearer silhouettes — diamond necklaces, cocktail rings, and atelier statements for Karachi nights and Lahore evenings.",
    image: "/catalogs/noor/homepage.jpg",
    heroImage: "/catalogs/noor/hero.jpg",
    secondaryImage: "/catalogs/noor/look-01.jpg",
    accent: "from-amber-200/20 via-void/30 to-transparent",
    objectPosition: "50% 55%",
    heroObjectPosition: "50% 38%",
    scenes: [
      {
        image: "/catalogs/noor/look-01.jpg",
        objectPosition: "42% 28%",
        caption: "Atelier light",
        title: "One stone, clear architecture",
        body: "High jewellery that leads with proportion — diamonds set so fire feels quiet, never busy.",
      },
      {
        image: "/catalogs/noor/look-02.jpg",
        objectPosition: "50% 35%",
        caption: "Night edit",
        title: "For rooms that listen",
        body: "Cocktail rings and sculptural gold for evenings when a single piece should carry the look.",
      },
    ],
    gallery: [
      "/catalogs/noor/look-01.jpg",
      "/catalogs/noor/look-02.jpg",
      "/catalogs/noor/homepage.jpg",
    ],
  },
  rozana: {
    slug: "rozana",
    title: "Rozana",
    subtitle: "Everyday gold",
    tagline: "Worn from chai to city",
    description:
      "Lifestyle gold for daily Pakistan — soft bangles, light chains, and office-to-iftar pieces with quiet brilliance.",
    story:
      "Rozana means every day. Lightweight gold and refined diamond accents you reach for without occasion — modern silhouettes with desi warmth, built for real wear across the week.",
    image: "/catalogs/rozana/homepage.jpg",
    heroImage: "/catalogs/rozana/hero.jpg",
    secondaryImage: "/catalogs/rozana/look-01.jpg",
    accent: "from-gold/25 via-void/25 to-transparent",
    objectPosition: "50% 55%",
    heroObjectPosition: "32% 28%",
    scenes: [
      {
        image: "/catalogs/rozana/look-01.jpg",
        objectPosition: "50% 25%",
        caption: "Morning gold",
        title: "Jewellery you forget you’re wearing",
        body: "Light chains and soft bangles for the commute, the meeting, the first chai — still unmistakably Kundan.",
      },
      {
        image: "/catalogs/rozana/look-02.jpg",
        objectPosition: "50% 30%",
        caption: "City hours",
        title: "From desk to iftar",
        body: "Pieces that move with the day — refined enough for evening, easy enough for every hour before.",
      },
    ],
    gallery: [
      "/catalogs/rozana/look-01.jpg",
      "/catalogs/rozana/look-02.jpg",
      "/catalogs/rozana/homepage.jpg",
    ],
  },
};

export function isCatalog(value: string): value is Catalog {
  return (CATALOGS as readonly string[]).includes(value);
}
