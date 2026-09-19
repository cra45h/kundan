"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { SNAP } from "@/components/motion/tokens";

/**
 * One accordion row.
 *
 * Still a native <details>/<summary>: it opens, closes and is keyboard
 * operable with no JavaScript, which a Framer-controlled panel would not
 * be. Only the plus/minus mark is animated, driven off the element's own
 * toggle event rather than replacing the element's behaviour.
 */
export function FaqItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <li className="border-b border-border">
      <details
        onToggle={(e) => setOpen((e.currentTarget as HTMLDetailsElement).open)}
      >
        <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
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
        <p className="type-body pr-10 pb-6">{answer}</p>
      </details>
    </li>
  );
}
