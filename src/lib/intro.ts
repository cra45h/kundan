/**
 * Hand-off between the loading screen and the hero.
 *
 * Module state rather than context, because the two components are far
 * apart in the tree and the hero's effect would otherwise run first —
 * React runs effects child-first, so a hero asking "is the loader
 * running?" in an effect would always be told "no" and animate underneath
 * the overlay.
 *
 * The loader claims the intro during render, which happens before any
 * effect below it, so the hero always sees the correct answer.
 */

const SEEN_KEY = "kundan-intro-shown";
const DONE_EVENT = "kundan:intro-done";

let claimed = false;
let finished = false;

/**
 * Called by the loader during render. Returns true the first time per tab,
 * and never under reduced motion. Subsequent calls return the same answer,
 * so a double render in StrictMode cannot flip it.
 */
export function claimIntro(): boolean {
  if (claimed) return !finished;
  claimed = true;

  if (typeof window === "undefined") {
    // Server render: assume it will play, so the markup ships with the
    // overlay present and there is no flash of content before it mounts.
    return true;
  }

  let seen = false;
  try {
    seen = sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    // Blocked storage — treat as a first visit.
  }

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (seen || reduce) {
    finished = true;
    return false;
  }

  return true;
}

/** Called by the loader once the overlay is gone. */
export function finishIntro() {
  if (finished) return;
  finished = true;
  try {
    sessionStorage.setItem(SEEN_KEY, "1");
  } catch {
    // Nothing to do; the intro simply plays again next load.
  }
  window.dispatchEvent(new Event(DONE_EVENT));
}

/**
 * Runs `cb` when the hero is clear to animate — immediately if the intro
 * is not playing, otherwise when the overlay finishes.
 */
export function onIntroDone(cb: () => void): () => void {
  if (finished || typeof window === "undefined") {
    cb();
    return () => {};
  }

  const handler = () => cb();
  window.addEventListener(DONE_EVENT, handler, { once: true });

  // Backstop: if the loader throws before it can signal, the hero must
  // still appear rather than sitting at opacity 0 forever.
  const safety = window.setTimeout(() => {
    window.removeEventListener(DONE_EVENT, handler);
    cb();
  }, 4000);

  return () => {
    window.clearTimeout(safety);
    window.removeEventListener(DONE_EVENT, handler);
  };
}
