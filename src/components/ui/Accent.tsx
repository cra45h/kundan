import type { ReactNode } from "react";

/**
 * The single italic gold word in a heading.
 *
 * Use exactly one per heading, and only at display sizes — the gradient
 * needs large, open letterforms to read as gold rather than as muddy text.
 *
 *   <h2 className="type-h2">Explore <Accent>our</Accent> collections</h2>
 *
 * On a dark section pass `onDark`, or put `on-dark` on any ancestor: the
 * word switches to the light gradient, which clears 3:1 on near-black.
 * The on-light gradient is a deeper gold for the same reason — the brand
 * gold is only 1.93:1 on ivory and fails as text.
 */
export function Accent({
  children,
  onDark = false,
  className = "",
}: {
  children: ReactNode;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <em className={`accent ${onDark ? "accent-on-dark" : ""} ${className}`}>
      {children}
    </em>
  );
}
