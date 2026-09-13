import { prisma } from "@/lib/prisma";
import { isAuthed } from "@/lib/admin-auth";

export async function GET() {
  if (!(await isAuthed())) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const inquiries = await prisma.inquiry.findMany({ orderBy: { createdAt: "desc" } });
  return Response.json({ inquiries });
}
