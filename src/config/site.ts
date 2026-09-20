/**
 * Single source of truth for contact and announcement details.
 *
 * ─────────────────────────────────────────────────────────────
 * TODO(kundan): every value in MOCK below is a placeholder.
 * Replace before launch. Nothing here is real business data.
 * ─────────────────────────────────────────────────────────────
 *
 * These were previously scattered across contact/page.tsx, four legal/*
 * pages, Footer.tsx and WhatsAppButton.tsx. Import from here instead of
 * hard-coding a number or address in a component.
 */

/** Digits only, international format, no `+` or spaces — wa.me requires this. */
export const WHATSAPP_NUMBER = "923001234567"; // TODO(kundan): real number

export const STORE_ADDRESS = {
  line1: "MM Alam Road, Gulberg III", // TODO(kundan): real address
  city: "Lahore",
  country: "Pakistan",
  /** TODO(kundan): point at the real Google Maps place. */
  mapUrl: "https://maps.google.com/?q=MM+Alam+Road+Lahore",
} as const;

export const STORE_HOURS = [
  { days: "Tuesday – Sunday", hours: "11:00 – 19:00" },
  { days: "Monday", hours: "Closed" },
] as const; // TODO(kundan): confirm real trading hours

/**
 * Announcement bar copy.
 *
 * Keep it under ~50 characters. The bar is a single line on a phone, and
 * at 360px that is what fits; the previous 63-character string wrapped to
 * three lines, and shrinking type far enough to hold it on one line would
 * have meant roughly 8px, which is unreadable.
 */
export const ANNOUNCEMENT_TEXT =
  "Complimentary insured shipping across Pakistan"; // TODO(kundan): real offer

export const CONTACT = {
  email: "hello@kundan.example", // TODO(kundan): real inbox
  phone: "+92 300 123 4567", // TODO(kundan): real phone
  /** Display form of the WhatsApp line, if it differs from `phone`. */
  whatsappLabel: "+92 300 123 4567",
} as const;

export const SOCIAL = {
  instagram: "https://instagram.com/kundan.example", // TODO(kundan)
  facebook: "https://facebook.com/kundan.example", // TODO(kundan)
} as const;

/** Prefilled WhatsApp deep link. `message` is URL-encoded for you. */
export function whatsappUrl(message?: string) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const WHATSAPP_PRESETS = {
  bridal:
    "Assalam o Alaikum — I would like to book a bridal consultation at Kundan.",
  general: "Assalam o Alaikum — I have a question about a Kundan piece.",
} as const;
