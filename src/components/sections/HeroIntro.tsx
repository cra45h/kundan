"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { onIntroDone } from "@/lib/intro";

/**
 * Hero entrance, run once the loading screen has lifted.
 *
 * Sits beside the hero rather than inside it so the hero itself stays a
 * server component — it holds the LCP image and should not become a client
 * island for the sake of an animation.
 *
 * The copy is hidden here, in JS, and only after we have a timeline that
 * will bring it back. If this file never executes the hero simply renders,
 * which is the behaviour that matters most on the page carrying the LCP.
 */
export function HeroIntro() {
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const items = gsap.utils.toArray<HTMLElement>("[data-hero-item]");
    const plate = document.querySelector("[data-hero-plate]");
    if (!items.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Safe to hide: the timeline below is already built to reveal them.
    gsap.set(items, { opacity: 0, y: 22 });
    if (plate) gsap.set(plate, { scale: 1.06, transformOrigin: "50% 50%" });

    const release = onIntroDone(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.75,
        stagger: 0.09,
      });

      if (plate) {
        tl.to(plate, { scale: 1, duration: 1.6, ease: "power2.out" }, 0);
      }
    });

    // If anything upstream stalls, never leave the hero invisible.
    const safety = window.setTimeout(() => {
      gsap.set(items, { opacity: 1, y: 0 });
      if (plate) gsap.set(plate, { scale: 1 });
    }, 5000);

    return () => {
      release();
      window.clearTimeout(safety);
    };
  }, []);

  return null;
}
