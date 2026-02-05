import { getProcess } from "@/lib/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";

export function ProcessSteps() {
  const steps = getProcess();

  return (
    <section className="space-y-6">
      <SectionHeader
        label="SECTION 03 / PROCESS"
        title="A simple, technical loop"
        description="Clarity first, then design, then production-grade implementation."
      />
      <div className="grid gap-6 md:grid-cols-3">
        {steps.map((step) => (
          <Card key={step.id} className="flex flex-col gap-3">
            <p className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
              {step.id}
            </p>
            <h3 className="text-base font-semibold">{step.title}</h3>
            <p className="text-sm text-muted-foreground">{step.description}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}

