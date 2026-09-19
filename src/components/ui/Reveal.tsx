import type { ElementType, ReactNode } from "react";

/**
 * Marks an element for the scroll reveal.
 *
 * This is deliberately inert — it renders a plain element with a data
 * attribute and ships no JavaScript of its own. All the motion is driven
 * by the single <ScrollReveals /> controller mounted in SiteShell, which
 * batches every marked element on the page into one GSAP ScrollTrigger.
 * That is both cheaper than an observer per element and gives real stagger
 * between siblings entering together.
 *
 * Because nothing here hides anything, the markup renders visible. If the
 * bundle never loads, the page is simply on screen.
 */
export function Reveal({
  children,
  as: Tag = "div",
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Extra stagger offset in seconds, for elements that should trail. */
  delay?: number;
}) {
  return (
    <Tag
      data-reveal
      data-reveal-delay={delay ? delay / 1000 : undefined}
      className={className}
    >
      {children}
    </Tag>
  );
}
