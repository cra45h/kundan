"use client";

import { useId, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Newsletter — one quiet row. The conversion ask is the consultation
 * banner above; this is the secondary path, not a competing CTA.
 *
 * TODO(kundan): wire to a real list (Klaviyo / Mailchimp / Supabase
 * table). Submitting currently only sets local state.
 */
export function Newsletter() {
  const id = useId();
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <section
      className="border-t border-border bg-ivory py-12 md:py-16"
      aria-labelledby="newsletter-heading"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <Reveal className="grid gap-6 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <h2 id="newsletter-heading" className="type-newsletter">
              Sign up for our newsletter
            </h2>
            <p className="type-body mt-2">
              Early access to new unveilings, and first word when bridal
              appointments open for the season.
            </p>
          </div>

          {done ? (
            <p role="status" className="type-body text-ink lg:justify-self-end">
              Thank you — please check your inbox to confirm.
            </p>
          ) : (
            <form
              className="flex w-full flex-col gap-3 sm:flex-row lg:justify-self-end"
              onSubmit={(e) => {
                e.preventDefault();
                setDone(true); // TODO(kundan): POST to the real list
              }}
            >
              <label htmlFor={id} className="sr-only">
                Email address
              </label>
              <input
                id={id}
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full border border-border bg-ivory px-4 py-3 text-[0.9rem] text-ink placeholder:text-muted sm:w-72"
              />
              <button
                type="submit"
                className="type-button shrink-0 bg-gold-deep px-7 py-3.5 text-ivory transition-transform duration-200 hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                Subscribe
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
