"use client";

import { useState } from "react";

export type ChipOption = {
  value: string;
  label: string;
  description?: string;
};

type ChipGroupProps = {
  label: string;
  options: ChipOption[];
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  mode?: "single" | "multi";
  name?: string;
};

export function ChipGroup({
  label,
  options,
  value,
  onChange,
  mode = "single",
  name,
}: ChipGroupProps) {
  const [internalValue, setInternalValue] = useState<string | string[]>(
    mode === "single" ? "" : []
  );

  const currentValue = value ?? internalValue;

  const handleSelect = (optionValue: string) => {
    let newValue: string | string[];

    if (mode === "single") {
      newValue = currentValue === optionValue ? "" : optionValue;
    } else {
      const arr = Array.isArray(currentValue) ? currentValue : [];
      newValue = arr.includes(optionValue)
        ? arr.filter((v) => v !== optionValue)
        : [...arr, optionValue];
    }

    setInternalValue(newValue);
    onChange?.(newValue);
  };

  const isSelected = (optionValue: string) => {
    if (mode === "single") {
      return currentValue === optionValue;
    }
    return Array.isArray(currentValue) && currentValue.includes(optionValue);
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-medium text-muted-foreground">
        {label}
      </label>
      <div
        role={mode === "single" ? "radiogroup" : "group"}
        aria-label={label}
        className="flex flex-wrap gap-2"
      >
        {options.map((option) => {
          const selected = isSelected(option.value);
          return (
            <button
              key={option.value}
              type="button"
              role={mode === "single" ? "radio" : undefined}
              aria-checked={mode === "single" ? selected : undefined}
              aria-pressed={mode === "multi" ? selected : undefined}
              onClick={() => handleSelect(option.value)}
              className={`
                inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium
                transition-all duration-150
                ${
                  selected
                    ? "border-[var(--accent)] bg-[var(--accent)]/10 text-black shadow-sm"
                    : "border-[rgba(23,23,23,0.12)] bg-white/80 text-muted-foreground hover:border-[rgba(23,23,23,0.24)] hover:bg-white"
                }
                hover:scale-[1.02] active:scale-[0.98]
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2
              `}
              title={option.description}
            >
              {selected && (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[var(--accent)]"
                >
                  <polyline points="4,8 7,11 12,5" />
                </svg>
              )}
              {option.label}
            </button>
          );
        })}
      </div>
      {/* Hidden input for form compatibility */}
      {name && (
        <input
          type="hidden"
          name={name}
          value={
            Array.isArray(currentValue)
              ? currentValue.join(",")
              : currentValue
          }
        />
      )}
    </div>
  );
}
