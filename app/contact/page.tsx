import type { Metadata } from "next";
import { PageTransition } from "@/components/site/PageTransition";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Contact — AWERE",
  description: "Start the build. Submit a brief and get a technical path forward.",
};

const nextSteps = [
  "We review your brief within 1–2 business days.",
  "You receive a short system-level proposal (no fluff).",
  "If it’s a fit, we move straight into a structured audit.",
];

export default function ContactPage() {
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
          <form className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Input label="Name" name="name" placeholder="Jane Doe" />
              <Input
                label="Email"
                name="email"
                type="email"
                placeholder="you@company.com"
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Input
                label="Project Type"
                name="projectType"
                placeholder="SaaS, commerce, internal tool…"
              />
              <Input
                label="Budget Range"
                name="budget"
                placeholder="e.g. 15–40k EUR"
              />
            </div>
            <Textarea
              label="Message"
              name="message"
              placeholder="Share context, constraints, and what ‘good’ looks like."
              rows={5}
            />
            <div className="pt-2">
              <Button type="submit">Submit brief</Button>
            </div>
          </form>
        </div>
      </div>
    </PageTransition>
  );
}

