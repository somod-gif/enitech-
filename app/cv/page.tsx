import type { Metadata } from "next";
import { cookies } from "next/headers";
import { PasswordGate } from "@/features/cv/password-gate";
import { CVBuilder } from "@/features/cv/cv-builder";

export const metadata: Metadata = {
  title: "CV",
  robots: { index: false, follow: false },
};

export default async function CvPage() {
  const cookieStore = await cookies();
  const authed = cookieStore.get("cv_authed")?.value === "1";

  return authed ? <CVBuilder /> : <PasswordGate />;
}