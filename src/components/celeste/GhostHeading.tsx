"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type GhostHeadingProps = {
  /** One entry per rendered line — the reference always breaks these by hand. */
  lines: ReactNode[];
  /** Screen-reader text, since the visible lines are decorative fragments. */
  label: string;
  className?: string;
  as?: "h2" | "h1";
  align?: "left" | "center";
  tone?: "ghost" | "deep";
};

/**
 * Oversized tonal section heading.
 *
 * Each line rides up out of its own overflow mask on scroll. The mask is a
 * wrapper element rather than a clip-path so the Didone's descenders and
 * hairlines are never sliced mid-stroke.
 */
export function GhostHeading({
  lines,
  label,
  className = "",
  as: Tag = "h2",
  align = "left",
  tone = "ghost",
}: GhostHeadingProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const inners =
        gsap.utils.toArray<HTMLElement>("[data-ghost-line-inner]");

      if (reduce) {
        gsap.set(inners, { yPercent: 0, opacity: 1 });
        return;
      }

      gsap.set(inners, { yPercent: 108, opacity: 0 });

      gsap.to(inners, {
        yPercent: 0,
        opacity: 1,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.09,
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 88%",
          once: true,
        },
      });
    },
    { scope: rootRef }
  );

  return (
    <div
      ref={rootRef}
      className={`${align === "center" ? "text-center" : "text-left"} ${className}`}
    >
      <Tag
        className={`type-ghost ${tone === "deep" ? "type-ghost-deep" : ""}`}
      >
        <span className="sr-only">{label}</span>
        {lines.map((line, i) => (
          <span
            key={i}
            aria-hidden
            className="block overflow-hidden pb-[0.06em]"
          >
            <span data-ghost-line-inner className="block will-change-transform">
              {line}
            </span>
          </span>
        ))}
      </Tag>
    </div>
  );
}
