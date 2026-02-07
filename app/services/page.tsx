import type { Metadata } from "next";
import { PageTransition } from "@/components/site/PageTransition";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/site/Reveal";

export const metadata: Metadata = {
  title: "Services — AWERE",
  description: "System Architecture, Product Design, and Web Implementation services.",
};

export default function ServicesPage() {
  return (
    <PageTransition>
      <div className="space-y-12 py-12">
        <Reveal id="services-header">
          <SectionHeader
            label="SECTION 01 / SERVICES"
            title="System-first services"
            description="Three focused modules that take you from audit to deployed product."
          />
        </Reveal>
        <Reveal id="services-grid">
          <ServicesGrid />
        </Reveal>
      </div>
    </PageTransition>
  );
}

