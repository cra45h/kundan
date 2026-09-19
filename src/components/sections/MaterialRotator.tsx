"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

type Material = {
  label: string;
  gradient: string;
  solid: string;
  /** Seconds for one pass of light across the word. */
  shimmer: number;
};

/** The two house materials carried in the headline. */
const MATERIALS: Material[] = [
  {
    label: "Gold",
    gradient: "var(--material-gold)",
    solid: "#e8d9b0",
    shimmer: 6,
  },
  {
    label: "Diamond",
    gradient: "var(--material-diamond)",
    solid: "#eef4f8",
    // Faster: a brilliant throws light more restlessly than gold.
    shimmer: 3.6,
  },
];

const INTERVAL = 2900;
/** Widest label, used to reserve the box so the line never reflows. */
const SIZER = MATERIALS.reduce((a, b) =>
  a.label.length >= b.label.length ? a : b
).label;

/**
 * Rotating material word for the hero headline.
 *
 * Two animations, each on the tool that suits it:
 *  - Framer Motion swaps the word. AnimatePresence in `wait` mode lets the
 *    outgoing word clear before the next arrives, so they never overlap.
 *  - GSAP pans the gradient through a --shimmer-x custom property, drifting
 *    light across the facets. That is what makes the diamond fill read as a
 *    cut stone rather than a static texture.
 *
 * Accessibility:
 *  - The <h1> carries a stable sr-only sentence and this sits inside an
 *    aria-hidden wrapper, so assistive tech reads one fixed headline.
 *  - Under `prefers-reduced-motion: reduce` nothing rotates and nothing
 *    shimmers; it settles on Gold. That also satisfies WCAG 2.2.2, which
 *    otherwise wants a pause control for indefinitely updating content.
 *  - Pauses on hover and while the tab is hidden.
 */
export function MaterialRotator() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused) return;

    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);

    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % MATERIALS.length),
      INTERVAL
    );

    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduce, paused]);

  const material = reduce ? MATERIALS[0] : MATERIALS[index];

  return (
    <span
      className="relative inline-grid align-baseline"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Sizer — holds the widest label's width so the rest of the line
          never moves as the word changes. */}
      <span className="invisible col-start-1 row-start-1 italic" aria-hidden>
        {SIZER}
      </span>

      <AnimatePresence mode="wait" initial={false}>
        <MaterialWord
          key={material.label}
          material={material}
          reduce={Boolean(reduce)}
        />
      </AnimatePresence>
    </span>
  );
}

/**
 * One word, owning its own shimmer.
 *
 * The tween lives here rather than in the parent on purpose. Under
 * `mode="wait"` the parent re-renders while the outgoing word is still
 * leaving, so an effect up there would attach to the element that is about
 * to unmount and the incoming word would never animate. Keyed by label,
 * this component mounts fresh with its element, so the ref is always the
 * word actually on screen.
 */
function MaterialWord({
  material,
  reduce,
}: {
  material: Material;
  reduce: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (reduce) return;
      const el = ref.current;
      if (!el) return;

      const tween = gsap.fromTo(
        el,
        { "--shimmer-x": "0%" },
        {
          "--shimmer-x": "200%",
          duration: material.shimmer,
          ease: "none",
          repeat: -1,
        }
      );

      return () => {
        tween.kill();
      };
    },
    { dependencies: [material.label, material.shimmer, reduce] }
  );

  return (
    <motion.span
      ref={ref}
      data-material-word
      className="material-word col-start-1 row-start-1 text-left"
      style={
        {
          "--material-gradient": material.gradient,
          "--material-solid": material.solid,
        } as React.CSSProperties
      }
      initial={reduce ? false : { opacity: 0, y: "0.3em", filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={
        reduce ? undefined : { opacity: 0, y: "-0.3em", filter: "blur(6px)" }
      }
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
    >
      {material.label}
    </motion.span>
  );
}
