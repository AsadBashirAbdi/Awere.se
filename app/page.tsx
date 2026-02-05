import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { WorkGrid } from "@/components/sections/WorkGrid";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { SystemPreview } from "@/components/sections/SystemPreview";
import { PageTransition } from "@/components/site/PageTransition";

export const metadata: Metadata = {
  title: "AWERE — We build systems, not just websites.",
  description:
    "AWERE designs and implements high-performance digital products for teams who value technical precision.",
};

export default function HomePage() {
  return (
    <PageTransition>
      <div className="space-y-16 py-12">
        <section className="grid gap-10 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1.2fr)] items-start">
          <Hero />
          <SystemPreview />
        </section>
        <ServicesGrid />
        <WorkGrid />
        <ProcessSteps />
        <ContactCTA />
      </div>
    </PageTransition>
  );
}
