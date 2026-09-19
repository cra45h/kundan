import { TRUST_ITEMS, type TrustItem } from "@/data/mock";

/**
 * Trust signals, directly under the hero rather than buried by the footer.
 * Static row — the old marquee clipped its last item on narrow screens.
 */
export function TrustStrip() {
  return (
    <section aria-label="Our commitments" className="border-b border-border bg-ivory">
      <ul className="mx-auto grid max-w-[1280px] grid-cols-2 gap-x-6 gap-y-8 px-4 py-10 sm:px-6 lg:grid-cols-4 lg:px-8">
        {TRUST_ITEMS.map((item) => (
          <li key={item.title} data-reveal className="flex items-start gap-3">
            <TrustIcon icon={item.icon} />
            <div>
              <p className="type-caption text-ink">{item.title}</p>
              <p className="mt-1 text-[0.78rem] leading-snug text-muted">
                {item.detail}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function TrustIcon({ icon }: { icon: TrustItem["icon"] }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": true,
    className: "mt-0.5 shrink-0 text-gold-deep",
  } as const;

  if (icon === "karat") {
    return (
      <svg {...common}>
        <path
          d="M12 3 4 9l8 12 8-12-8-6Z"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
        <path d="M4 9h16" stroke="currentColor" strokeWidth="1.3" />
      </svg>
    );
  }

  if (icon === "hallmark") {
    return (
      <svg {...common}>
        <circle cx="12" cy="10" r="6" stroke="currentColor" strokeWidth="1.3" />
        <path
          d="m9.5 10 1.8 1.8L15 8.5"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 16.5 8 21l4-1.6L16 21l-1-4.5"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (icon === "shipping") {
    return (
      <svg {...common}>
        <path
          d="M3 7h11v9H3V7Zm11 3h4l3 3v3h-7v-6Z"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
        <circle cx="7" cy="18" r="1.6" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="17" cy="18" r="1.6" stroke="currentColor" strokeWidth="1.3" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path
        d="M12 3 5 6v6c0 4 3 7.2 7 9 4-1.8 7-5 7-9V6l-7-3Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path
        d="m9.5 12 1.8 1.8L15 10.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
