import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export function Button({ children, className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-4 py-2 text-xs font-medium tracking-wide text-white shadow-sm transition-all hover:shadow-md active:scale-[0.98] ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

