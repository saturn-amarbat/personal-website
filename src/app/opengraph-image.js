import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "linear-gradient(130deg, #050913, #0f172a 60%, #083344)",
        color: "#e2e8f0",
        padding: "56px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          fontSize: 28,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#67e8f9",
        }}
      >
        Saturn Amarbat
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.05 }}>
          Software Engineer
        </div>
        <div style={{ fontSize: 34, color: "#cbd5e1", maxWidth: "900px" }}>
          Mobile-first apps and practical AI integrations
        </div>
      </div>
      <div style={{ fontSize: 26, color: "#94a3b8" }}>www.saturnmade.tech</div>
    </div>,
    {
      ...size,
    },
  );
}
