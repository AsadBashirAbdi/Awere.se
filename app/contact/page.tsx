"use client";

import { useState } from "react";
import { PageTransition } from "@/components/site/PageTransition";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { ChipGroup } from "@/components/ui/ChipGroup";

const nextSteps = [
  "We review your brief within 1–2 business days.",
  "You receive a short system-level proposal (no fluff).",
  "If it's a fit, we move straight into a structured audit.",
];

const projectTypes = [
  { value: "saas", label: "SaaS", description: "Software as a Service product" },
  { value: "commerce", label: "Commerce", description: "E-commerce platform" },
  { value: "internal", label: "Internal Tool", description: "Internal operations tool" },
  { value: "landing", label: "Landing Page", description: "Marketing site" },
  { value: "other", label: "Other", description: "Something else" },
];

const budgetRanges = [
  { value: "10-25k", label: "10–25k EUR" },
  { value: "25-50k", label: "25–50k EUR" },
  { value: "50-100k", label: "50–100k EUR" },
  { value: "100k+", label: "100k+ EUR" },
];

export default function ContactPage() {
  const [projectType, setProjectType] = useState("");
  const [budgetRange, setBudgetRange] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <PageTransition>
      <div className="grid gap-10 py-12 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.2fr)] items-start">
        <div className="space-y-6">
          <SectionHeader
            label="SECTION 04 / CONTACT"
            title="Start the build."
            description="Submit the brief. We reply with a technical path forward."
          />
          <div className="surface p-6 space-y-4">
            <h3 className="text-sm font-semibold tracking-[0.16em] uppercase text-muted-foreground">
              Process
            </h3>
            <ol className="space-y-3 text-sm text-muted-foreground">
              <li>01 — You share context, constraints, and desired outcomes.</li>
              <li>02 — We map a lean system architecture and product outline.</li>
              <li>03 — We agree on a build path and move into implementation.</li>
            </ol>
          </div>
          <div className="surface p-6 space-y-3">
            <h3 className="text-sm font-semibold tracking-[0.16em] uppercase text-muted-foreground">
              What happens next
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {nextSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="surface p-6 space-y-4">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid gap-4 md:grid-cols-2">
              <Input label="Name" name="name" placeholder="Jane Doe" required />
              <Input
                label="Email"
                name="email"
                type="email"
                placeholder="you@company.com"
                required
              />
            </div>
            <ChipGroup
              label="Project Type"
              options={projectTypes}
              value={projectType}
              onChange={(val) => setProjectType(val as string)}
              mode="single"
              name="projectType"
            />
            <ChipGroup
              label="Budget Range"
              options={budgetRanges}
              value={budgetRange}
              onChange={(val) => setBudgetRange(val as string)}
              mode="single"
              name="budgetRange"
            />
            <Textarea
              label="Message"
              name="message"
              placeholder="Share context, constraints, and what 'good' looks like."
              rows={5}
              required
            />
            <div className="pt-2">
              <Button type="submit">Submit brief</Button>
            </div>
            {submitted && (
              <div className="rounded-lg border border-[var(--accent)]/30 bg-[var(--accent)]/5 px-4 py-3 text-sm">
                <p className="font-medium text-black">Demo mode</p>
                <p className="text-muted-foreground text-xs mt-1">
                  Form submission not implemented yet. In production, this would
                  send to your backend or email service.
                </p>
              </div>
            )}
          </form>
          {(projectType || budgetRange) && (
            <div className="surface p-4 space-y-2 border-t border-[rgba(23,23,23,0.06)] mt-6">
              <p className="text-xs font-mono tracking-[0.18em] text-muted-foreground uppercase">
                Selection Summary
              </p>
              <div className="flex flex-wrap gap-2">
                {projectType && (
                  <span className="inline-flex items-center rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-3 py-1 text-xs font-medium text-black">
                    {projectTypes.find((p) => p.value === projectType)?.label}
                  </span>
                )}
                {budgetRange && (
                  <span className="inline-flex items-center rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-3 py-1 text-xs font-medium text-black">
                    {budgetRanges.find((b) => b.value === budgetRange)?.label}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
