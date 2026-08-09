import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const expected = process.env.CV_PASSWORD;

  if (!expected) {
    return NextResponse.json(
      { ok: false, error: "CV_PASSWORD is not configured on the server." },
      { status: 500 },
    );
  }

  let body: { password?: string };
  try {
    body = (await request.json()) as { password?: string };
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const a = createHmac("sha256", "enitech-cv")
    .update(String(body.password ?? ""))
    .digest();
  const b = createHmac("sha256", "enitech-cv")
    .update(expected)
    .digest();

  if (a.length === b.length && timingSafeEqual(a, b)) {
    const response = NextResponse.json({ ok: true });
    response.cookies.set("cv_authed", "1", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
    return response;
  }

  return NextResponse.json({ ok: false, error: "Wrong password." }, { status: 401 });
}