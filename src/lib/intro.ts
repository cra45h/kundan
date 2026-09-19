/**
 * Hand-off between the loading screen and the hero.
 *
 * Module state rather than context, because the two components are far
 * apart in the tree. Ordering works because the loader decides in a layout
 * effect and the hero waits in a passive one: React runs every layout
 * effect before any passive effect, so the loader has always resolved by
 * the time the hero asks.
 *
 * Nothing here may be called during render. The overlay ships in the
 * server HTML and must render identically on the client's first pass, or
 * hydration diffs and every sibling shifts.
 */

const SEEN_KEY = "kundan-intro-shown";
const DONE_EVENT = "kundan:intro-done";

let finished = false;

/**
 * Whether the overlay should actually play. Client-only — call from an
 * effect, never from render.
 */
export function shouldPlayIntro(): boolean {
  if (finished) return false;
  if (typeof window === "undefined") return false;

  try {
    if (sessionStorage.getItem(SEEN_KEY) === "1") return false;
  } catch {
    // Blocked storage — treat as a first visit.
  }

  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Called by the loader once the overlay is gone, or skipped outright. */
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
 * has already resolved, otherwise when the overlay finishes.
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
