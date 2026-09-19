"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { finishIntro, shouldPlayIntro } from "@/lib/intro";

gsap.registerPlugin(useGSAP);

const WORD = "KUNDAN";

/**
 * Loading screen — the wordmark fills gold-into-diamond, then lifts away.
 *
 * The lacquer ground paints immediately, but the wordmark starts invisible
 * and is faded in by GSAP. That is deliberate: the fill cannot begin until
 * hydration, and showing a fully unfilled word in the meantime made the
 * animation look frozen rather than pending. A plain colour hold reads as
 * intent; a stalled animation reads as a bug.
 *
 * Render is unconditional — returning null where the server rendered the
 * overlay is a hydration mismatch that shifts every sibling up.
 *
 * Safety, worst failure first:
 *  - No JavaScript: a <noscript> rule removes the overlay. It is fixed and
 *    full-screen, so leaving it would hide the site entirely.
 *  - GSAP present but the timeline throws: a 6s sweep hides the overlay.
 *  - The hero additionally releases itself after 4s via onIntroDone.
 *  - Scroll lock is undone in cleanup, not only on completion.
 */
export function IntroLoader() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      // Last-resort release, armed before anything can throw.
      const sweep = window.setTimeout(() => {
        gsap.set(el, { display: "none" });
        document.documentElement.style.overflow = "";
        finishIntro();
      }, 6000);

      if (!shouldPlayIntro()) {
        gsap.set(el, { display: "none" });
        window.clearTimeout(sweep);
        finishIntro();
        return;
      }

      const scroller = document.documentElement;
      const prevOverflow = scroller.style.overflow;
      scroller.style.overflow = "hidden";

      const tl = gsap.timeline({
        onComplete: () => {
          window.clearTimeout(sweep);
          scroller.style.overflow = prevOverflow;
          finishIntro();
        },
      });

      tl
        // Word arrives first, so the fill is seen starting from empty.
        .to("[data-loader-word]", {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        })
        .to(
          "[data-loader-fill]",
          {
            clipPath: "inset(0% 0 0 0)",
            duration: 1.15,
            ease: "power2.inOut",
          },
          ">-0.1"
        )
        .to(
          "[data-loader-word]",
          { letterSpacing: "0.12em", duration: 1.05, ease: "power2.out" },
          "<"
        )
        .to("[data-loader-word]", {
          y: -14,
          opacity: 0,
          duration: 0.5,
          ease: "power2.in",
        })
        .to(
          el,
          {
            yPercent: -100,
            duration: 0.7,
            ease: "power3.inOut",
            onComplete: () => {
              gsap.set(el, { display: "none" });
            },
          },
          "-=0.2"
        );

      return () => {
        window.clearTimeout(sweep);
        scroller.style.overflow = prevOverflow;
        tl.kill();
      };
    },
    { scope: root }
  );

  return (
    <>
      {/* Nothing here can dismiss itself without JS, so remove it. */}
      <noscript>
        <style>{`[data-intro-overlay]{display:none !important}`}</style>
      </noscript>

      <div
        ref={root}
        data-intro-overlay
        aria-hidden
        className="fixed inset-0 z-200 flex items-center justify-center bg-lacquer"
      >
        {/* opacity-0 in markup: GSAP fades this in when it can actually
            drive the fill. See the note above. */}
        <div data-loader-word className="relative opacity-0">
          {/* Dim base — the shape the fill travels through. */}
          <span className="loader-word block text-ivory/25">{WORD}</span>

          {/* Coloured copy, clipped from the bottom up. */}
          <span
            data-loader-fill
            className="loader-word loader-fill absolute inset-0 block"
          >
            {WORD}
          </span>
        </div>
      </div>
    </>
  );
}
