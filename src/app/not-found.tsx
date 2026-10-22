import Link from "next/link";

// Global fallback for paths outside the [locale] segment. It renders its own
// document because there is no shared root layout above it.
export default function GlobalNotFound() {
  return (
    <html lang="fr">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
          background: "#07131b",
          color: "#eef3ef",
          fontFamily: "system-ui, sans-serif",
          textAlign: "center",
          padding: "24px",
        }}
      >
        <p
          style={{
            fontFamily: "monospace",
            letterSpacing: "0.2em",
            color: "#b6f4d7",
            fontSize: "13px",
          }}
        >
          404
        </p>
        <h1 style={{ fontSize: "32px", fontWeight: 800, margin: 0 }}>
          Page introuvable · Page not found
        </h1>
        <Link
          href="/fr"
          style={{
            marginTop: "8px",
            display: "inline-block",
            borderRadius: "999px",
            background: "#b6f4d7",
            color: "#06231e",
            padding: "14px 24px",
            fontWeight: 700,
            textDecoration: "none",
            fontSize: "14px",
          }}
        >
          Retour à l&apos;accueil / Back home
        </Link>
      </body>
    </html>
  );
}
