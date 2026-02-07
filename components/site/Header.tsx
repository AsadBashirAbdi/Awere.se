"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/brand/Logo";
import { NavLink } from "@/components/site/NavLink";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      setMobileOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [mobileOpen]);

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <header
      className={`sticky top-0 z-40 border-b border-transparent backdrop-blur-md transition-all duration-200 ${
        scrolled
          ? "bg-[var(--surface)]/70 border-b-[var(--border)] py-3"
          : "bg-[var(--surface)]/40 py-4"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 md:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
        >
          <Logo size="sm" />
          <span className="font-semibold tracking-tight text-[var(--text)]">
            AWERE
          </span>
        </Link>
        <nav className="hidden items-center gap-1 text-sm md:flex">
          {navItems.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <NavLink
                key={item.href}
                href={item.href}
                active={active}
                label={item.label}
              />
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden rounded-full bg-[var(--accent)] px-4 py-2 text-xs font-medium tracking-wide text-white shadow-sm transition-all hover:shadow-md active:scale-[0.98] md:inline-flex"
          >
            Start a project
          </Link>
          {/* Mobile menu button */}
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(23,23,23,0.09)] bg-white/80 md:hidden"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {mobileOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="4" y1="8" x2="20" y2="8" />
                  <line x1="4" y1="16" x2="20" y2="16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile menu panel */}
      {mobileOpen && (
        <nav
          className="absolute top-full left-0 right-0 border-t border-[var(--border)] bg-[var(--surface)]/95 backdrop-blur-md md:hidden"
          aria-label="Mobile navigation"
        >
          <div className="mx-auto max-w-6xl px-4 py-4 flex flex-col gap-2">
            {navItems.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileMenu}
                  aria-current={active ? "page" : undefined}
                  className={`py-2.5 px-3 rounded-lg text-sm transition-colors ${
                    active
                      ? "bg-[var(--accent)]/10 text-[var(--text)] font-medium border border-[var(--accent)]/20"
                      : "text-muted-foreground hover:bg-black/5 hover:text-[var(--text)] dark:hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/contact"
              onClick={closeMobileMenu}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-4 py-2.5 text-sm font-medium tracking-wide text-white shadow-sm active:scale-[0.98]"
            >
              Start a project
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

