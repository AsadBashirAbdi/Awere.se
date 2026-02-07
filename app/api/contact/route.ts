import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

// Rate limiting (in-memory, best-effort on serverless)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

function getRateLimitKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";
  return ip;
}

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(key);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }

  record.count++;
  return true;
}

// Clean up old entries periodically (simple garbage collection)
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of rateLimitMap.entries()) {
    if (now > record.resetAt) {
      rateLimitMap.delete(key);
    }
  }
}, 5 * 60 * 1000); // Every 5 minutes

type ContactPayload = {
  name: string;
  email: string;
  message: string;
  projectType?: string;
  budgetRange?: string;
  company?: string;
  website?: string;
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

  // Required fields
  if (
    !payload.name ||
    typeof payload.name !== "string" ||
    payload.name.trim().length < 2 ||
    payload.name.length > 120
  ) {
    return { valid: false, error: "Invalid name (2-120 characters required)" };
  }

  if (
    !payload.email ||
    typeof payload.email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email) ||
    payload.email.length < 5 ||
    payload.email.length > 254
  ) {
    return { valid: false, error: "Invalid email address" };
  }

  if (
    !payload.message ||
    typeof payload.message !== "string" ||
    payload.message.trim().length < 20 ||
    payload.message.length > 4000
  ) {
    return {
      valid: false,
      error: "Invalid message (20-4000 characters required)",
    };
  }

  return {
    valid: true,
    payload: {
      name: payload.name.trim(),
      email: payload.email.trim(),
      message: payload.message.trim(),
      projectType: payload.projectType,
      budgetRange: payload.budgetRange,
      company: payload.company,
      website: payload.website,
    },
  };
}

export async function POST(request: Request) {
  try {
    // Rate limiting
    const rateLimitKey = getRateLimitKey(request);
    if (!checkRateLimit(rateLimitKey)) {
      return NextResponse.json(
        { ok: false, error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const validation = validatePayload(body);

    if (!validation.valid) {
      return NextResponse.json(
        { ok: false, error: validation.error },
        { status: 400 }
      );
    }

    const payload = validation.payload!;

    // Environment variables
    const SMTP_HOST = process.env.SMTP_HOST || "mailcluster.loopia.se";
    const SMTP_PORT = parseInt(process.env.SMTP_PORT || "465", 10);
    const SMTP_USER = process.env.SMTP_USER || process.env.CONTACT_FROM_EMAIL;
    const SMTP_PASS = process.env.SMTP_PASS;
    const CONTACT_FROM_EMAIL = process.env.CONTACT_FROM_EMAIL;
    const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL;

    if (!SMTP_USER || !SMTP_PASS || !CONTACT_FROM_EMAIL || !CONTACT_TO_EMAIL) {
      console.error("Missing required SMTP environment variables");
      return NextResponse.json(
        { ok: false, error: "Email service not configured" },
        { status: 500 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465, // true for 465, false for 587
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
      logger: false, // Don't log credentials
      debug: false,
    });

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

    // Send email
    await transporter.sendMail({
      from: `AWERE <${CONTACT_FROM_EMAIL}>`,
      to: CONTACT_TO_EMAIL,
      replyTo: payload.email,
      subject: `AWERE contact — ${payload.name}`,
      text: textBody,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    // Log error without exposing sensitive details
    console.error("Contact form error:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json(
      { ok: false, error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
