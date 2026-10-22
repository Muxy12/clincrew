import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Mohamed Debbah — Clinical Research Associate";

const COPY = {
  fr: {
    eyebrow: "SENIOR CRA FREELANCE · RECHERCHE CLINIQUE",
    role: "Senior Clinical Research Associate",
    tagline: "Rigueur · Engagement · Flexibilité",
  },
  en: {
    eyebrow: "SENIOR FREELANCE CRA · CLINICAL RESEARCH",
    role: "Senior Clinical Research Associate",
    tagline: "Precision · Commitment · Flexibility",
  },
} as const;

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const copy = COPY[locale === "en" ? "en" : "fr"];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "radial-gradient(ellipse at 72% 38%, #205f63 0%, #0d2029 38%, #07131b 72%)",
          color: "#eef3ef",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top row: monogram + wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              border: "2px solid #8fcfb8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#b6f4d7",
              fontSize: "22px",
              fontWeight: 700,
            }}
          >
            MD
          </div>
          <div
            style={{
              fontSize: "20px",
              fontWeight: 700,
              letterSpacing: "4px",
            }}
          >
            {siteConfig.name.toUpperCase()}
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              fontSize: "22px",
              letterSpacing: "6px",
              color: "#b6f4d7",
              fontWeight: 600,
            }}
          >
            {copy.eyebrow}
          </div>
          <div
            style={{
              fontSize: "72px",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-3px",
              maxWidth: "900px",
            }}
          >
            {copy.role}
          </div>
        </div>

        {/* Footer tagline */}
        <div
          style={{
            fontSize: "24px",
            color: "#9db0b5",
            letterSpacing: "1px",
          }}
        >
          {copy.tagline}
        </div>
      </div>
    ),
    { ...size },
  );
}
