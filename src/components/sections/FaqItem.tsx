"use client";

import { useRef, useState, type MouseEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SNAP } from "@/components/motion/tokens";

/**
 * One accordion row.
 *
 * Still a native <details>/<summary>, so it opens, closes and is keyboard
 * operable with no JavaScript. The animation is layered on top rather than
 * replacing it:
 *
 *  - Opening: set `open` on the element first, then let the panel animate
 *    its height in.
 *  - Closing: block the browser's instant collapse, run the exit, and only
 *    clear `open` once the panel has finished leaving. Without that the
 *    element snaps shut and there is nothing left to animate out.
 *
 * With scripts disabled none of this runs and the row behaves as a plain
 * <details>, which is why the markup is built this way round.
 */
export function FaqItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const [open, setOpen] = useState(false);

  const onSummaryClick = (e: MouseEvent<HTMLElement>) => {
    const el = detailsRef.current;
    if (!el) return;

    // Take over the toggle so the close can be animated.
    e.preventDefault();

    if (open) {
      setOpen(false); // `open` on the element is cleared in onExitComplete
    } else {
      el.open = true;
      setOpen(true);
    }
  };

  return (
    <li className="border-b border-border">
      <details ref={detailsRef}>
        <summary
          onClick={onSummaryClick}
          className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden"
        >
          <span className="type-h3 text-[1.15rem] sm:text-[1.35rem]">
            {question}
          </span>
          <span
            aria-hidden
            className="relative inline-flex h-6 w-6 shrink-0 items-center justify-center"
          >
            <span className="absolute h-px w-3.5 bg-ink" />
            <motion.span
              animate={{ scaleY: open ? 0 : 1 }}
              transition={SNAP}
              className="absolute h-3.5 w-px bg-ink"
            />
          </span>
        </summary>

        <AnimatePresence
          initial={false}
          onExitComplete={() => {
            if (detailsRef.current) detailsRef.current.open = false;
          }}
        >
          {open ? (
            <motion.div
              key="answer"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                height: SNAP,
                opacity: { duration: 0.2 },
              }}
              className="overflow-hidden"
            >
              {/* The text trails the panel slightly, so it reads as being
                  revealed rather than stretched. */}
              <motion.p
                initial={{ y: -6 }}
                animate={{ y: 0 }}
                exit={{ y: -6 }}
                transition={SNAP}
                className="type-body pr-10 pb-6"
              >
                {answer}
              </motion.p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </details>
    </li>
  );
}
