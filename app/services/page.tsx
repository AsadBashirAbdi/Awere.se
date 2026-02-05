import type { Metadata } from "next";
import { PageTransition } from "@/components/site/PageTransition";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Services — AWERE",
  description: "System Architecture, Product Design, and Web Implementation services.",
};

export default function ServicesPage() {
  return (
    <PageTransition>
      <div className="space-y-12 py-12">
        <SectionHeader
          label="SECTION 01 / SERVICES"
          title="System-first services"
          description="Three focused modules that take you from audit to deployed product."
        />
        <ServicesGrid />
      </div>
    </PageTransition>
  );
}

