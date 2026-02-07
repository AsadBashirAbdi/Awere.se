"use client";

import { useState } from "react";

type ChecklistItem = {
  label: string;
  id?: string;
};

type InteractiveChecklistProps = {
  title: string;
  items: ChecklistItem[];
  persistKey?: string;
  showProgress?: boolean;
};

function getInitialState(persistKey?: string): Set<string> {
  if (persistKey && typeof window !== "undefined") {
    const stored = sessionStorage.getItem(`checklist-${persistKey}`);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return new Set(parsed);
      } catch {
        // Ignore parse errors
      }
    }
  }
  return new Set();
}

export function InteractiveChecklist({
  title,
  items,
  persistKey,
  showProgress = true,
}: InteractiveChecklistProps) {
  const [checked, setChecked] = useState<Set<string>>(() =>
    getInitialState(persistKey)
  );

  const toggle = (itemLabel: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(itemLabel)) {
        next.delete(itemLabel);
      } else {
        next.add(itemLabel);
      }

      // Save to sessionStorage
      if (persistKey && typeof window !== "undefined") {
        sessionStorage.setItem(
          `checklist-${persistKey}`,
          JSON.stringify(Array.from(next))
        );
      }

      return next;
    });
  };

  const reset = () => {
    setChecked(new Set());
    if (persistKey && typeof window !== "undefined") {
      sessionStorage.removeItem(`checklist-${persistKey}`);
    }
  };

  const checkedCount = checked.size;
  const totalCount = items.length;

  return (
    <div className="surface p-5 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-mono tracking-[0.18em] text-muted-foreground uppercase">
          {title}
        </h3>
        {showProgress && (
          <span className="text-xs font-mono text-muted-foreground">
            {checkedCount}/{totalCount}
          </span>
        )}
      </div>
      <ul className="space-y-2">
        {items.map((item) => {
          const itemId = item.id || item.label;
          const isChecked = checked.has(item.label);
          return (
            <li key={itemId}>
              <label className="flex items-start gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggle(item.label)}
                  className="sr-only"
                />
                <span
                  className={`
                    mt-[6px] h-3 w-3 rounded-full border flex-shrink-0 transition-all duration-150
                    ${
                      isChecked
                        ? "border-[var(--accent)] bg-[var(--accent)]"
                        : "border-[rgba(23,23,23,0.16)] group-hover:border-[rgba(23,23,23,0.32)]"
                    }
                  `}
                >
                  {isChecked && (
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="2,6 5,9 10,3" />
                    </svg>
                  )}
                </span>
                <span
                  className={`text-sm transition-colors ${
                    isChecked
                      ? "text-black font-medium"
                      : "text-muted-foreground group-hover:text-black"
                  }`}
                >
                  {item.label}
                </span>
              </label>
            </li>
          );
        })}
      </ul>
      {checkedCount > 0 && (
        <button
          type="button"
          onClick={reset}
          className="text-xs text-muted-foreground hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 rounded px-2 py-1 -ml-2"
        >
          Reset
        </button>
      )}
    </div>
  );
}
