import Image from "next/image";
import { Accent } from "@/components/ui/Accent";
import { Reveal } from "@/components/ui/Reveal";
import { CRAFT_STEPS } from "@/data/mock";

/**
 * Craft & promise — the old "Not worn for a season" manifesto and the
 * Sketch / Craft / Polish strip, merged into one block instead of two
 * full-screen panels.
 */
export function CraftSection() {
  return (
    <section
      className="on-dark bg-void py-14 text-ivory md:py-24 lg:py-28"
      aria-labelledby="craft-heading"
    >
      <div className="mx-auto grid max-w-[1280px] gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8">
        <Reveal>
          <div className="relative aspect-4/5 w-full overflow-hidden rounded-t-[9rem] bg-brown sm:aspect-square lg:aspect-4/5">
            <Image
              src="/catalogs/mehr/bridal-dress.jpg"
              alt="A Kundan piece being finished by hand at the bench"
              fill
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={80}>
          <h2 id="craft-heading" className="type-h2 text-ivory">
            Not worn for a season. Kept for a <Accent onDark>lifetime</Accent>
          </h2>

          <p className="type-body mt-6 text-ivory/70">
            Every piece is drawn, set and finished in our own atelier, then
            assayed before it leaves us. Nothing is outsourced, and nothing
            ships until it would pass to a daughter.
          </p>

          <ol className="mt-10 space-y-6">
            {CRAFT_STEPS.map((step) => (
              <li key={step.step} className="flex gap-5">
                <span className="type-caption shrink-0 pt-1 text-gold-bright">
                  {step.step}
                </span>
                <div className="border-t border-ivory/15 pt-1">
                  <h3 className="type-h3 text-ivory">{step.title}</h3>
                  <p className="mt-1.5 text-[0.85rem] leading-relaxed text-ivory/65">
                    {step.detail}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
