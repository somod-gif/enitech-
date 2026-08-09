import { ImageResponse } from "next/og";
import { SITE } from "@/lib/config";

export const alt = `${SITE.author} — ${SITE.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#1a1a1a",
          fontFamily: "sans-serif",
          padding: "64px 72px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 999,
              background: "#fafafa",
              color: "#1a1a1a",
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            E
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 22, color: "#e4e4e7", fontWeight: 600 }}>
              eniola.dev
            </span>
            <span style={{ fontSize: 14, color: "#71717a" }}>
              Software Engineer · Nigeria
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <span
            style={{
              fontSize: 64,
              color: "white",
              fontWeight: 700,
              letterSpacing: "-0.04em",
            }}
          >
            {SITE.author}
          </span>
          <span style={{ fontSize: 26, color: "#a1a1aa", lineHeight: 1.4 }}>
            Building scalable fintech systems, AI-powered products and modern
            SaaS applications.
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: 20,
            color: "#e4e4e7",
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#fafafa",
            }}
          />
          Available for internships, freelance & startup collaborations
        </div>

        <div
          style={{
            position: "absolute",
            top: "-25%",
            right: "-15%",
            width: 700,
            height: 700,
            borderRadius: 999,
            background:
              "radial-gradient(circle, rgba(255,255,255,0.14), rgba(255,255,255,0.05) 55%, transparent 70%)",
          }}
        />
      </div>
    ),
    { ...size },
  );
}