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
        {steps.map((step, index) => (
          <Card key={step.id} className="flex flex-col gap-3 relative">
            <div className="absolute -top-3 -left-1 text-4xl font-bold text-black/5 font-mono">
              {String(index + 1).padStart(2, "0")}
            </div>
            <p className="font-mono text-[11px] tracking-[0.18em] text-[var(--accent)] uppercase">
              {step.id}
            </p>
            <h3 className="text-base font-semibold">{step.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}

