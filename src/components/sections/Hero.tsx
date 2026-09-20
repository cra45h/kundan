import Image from "next/image";
import Link from "next/link";
import { MaterialRotator } from "@/components/sections/MaterialRotator";
import { MotionCta } from "@/components/motion/MotionCta";

const POSTER = "/hero/bridal-gold-poster.jpg";
const VIDEO = "/hero/bridal-gold.mp4";

/**
 * Split hero — lacquer copy panel beside an arch-masked film.
 *
 * Deliberately 85vh so the trust strip peeks above the fold and the page
 * reads as a shop rather than a title card. Server-rendered with no
 * reveal wrapper: this is the LCP block and must paint immediately.
 */
export function Hero() {
  return (
    /* -mt-16 slides the hero under the sticky header so the transparent
       state reads against the lacquer panel and the film. */
    /* bg-lacquer on the section, not just the panel: the strip sitting
       under the transparent header has to be painted or the page ground
       shows through as a pale band. */
    <section
      className="on-dark relative -mt-16 bg-lacquer"
      aria-labelledby="hero-heading"
    >
      <div className="grid grid-cols-1 lg:min-h-[85vh] lg:grid-cols-2">
        {/* Copy panel */}
        <div className="flex items-center bg-lacquer px-6 pt-16 pb-8 sm:px-10 sm:pt-24 sm:pb-16 lg:px-14 lg:pt-32 lg:pb-24">
          <div className="mx-auto w-full max-w-xl">
            <p data-hero-item className="type-nav text-ivory/70">
              Kundan · Est. Lahore
            </p>

            {/* The rotating word is decorative duplication for AT, so the
                heading exposes one stable sentence naming both materials
                and the animated copy is hidden from it. */}
            <h1 data-hero-item id="hero-heading" className="type-h1 mt-5 text-ivory">
              <span className="sr-only">
                Gold and diamond that outlive the occasion
              </span>
              <span aria-hidden>
                <MaterialRotator /> that outlives the occasion
              </span>
            </h1>

            <p data-hero-item className="type-body mt-6 text-ivory/75">
              Hand-set 22K bridal and everyday pieces, hallmarked in our own
              atelier and made to pass down.
            </p>

            <div data-hero-item className="mt-8 flex flex-wrap items-center gap-3 lg:mt-9">
              <MotionCta href="/catalogs/mehr" variant="light">
                Shop Bridal
              </MotionCta>
              <MotionCta
                href="/catalogs/rozana"
                variant="outline"
                arrow
                className="text-ivory"
              >
                Shop Everyday
              </MotionCta>
            </div>
          </div>
        </div>

        {/* Film panel — arch mask, Reference C.
            Lacquer, not void: this is the ground the arch is cut out of, so
            it has to match the copy panel or the hero reads as two colours. */}
        {/* Shorter on phones. At 60vh the hero ran to 1.28 screens, so the
            trust strip never peeked and nothing signalled there was more
            page below. */}
        <div /* Narrowest phones only: 28vh left the trust strip ~19px behind the
              sticky action bar, so nothing peeked and the fold read as the
              end of the page. */
          className="relative min-h-[28vh] bg-lacquer max-[374px]:min-h-[23vh] sm:min-h-[46vh] lg:min-h-full">
          <div className="absolute inset-0 overflow-hidden lg:inset-6 lg:rounded-t-[14rem]">
            <div data-hero-plate className="h-full w-full">
            <video
              className="h-full w-full object-cover"
              poster={POSTER}
              preload="metadata"
              autoPlay
              muted
              loop
              playsInline
              aria-hidden
            >
              <source src={VIDEO} type="video/mp4" />
            </video>

            {/* Poster stands in wherever the video cannot play (reduced data,
                autoplay blocked). Hidden from AT — decorative either way. */}
            <noscript>
              <Image
                src={POSTER}
                alt=""
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </noscript>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
