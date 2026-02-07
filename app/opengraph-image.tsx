import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "AWERE — We build systems, not just websites.";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a0e14 0%, #151f28 100%)",
          position: "relative",
        }}
      >
        {/* Grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "80px",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Logo/Wordmark */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "#e6edf3",
              letterSpacing: "-0.02em",
              marginBottom: 24,
            }}
          >
            AWERE
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 36,
              color: "#8b949e",
              textAlign: "center",
              maxWidth: 800,
              lineHeight: 1.4,
            }}
          >
            We build systems, not just websites.
          </div>

          {/* Accent line */}
          <div
            style={{
              marginTop: 40,
              width: 120,
              height: 3,
              background: "#00d9ff",
              borderRadius: 2,
            }}
          />

          {/* Stack badges */}
          <div
            style={{
              marginTop: 40,
              display: "flex",
              gap: 16,
              fontSize: 18,
              color: "#8b949e",
              fontFamily: "monospace",
            }}
          >
            <span>Next.js</span>
            <span>·</span>
            <span>TypeScript</span>
            <span>·</span>
            <span>Vercel</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
