import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function ContactCTA() {
  return (
    <section className="surface p-6 md:p-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="space-y-2">
        <SectionHeader
          label="SECTION 04 / CTA"
          title="Ready for a system audit?"
          description="One focused review to map your current stack, constraints, and quickest wins."
        />
      </div>
      <div className="flex flex-col items-start gap-2 md:items-end">
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium tracking-wide text-white shadow-sm transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
        >
          Book a System Audit
        </Link>
        <p className="text-xs text-muted-foreground">
          Typical response time: 1–2 business days.
        </p>
      </div>
    </section>
  );
}

