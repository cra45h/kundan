import Image from "next/image";
import Link from "next/link";
import { Accent } from "@/components/ui/Accent";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowIcon } from "@/components/site/icons";
import { COLLECTION_CARDS } from "@/data/mock";
import { materialMeta } from "@/lib/products";

/**
 * The three houses — Mehr, Noor, Rozana — as one row of arch-masked cards,
 * followed by a single campaign banner.
 *
 * Previously the collections and the "River of…" campaign were six separate
 * full-screen panels telling two competing stories. Here the collections
 * lead and the campaign closes the section as one block.
 */
export function CollectionCards() {
  const campaign = materialMeta.gold.campaign; // "River of Warmth"

  return (
    <section
      className="bg-ivory py-14 md:py-24 lg:py-28"
      aria-labelledby="collections-heading"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <Reveal>
          <h2 id="collections-heading" className="type-h2">
            Explore <Accent>our</Accent> collections
          </h2>
        </Reveal>

        <ul className="mt-10 grid gap-6 md:grid-cols-3 md:gap-5">
          {COLLECTION_CARDS.map((c, i) => (
            <li key={c.slug}>
              <Reveal delay={i * 70}>
                <Link href={c.href} className="group block">
                  <div className="relative aspect-3/4 w-full overflow-hidden rounded-t-[10rem] bg-card">
                    <Image
                      src={c.image}
                      alt={`${c.title} — ${c.subtitle}`}
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    />
                  </div>

                  <h3 className="type-h3 mt-5">{c.title}</h3>
                  <p className="mt-1.5 text-[0.85rem] leading-snug text-muted">
                    {c.description}
                  </p>
                  <span className="type-nav mt-3 inline-flex items-center gap-2 text-gold-deep">
                    Explore
                    <ArrowIcon
                      size={14}
                      className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                    />
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>

      {/* One campaign banner, full width */}
      <Reveal className="mt-14 md:mt-20">
        <Link
          href="/materials/gold"
          className="on-dark group relative block min-h-[22rem] overflow-hidden md:min-h-[26rem]"
        >
          <Image
            src={materialMeta.gold.heroWide}
            alt={campaign.imageAlt}
            fill
            loading="lazy"
            sizes="100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-linear-to-r from-void/85 via-void/45 to-transparent"
          />
          <div className="relative flex min-h-[22rem] items-center px-6 py-16 sm:px-10 md:min-h-[26rem] lg:px-16">
            <div className="max-w-xl">
              <p className="type-nav text-ivory/70">{campaign.tag}</p>
              <h3 className="type-h2 mt-4 text-ivory">
                River of <Accent onDark>Warmth</Accent>
              </h3>
              <p className="type-body mt-4 text-ivory/75">{campaign.tagline}</p>
              <span className="type-nav mt-6 inline-flex items-center gap-2 text-gold-bright">
                Discover the campaign
                <ArrowIcon
                  size={14}
                  className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                />
              </span>
            </div>
          </div>
        </Link>
      </Reveal>
    </section>
  );
}
