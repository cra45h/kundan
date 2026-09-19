"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * One global reduced-motion switch.
 *
 * `reducedMotion="user"` makes Framer skip transform and layout animations
 * for anyone who asks the OS for less motion, while still allowing opacity
 * changes. That replaces the `motion-reduce:` class that used to be
 * repeated beside every CSS transition, and it cannot be forgotten on a
 * new component the way a utility class can.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
