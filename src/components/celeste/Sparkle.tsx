/**
 * Four-point star — the maison's punctuation mark.
 * Set inline inside the wordmark and beside section headings, the way the
 * reference layout breaks its display type with light.
 */
export function Sparkle({
  className = "",
  title,
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      fill="currentColor"
    >
      <path d="M12 0c.6 6.5 5.5 11.4 12 12-6.5.6-11.4 5.5-12 12-.6-6.5-5.5-11.4-12-12C6.5 11.4 11.4 6.5 12 0Z" />
    </svg>
  );
}
