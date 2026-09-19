import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms & Conditions — Kundan",
  description:
    "Terms governing purchases, appointments, and use of the Kundan maison website.",
};

export default function TermsPage() {
  return (
    <LegalPage currentHref="/legal/app"
      title="Terms & conditions" updated="8 September 2026">
      <section>
        <h2>1. Who we are</h2>
        <p>
          These terms apply to Kundan Gems and Jewellers (“Kundan”, “we”, “us”)
          operating from our salon on MM Alam Road, Lahore, Pakistan, and to
          visitors of kundan.atelier and related digital channels. By browsing,
          booking, or purchasing, you agree to these terms.
        </p>
      </section>

      <section>
        <h2>2. Products &amp; descriptions</h2>
        <p>
          Pieces are handcrafted. Weights, stone characteristics, and finishes
          may vary slightly from photography. Catalogue copy and prices are
          invitations to treat; a sale is confirmed when we accept your order in
          writing or in salon. Precious-metal prices may move with market rates
          until payment is received in full.
        </p>
      </section>

      <section>
        <h2>3. Orders &amp; payment</h2>
        <ul>
          <li>
            Online enquiries are confirmed by the atelier before production or
            dispatch.
          </li>
          <li>
            Payment may be made by bank transfer, card, or in-salon settlement.
          </li>
          <li>
            Title to goods passes on full payment; risk passes on delivery or
            salon handover.
          </li>
          <li>
            Bespoke and bridal commissions may require a non-refundable deposit
            as stated in your consultation note.
          </li>
        </ul>
      </section>

      <section>
        <h2>4. Appointments</h2>
        <p>
          Private viewings are by appointment. Please give at least 24 hours’
          notice to reschedule. Repeated no-shows may lead us to decline future
          bookings. Walk-ins are welcome during published salon hours when
          capacity allows.
        </p>
      </section>

      <section>
        <h2>5. Intellectual property</h2>
        <p>
          Designs, photography, text, and marks on this site belong to Kundan or
          its licensors. You may not copy, scrape, or commercially reuse them
          without written consent.
        </p>
      </section>

      <section>
        <h2>6. Liability</h2>
        <p>
          To the fullest extent permitted by Pakistani law, we are not liable for
          indirect or consequential loss. Nothing in these terms limits liability
          for fraud, personal injury caused by negligence, or rights that cannot
          be excluded by law.
        </p>
      </section>

      <section>
        <h2>7. Governing law</h2>
        <p>
          These terms are governed by the laws of Pakistan. Courts in Lahore have
          exclusive jurisdiction, without prejudice to mandatory consumer
          protections that apply to you.
        </p>
      </section>

      <section>
        <h2>8. Contact</h2>
        <p>
          Questions about these terms:{" "}
          <a href="mailto:hello@kundan.atelier" className="text-gold">
            hello@kundan.atelier
          </a>
          .
        </p>
      </section>
    </LegalPage>
  );
}
