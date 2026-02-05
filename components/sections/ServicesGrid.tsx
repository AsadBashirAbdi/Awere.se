import { getServices } from "@/lib/content";
import { Card } from "@/components/ui/Card";
import { Checklist } from "@/components/ui/Checklist";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function ServicesGrid() {
  const services = getServices();

  return (
    <section className="space-y-8">
      <SectionHeader
        label="SECTION 01 / SERVICES"
        title="From audit to deployed system"
        description="Three modular services you can combine or run independently."
      />
      <div className="grid gap-6 md:grid-cols-3">
        {services.map((service) => (
          <Card key={service.id} className="flex flex-col gap-4">
            <div className="space-y-2">
              <p className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
                {service.label}
              </p>
              <h3 className="text-base font-semibold">{service.title}</h3>
              <p className="text-sm text-muted-foreground">
                {service.description}
              </p>
            </div>
            <Checklist
              title="Deliverables checklist"
              items={service.deliverables.map((d) => ({ label: d }))}
            />
          </Card>
        ))}
      </div>
    </section>
  );
}

