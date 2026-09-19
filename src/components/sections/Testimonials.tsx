"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { Accent } from "@/components/ui/Accent";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowIcon } from "@/components/site/icons";
import { TESTIMONIALS, type Testimonial } from "@/data/mock";

/**
 * Social proof — a lead pull-quote beside a product image, then the rest
 * as a scroller.
 *
 * The scroller is a real overflow container with scroll-snap rather than a
 * transform carousel: swipe, trackpad, arrow keys and tab order all come
 * from the platform, and it degrades to a plain scrollable row with no JS.
 */
export function Testimonials() {
  const [lead, ...rest] = TESTIMONIALS;
  const railRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const onScroll = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft < 8);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
  }, []);

  const page = (dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.clientWidth + 20 : el.clientWidth;
    el.scrollBy({
      left: dir * step,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };

  return (
    <section
      className="bg-paper py-14 md:py-24 lg:py-28"
      aria-labelledby="reviews-heading"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <h2 id="reviews-heading" className="sr-only">
          What our clients say
        </h2>

        {/* Lead pull-quote */}
        <Reveal className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <Stars rating={lead.rating} />
            <blockquote className="type-quote mt-6">
              <Quote testimonial={lead} />
            </blockquote>
            <figcaption className="mt-7">
              <p className="type-attrib-name">{lead.name}</p>
              <p className="type-attrib-role">{lead.role}</p>
            </figcaption>
          </div>

          <div className="relative aspect-4/3 w-full overflow-hidden bg-card lg:aspect-square">
            <Image
              src="/products/kundan-necklace.png"
              alt="A Kundan necklace photographed in the studio"
              fill
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        {/* Scroller */}
        <div className="mt-14 flex items-center justify-between gap-4">
          <p className="type-nav text-muted">More from our clients</p>
          <div className="flex gap-2">
            <RailButton
              label="Previous reviews"
              disabled={atStart}
              onClick={() => page(-1)}
              flip
            />
            <RailButton
              label="Next reviews"
              disabled={atEnd}
              onClick={() => page(1)}
            />
          </div>
        </div>

        <ul
          ref={railRef}
          onScroll={onScroll}
          tabIndex={0}
          aria-label="Client reviews"
          className="mt-5 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {rest.map((t) => (
            <li
              key={t.id}
              className="w-[82%] shrink-0 snap-start border border-border bg-ivory p-6 sm:w-[48%] lg:w-[calc(33.333%-0.834rem)]"
            >
              <Stars rating={t.rating} />
              <blockquote className="mt-4 text-[0.9rem] leading-relaxed text-ink/85">
                {t.quote}
              </blockquote>
              <div className="mt-5">
                <p className="type-attrib-name">{t.name}</p>
                <p className="type-attrib-role">{t.role}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Splits the quote so exactly one word carries the gold accent. */
function Quote({ testimonial }: { testimonial: Testimonial }) {
  const { quote, accentWord } = testimonial;
  const i = quote.indexOf(accentWord);
  if (i === -1) return <>{quote}</>;
  return (
    <>
      {quote.slice(0, i)}
      <Accent>{accentWord}</Accent>
      {quote.slice(i + accentWord.length)}
    </>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <p className="flex gap-1" aria-label={`Rated ${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="13"
          height="13"
          viewBox="0 0 24 24"
          aria-hidden
          className={i < rating ? "text-gold-deep" : "text-stone"}
        >
          <path
            d="m12 2 2.9 6.3 6.6.7-4.9 4.5 1.3 6.5L12 16.8 6.1 20l1.3-6.5L2.5 9l6.6-.7L12 2Z"
            fill="currentColor"
          />
        </svg>
      ))}
    </p>
  );
}

function RailButton({
  label,
  onClick,
  disabled,
  flip = false,
}: {
  label: string;
  onClick: () => void;
  disabled: boolean;
  flip?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center border border-border text-ink disabled:opacity-35"
    >
      <ArrowIcon size={15} className={flip ? "rotate-180" : ""} />
    </button>
  );
}
