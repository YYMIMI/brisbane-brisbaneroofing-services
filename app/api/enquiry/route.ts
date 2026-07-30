import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type EnquiryBody = Record<string, unknown>;

function clean(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value.replace(/\u0000/g, "").trim().slice(0, maxLength);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function findReplyEmail(value: string) {
  return value.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0];
}

export async function POST(request: Request) {
  let body: EnquiryBody;

  try {
    body = (await request.json()) as EnquiryBody;
  } catch {
    return NextResponse.json(
      { error: "Please check the form details and try again." },
      { status: 400 },
    );
  }

  // Honeypot submissions are acknowledged without sending an email.
  if (clean(body.website, 120)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, 120);
  const suburb = clean(body.suburb, 120);
  const roofType = clean(body.roofType, 120) || "Not sure";
  const urgency = clean(body.urgency, 160);
  const issue = clean(body.issue, 4000);
  const contact = clean(body.contact, 240);

  if (!suburb || !urgency || !issue || !contact) {
    return NextResponse.json(
      {
        error:
          "Please provide your suburb, urgency, problem details and phone or email.",
      },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const toEmail = (
    process.env.CONTACT_TO_EMAIL || process.env.ENQUIRY_TO_EMAIL
  )?.trim();
  const fromEmail = (
    process.env.CONTACT_FROM_EMAIL || process.env.ENQUIRY_FROM_EMAIL
  )?.trim();

  if (!apiKey || !toEmail || !fromEmail) {
    console.error("Roofing enquiry email configuration is incomplete.");
    return NextResponse.json(
      {
        error:
          "Online enquiries are temporarily unavailable. Please call 0413 650 514.",
      },
      { status: 503 },
    );
  }

  const subjectSuburb = suburb.replace(/[\r\n]+/g, " ");
  const replyEmail = findReplyEmail(contact);
  const text = [
    "New Brisbane roof or gutter service request",
    "",
    "Name: " + (name || "Not provided"),
    "Suburb: " + suburb,
    "Roof type: " + roofType,
    "Urgency: " + urgency,
    "Preferred contact: " + contact,
    "",
    "What is happening:",
    issue,
  ].join("\n");

  const html = `
    <h2>New Brisbane roof or gutter service request</h2>
    <table cellpadding="6" cellspacing="0" style="border-collapse:collapse">
      <tr><th align="left">Name</th><td>${escapeHtml(name || "Not provided")}</td></tr>
      <tr><th align="left">Suburb</th><td>${escapeHtml(suburb)}</td></tr>
      <tr><th align="left">Roof type</th><td>${escapeHtml(roofType)}</td></tr>
      <tr><th align="left">Urgency</th><td>${escapeHtml(urgency)}</td></tr>
      <tr><th align="left">Preferred contact</th><td>${escapeHtml(contact)}</td></tr>
    </table>
    <h3>What is happening</h3>
    <p style="white-space:pre-wrap">${escapeHtml(issue)}</p>
  `;

  const payload: Record<string, unknown> = {
    from: fromEmail,
    to: [toEmail],
    subject: "Brisbane roofing enquiry — " + subjectSuburb,
    text,
    html,
  };

  if (replyEmail) {
    payload.reply_to = replyEmail;
  }

  let providerResponse: Response;

  try {
    providerResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });
  } catch {
    console.error("Roofing enquiry could not reach the email provider.");
    return NextResponse.json(
      {
        error:
          "We could not send your request right now. Please call 0413 650 514.",
      },
      { status: 502 },
    );
  }

  if (!providerResponse.ok) {
    console.error(
      "Roofing enquiry email provider rejected the request with status " +
        providerResponse.status,
    );
    return NextResponse.json(
      {
        error:
          "We could not send your request right now. Please call 0413 650 514.",
      },
      { status: 502 },
    );
  }

  const result = (await providerResponse.json().catch(() => null)) as
    | { id?: string }
    | null;

  return NextResponse.json({ ok: true, id: result?.id ?? null });
}
