import Link from "next/link";
import type { ReactNode } from "react";
import { Accent } from "@/components/ui/Accent";

export type Crumb = { label: string; href?: string };

/**
 * Interior page masthead.
 *
 * Same type system as the homepage — display serif at the h1 step with one
 * italic gold accent word — so a collection or policy page reads as the
 * same site rather than a different template.
 *
 * Breadcrumbs are part of it because the old interior pages gave you no way
 * to tell where you were or step back up a level.
 */
export function PageHero({
  eyebrow,
  title,
  accent,
  description,
  crumbs = [],
  headingLevel = 1,
  children,
}: {
  eyebrow?: string;
  /** Plain text; `accent` is appended as the italic gold word. */
  title: string;
  accent?: string;
  description?: string;
  crumbs?: Crumb[];
  /**
   * Drop to 2 on pages whose own hero already carries the h1 (the material
   * and catalog film heroes do), so a page never ships two h1 elements.
   */
  headingLevel?: 1 | 2;
  children?: ReactNode;
}) {
  const Heading = headingLevel === 1 ? "h1" : "h2";
  return (
    <section className="border-b border-border bg-ivory">
      <div className="mx-auto max-w-[1280px] px-4 pt-12 pb-12 sm:px-6 md:pt-16 md:pb-16 lg:px-8">
        {crumbs.length > 0 ? (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <li>
                <Link href="/" className="type-nav text-muted hover:text-ink">
                  Home
                </Link>
              </li>
              {crumbs.map((c, i) => (
                <li key={`${c.label}-${i}`} className="flex items-center gap-2">
                  <span aria-hidden className="text-muted/50">
                    /
                  </span>
                  {c.href ? (
                    <Link
                      href={c.href}
                      className="type-nav text-muted hover:text-ink"
                    >
                      {c.label}
                    </Link>
                  ) : (
                    <span className="type-nav text-ink" aria-current="page">
                      {c.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        {eyebrow ? <p className="type-nav text-muted">{eyebrow}</p> : null}

        <Heading className="type-h1 mt-4">
          {title}
          {accent ? (
            <>
              {" "}
              <Accent>{accent}</Accent>
            </>
          ) : null}
        </Heading>

        {description ? (
          <p className="type-body mt-5">{description}</p>
        ) : null}

        {children}
      </div>
    </section>
  );
}
