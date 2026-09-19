"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Scrub-linked drift for a large image.
 *
 * The child is inset beyond its frame so there is material to move without
 * exposing an edge; the frame clips it. `scrub: true` ties the movement to
 * scroll position rather than running it on a timer, so it feels like the
 * image is bedded into the page instead of animating past it.
 *
 * Keep `amount` small — this reads as depth at 6–12%, and as a gimmick
 * above that. Does nothing at all under reduced motion.
 */
export function Parallax({
  children,
  className = "",
  /** Percentage of its own height the layer travels across the scroll. */
  amount = 8,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
}) {
  const frame = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const layer = frame.current?.firstElementChild;
      if (!layer) return;

      gsap.fromTo(
        layer,
        { yPercent: -amount / 2 },
        {
          yPercent: amount / 2,
          ease: "none",
          scrollTrigger: {
            trigger: frame.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    },
    { scope: frame, dependencies: [amount] }
  );

  return (
    <div ref={frame} className={`overflow-hidden ${className}`}>
      {children}
    </div>
  );
}
