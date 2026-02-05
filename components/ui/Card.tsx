import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`surface card-hover p-5 ${className}`}>
      {children}
    </div>
  );
}

