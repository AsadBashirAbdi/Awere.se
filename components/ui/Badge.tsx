import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
};

export function Badge({ children }: BadgeProps) {
  return (
    <span className="inline-flex items-center rounded-full border border-[rgba(23,23,23,0.12)] bg-white/80 px-2.5 py-1 text-[11px] font-mono tracking-[0.16em] uppercase text-muted-foreground">
      {children}
    </span>
  );
}

