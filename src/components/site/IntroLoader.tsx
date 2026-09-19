"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { claimIntro, finishIntro } from "@/lib/intro";

gsap.registerPlugin(useGSAP);

const WORD = "KUNDAN";

/**
 * Loading screen — the wordmark fills gold-into-diamond, then lifts away.
 *
 * Claimed during render, not in an effect, so the hero knows to hold
 * before its own effect runs. See lib/intro.ts for why that matters.
 *
 * Safety, in order of how badly each would fail:
 *  - No JavaScript: a <noscript> rule removes the overlay outright. It is
 *    fixed and full-screen, so leaving it in place would hide the site.
 *  - JS present but this component throws before its timeline: the hero's
 *    own 4s backstop in onIntroDone releases it anyway.
 *  - Reduced motion, or already seen this tab: never rendered at all.
 */
export function IntroLoader() {
  // Render-time claim; stable across StrictMode's double render.
  const [playing] = useState(() => claimIntro());
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!playing) return;

      // Client-side re-check: the server always ships the overlay, so a
      // returning visitor or a reduced-motion visitor removes it here on
      // the first frame instead of sitting through it.
      if (!claimIntro()) {
        gsap.set(root.current, { display: "none" });
        finishIntro();
        return;
      }

      const scroller = document.documentElement;
      const prevOverflow = scroller.style.overflow;
      scroller.style.overflow = "hidden";

      const tl = gsap.timeline({
        onComplete: () => {
          scroller.style.overflow = prevOverflow;
          finishIntro();
        },
      });

      tl.to("[data-loader-fill]", {
        clipPath: "inset(0% 0 0 0)",
        duration: 1.15,
        ease: "power2.inOut",
      })
        .to(
          "[data-loader-word]",
          { letterSpacing: "0.12em", duration: 0.9, ease: "power2.out" },
          0
        )
        .to("[data-loader-word]", {
          y: -14,
          opacity: 0,
          duration: 0.5,
          ease: "power2.in",
        })
        .to(
          root.current,
          {
            yPercent: -100,
            duration: 0.7,
            ease: "power3.inOut",
            onComplete: () => {
              gsap.set(root.current, { display: "none" });
            },
          },
          "-=0.2"
        );

      return () => {
        scroller.style.overflow = prevOverflow;
        tl.kill();
      };
    },
    { scope: root, dependencies: [playing] }
  );

  if (!playing) return null;

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
        <div data-loader-word className="relative">
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
