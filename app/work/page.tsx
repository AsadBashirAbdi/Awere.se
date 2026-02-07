"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { getWorkItems } from "@/lib/content";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PageTransition } from "@/components/site/PageTransition";

export default function WorkPage() {
  const items = getWorkItems();
  const [activeFilter, setActiveFilter] = useState("All");

  // Extract unique types from work items
  const filterOptions = useMemo(() => {
    const types = new Set(items.map((item) => item.type));
    return ["All", ...Array.from(types)];
  }, [items]);

  // Filter items based on active filter
  const filteredItems = useMemo(() => {
    if (activeFilter === "All") return items;
    return items.filter((item) => item.type === activeFilter);
  }, [items, activeFilter]);

  return (
    <PageTransition>
      <div className="space-y-8 py-12">
        <SectionHeader
          label="SECTION 02 / WORK"
          title="Representative work"
          description="A small sample of systems shaped for SaaS, commerce, and internal tools."
        />
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span className="mr-1">Filter:</span>
          {filterOptions.map((option) => {
            const isActive = option === activeFilter;
            return (
              <button
                key={option}
                onClick={() => setActiveFilter(option)}
                className={`
                  inline-flex items-center rounded-full border px-3 py-1.5 text-[11px] font-mono tracking-[0.16em] uppercase
                  transition-all duration-150
                  ${
                    isActive
                      ? "border-[var(--accent)] bg-[var(--accent)]/10 text-black font-semibold"
                      : "border-[rgba(23,23,23,0.12)] bg-white/80 text-muted-foreground hover:border-[rgba(23,23,23,0.24)] hover:bg-white"
                  }
                  hover:scale-[1.02] active:scale-[0.98]
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2
                `}
                aria-pressed={isActive}
              >
                {option}
              </button>
            );
          })}
        </div>
        {filteredItems.length === 0 ? (
          <div className="surface p-12 text-center space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              No work items match this filter.
            </p>
            <button
              onClick={() => setActiveFilter("All")}
              className="text-sm text-[var(--accent)] hover:underline"
            >
              Reset filter
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {filteredItems.map((item) => (
              <Link
                key={item.id}
                href={`/work/${item.slug}`}
                className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-4 rounded-xl"
              >
                <Card className="flex flex-col gap-3 h-full">
                  <div className="space-y-2">
                    <p className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
                      {item.type}
                    </p>
                    <h3 className="text-base font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.summary}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[rgba(23,23,23,0.12)] bg-white/80 px-2 py-0.5 text-[11px] text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px] text-muted-foreground">
                    <span>Status: {item.status}</span>
                    <span>Stack: {item.stack}</span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  );
}
