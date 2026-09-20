"use client";

import { WhatsAppIcon } from "@/components/site/icons";
import { whatsappUrl, WHATSAPP_PRESETS } from "@/config/site";

/**
 * Floating WhatsApp shortcut.
 *
 * Gold rather than the WhatsApp green: the brand green is the one colour
 * on the page that belongs to nobody else's palette, and it fought the
 * ivory and gold everywhere it appeared. The glyph still reads as
 * WhatsApp, which is what carries the meaning.
 *
 * Gold-deep specifically, with an ivory ring. This button is fixed, so it
 * passes over three different grounds — the lacquer hero, the ivory
 * sections and the near-black craft block. Lacquer disappeared against
 * the hero and ink against the craft section; gold-deep holds on all
 * three, and the ring keeps its edge defined where the fill comes close
 * to the ground behind it.
 *
 * It also used to be inert — `href="#"` with the click prevented, marked
 * "to be wired later". It now opens the real thread from config.
 */
export function WhatsAppButton() {
  return (
    <a
      href={whatsappUrl(WHATSAPP_PRESETS.general)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed right-5 bottom-20 z-60 flex h-13 w-13 items-center justify-center rounded-full bg-gold-deep text-ivory ring-1 ring-ivory/30 shadow-[0_8px_28px_rgba(28,12,16,0.35)] transition-transform duration-300 hover:scale-105 active:scale-95 motion-reduce:transition-none lg:bottom-8 lg:right-8"
    >
      <WhatsAppIcon size={24} />
    </a>
  );
}
