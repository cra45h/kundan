"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/**
 * Fade-up on scroll that fails open.
 *
 * The markup renders fully visible. The hidden state is applied by this
 * effect and only when we can guarantee we can undo it — so if JS never
 * runs, if the bundle errors, or if IntersectionObserver is missing, the
 * content is simply there. The old homepage set `opacity: 0` in CSS and
 * relied on GSAP to clear it, which is what left a blank screen after the
 * hero when a trigger failed to fire.
 *
 * Under `prefers-reduced-motion: reduce` nothing is hidden at all.
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
  /** Stagger offset in ms. */
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") return;
    if (!window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
      return;
    }

    // Safe to hide: we hold the observer that will reveal it again.
    el.dataset.revealHidden = "true";

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const target = entry.target as HTMLElement;
          target.style.transitionDelay = `${delay}ms`;
          delete target.dataset.revealHidden;
          io.unobserve(target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.01 }
    );

    io.observe(el);

    // Belt and braces: if anything stalls, drop the hidden state anyway.
    const failsafe = window.setTimeout(() => {
      delete el.dataset.revealHidden;
      io.disconnect();
    }, 2500);

    return () => {
      window.clearTimeout(failsafe);
      io.disconnect();
      delete el.dataset.revealHidden;
    };
  }, [delay]);

  return (
    <Tag ref={ref} className={`reveal ${className}`}>
      {children}
    </Tag>
  );
}
