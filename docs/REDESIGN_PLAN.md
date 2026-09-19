# Kundan homepage redesign — findings and plan

Branch: `redesign/kundan-homepage`

## 1. What the repo is

| Concern | Finding |
| --- | --- |
| Framework | Next.js 15.5 (App Router), React 19, TypeScript strict |
| Styling | Tailwind CSS v4 via `@tailwindcss/postcss`; tokens declared in `@theme` inside `src/app/globals.css`. No `tailwind.config.js` — v4 CSS-first config |
| Path alias | `@/*` → `./src/*` |
| Motion | GSAP 3.13 + `@gsap/react` (`useGSAP`), `motion` v12 (`motion/react`), Lenis smooth scroll |
| Data | Supabase (`@supabase/supabase-js`) via `src/lib/products.ts`; anon client throws if env vars are missing and every query catches and returns `[]` |
| Cart | Real implementation — `src/components/CartProvider.tsx`, localStorage key `kundan-cart-v1` |
| Wishlist | **Does not exist.** `ProductCard.tsx` holds a local `useState` "liked" flag that is discarded on unmount |
| 3D | `three` is a dependency but is unused on the homepage |

No new framework will be introduced. Tailwind v4 `@theme` tokens stay the styling mechanism.

## 2. Current homepage, section by section

`src/app/page.tsx` → `src/components/HomePage.tsx`:

1. `Hero` — full-screen video/poster, sticky, boutique rises over it
2. `Manifesto` — "Not worn for a season. Kept for a lifetime."
3. `MaterialsRiver` — three full-screen panels: River of Warmth / Lights / Fire
4. `MaisonTicker` — horizontal marquee
5. `CatalogsShowcase` — Mehr / Noor / Rozana full-screen panels
6. `FeaturedCollections` — shop by silhouette
7. `MaisonEdit` — first products appear here, tabbed, 4 items
8. `AtelierPromise` — Sketch / Craft / Polish, plus trust items
9. `VisitMaison` — salon details
10. `Footer`

This confirms the brief's diagnosis. Sections 1–6 are six full-bleed editorial screens; the first product is in section 7, roughly 65% down a 14,586px page (measured).

## 3. Names to use verbatim (source of truth: the code)

Read from `src/lib/catalogs.ts` and `src/lib/products.ts`:

- Collections: **Mehr** (bridal, محبت), **Noor**, **Rozana** — note *Mehr*, not "Meh"
- Campaigns: **River of Warmth** (gold), **River of Lights** (diamond), **River of Fire** (ruby)
- The brief asks for one campaign banner; **River of Warmth** is the one to promote, and the other two stay on their material pages

## 4. Palette extracted from the existing codebase

Taken from the `@theme` block at commit `39f1266` (before this session's experiments):

| Token | Value | Role in the redesign |
| --- | --- | --- |
| `--color-lacquer` | `#5c1f2a` | **The deep brand colour.** Oxblood — hero panel and CTA banner |
| `--color-void` | `#07090e` | Storytelling / dark sections |
| `--color-gold` | `#bfa46a` | Antique gold accent; base of `--gold-gradient` |
| `--color-gold-bright` | `#d4bc82` | Lighter gold for gold-on-dark text |
| `--color-paper` | `#ebe6dc` | Warm ivory page ground |
| `--color-card` | `#f7f4ee` | Off-white product tiles |
| `--color-ink` | `#12151c` | Near-black ink (not `#000`) |
| `--color-muted` | `#6e6960` | Softened body ink |
| `--color-border` | `#d9d3c8` | Hairlines |

The brief's "warm ivory #F7F3EC-ish" sits between the existing `paper` and `card`; existing values are kept rather than introducing near-duplicates.

## 5. Gaps that need mock data

- **Categories.** Code has only `rings`, `bracelets`, `necklaces`. The brief needs six: Earrings, Bangles and Sets have no products, no images and no routes. They will be mock tiles linking to a filtered listing, flagged as TODO.
- **Wishlist.** No store exists. A `WishlistProvider` mirroring `CartProvider` (localStorage) will be added so hearts persist, rather than stubbing a dead button.
- **Reviews / testimonials.** No data anywhere — mock.
- **FAQ.** No data — mock copy, needs review by the business.
- **Prices.** `formatPrice` currently emits **USD** and seed values are USD-scale (`4280`, `1890`). The brief requires `en-PK` / `PKR`. Formatting will switch as specified, but **the underlying numbers are not converted** — ₨4,280 is implausible for 22K bridal gold. Flagged as a must-replace TODO; converting them silently would fabricate pricing.

## 6. Contact details to centralise

Currently scattered across `contact/page.tsx`, four `legal/*` pages, `Footer.tsx` and `WhatsAppButton.tsx`: `hello@kundan.atelier`, `+92 42 111 000 000`, `wa.me/9242111000000`, "MM Alam Road, Lahore". All move to `src/config/site.ts` (`WHATSAPP_NUMBER`, `STORE_ADDRESS`, `STORE_HOURS`, `ANNOUNCEMENT_TEXT`) with obvious mock values.

Paths use `src/config/` and `src/data/` rather than the brief's root-level `config/` and `data/`, to stay inside the existing `@/*` → `src/*` alias.

## 7. Typography

Replacing Bodoni Moda / Manrope entirely with **Instrument Serif** (400 + italic) and **Inter** (variable, 400–600), exposed as exactly two tokens — `--font-display`, `--font-body` — each with a real fallback stack. `font-synthesis: none` globally; display type never goes above weight 400 or below 24px. One italic `--gold-gradient` accent word per heading, with a solid-colour fallback and a lighter gold on dark grounds. Stack is ordered so a `[lang="ur"]` Noto Nastaliq Urdu rule can be added later without touching components.

## 8. Build order

- **Phase 1** — tokens, typography, global styles, announcement bar, header, footer
- **Phase 2** — Hero, TrustStrip, CategoryGrid, CollectionCards, ProductTabs + ProductCard
- **Phase 3** — CraftSection, ConsultationBanner, Testimonials, Faq, Newsletter, mobile sticky bar
- **Phase 4** — QA: build, lint, types, four breakpoints, JS-disabled, reduced motion

## 9. Decisions taken without asking

- The six full-screen panels are **not deleted**. `MaterialsRiver`, `CatalogsShowcase`, `MaisonTicker` and friends stay in the repo and keep serving `/materials/*` and `/catalogs/*`; they are simply no longer composed into the homepage. Deleting them would break live routes.
- Reveal animations are rebuilt to **fail open**: markup renders visible, and the hidden state is applied by JS only under `prefers-reduced-motion: no-preference`. This directly fixes the blank post-hero gap.
- The existing `Hero` video asset (`/hero/bridal-gold.mp4` + poster) is reused for the new split hero.
