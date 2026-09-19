import Link from "next/link";
import { Accent } from "@/components/ui/Accent";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowIcon, WhatsAppIcon } from "@/components/site/icons";
import {
  STORE_ADDRESS,
  STORE_HOURS,
  WHATSAPP_PRESETS,
  whatsappUrl,
} from "@/config/site";

/**
 * Bridal consultation + visit the maison.
 *
 * The old page ended on two competing CTAs ("Visit the maison" and "Be
 * first to the next unveiling"). This is the single conversion block; the
 * newsletter that follows is deliberately quieter.
 */
export function ConsultationBanner() {
  return (
    <section
      className="bg-ivory py-14 md:py-24 lg:py-28"
      aria-labelledby="consult-heading"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <Reveal className="grid gap-10 border border-border bg-card px-6 py-12 sm:px-10 lg:grid-cols-2 lg:gap-16 lg:px-14 lg:py-16">
          <div>
            <h2 id="consult-heading" className="type-h2">
              Book a bridal <Accent>consultation</Accent>
            </h2>
            <p className="type-body mt-5">
              An unhurried hour with a specialist — sizing, gold weight and
              the full set planned around your dates. No obligation to order.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="type-button inline-flex items-center gap-2 bg-gold-deep px-7 py-3.5 text-ivory transition-transform duration-200 hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                Book a consultation
              </Link>
              <a
                href={whatsappUrl(WHATSAPP_PRESETS.bridal)}
                target="_blank"
                rel="noopener noreferrer"
                className="type-button group inline-flex items-center gap-2 rounded-full border border-ink/25 px-7 py-3.5 text-ink transition-colors duration-200 hover:border-ink motion-reduce:transition-none"
              >
                <WhatsAppIcon size={16} />
                Chat on WhatsApp
              </a>
            </div>
          </div>

          <div className="lg:justify-self-end">
            <h3 className="type-nav text-muted">Visit the maison</h3>
            <address className="type-h3 mt-4 not-italic">
              {STORE_ADDRESS.line1}
              <br />
              {STORE_ADDRESS.city}
            </address>

            <dl className="mt-6 space-y-1.5">
              {STORE_HOURS.map((row) => (
                <div key={row.days} className="flex gap-3 text-[0.85rem]">
                  <dt className="w-40 shrink-0 text-muted">{row.days}</dt>
                  <dd className="text-ink">{row.hours}</dd>
                </div>
              ))}
            </dl>

            <a
              href={STORE_ADDRESS.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="type-nav group mt-6 inline-flex items-center gap-2 text-gold-deep"
            >
              Open in maps
              <ArrowIcon
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
              />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
