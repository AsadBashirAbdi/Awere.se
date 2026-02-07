"use client";

import { useState } from "react";

type Tab = "structure" | "pipeline" | "telemetry";

export function SystemPreview() {
  const [activeTab, setActiveTab] = useState<Tab>("structure");

  return (
    <div className="surface p-5 space-y-4">
      <header className="flex items-center justify-between flex-wrap gap-2">
        <p className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
          SYSTEM CONSOLE
        </p>
        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
          <span className="px-2 py-0.5 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] font-medium">
            Audit
          </span>
          <span className="text-[8px]">→</span>
          <span className="px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/5">
            Design
          </span>
          <span className="text-[8px]">→</span>
          <span className="px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/5">
            Build
          </span>
          <span className="text-[8px]">→</span>
          <span className="px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/5">
            Deploy
          </span>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="flex gap-2 border-b border-[var(--border)] pb-2">
        {(["structure", "pipeline", "telemetry"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`
              px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-md transition-all
              ${
                activeTab === tab
                  ? "bg-[var(--accent)]/10 text-[var(--accent)] font-semibold"
                  : "text-muted-foreground hover:text-[var(--text)] hover:bg-black/5"
              }
            `}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "structure" && <StructureTab />}
      {activeTab === "pipeline" && <PipelineTab />}
      {activeTab === "telemetry" && <TelemetryTab />}
    </div>
  );
}

function StructureTab() {
  return (
    <div className="system-grid">
      <div className="space-y-3">
        <div className="skeleton-block p-3 space-y-2">
          <p className="font-mono text-[9px] tracking-wider text-muted-foreground/70 uppercase mb-1">
            app/
          </p>
          <div className="skeleton-line w-24" />
          <div className="skeleton-line w-32" />
          <div className="skeleton-line w-20" />
        </div>
        <div className="skeleton-block p-3 space-y-2">
          <p className="font-mono text-[9px] tracking-wider text-muted-foreground/70 uppercase mb-1">
            components/
          </p>
          <div className="skeleton-line w-28" />
          <div className="skeleton-line w-24" />
        </div>
      </div>
      <div className="skeleton-block p-4 space-y-3">
        <p className="font-mono text-[9px] tracking-wider text-muted-foreground/70 uppercase">
          content/
        </p>
        <div className="skeleton-line w-32" />
        <div className="skeleton-line w-40" />
        <div className="grid grid-cols-4 gap-2 pt-1">
          <div className="skeleton-line" />
          <div className="skeleton-line" />
          <div className="skeleton-line" />
          <div className="skeleton-line" />
        </div>
        <div className="skeleton-block p-3 space-y-2 mt-2">
          <p className="font-mono text-[9px] tracking-wider text-muted-foreground/70 uppercase mb-1">
            lib/
          </p>
          <div className="skeleton-line w-20" />
          <div className="skeleton-line w-28" />
        </div>
      </div>
    </div>
  );
}

function PipelineTab() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs">
        <span className="font-mono text-muted-foreground">Build Status</span>
        <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 font-medium">
          ✓ Passing
        </span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="font-mono text-muted-foreground">Deploy Region</span>
        <span className="font-mono text-[var(--text)]">iad1 (US East)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="font-mono text-muted-foreground">Last Deploy</span>
        <span className="font-mono text-[var(--text)]">2 min ago</span>
      </div>
      <div className="skeleton-block p-3 space-y-2 mt-4">
        <p className="font-mono text-[9px] tracking-wider text-muted-foreground/70 uppercase">
          Build Output
        </p>
        <div className="skeleton-line w-full" />
        <div className="skeleton-line w-3/4" />
        <div className="skeleton-line w-5/6" />
      </div>
    </div>
  );
}

function TelemetryTab() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs">
        <span className="font-mono text-muted-foreground">Latency (p50)</span>
        <span className="font-mono text-[var(--accent)] font-semibold">
          47ms
        </span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="font-mono text-muted-foreground">Latency (p95)</span>
        <span className="font-mono text-[var(--text)]">112ms</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="font-mono text-muted-foreground">Uptime (30d)</span>
        <span className="font-mono text-green-600 font-semibold">99.98%</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="font-mono text-muted-foreground">Requests (24h)</span>
        <span className="font-mono text-[var(--text)]">12,847</span>
      </div>
      <div className="skeleton-block p-3 space-y-2 mt-4">
        <p className="font-mono text-[9px] tracking-wider text-muted-foreground/70 uppercase">
          Performance Chart
        </p>
        <div className="grid grid-cols-8 gap-1 items-end h-12">
          {[40, 65, 55, 80, 70, 90, 75, 85].map((height, i) => (
            <div
              key={i}
              className="skeleton-line w-full"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
