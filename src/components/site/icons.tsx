import type { SVGProps } from "react";

/** Every icon takes the usual SVG props plus a square `size` in px. */
export type IconProps = SVGProps<SVGSVGElement> & { size?: number };

/**
 * Shared line icons. Stroke-only, 1.4 weight, sized by the caller.
 * All are decorative — the interactive element carries the aria-label.
 */
function Svg({ size = 17, children, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="m16 16 4 4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function HeartIcon({
  filled = false,
  ...props
}: IconProps & { filled?: boolean }) {
  return (
    <Svg {...props}>
      <path
        d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function BagIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path
        d="M6 8h12l-1 12H7L6 8Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 10V7a2.5 2.5 0 0 1 5 0v3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function WhatsAppIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path
        d="M12 3.2a8.8 8.8 0 0 0-7.7 13.1L3 21l4.9-1.3A8.8 8.8 0 1 0 12 3.2Zm0 16a7.2 7.2 0 0 1-3.8-1l-.3-.2-2.9.8.8-2.8-.2-.3A7.2 7.2 0 1 1 12 19.2Zm4-5.4c-.2-.1-1.3-.6-1.5-.7-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a5.9 5.9 0 0 1-1.9-1.2 7 7 0 0 1-1.3-1.6c-.1-.2 0-.4.1-.5l.4-.4.3-.4v-.4c0-.1-.5-1.3-.7-1.7-.2-.5-.4-.4-.5-.4h-.4a.8.8 0 0 0-.6.3 2.5 2.5 0 0 0-.8 1.9 4.4 4.4 0 0 0 .9 2.3 10 10 0 0 0 3.9 3.4l1.3.5a3.1 3.1 0 0 0 1.5.1 2.5 2.5 0 0 0 1.5-1 1.9 1.9 0 0 0 .1-1c0-.1-.2-.2-.4-.3Z"
        fill="currentColor"
      />
    </Svg>
  );
}

export function ArrowIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path
        d="M4 12h15m0 0-5.5-5.5M19 12l-5.5 5.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </Svg>
  );
}
