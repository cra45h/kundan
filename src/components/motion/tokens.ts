import type { Transition, Variants } from "motion/react";

/**
 * Shared motion values.
 *
 * Plain data, no JSX, so server components can import them to hand into a
 * client primitive without becoming client components themselves.
 *
 * Reduced motion is handled globally by <MotionProvider> rather than per
 * component — see that file.
 */

/** Interface feedback. Critically damped; nothing on the site overshoots. */
export const SNAP: Transition = { type: "spring", bounce: 0, duration: 0.35 };

/** Slower move for larger objects — plates, tiles, images. */
export const GLIDE: Transition = { type: "spring", bounce: 0, duration: 0.7 };

/** Non-spring easing, matching the curve used across the design. */
export const EASE: Transition = { duration: 0.4, ease: [0.23, 1, 0.32, 1] };

/** A plate that grows slightly under the pointer. */
export const plateZoom: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.04 },
};

/** An arrow that leads the eye out of the link. */
export const arrowNudge: Variants = {
  rest: { x: 0 },
  hover: { x: 5 },
};

/** A button that lifts off the page. */
export const buttonLift: Variants = {
  rest: { y: 0 },
  hover: { y: -2 },
  tap: { y: 0, scale: 0.985 },
};
