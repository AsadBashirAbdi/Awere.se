"use client";

import { useState, useRef } from "react";
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
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const clientTsRef = useRef(Date.now());

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus("idle");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      projectType,
      budgetRange,
      message: formData.get("message") as string,
      company: formData.get("company") as string,
      website: formData.get("website") as string,
      hp: formData.get("hp") as string,
      clientTs: clientTsRef.current,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.ok) {
        setStatus("success");
        formRef.current?.reset();
        setProjectType("");
        setBudgetRange("");
        clientTsRef.current = Date.now();
      } else {
        setStatus("error");
        setErrorMessage(result.error || "Failed to send message");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage("Network error. Please try again.");
      console.error("Form submission error:", error);
    } finally {
      setSubmitting(false);
    }
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
          <form ref={formRef} className="space-y-4" onSubmit={handleSubmit}>
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
            <div className="grid gap-4 md:grid-cols-2">
              <Input label="Company (optional)" name="company" placeholder="ACME Inc" />
              <Input label="Website (optional)" name="website" placeholder="https://..." />
            </div>
            {/* Honeypot field - hidden from users */}
            <input
              type="text"
              name="hp"
              tabIndex={-1}
              autoComplete="off"
              className="sr-only absolute -left-[9999px]"
              aria-hidden="true"
            />
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
              <Button type="submit" disabled={submitting}>
                {submitting ? "Sending..." : "Submit brief"}
              </Button>
            </div>
            {status === "success" && (
              <div className="rounded-lg border border-green-500/30 bg-green-500/5 px-4 py-3 text-sm">
                <p className="font-medium text-[var(--text)]">Message sent successfully!</p>
                <p className="text-muted-foreground text-xs mt-1">
                  We&apos;ll review your brief and reply within 1–2 business days.
                </p>
              </div>
            )}
            {status === "error" && (
              <div className="rounded-lg border border-red-500/30 bg-red-500/5 px-4 py-3 text-sm">
                <p className="font-medium text-[var(--text)]">Failed to send message</p>
                <p className="text-muted-foreground text-xs mt-1">
                  {errorMessage || "Please try again or email us directly at contact@awere.se"}
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
