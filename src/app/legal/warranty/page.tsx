import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Lifetime Warranty — Kundan",
  description:
    "Craftsmanship warranty, care guidance, and what Kundan’s lifetime cover includes.",
};

export default function WarrantyPage() {
  return (
    <LegalPage currentHref="/legal/app"
      title="Lifetime warranty" updated="8 September 2026">
      <section>
        <h2>1. What we cover</h2>
        <p>
          Kundan warrants craftsmanship on eligible pieces for the lifetime of
          the original purchaser against manufacturing defects in setting,
          soldering, and structural integrity under normal wear.
        </p>
      </section>

      <section>
        <h2>2. What we do not cover</h2>
        <ul>
          <li>Loss, theft, or mysterious disappearance</li>
          <li>Damage from impact, misuse, or improper storage</li>
          <li>Normal wear to plating, polishing, or soft finishes</li>
          <li>Stones loosened after third-party alteration</li>
          <li>Watches or non-Kundan components sold as accessories</li>
        </ul>
      </section>

      <section>
        <h2>3. Care</h2>
        <p>
          Store pieces separately, avoid chemicals and abrasive cloths, and
          return to the salon for periodic checks — especially before bridal
          events. We offer complimentary basic cleaning during salon visits.
        </p>
      </section>

      <section>
        <h2>4. Claims</h2>
        <p>
          Bring the piece and proof of purchase to MM Alam Road, or write to{" "}
          <a href="mailto:hello@kundan.atelier" className="text-gold">
            hello@kundan.atelier
          </a>
          . We will inspect and repair, replace, or advise on a service quote if
          the issue falls outside warranty.
        </p>
      </section>

      <section>
        <h2>5. Transfer</h2>
        <p>
          The lifetime warranty is personal to the original purchaser and is not
          transferable, except where we expressly note otherwise for heirloom
          documentation.
        </p>
      </section>
    </LegalPage>
  );
}
