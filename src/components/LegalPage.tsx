import Link from "next/link";
import type { ReactNode } from "react";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHero } from "@/components/site/PageHero";

const LEGAL_NAV = [
  { label: "Terms & conditions", href: "/legal/terms" },
  { label: "Privacy policy", href: "/legal/privacy" },
  { label: "Shipping", href: "/legal/shipping" },
  { label: "Returns", href: "/legal/returns" },
  { label: "Warranty", href: "/legal/warranty" },
] as const;

/**
 * Shared frame for the five policy pages.
 *
 * The policy index is sticky on desktop so you can move between documents
 * without scrolling back to the top of a long one, and the current page is
 * marked rather than looking like every other link.
 */
export function LegalPage({
  title,
  updated,
  currentHref,
  children,
}: {
  title: string;
  updated: string;
  /** Marks the active entry in the policy index. */
  currentHref?: string;
  children: ReactNode;
}) {
  return (
    <SiteShell>
      <PageHero
        eyebrow={`Last updated ${updated}`}
        title={title}
        crumbs={[{ label: "Legal" }]}
      />

      <div className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <aside className="lg:col-span-3">
            <nav aria-label="Policies" className="lg:sticky lg:top-24">
              <h2 className="type-nav text-muted">Policies</h2>
              <ul className="mt-4 space-y-2.5">
                {LEGAL_NAV.map((item) => {
                  const active = item.href === currentHref;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={`block text-[0.85rem] ${
                          active
                            ? "text-ink underline underline-offset-4"
                            : "text-muted hover:text-ink"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>

          <article className="lg:col-span-8 lg:col-start-5">
            <div className="type-body max-w-[68ch] space-y-8 [&_h2]:font-display [&_h2]:mt-10 [&_h2]:text-[1.5rem] [&_h2]:leading-tight [&_h2]:tracking-[-0.02em] [&_h2]:text-ink [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-ink [&_strong]:font-medium [&_strong]:text-ink [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
              {children}
            </div>
          </article>
        </div>
      </div>
    </SiteShell>
  );
}
