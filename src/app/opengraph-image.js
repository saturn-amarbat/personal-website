import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${profile.name} | ${profile.role}. UIC CS, expected ${profile.graduation}.`;

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#101111",
        color: "#f4f1eb",
        padding: "64px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 24,
          color: "#c2c0ba",
        }}
      >
        <span>SOFTWARE ENGINEERING</span>
        <span>{profile.location.toUpperCase()}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ fontSize: 88, letterSpacing: "-0.05em" }}>
          {profile.name}
        </div>
        <div style={{ fontSize: 32 }}>{profile.role}</div>
        <div style={{ fontSize: 26, color: "#c2c0ba" }}>
          {`UIC Computer Science · Expected ${profile.graduation}`}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: "1px solid #383a39",
          paddingTop: 24,
          fontSize: 22,
          color: "#efae86",
        }}
      >
        <span>saturnmade.tech</span>
        <span>
          {profile.internshipTarget} internships / {profile.newGradTarget}{" "}
          new-grad roles
        </span>
      </div>
    </div>,
    size,
  );
}
