import type { TextareaHTMLAttributes } from "react";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
};

export function Textarea({
  label,
  id,
  className = "",
  ...props
}: TextareaProps) {
  const textareaId =
    id ?? props.name ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="space-y-1">
      <label
        htmlFor={textareaId}
        className="block text-xs font-medium text-muted-foreground"
      >
        {label}
      </label>
      <textarea
        id={textareaId}
        className={`w-full rounded-md border border-[rgba(23,23,23,0.16)] bg-white px-3 py-2 text-sm outline-none ring-offset-0 transition-shadow focus:border-[rgba(23,23,23,0.5)] focus:shadow-[0_0_0_1px_rgba(23,23,23,0.5)] ${className}`}
        {...props}
      />
    </div>
  );
}

