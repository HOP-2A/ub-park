import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  _req: NextRequest,
  context: { params: Promise<{ clerkId: string }> },
) => {
  const { clerkId } = await context.params;
  console.log(clerkId);

  if (!clerkId) {
    return NextResponse.json({ error: "Missing clerkId" }, { status: 400 });
  }

  const dbUser = await prisma.user.findUnique({
    where: { clerkId },
  });
  console.log(dbUser, 'dbUSer')

  return Response.json(dbUser);
};
