import { getWorkItems } from "@/lib/content";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function WorkGrid() {
  const items = getWorkItems();

  return (
    <section className="space-y-6">
      <SectionHeader
        label="SECTION 02 / WORK"
        title="Representative work"
        description="A small sample of systems shaped for SaaS, commerce, and internal tools."
      />
      <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
        <span>Filter:</span>
        <Badge>All</Badge>
        <Badge>SaaS</Badge>
        <Badge>Commerce</Badge>
        <Badge>Internal Tools</Badge>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((item) => (
          <Card key={item.id} className="flex flex-col gap-3">
            <div className="space-y-2">
              <p className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
                {item.type}
              </p>
              <h3 className="text-base font-semibold">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.summary}</p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[rgba(23,23,23,0.12)] bg-white/80 px-2 py-0.5 text-[11px] text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px] text-muted-foreground">
              <span>Status: {item.status}</span>
              <span>Stack: {item.stack}</span>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

