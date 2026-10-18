import { ImageResponse } from "next/og";
import { SITE } from "@/lib/config";

export const alt = `${SITE.name} — ${SITE.role}`;
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
          backgroundColor: "#08090b",
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
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
              borderRadius: 12,
              background: "#ccff00",
              color: "#000000",
              fontSize: 28,
              fontWeight: 800,
            }}
          >
            E
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: 22,
                color: "#f4f6f8",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              ENITECH
            </span>
            <span style={{ fontSize: 14, color: "#8b93a1" }}>
              Engineering Studio · Business Software Solutions
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <span
            style={{
              fontSize: 62,
              color: "#f4f6f8",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.1,
            }}
          >
            Software that moves
          </span>
          <span
            style={{
              fontSize: 62,
              color: "#ccff00",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.1,
            }}
          >
            businesses forward.
          </span>
          <span style={{ fontSize: 24, color: "#8b93a1", lineHeight: 1.4 }}>
            Business software · E-commerce · Inventory systems · AI automation
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: 20,
            color: "#f4f6f8",
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#ccff00",
            }}
          />
          Projects from NGN 50,000 · Nigeria &amp; worldwide
        </div>
      </div>
    ),
    { ...size },
  );
}
