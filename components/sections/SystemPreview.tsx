export function SystemPreview() {
  return (
    <div className="surface p-5 space-y-4">
      <header className="flex items-center justify-between">
        <p className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
          SYSTEM PREVIEW
        </p>
        <p className="text-[11px] text-muted-foreground">Audit → Design → Build → Deploy</p>
      </header>
      <div className="system-grid">
        <div className="space-y-3">
          <div className="skeleton-block p-3 space-y-2">
            <div className="skeleton-line w-24" />
            <div className="skeleton-line w-32" />
            <div className="skeleton-line w-20" />
          </div>
          <div className="skeleton-block p-3 space-y-2">
            <div className="skeleton-line w-28" />
            <div className="skeleton-line w-24" />
          </div>
        </div>
        <div className="skeleton-block p-4 space-y-3">
          <div className="skeleton-line w-32" />
          <div className="skeleton-line w-40" />
          <div className="grid grid-cols-4 gap-2 pt-1">
            <div className="skeleton-line" />
            <div className="skeleton-line" />
            <div className="skeleton-line" />
            <div className="skeleton-line" />
          </div>
          <div className="skeleton-block p-3 space-y-2 mt-2">
            <div className="skeleton-line w-20" />
            <div className="skeleton-line w-28" />
          </div>
        </div>
      </div>
    </div>
  );
}

