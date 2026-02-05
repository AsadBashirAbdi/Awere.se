import type { Metadata } from "next";
import { PageTransition } from "@/components/site/PageTransition";
import { WorkGrid } from "@/components/sections/WorkGrid";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Work — AWERE",
  description: "Selected work with a focus on systems, performance, and maintainability.",
};

export default function WorkPage() {
  return (
    <PageTransition>
      <div className="space-y-12 py-12">
        <SectionHeader
          label="SECTION 02 / WORK"
          title="Systems in the wild"
          description="Snapshots of products where architecture, UX, and implementation work together."
        />
        <WorkGrid />
      </div>
    </PageTransition>
  );
}

