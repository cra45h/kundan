"use client";

import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * One controller for every `<Reveal>` on the page.
 *
 * Mounted once in SiteShell. Collects all `[data-reveal]` elements into a
 * single `ScrollTrigger.batch`, so elements arriving together animate
 * together with a real stagger, instead of each running its own observer.
 *
 * Failing open is the whole design constraint here. The markup renders
 * visible and nothing is hidden until this effect has actually run — so a
 * failed bundle, a thrown error before this point, or a browser without
 * GSAP all leave the page fully on screen. The safety timeout covers the
 * remaining case: GSAP loaded, but a trigger never fired because layout
 * settled late (late fonts, late images) and the element ended up outside
 * any measured position.
 */
export function ScrollReveals() {
  const pathname = usePathname();

  /* Intentionally unscoped: the marked elements live all over the page,
     not inside this component, so the selector has to reach the document. */
  useGSAP(
    () => {
      const els = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      if (!els.length) return;

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduce) {
        gsap.set(els, { clearProps: "all", opacity: 1, y: 0 });
        return;
      }

      // Safe to hide now: the batch below is what brings them back.
      gsap.set(els, { opacity: 0, y: 16 });

      const triggers = ScrollTrigger.batch(els, {
        start: "top 92%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "power2.out",
            stagger: 0.08,
            overwrite: true,
            delay: (i, target: HTMLElement) =>
              Number(target.dataset.revealDelay ?? 0),
          }),
      });

      // Images and webfonts land after hydration and move everything down.
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      const t1 = window.setTimeout(refresh, 600);
      const t2 = window.setTimeout(refresh, 1600);

      // Last resort — never leave anything invisible.
      const safety = window.setTimeout(() => {
        els.forEach((el) => {
          if (Number(getComputedStyle(el).opacity) < 0.95) {
            gsap.set(el, { opacity: 1, y: 0 });
          }
        });
      }, 3000);

      return () => {
        window.removeEventListener("load", refresh);
        window.clearTimeout(t1);
        window.clearTimeout(t2);
        window.clearTimeout(safety);
        triggers.forEach((t) => t.kill());
      };
    },
    { dependencies: [pathname] }
  );

  return null;
}
