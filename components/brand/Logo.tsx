import Image from "next/image";

type LogoVariant = "mark" | "lockup";
type LogoSize = "sm" | "md" | "lg";

type LogoProps = {
  variant?: LogoVariant;
  size?: LogoSize;
  className?: string;
};

const sizeMap = {
  sm: 24,
  md: 32,
  lg: 48,
};

export function Logo({ variant = "mark", size = "md", className = "" }: LogoProps) {
  const height = sizeMap[size];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Image
        src="/brand/logo.svg"
        alt="AWERE"
        width={height}
        height={height}
        className="object-contain"
        priority
      />
      {variant === "lockup" && (
        <span className="font-semibold tracking-tight text-[var(--text)]">
          AWERE
        </span>
      )}
    </div>
  );
}
