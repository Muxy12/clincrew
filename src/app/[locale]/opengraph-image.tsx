import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "ClinCrew · Attaché de Recherche Clinique freelance";

// Embed the brand lockup (transparent PNG) as a data URI, read at build time.
const logoDataUri = `data:image/png;base64,${readFileSync(
  join(process.cwd(), "public", "images", "clincrew-logo.png"),
).toString("base64")}`;

const COPY = {
  fr: {
    eyebrow: "CRA FREELANCE · RECHERCHE CLINIQUE",
    role: "Attaché de Recherche Clinique",
    tagline: "Rigueur · Engagement · Flexibilité",
  },
  en: {
    eyebrow: "FREELANCE CRA · CLINICAL RESEARCH",
    role: "Clinical Research Associate",
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
        {/* Top: brand lockup */}
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoDataUri} width={281} height={76} alt="" />
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
