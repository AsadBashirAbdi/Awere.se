export function SystemPreview() {
  return (
    <div className="surface p-5 space-y-4">
      <header className="flex items-center justify-between flex-wrap gap-2">
        <p className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
          SYSTEM PREVIEW
        </p>
        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
          <span className="px-2 py-0.5 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] font-medium">Audit</span>
          <span className="text-[8px]">→</span>
          <span className="px-2 py-0.5 rounded-full bg-black/5">Design</span>
          <span className="text-[8px]">→</span>
          <span className="px-2 py-0.5 rounded-full bg-black/5">Build</span>
          <span className="text-[8px]">→</span>
          <span className="px-2 py-0.5 rounded-full bg-black/5">Deploy</span>
        </div>
      </header>
      <div className="system-grid">
        <div className="space-y-3">
          <div className="skeleton-block p-3 space-y-2">
            <p className="font-mono text-[9px] tracking-wider text-muted-foreground/70 uppercase mb-1">app/</p>
            <div className="skeleton-line w-24" />
            <div className="skeleton-line w-32" />
            <div className="skeleton-line w-20" />
          </div>
          <div className="skeleton-block p-3 space-y-2">
            <p className="font-mono text-[9px] tracking-wider text-muted-foreground/70 uppercase mb-1">components/</p>
            <div className="skeleton-line w-28" />
            <div className="skeleton-line w-24" />
          </div>
        </div>
        <div className="skeleton-block p-4 space-y-3">
          <p className="font-mono text-[9px] tracking-wider text-muted-foreground/70 uppercase">content/</p>
          <div className="skeleton-line w-32" />
          <div className="skeleton-line w-40" />
          <div className="grid grid-cols-4 gap-2 pt-1">
            <div className="skeleton-line" />
            <div className="skeleton-line" />
            <div className="skeleton-line" />
            <div className="skeleton-line" />
          </div>
          <div className="skeleton-block p-3 space-y-2 mt-2">
            <p className="font-mono text-[9px] tracking-wider text-muted-foreground/70 uppercase mb-1">lib/</p>
            <div className="skeleton-line w-20" />
            <div className="skeleton-line w-28" />
          </div>
        </div>
      </div>
    </div>
  );
}

