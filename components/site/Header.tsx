"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b border-transparent backdrop-blur-md transition-all duration-200 ${
        scrolled ? "bg-white/70 border-b-[rgba(23,23,23,0.06)] py-3" : "bg-white/40 py-4"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <span className="rounded-full border border-[rgba(23,23,23,0.09)] bg-white/80 px-3 py-1 text-xs font-mono tracking-[0.18em] uppercase">
            AWERE
          </span>
        </div>
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          {navItems.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors ${
                  active ? "text-black" : "hover:text-black"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="hidden rounded-full border border-[rgba(23,23,23,0.12)] bg-white/80 px-4 py-2 text-xs font-medium tracking-wide text-black shadow-sm transition-all hover:border-[rgba(23,23,23,0.24)] hover:shadow-md active:scale-[0.98] md:inline-flex"
          >
            Start a project
          </button>
        </div>
      </div>
    </header>
  );
}

