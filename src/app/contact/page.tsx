import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHero } from "@/components/site/PageHero";
import { ArrowIcon, WhatsAppIcon } from "@/components/site/icons";
import {
  CONTACT,
  STORE_ADDRESS,
  STORE_HOURS,
  WHATSAPP_PRESETS,
  whatsappUrl,
} from "@/config/site";

export const metadata: Metadata = {
  title: "Contact — Kundan",
  description:
    "Book a private viewing, or reach the salon on WhatsApp, phone or email.",
};

export default function ContactPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Get in touch"
        title="Visit the"
        accent="maison"
        description="Private viewings by appointment; walk-ins welcome during salon hours."
        crumbs={[{ label: "Contact" }]}
      />

      <div className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Ways to reach us — WhatsApp first, it is the primary channel */}
          <div className="lg:col-span-7">
            <h2 className="type-h2">Talk to us</h2>
            <p className="type-body mt-4">
              WhatsApp reaches the salon fastest. For bridal, say so and we
              will put you with a specialist rather than the front desk.
            </p>

            <ul className="mt-10 border-t border-border">
              <ContactRow
                label="WhatsApp"
                value={CONTACT.whatsappLabel}
                href={whatsappUrl(WHATSAPP_PRESETS.general)}
                external
                icon={<WhatsAppIcon size={18} />}
              />
              <ContactRow
                label="Phone"
                value={CONTACT.phone}
                href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
              />
              <ContactRow
                label="Email"
                value={CONTACT.email}
                href={`mailto:${CONTACT.email}`}
              />
            </ul>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={whatsappUrl(WHATSAPP_PRESETS.bridal)}
                target="_blank"
                rel="noopener noreferrer"
                className="type-button inline-flex items-center gap-2 bg-gold-deep px-7 py-3.5 text-ivory"
              >
                <WhatsAppIcon size={16} />
                Book a bridal consultation
              </a>
              <Link
                href="/catalogs/mehr"
                className="type-button group inline-flex items-center gap-2 rounded-full border border-ink/25 px-7 py-3.5 text-ink transition-colors duration-200 hover:border-ink motion-reduce:transition-none"
              >
                See the bridal house
                <ArrowIcon
                  size={15}
                  className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                />
              </Link>
            </div>
          </div>

          {/* Salon */}
          <aside className="lg:col-span-5">
            <div className="border border-border bg-card p-8">
              <h2 className="type-nav text-muted">The salon</h2>
              <address className="type-h3 mt-4 not-italic">
                {STORE_ADDRESS.line1}
                <br />
                {STORE_ADDRESS.city}, {STORE_ADDRESS.country}
              </address>

              <dl className="mt-8 space-y-2 border-t border-border pt-6">
                {STORE_HOURS.map((row) => (
                  <div key={row.days} className="flex justify-between gap-4">
                    <dt className="text-[0.85rem] text-muted">{row.days}</dt>
                    <dd className="text-[0.85rem] text-ink">{row.hours}</dd>
                  </div>
                ))}
              </dl>

              <a
                href={STORE_ADDRESS.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="type-nav group mt-8 inline-flex items-center gap-2 text-gold-deep"
              >
                Open in maps
                <ArrowIcon
                  size={14}
                  className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                />
              </a>
            </div>
          </aside>
        </div>
      </div>
    </SiteShell>
  );
}

function ContactRow({
  label,
  value,
  href,
  external = false,
  icon,
}: {
  label: string;
  value: string;
  href: string;
  external?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <li className="border-b border-border">
      <a
        href={href}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        className="group flex items-center justify-between gap-6 py-5"
      >
        <span className="flex items-center gap-3">
          {icon ? <span className="text-gold-deep">{icon}</span> : null}
          <span className="type-nav text-muted">{label}</span>
        </span>
        <span className="type-h3 text-[1.15rem] group-hover:underline">
          {value}
        </span>
      </a>
    </li>
  );
}
