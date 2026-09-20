"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { ArrowIcon } from "@/components/site/icons";
import { arrowNudge, buttonLift, SNAP } from "@/components/motion/tokens";

/** next/link, animatable. Avoids wrapping every link in an extra element. */
const MotionLink = motion.create(Link);

type Variant = "solid" | "outline" | "light";

const SHELL: Record<Variant, string> = {
  // Ink fill, ivory text — the primary action.
  solid: "bg-ink text-ivory",
  // Hairline pill, inherits its surface.
  outline: "rounded-full border border-current/25",
  // Ivory fill for dark grounds.
  light: "bg-ivory text-ink",
};

/**
 * The site's call to action, as a Framer component.
 *
 * Exists so Hero, ConsultationBanner and Newsletter can keep their buttons
 * animated without themselves becoming client components — only this
 * island ships JavaScript, not the whole section.
 *
 * The lift and the arrow nudge run off one `whileHover`, so they stay in
 * step instead of being two transitions that can drift apart.
 */
export function MotionCta({
  href,
  children,
  variant = "solid",
  arrow = false,
  external = false,
  icon,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  arrow?: boolean;
  external?: boolean;
  /** Rendered before the label, e.g. a WhatsApp mark. */
  icon?: ReactNode;
  className?: string;
}) {
  const inner = (
    <>
      {icon}
      <span>{children}</span>
      {arrow ? (
        <motion.span variants={arrowNudge} transition={SNAP} className="inline-flex">
          <ArrowIcon size={15} />
        </motion.span>
      ) : null}
    </>
  );

  const shared = {
    initial: "rest",
    animate: "rest",
    whileHover: "hover",
    whileFocus: "hover",
    whileTap: "tap",
    variants: buttonLift,
    transition: SNAP,
    className: `type-button inline-flex items-center gap-2 px-7 py-3.5 ${SHELL[variant]} ${className}`,
  } as const;

  if (external) {
    return (
      <motion.a
        {...shared}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <MotionLink {...shared} href={href}>
      {inner}
    </MotionLink>
  );
}

/**
 * Text link with a trailing arrow — "View all", "Explore", "Open in maps".
 * Same nudge as the CTA so the two read as one family.
 */
export function ArrowLink({
  href,
  children,
  external = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
}) {
  const inner = (
    <>
      <span>{children}</span>
      <motion.span variants={arrowNudge} transition={SNAP} className="inline-flex">
        <ArrowIcon size={14} />
      </motion.span>
    </>
  );

  const shared = {
    initial: "rest",
    animate: "rest",
    whileHover: "hover",
    whileFocus: "hover",
    /* min-h-11 gives these text links a real tap target; they were 14px. */
    className: `type-nav inline-flex min-h-11 items-center gap-2 ${className}`,
  } as const;

  if (external) {
    return (
      <motion.a
        {...shared}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <MotionLink {...shared} href={href}>
      {inner}
    </MotionLink>
  );
}
