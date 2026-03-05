import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ userId: string }> },
) {
  const { userId } = await context.params;
  const bookings = await prisma.booking.findMany({ where: { userId: userId } });

  return NextResponse.json({ message: bookings }, { status: 200 });
}
