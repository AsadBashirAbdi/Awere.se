import Link from "next/link";
import { getSiteConfig } from "@/lib/content";

export function Hero() {
  const site = getSiteConfig();

  return (
    <div className="space-y-8">
      <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
        STUDIO / AWERE
      </p>
      <div className="space-y-5">
        <h1 className="text-4xl font-semibold tracking-tight leading-[1.1] md:text-5xl lg:text-[3.5rem]">
          We build systems,
          <br />
          <span className="text-muted-foreground">not just websites.</span>
        </h1>
        <p className="max-w-lg text-base text-muted-foreground leading-relaxed">
          AWERE designs and implements high-performance digital products for
          teams who value technical precision.
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-4 pt-2">
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium tracking-wide text-white shadow-sm transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
        >
          System Audit
        </Link>
        <Link
          href="/services"
          className="inline-flex items-center justify-center rounded-full border border-[rgba(23,23,23,0.12)] bg-white/80 px-5 py-2.5 text-sm font-medium tracking-wide text-black shadow-sm transition-all hover:border-[rgba(23,23,23,0.24)] hover:shadow-md active:scale-[0.98]"
        >
          View Services
        </Link>
      </div>
      <p className="text-xs text-muted-foreground pt-2">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em]">
          Studio
        </span>{" "}
        — {site.tagline}
      </p>
    </div>
  );
}

