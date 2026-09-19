import Link from "next/link";
import type { ReactNode } from "react";
import {
  FOOTER_CARE,
  FOOTER_COLLECTIONS,
  FOOTER_COMMITMENTS,
  FOOTER_LEGAL,
  FOOTER_MATERIALS,
  FOOTER_SHOP,
  type NavLink,
} from "@/data/navigation";
import { CONTACT, SOCIAL, STORE_ADDRESS, STORE_HOURS } from "@/config/site";

/** Payment marks are wordmarks, not logos — no third-party brand assets. */
const PAYMENTS = ["Visa", "Mastercard", "Easypaisa", "JazzCash", "Bank transfer"];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-void text-ivory" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      <div className="mx-auto max-w-[1280px] px-4 pt-16 pb-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Identity + salon */}
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="font-display text-[1.35rem] tracking-[0.3em] uppercase"
            >
              Kundan
            </Link>
            <address className="type-body mt-5 text-ivory/70 not-italic">
              {STORE_ADDRESS.line1}
              <br />
              {STORE_ADDRESS.city}, {STORE_ADDRESS.country}
            </address>
            <dl className="mt-4 space-y-1">
              {STORE_HOURS.map((row) => (
                <div key={row.days} className="flex gap-2 text-[0.8rem]">
                  <dt className="text-ivory/60">{row.days}</dt>
                  <dd className="text-ivory/85">{row.hours}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-4 space-y-1 text-[0.8rem]">
              <a
                href={`mailto:${CONTACT.email}`}
                className="block text-ivory/70 hover:text-ivory"
              >
                {CONTACT.email}
              </a>
              <a
                href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                className="block text-ivory/70 hover:text-ivory"
              >
                {CONTACT.phone}
              </a>
            </div>
          </div>

          <FootCol title="Shop" links={FOOTER_SHOP} />
          <FootCol title="Materials" links={FOOTER_MATERIALS} />
          <FootCol title="Collections" links={FOOTER_COLLECTIONS} />
          <FootCol title="Client Care" links={FOOTER_CARE} />
        </div>

        {/* Commitments strip */}
        <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-ivory/15 pt-6">
          {FOOTER_COMMITMENTS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="type-nav text-ivory/70 hover:text-ivory"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Payments + social */}
        <div className="mt-6 flex flex-col gap-5 border-t border-ivory/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex flex-wrap items-center gap-2">
            {PAYMENTS.map((p) => (
              <li
                key={p}
                className="rounded-sm border border-ivory/25 px-2.5 py-1 text-[0.65rem] tracking-[0.08em] text-ivory/70 uppercase"
              >
                {p}
              </li>
            ))}
          </ul>

          <ul className="flex items-center gap-4">
            <li>
              <a
                href={SOCIAL.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="type-nav text-ivory/70 hover:text-ivory"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href={SOCIAL.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="type-nav text-ivory/70 hover:text-ivory"
              >
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ivory/15">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-3 px-4 py-5 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p className="text-[0.75rem] text-ivory/55">
            © {year} Kundan Gems and Jewellers. All rights reserved.
          </p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {FOOTER_LEGAL.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[0.75rem] text-ivory/55 hover:text-ivory"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}

function FootCol({ title, links }: { title: string; links: NavLink[] }) {
  return (
    <div className="lg:col-span-2">
      <h3 className="type-nav text-ivory/55">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((item) => (
          <li key={`${title}-${item.label}`}>
            <Link
              href={item.href}
              className="text-[0.85rem] text-ivory/80 hover:text-ivory"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
