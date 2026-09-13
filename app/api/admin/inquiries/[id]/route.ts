import { prisma } from "@/lib/prisma";
import { isAuthed } from "@/lib/admin-auth";
import { z } from "zod";

const Body = z.object({ status: z.enum(["new", "read", "replied"]) });

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthed())) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const json = await req.json();
  const { status } = Body.parse(json);
  const inquiry = await prisma.inquiry.update({ where: { id }, data: { status } });
  return Response.json({ inquiry });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthed())) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  await prisma.inquiry.delete({ where: { id } });
  return Response.json({ ok: true });
}
