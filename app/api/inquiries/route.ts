import { prisma } from "@/lib/prisma";
import { z } from "zod";

const Schema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email().max(120),
  type: z.enum(["Website", "Mobile app", "Deploy", "Other"]),
  message: z.string().min(10).max(5000),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const data = Schema.parse(json);
    const inquiry = await prisma.inquiry.create({ data: { ...data, status: "new" } });
    return Response.json({ ok: true, id: inquiry.id }, { status: 201 });
  } catch (e: unknown) {
    if (e instanceof z.ZodError) {
      return Response.json({ ok: false, error: e.flatten() }, { status: 400 });
    }
    console.error(e);
    return Response.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
