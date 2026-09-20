import Image from "next/image";
import Link from "next/link";
import { catalogMeta, type Catalog } from "@/lib/catalogs";
import { isLocalPublicSrc } from "@/lib/local-image";
import { Accent } from "@/components/ui/Accent";
import { MotionCta } from "@/components/motion/MotionCta";

/**
 * Catalog masthead — full-bleed plate with the house name over it.
 *
 * Rebuilt on the site's system: the shared type scale and gold accent,
 * the standard 1280px measure, and the same CTA component as the hero.
 * It previously carried its own display sizes, `container-luxury`, the
 * legacy `btn-hero-atelier` pill and a bespoke GSAP entrance.
 *
 * Server-rendered — this plate is the LCP image on a catalog page, so it
 * must not wait on a client bundle. The scroll reveal below it is handled
 * by the page-wide controller.
 */
export function CatalogHero({ catalog }: { catalog: Catalog }) {
  const meta = catalogMeta[catalog];

  return (
    <section
      className="on-dark catalog-hero relative isolate -mt-16 flex min-h-[78svh] flex-col md:min-h-[86svh]"
      aria-label={`${meta.title} — ${meta.subtitle}`}
    >
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden>
        <Image
          src={meta.heroImage}
          alt=""
          fill
          priority
          sizes="100vw"
          unoptimized={isLocalPublicSrc(meta.heroImage)}
          className="object-cover object-center"
          style={{ objectPosition: meta.heroObjectPosition }}
        />
        {/* Two washes: one from the left to hold the copy, one from the
            base so the plate settles into the page rather than stopping. */}
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(7,9,14,0.86)_0%,rgba(7,9,14,0.5)_42%,rgba(7,9,14,0.12)_72%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,9,14,0.5)_0%,transparent_34%,rgba(7,9,14,0.55)_100%)]" />
      </div>

      <div className="mx-auto flex w-full max-w-[1280px] flex-1 flex-col px-4 pt-24 pb-12 sm:px-6 md:pt-28 md:pb-16 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-auto">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <li>
              <Link href="/" className="type-nav text-ivory/60 hover:text-ivory">
                Home
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden className="text-ivory/30">
                /
              </span>
              <span className="type-nav text-ivory" aria-current="page">
                {meta.title}
              </span>
            </li>
          </ol>
        </nav>

        <div className="mt-16 max-w-xl md:mt-20">
          <p className="type-nav text-ivory/70">{meta.subtitle}</p>

          <h1 className="type-h1 mt-4 text-ivory">
            The <Accent onDark>{meta.title}</Accent> house
          </h1>

          <p className="type-body mt-5 text-ivory/75">{meta.tagline}</p>

          <div className="mt-8">
            <MotionCta href="#catalog-grid" variant="light">
              View the collection
            </MotionCta>
          </div>
        </div>
      </div>
    </section>
  );
}
