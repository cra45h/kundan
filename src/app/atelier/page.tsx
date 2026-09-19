import type { Metadata } from "next";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHero } from "@/components/site/PageHero";
import { CraftSection } from "@/components/sections/CraftSection";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { ConsultationBanner } from "@/components/sections/ConsultationBanner";

export const metadata: Metadata = {
  title: "The Atelier — Kundan",
  description:
    "From first sketch to final polish — how a Kundan piece is made, and what we promise once it leaves the bench.",
};

export default function AtelierPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Our story"
        title="Made at the"
        accent="bench"
        description="Nothing is outsourced. Every piece is drawn, set and finished in our own atelier, then assayed before it leaves us."
        crumbs={[{ label: "The Atelier" }]}
      />
      <TrustStrip />
      <CraftSection />
      <ConsultationBanner />
    </SiteShell>
  );
}
