import { business } from "../../site-data";

const MAX_BODY_BYTES = 16_000;

function json(body: Record<string, unknown>, status: number) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function clean(value: unknown, maxLength: number) {
  return typeof value === "string"
    ? value.replace(/\s+/g, " ").trim().slice(0, maxLength)
    : "";
}

function emailAddress(value: string): string | undefined {
  const trimmed = value.trim();
  const displayNameMatch = trimmed.match(/<\s*([^<>]+)\s*>$/);
  const candidate = (displayNameMatch?.[1] || trimmed).trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(candidate)
    ? candidate
    : undefined;
}

function validRecipients(value: string | undefined) {
  return (value || "")
    .split(",")
    .map((recipient) => emailAddress(recipient))
    .filter((recipient): recipient is string => Boolean(recipient));
}

function validDomain(value: string | undefined): string | undefined {
  const candidate = (value || "")
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^@/, "")
    .replace(/\/$/, "");

  return /^(?=.{1,253}$)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/.test(
    candidate,
  )
    ? candidate
    : undefined;
}

function senderFromEnvironment(): string | undefined {
  const configuredSender =
    process.env.CONTACT_FROM_EMAIL?.trim() ||
    process.env.ENQUIRY_FROM_EMAIL?.trim();
  const configuredAddress = configuredSender
    ? emailAddress(configuredSender)
    : undefined;
  const verifiedDomain = validDomain(process.env.RESEND_EMAIL_DOMAIN);

  if (configuredSender && configuredAddress && !/[\r\n]/.test(configuredSender)) {
    const configuredDomain = configuredAddress.split("@")[1]?.toLowerCase();
    if (!verifiedDomain || configuredDomain === verifiedDomain) {
      return configuredSender;
    }
  }

  if (verifiedDomain) {
    return `Mel One Maintenance <website@${verifiedDomain}>`;
  }

  return configuredAddress;
}

function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  const forwardedHost = request.headers
    .get("x-forwarded-host")
    ?.split(",")[0]
    ?.trim();
  const host = forwardedHost || request.headers.get("host");
  if (!host) return false;

  try {
    return new URL(origin).host.toLowerCase() === host.toLowerCase();
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return json(
      { ok: false, message: "This form must be submitted from this website." },
      403,
    );
  }

  if (!request.headers.get("content-type")?.includes("application/json")) {
    return json(
      { ok: false, message: "Please submit the website form and try again." },
      415,
    );
  }

  const declaredLength = Number(request.headers.get("content-length") || "0");
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    return json({ ok: false, message: "The enquiry is too large to send." }, 413);
  }

  let record: Record<string, unknown>;
  try {
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
      return json({ ok: false, message: "The enquiry is too large to send." }, 413);
    }
    const parsed: unknown = JSON.parse(rawBody);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new Error("Invalid request body");
    }
    record = parsed as Record<string, unknown>;
  } catch {
    return json(
      { ok: false, message: "We could not read the form. Please try again." },
      400,
    );
  }

  if (clean(record.website, 200)) {
    return json({ ok: true, message: "Thanks — your enquiry has been sent." }, 201);
  }

  const name = clean(record.name, 100);
  const suburb = clean(record.suburb, 100);
  const roofType = clean(record.roofType, 80);
  const urgency = clean(record.urgency, 100);
  const issue = clean(record.issue, 2500);
  const contact = clean(record.contact, 200);
  const howFound = clean(record.howFound, 80);

  if (!name || !suburb || !urgency || issue.length < 10 || !contact) {
    return json(
      {
        ok: false,
        message:
          "Please complete your name, suburb, urgency, contact detail and a short description.",
      },
      400,
    );
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = senderFromEnvironment();
  const recipients = validRecipients(
    process.env.CONTACT_TO_EMAIL || process.env.ENQUIRY_TO_EMAIL,
  );

  if (!apiKey || !from || recipients.length === 0) {
    console.error("Roofing enquiry email configuration is incomplete.");
    return json(
      {
        ok: false,
        message: `Online delivery is temporarily unavailable. Please call ${business.phone} or email ${business.email}.`,
      },
      503,
    );
  }

  const emailText = [
    `Name: ${name}`,
    `Suburb: ${suburb}`,
    `Roof type: ${roofType || "(not sure)"}`,
    `Urgency: ${urgency}`,
    `Preferred phone or email: ${contact}`,
    `How they found us: ${howFound || "(not provided)"}`,
    "",
    "What is happening:",
    issue,
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: recipients,
        ...(emailAddress(contact) ? { reply_to: emailAddress(contact) } : {}),
        subject: `New Brisbane roofing enquiry — ${suburb}`,
        text: emailText,
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      console.error("Resend rejected a Brisbane roofing enquiry.", response.status);
      return json(
        {
          ok: false,
          message: `We couldn't send the enquiry. Please call ${business.phone} or email ${business.email}.`,
        },
        502,
      );
    }
  } catch {
    console.error("Resend could not be reached for a Brisbane roofing enquiry.");
    return json(
      {
        ok: false,
        message: `We couldn't send the enquiry. Please call ${business.phone} or email ${business.email}.`,
      },
      502,
    );
  }

  return json(
    {
      ok: true,
      message:
        "Thanks — your roofing enquiry has been sent. The team will review it and contact you about the next step.",
    },
    201,
  );
}
