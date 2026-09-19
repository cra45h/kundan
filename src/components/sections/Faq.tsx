import { Accent } from "@/components/ui/Accent";
import { Reveal } from "@/components/ui/Reveal";
import { FAQ_ITEMS } from "@/data/mock";

/**
 * FAQ accordion.
 *
 * Native <details>/<summary>, so it opens, closes and is keyboard operable
 * with no JavaScript at all — and stays usable if the bundle fails.
 */
export function Faq() {
  return (
    <section
      className="bg-paper py-14 md:py-24 lg:py-28"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <Reveal className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <h2 id="faq-heading" className="type-h2">
              Questions, <Accent>answered</Accent>
            </h2>
            <p className="type-body mt-5">
              Anything else, message us on WhatsApp — someone from the salon
              will reply.
            </p>
          </div>

          <div className="lg:col-span-8">
            <ul className="border-t border-border">
              {FAQ_ITEMS.map((item) => (
                <li key={item.q} className="border-b border-border">
                  <details className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
                      <span className="type-h3 text-[1.15rem] sm:text-[1.35rem]">
                        {item.q}
                      </span>
                      <span
                        aria-hidden
                        className="relative inline-flex h-6 w-6 shrink-0 items-center justify-center"
                      >
                        <span className="absolute h-px w-3.5 bg-ink" />
                        <span className="absolute h-3.5 w-px bg-ink transition-transform duration-200 group-open:scale-y-0 motion-reduce:transition-none" />
                      </span>
                    </summary>
                    <p className="type-body pr-10 pb-6">{item.a}</p>
                  </details>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
