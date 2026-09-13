import { setAuthCookie } from "@/lib/admin-auth";

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  // very light rate limit is handled client-side; server just checks password
  const { password } = await req.json().catch(() => ({ password: "" }));
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return Response.json({ error: "Server not configured" }, { status: 500 });
  if (password !== expected) {
    console.warn(`[admin] failed login from ${ip}`);
    return Response.json({ error: "Wrong password" }, { status: 401 });
  }
  await setAuthCookie();
  return Response.json({ ok: true });
}
