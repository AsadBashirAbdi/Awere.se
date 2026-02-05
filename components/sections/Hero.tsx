import { getSiteConfig } from "@/lib/content";
import { Button } from "@/components/ui/Button";

export function Hero() {
  const site = getSiteConfig();

  return (
    <div className="space-y-6">
      <p className="font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase">
        STUDIO / AWERE
      </p>
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          We build systems, not just websites.
        </h1>
        <p className="max-w-xl text-sm text-muted-foreground">
          AWERE designs and implements high-performance digital products for
          teams who value technical precision.
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <Button>System Audit</Button>
        <p className="text-xs text-muted-foreground">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em]">
            Studio
          </span>{" "}
          — {site.tagline}
        </p>
      </div>
    </div>
  );
}

