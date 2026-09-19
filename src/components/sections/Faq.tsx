import { Accent } from "@/components/ui/Accent";
import { FaqItem } from "@/components/sections/FaqItem";
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
                <FaqItem key={item.q} question={item.q} answer={item.a} />
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
