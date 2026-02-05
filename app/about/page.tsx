import type { Metadata } from "next";
import { PageTransition } from "@/components/site/PageTransition";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "About — AWERE",
  description: "Code as craft, with systems thinking at the core.",
};

const principles = [
  {
    id: "01",
    title: "Logic over hype",
    body: "Decisions are grounded in architecture, constraints, and outcomes — not trends.",
  },
  {
    id: "02",
    title: "Speed is a feature",
    body: "Fast decisions, fast feedback, and fast experiences for your customers.",
  },
  {
    id: "03",
    title: "Maintainable systems",
    body: "We design for the person inheriting the codebase, not just the launch day.",
  },
];

export default function AboutPage() {
  return (
    <PageTransition>
      <div className="space-y-12 py-12">
        <SectionHeader
          label="SECTION 03 / ABOUT"
          title="Code as craft"
          description="AWERE is a small studio focused on systems, not campaigns."
        />
        <div className="grid gap-8 md:grid-cols-3">
          {principles.map((principle) => (
            <div
              key={principle.id}
              className="surface card-hover p-6 flex flex-col gap-3"
            >
              <span className="font-mono text-xs tracking-[0.18em] text-muted-foreground">
                {principle.id}
              </span>
              <h3 className="text-base font-semibold">{principle.title}</h3>
              <p className="text-sm text-muted-foreground">{principle.body}</p>
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}

