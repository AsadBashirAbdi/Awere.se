import Link from "next/link";

export function Hero() {

  return (
    <div className="space-y-8">
      <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
        STUDIO / AWERE
      </p>
      <div className="space-y-5">
        <h1 className="text-4xl font-semibold tracking-tight leading-[1.1] md:text-5xl lg:text-[3.75rem]">
          We build systems,
          <br />
          <span className="text-muted-foreground">not just websites.</span>
        </h1>
        <p className="max-w-xl text-base text-muted-foreground leading-relaxed md:text-lg">
          AWERE designs and implements high-performance digital products for
          teams who value technical precision.
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-4 pt-2">
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-medium tracking-wide text-white shadow-sm transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
        >
          System Audit
        </Link>
        <Link
          href="/services"
          className="inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)]/80 px-6 py-3 text-sm font-medium tracking-wide text-[var(--text)] shadow-sm transition-all hover:border-[var(--accent)] hover:shadow-md active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
        >
          View Services
        </Link>
      </div>
      <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-muted-foreground">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em]">
            Stack
          </span>
          <div className="flex gap-2 mt-2">
            <span className="px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/5 font-mono text-[10px]">
              Next.js
            </span>
            <span className="px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/5 font-mono text-[10px]">
              TypeScript
            </span>
            <span className="px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/5 font-mono text-[10px]">
              Vercel
            </span>
          </div>
        </div>
        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em]">
            SLA
          </span>
          <div className="flex gap-2 mt-2">
            <span className="px-2 py-0.5 rounded-md bg-[var(--accent)]/10 text-[var(--accent)] font-mono text-[10px] font-medium">
              99.9% Uptime
            </span>
            <span className="px-2 py-0.5 rounded-md bg-[var(--accent)]/10 text-[var(--accent)] font-mono text-[10px] font-medium">
              &lt;100ms p95
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

