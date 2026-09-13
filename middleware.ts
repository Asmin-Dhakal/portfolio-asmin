import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("admin_auth")?.value;
  const expected = process.env.ADMIN_PASSWORD
    ? Buffer.from(`v1:${process.env.ADMIN_PASSWORD}`).toString("base64")
    : null;

  const isAuthed = !!expected && token === expected;
  const isLogin = req.nextUrl.pathname === "/admin/login";

  if (!isAuthed && !isLogin) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }
  if (isAuthed && isLogin) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
