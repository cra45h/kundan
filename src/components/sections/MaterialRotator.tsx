"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

/**
 * The three house materials, each with its own gradient.
 * Order matches the material pages: gold, diamond, ruby.
 */
const MATERIALS = [
  { label: "Gold", gradient: "var(--material-gold)", solid: "#e8d9b0" },
  { label: "Diamond", gradient: "var(--material-diamond)", solid: "#eef4f8" },
  { label: "Ruby", gradient: "var(--material-ruby)", solid: "#a31116" },
] as const;

const INTERVAL = 2600;

/**
 * Rotating material word for the hero headline.
 *
 * Accessibility notes, because a word that changes under you is easy to
 * get wrong:
 *  - The <h1> carries a stable sr-only sentence naming all three materials;
 *    this component is inside an aria-hidden wrapper, so assistive tech
 *    reads one fixed headline instead of a heading that mutates.
 *  - Under `prefers-reduced-motion: reduce` it does not rotate at all — it
 *    settles on Gold. That also satisfies WCAG 2.2.2, which otherwise wants
 *    a pause control for indefinitely auto-updating content.
 *  - It pauses while the tab is hidden, and on hover, so a reader can stop
 *    it by putting the pointer on it.
 *
 * Layout: the word sits in a grid cell shared with an invisible copy of the
 * longest label, so the box is always "Diamond" wide and the rest of the
 * line never jumps as the word changes.
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
      {/* Sizer — reserves the width of the longest word so the line is stable. */}
      <span className="invisible col-start-1 row-start-1 italic" aria-hidden>
        Diamond
      </span>

      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={material.label}
          className="material-word col-start-1 row-start-1 text-left"
          style={
            {
              "--material-gradient": material.gradient,
              "--material-solid": material.solid,
            } as React.CSSProperties
          }
          initial={reduce ? false : { opacity: 0, y: "0.28em" }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: "-0.28em" }}
          transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
        >
          {material.label}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
