import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";
import { rateLimit, pruneRateLimitBuckets } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const requestTypeLabels: Record<string, string> = {
  cro: "CRO",
  pharma: "Pharmaceutical company / Laboratoire pharmaceutique",
  biotech: "Biotechnology company / Société de biotechnologie",
  other: "Other / Autre",
};

function clientIp(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  pruneRateLimitBuckets();

  // --- Rate limiting (per instance; see lib/rate-limit.ts note) ----------
  const ip = clientIp(request);
  const limited = rateLimit(`contact:${ip}`, 5, 60 * 60 * 1000);
  if (!limited.success) {
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      { status: 429 },
    );
  }

  // --- Parse & validate --------------------------------------------------
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "validation" },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "validation" },
      { status: 400 },
    );
  }

  const data = parsed.data;

  // --- Honeypot: silently accept, do not deliver (bot traffic) -----------
  if (data.website && data.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  // --- Email provider configuration -------------------------------------
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !from || !to) {
    // Do NOT pretend the message was sent. Tell the client it is not set up.
    return NextResponse.json(
      { ok: false, error: "not_configured" },
      { status: 503 },
    );
  }

  // --- Deliver via Resend ------------------------------------------------
  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const company = data.company?.trim() || "—";
    const typeLabel = requestTypeLabels[data.requestType] ?? data.requestType;

    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: data.email,
      subject: `CRA website — ${typeLabel} — ${data.name}`,
      text: [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Company: ${company}`,
        `Request type: ${typeLabel}`,
        "",
        data.message,
      ].join("\n"),
      html: `
        <div style="font-family:system-ui,sans-serif;line-height:1.6;color:#0a2428">
          <h2 style="margin:0 0 16px">New contact request</h2>
          <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
          <p><strong>Company:</strong> ${escapeHtml(company)}</p>
          <p><strong>Request type:</strong> ${escapeHtml(typeLabel)}</p>
          <hr style="border:none;border-top:1px solid #ddd;margin:16px 0" />
          <p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { ok: false, error: "server" },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact send failed:", err);
    return NextResponse.json({ ok: false, error: "server" }, { status: 500 });
  }
}
