import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function ContactCTA() {
  return (
    <section className="surface p-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="space-y-2">
        <SectionHeader
          label="SECTION 04 / CTA"
          title="Ready for a system audit?"
          description="One focused review to map your current stack, constraints, and quickest wins."
        />
      </div>
      <div className="flex flex-col items-start gap-2 md:items-end">
        <Button>Book a System Audit</Button>
        <p className="text-xs text-muted-foreground">
          Typical response time: 1–2 business days.
        </p>
      </div>
    </section>
  );
}

