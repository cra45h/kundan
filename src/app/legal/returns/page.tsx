import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Returns & Exchanges — Kundan",
  description:
    "Return and exchange conditions for Kundan jewellery purchases and salon handovers.",
};

export default function ReturnsPage() {
  return (
    <LegalPage currentHref="/legal/app"
      title="Returns & exchanges" updated="8 September 2026">
      <section>
        <h2>1. Ready-to-wear pieces</h2>
        <p>
          Unworn, undamaged pieces in original packaging may be returned or
          exchanged within <strong>7 days</strong> of delivery or salon handover,
          subject to inspection. Earrings worn for hygiene reasons and engraved
          pieces cannot be returned.
        </p>
      </section>

      <section>
        <h2>2. Bridal &amp; bespoke</h2>
        <p>
          Custom commissions, sized bridal sets, and pieces altered to your
          specification are final sale once production begins, except where
          required by law or where we confirm a defect in craftsmanship.
        </p>
      </section>

      <section>
        <h2>3. How to start a return</h2>
        <ul>
          <li>
            Email{" "}
            <a href="mailto:hello@kundan.atelier" className="text-gold">
              hello@kundan.atelier
            </a>{" "}
            with your order reference and reason.
          </li>
          <li>Wait for a return authorisation before shipping anything back.</li>
          <li>
            Use insured courier; we are not responsible for returns lost in
            transit without authorisation.
          </li>
        </ul>
      </section>

      <section>
        <h2>4. Refunds</h2>
        <p>
          Approved refunds are issued to the original payment method within 10–14
          working days after the piece clears inspection. Shipping fees, where
          charged, are non-refundable unless the return is due to our error.
        </p>
      </section>

      <section>
        <h2>5. Exchanges</h2>
        <p>
          Size or form exchanges depend on availability. Any price difference is
          settled before the new piece leaves the atelier.
        </p>
      </section>
    </LegalPage>
  );
}
