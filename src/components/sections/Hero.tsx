import Image from "next/image";
import { MaterialRotator } from "@/components/sections/MaterialRotator";
import { MotionCta } from "@/components/motion/MotionCta";

const POSTER = "/hero/bridal-gold-poster.jpg";
const VIDEO = "/hero/bridal-gold.mp4";

/**
 * Hero — lacquer ground with an arch-masked film.
 *
 * Two arrangements of the same three blocks, one film element:
 *
 *   phone    headline → arched window → copy → buttons
 *   desktop  headline + copy + buttons left, film filling the right column
 *
 * The blocks are ordered with flex `order` on small screens and placed
 * explicitly on the desktop grid, so the window can sit between the
 * headline and the copy on a phone without duplicating the <video> or
 * shipping a second one to download.
 *
 * `lg:grid-rows-2` with the text halves pinned to the inner edges is what
 * keeps the desktop column optically centred while the film still spans
 * the full 85vh.
 *
 * Server-rendered with no reveal wrapper: this is the LCP block and must
 * paint immediately.
 */
export function Hero() {
  return (
    /* -mt-16 slides the hero under the sticky header so the transparent
       state reads against the lacquer panel and the film.
       bg-lacquer on the section, not just a panel: the strip sitting under
       the transparent header has to be painted or the page ground shows
       through as a pale band. */
    <section
      className="on-dark relative -mt-16 bg-lacquer"
      aria-labelledby="hero-heading"
    >
      <div className="flex flex-col lg:grid lg:min-h-[85vh] lg:grid-cols-2 lg:grid-rows-2">
        {/* Headline */}
        <div className="order-1 px-6 pt-16 max-[374px]:pt-12 sm:px-10 sm:pt-24 lg:order-none lg:col-start-1 lg:row-start-1 lg:self-end lg:px-14 lg:pt-0">
          <div className="mx-auto w-full max-w-xl">
            <p data-hero-item className="type-nav text-ivory/70">
              Kundan · Est. Lahore
            </p>

            {/* The rotating word is decorative duplication for AT, so the
                heading exposes one stable sentence naming both materials
                and the animated copy is hidden from it. */}
            <h1
              data-hero-item
              id="hero-heading"
              className="type-h1 mt-5 text-ivory"
            >
              <span className="sr-only">
                Gold and diamond that outlive the occasion
              </span>
              <span aria-hidden>
                <MaterialRotator /> that outlives the occasion
              </span>
            </h1>
          </div>
        </div>

        {/* Film — the window. Inset and arched at every size now, rather
            than full-bleed on phones, so it reads as a framed view on the
            lacquer instead of a band stuck to the bottom of the hero. */}
        <div className="order-2 px-6 pt-6 sm:mx-auto sm:w-full sm:max-w-md sm:px-10 lg:mx-0 lg:max-w-none lg:order-none lg:col-span-1 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:p-6">
          <div className="relative aspect-square overflow-hidden rounded-t-[7rem] max-[374px]:aspect-4/3 max-[374px]:rounded-t-[5rem] sm:aspect-4/5 sm:rounded-t-[10rem] lg:aspect-auto lg:h-full lg:rounded-t-[14rem]">
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

              {/* Poster stands in wherever the video cannot play (reduced
                  data, autoplay blocked). Hidden from AT — decorative. */}
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

        {/* Copy and actions */}
        <div className="order-3 px-6 pt-6 pb-10 sm:px-10 sm:pb-16 lg:order-none lg:col-start-1 lg:row-start-2 lg:self-start lg:px-14 lg:pt-0 lg:pb-0">
          <div className="mx-auto w-full max-w-xl">
            <p data-hero-item className="type-body text-ivory/75 lg:mt-6">
              Hand-set 22K bridal and everyday pieces, hallmarked in our own
              atelier and made to pass down.
            </p>

            <div
              data-hero-item
              className="mt-6 flex flex-wrap items-center gap-3 lg:mt-9"
            >
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
      </div>
    </section>
  );
}
