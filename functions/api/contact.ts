/**
 * Cloudflare Pages Function — POST /api/contact
 * Forwards submissions to Static Forms (https://www.staticforms.dev).
 * Set STATICFORMS_API_KEY in Pages → Settings → Variables (encrypted).
 */

interface ContactEnv {
  STATICFORMS_API_KEY?: string;
}

const STATICFORMS_SUBMIT = "https://api.staticforms.dev/submit";

const MAX_LEN = {
  short: 240,
  long: 8000,
} as const;

function clamp(s: unknown, max: number): string {
  if (typeof s !== "string") return "";
  return s.trim().slice(0, max);
}

function isValidEmail(email: string): boolean {
  if (email.length > 254) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function onRequestPost(context: {
  request: Request;
  env: ContactEnv;
}): Promise<Response> {
  const { request, env } = context;
  const apiKey = env.STATICFORMS_API_KEY?.trim();

  if (!apiKey) {
    return Response.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const trap = clamp(body._trap, 200);
  if (trap.length > 0) {
    return Response.json({ ok: true });
  }

  const form = clamp(body.form, 32);
  if (form !== "book" && form !== "general") {
    return Response.json({ ok: false, error: "invalid_form" }, { status: 400 });
  }

  const name = clamp(body.name, MAX_LEN.short);
  const email = clamp(body.email, MAX_LEN.short).toLowerCase();
  const message = clamp(body.message, MAX_LEN.long);

  if (!name || !email || !isValidEmail(email)) {
    return Response.json({ ok: false, error: "validation" }, { status: 400 });
  }

  if (form === "general" && !message) {
    return Response.json({ ok: false, error: "validation" }, { status: 400 });
  }

  const payload: Record<string, string> = {
    apiKey,
    replyTo: email,
    name,
    email,
    inquiry_type:
      form === "book"
        ? "Speaking / booking inquiry — caleclarke.com"
        : "General contact — caleclarke.com",
  };

  if (form === "book") {
    payload.organization = clamp(body.organization, MAX_LEN.short);
    payload.event_date = clamp(body.event_date, MAX_LEN.short);
    payload.location = clamp(body.location, MAX_LEN.short);
    payload.audience_and_format = clamp(body.audience_and_format, MAX_LEN.long);
    payload.message = message;
  } else {
    payload.message = message;
  }

  const res = await fetch(STATICFORMS_SUBMIT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (res.status === 429) {
    let detail = "";
    try {
      const j = (await res.json()) as { message?: string; error?: string };
      detail = (j.message || j.error || "").toString().slice(0, 200);
    } catch {
      /* ignore */
    }
    return Response.json(
      { ok: false, error: "rate_limited", detail },
      { status: 429 },
    );
  }

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    console.error("StaticForms error", res.status, errText.slice(0, 500));
    return Response.json({ ok: false, error: "send_failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
