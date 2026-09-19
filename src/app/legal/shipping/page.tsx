import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Shipping Policy — Kundan",
  description:
    "Delivery timelines, insurance, and complimentary shipping for Kundan orders across Pakistan.",
};

export default function ShippingPage() {
  return (
    <LegalPage currentHref="/legal/app"
      title="Shipping & delivery" updated="8 September 2026">
      <section>
        <h2>1. Coverage</h2>
        <p>
          We offer complimentary insured shipping across Pakistan on eligible
          orders. International dispatch is arranged case by case — contact the
          atelier for a quotation.
        </p>
      </section>

      <section>
        <h2>2. Processing time</h2>
        <ul>
          <li>
            <strong>In-stock pieces:</strong> typically prepared within 3–5
            working days after payment confirmation.
          </li>
          <li>
            <strong>Made-to-order / bridal:</strong> timelines are confirmed in
            your consultation note and may span several weeks.
          </li>
          <li>
            Salon collection is available by appointment once your piece is
            ready.
          </li>
        </ul>
      </section>

      <section>
        <h2>3. Couriers &amp; insurance</h2>
        <p>
          Parcels travel with tracked, insured couriers. Risk passes on signed
          delivery. If a shipment is damaged in transit, keep packaging and
          contact us within 48 hours so we can open a claim.
        </p>
      </section>

      <section>
        <h2>4. Address accuracy</h2>
        <p>
          You are responsible for providing a complete, reachable address and
          phone number. Failed delivery attempts due to incorrect details may
          incur a re-dispatch fee.
        </p>
      </section>

      <section>
        <h2>5. Duties &amp; taxes</h2>
        <p>
          Domestic orders include applicable taxes as stated at confirmation.
          Cross-border clients are responsible for local customs duties where
          they apply.
        </p>
      </section>
    </LegalPage>
  );
}
