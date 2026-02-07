export function HeroArtifact() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30 dark:opacity-20">
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--border) 1px, transparent 1px),
            linear-gradient(to bottom, var(--border) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />
      
      {/* Accent glow */}
      <div
        className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full"
        style={{
          background: `radial-gradient(circle, var(--accent) 0%, transparent 70%)`,
          opacity: 0.08,
          filter: "blur(60px)",
        }}
      />
      
      {/* Noise-like dots pattern */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="dots"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="0.8" fill="currentColor" opacity="0.1" />
            <circle cx="12" cy="8" r="0.6" fill="currentColor" opacity="0.08" />
            <circle cx="7" cy="15" r="0.7" fill="currentColor" opacity="0.09" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
    </div>
  );
}
