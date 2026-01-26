import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ clerkId: string }> },
) {
  const { clerkId } = context.params;
  if (!clerkId) {
    return NextResponse.json(
      { message: "clerkUser notfound" },
      { status: 404 },
    );
  } else {
    const dbUser = await prisma.user.findUnique({ where: { clerkId } });
    return NextResponse.json({ message: dbUser });
  }
}
