import { Resend } from "resend";
import { NextResponse } from "next/server";

let resendInstance: Resend | null = null;

function getResend() {
  if (!resendInstance) {
    resendInstance = new Resend(process.env.RESEND_API_KEY);
  }
  return resendInstance;
}

const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || "contact@awere.se";
const CONTACT_FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL || "hello@awere.se";
const CONTACT_SUBJECT_PREFIX = process.env.CONTACT_SUBJECT_PREFIX || "AWERE";

type ContactPayload = {
  name: string;
  email: string;
  projectType?: string;
  budgetRange?: string;
  message: string;
  company?: string;
  website?: string;
  hp?: string;
  clientTs?: number;
};

function validatePayload(data: unknown): {
  valid: boolean;
  error?: string;
  payload?: ContactPayload;
} {
  if (!data || typeof data !== "object") {
    return { valid: false, error: "Invalid payload" };
  }

  const payload = data as Partial<ContactPayload>;

  // Honeypot check
  if (payload.hp && payload.hp.trim() !== "") {
    // Silent drop (return success to avoid spam probing)
    return { valid: false, error: "spam" };
  }

  // Timing check
  if (payload.clientTs) {
    const now = Date.now();
    const diff = now - payload.clientTs;
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours
    const minAge = 2000; // 2 seconds

    if (diff > maxAge || diff < minAge) {
      // Silent drop
      return { valid: false, error: "spam" };
    }
  }

  // Required fields
  if (
    !payload.name ||
    typeof payload.name !== "string" ||
    payload.name.length < 2 ||
    payload.name.length > 80
  ) {
    return { valid: false, error: "Invalid name (2-80 characters required)" };
  }

  if (
    !payload.email ||
    typeof payload.email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email) ||
    payload.email.length < 5 ||
    payload.email.length > 120
  ) {
    return { valid: false, error: "Invalid email address" };
  }

  if (
    !payload.message ||
    typeof payload.message !== "string" ||
    payload.message.length < 20 ||
    payload.message.length > 4000
  ) {
    return {
      valid: false,
      error: "Invalid message (20-4000 characters required)",
    };
  }

  // Optional fields
  if (
    payload.projectType &&
    (typeof payload.projectType !== "string" || payload.projectType.length > 60)
  ) {
    return { valid: false, error: "Invalid project type" };
  }

  if (
    payload.budgetRange &&
    (typeof payload.budgetRange !== "string" || payload.budgetRange.length > 60)
  ) {
    return { valid: false, error: "Invalid budget range" };
  }

  if (
    payload.company &&
    (typeof payload.company !== "string" || payload.company.length > 120)
  ) {
    return { valid: false, error: "Invalid company" };
  }

  if (
    payload.website &&
    (typeof payload.website !== "string" || payload.website.length > 200)
  ) {
    return { valid: false, error: "Invalid website" };
  }

  return {
    valid: true,
    payload: {
      name: payload.name,
      email: payload.email,
      message: payload.message,
      projectType: payload.projectType,
      budgetRange: payload.budgetRange,
      company: payload.company,
      website: payload.website,
      hp: payload.hp,
      clientTs: payload.clientTs,
    },
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = validatePayload(body);

    if (!validation.valid) {
      // Silent drop for spam
      if (validation.error === "spam") {
        return NextResponse.json({ ok: true });
      }
      return NextResponse.json(
        { ok: false, error: validation.error },
        { status: 400 }
      );
    }

    const payload = validation.payload!;

    // Build email body
    const textBody = `
New Contact Form Submission from AWERE

---
NAME: ${payload.name}
EMAIL: ${payload.email}
${payload.company ? `COMPANY: ${payload.company}` : ""}
${payload.website ? `WEBSITE: ${payload.website}` : ""}
${payload.projectType ? `PROJECT TYPE: ${payload.projectType}` : ""}
${payload.budgetRange ? `BUDGET RANGE: ${payload.budgetRange}` : ""}

MESSAGE:
${payload.message}

---
Sent via awere.se/contact
Timestamp: ${new Date().toISOString()}
`.trim();

    const subject = `${CONTACT_SUBJECT_PREFIX}: ${payload.projectType || "New inquiry"} — ${payload.name}`;

    const resend = getResend();
    const result = await resend.emails.send({
      from: CONTACT_FROM_EMAIL,
      to: CONTACT_TO_EMAIL,
      subject,
      text: textBody,
    });

    if (result.error) {
      console.error("Resend error:", result.error);
      return NextResponse.json(
        { ok: false, error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { ok: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
