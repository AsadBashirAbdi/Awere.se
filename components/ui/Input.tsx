import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export function Input({ label, id, className = "", ...props }: InputProps) {
  const inputId = id ?? props.name ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="space-y-1">
      <label
        htmlFor={inputId}
        className="block text-xs font-medium text-muted-foreground"
      >
        {label}
      </label>
      <input
        id={inputId}
        className={`w-full rounded-md border border-[rgba(23,23,23,0.16)] bg-white px-3 py-2 text-sm outline-none ring-offset-0 transition-shadow focus:border-[rgba(23,23,23,0.5)] focus:shadow-[0_0_0_1px_rgba(23,23,23,0.5)] ${className}`}
        {...props}
      />
    </div>
  );
}

