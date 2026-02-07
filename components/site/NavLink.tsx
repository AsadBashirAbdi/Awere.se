"use client";

import Link from "next/link";

type NavLinkProps = {
  href: string;
  label: string;
  active: boolean;
};

export function NavLink({ href, label, active }: NavLinkProps) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`
        relative px-3 py-1.5 text-sm font-medium rounded-lg transition-all
        ${
          active
            ? "text-[var(--text)] bg-[var(--accent)]/10"
            : "text-muted-foreground hover:text-[var(--text)] hover:bg-black/5 dark:hover:bg-white/5"
        }
      `}
    >
      {label}
      {active && (
        <span
          className="absolute bottom-0 left-3 right-3 h-[2px] bg-[var(--accent)] rounded-full"
          aria-hidden="true"
        />
      )}
    </Link>
  );
}
