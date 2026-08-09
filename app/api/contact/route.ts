import { NextResponse } from "next/server";
import { SITE } from "@/lib/config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

function jsonError(message: string, status: number) {
  return NextResponse.json({ ok: false, error: message }, { status });
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const from =
    process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

  if (!apiKey) {
    return jsonError(
      "Resend isn't configured yet — add RESEND_API_KEY to enable the contact form.",
      501,
    );
  }

  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return jsonError("Invalid request body.", 400);
  }

  const name = payload.name?.trim() ?? "";
  const email = payload.email?.trim() ?? "";
  const subject = payload.subject?.trim() ?? "";
  const message = payload.message?.trim() ?? "";

  if (!name || !email || !EMAIL_PATTERN.test(email) || !subject) {
    return jsonError("Please fill in all required fields with valid values.", 400);
  }
  if (message.length < 10) {
    return jsonError("Message must be at least 10 characters long.", 400);
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `Enitech contact <${from}>`,
        to: [SITE.email],
        reply_to: email,
        subject: `[Portfolio] ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
        html: [
          `<p><strong>Name:</strong> ${name.replace(/</g, "&lt;")}</p>`,
          `<p><strong>Email:</strong> <a href="mailto:${email.replace(/</g, "&lt;")}">${email.replace(/</g, "&lt;")}</a></p>`,
          `<p><strong>Subject:</strong> ${subject.replace(/</g, "&lt;")}</p>`,
          `<hr />`,
          `<p style="white-space:pre-wrap">${message.replace(/</g, "&lt;")}</p>`,
        ].join("\n"),
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      console.error("Resend API error:", response.status, body);
      return jsonError("Email service returned an error. Try again in a moment.", 502);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to send contact email:", error);
    return jsonError("Failed to send the message. Try again in a moment.", 500);
  }
}