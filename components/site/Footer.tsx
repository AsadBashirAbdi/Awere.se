export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[rgba(23,23,23,0.06)] bg-white/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between md:px-6">
        <div className="space-y-1">
          <p className="font-mono tracking-[0.16em] uppercase">
            AWERE Studio
          </p>
          <p>Modern websites that feel like products.</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-[11px]">hello@awere.se</span>
          <span className="text-[11px]">Twitter / LinkedIn</span>
          <span className="text-[11px]">&copy; {year} AWERE</span>
        </div>
      </div>
    </footer>
  );
}

