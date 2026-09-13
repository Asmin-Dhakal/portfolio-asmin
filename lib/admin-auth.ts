import { cookies } from "next/headers";

const COOKIE = "admin_auth";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function expectedToken(): string | null {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) return null;
  // simple hash: base64 of password length + password — not crypto, just avoids plaintext in cookie
  // For portfolio inquiries this is fine; use proper session if you scale.
  return Buffer.from(`v1:${pw}`).toString("base64");
}

export async function isAuthed(): Promise<boolean> {
  const token = expectedToken();
  if (!token) return false;
  const jar = await cookies();
  return jar.get(COOKIE)?.value === token;
}

export async function setAuthCookie() {
  const token = expectedToken();
  if (!token) throw new Error("ADMIN_PASSWORD not set");
  const jar = await cookies();
  jar.set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: MAX_AGE,
    path: "/",
  });
}

export async function clearAuthCookie() {
  const jar = await cookies();
  jar.delete(COOKIE);
}
