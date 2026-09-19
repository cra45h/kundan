import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy — Kundan",
  description:
    "How Kundan collects, uses, and protects personal information from clients and site visitors.",
};

export default function PrivacyPage() {
  return (
    <LegalPage currentHref="/legal/app"
      title="Privacy policy" updated="8 September 2026">
      <section>
        <h2>1. Scope</h2>
        <p>
          This policy explains how Kundan Gems and Jewellers handles personal
          data when you visit our website, book a viewing, join atelier notes, or
          purchase with us.
        </p>
      </section>

      <section>
        <h2>2. What we collect</h2>
        <ul>
          <li>Identity and contact details (name, email, phone, address)</li>
          <li>Appointment preferences and bridal / sizing notes</li>
          <li>Order, payment confirmation, and delivery records</li>
          <li>
            Technical data such as device type, approximate location, and pages
            viewed (via cookies or similar tools where enabled)
          </li>
        </ul>
      </section>

      <section>
        <h2>3. How we use it</h2>
        <p>We use personal data to:</p>
        <ul>
          <li>Fulfil orders, fittings, and aftercare</li>
          <li>Respond to enquiries and manage appointments</li>
          <li>Send atelier notes when you have opted in</li>
          <li>Improve the safety and performance of our digital channels</li>
          <li>Meet legal and accounting obligations</li>
        </ul>
      </section>

      <section>
        <h2>4. Sharing</h2>
        <p>
          We do not sell your data. We may share limited information with trusted
          processors (payment, courier, IT hosting) under confidentiality, or
          when required by law. International transfers, if any, are protected by
          appropriate contractual safeguards.
        </p>
      </section>

      <section>
        <h2>5. Retention</h2>
        <p>
          We keep client and order records for as long as needed for warranty,
          accounting, and legal purposes, then delete or anonymise them.
          Marketing lists are retained until you unsubscribe.
        </p>
      </section>

      <section>
        <h2>6. Your choices</h2>
        <p>
          You may request access, correction, or deletion of your personal data,
          and withdraw marketing consent at any time by emailing{" "}
          <a href="mailto:hello@kundan.atelier" className="text-gold">
            hello@kundan.atelier
          </a>
          .
        </p>
      </section>

      <section>
        <h2>7. Security</h2>
        <p>
          We apply reasonable technical and organisational measures. No method of
          transmission is perfectly secure; please protect your own devices and
          never send card numbers by email.
        </p>
      </section>
    </LegalPage>
  );
}
