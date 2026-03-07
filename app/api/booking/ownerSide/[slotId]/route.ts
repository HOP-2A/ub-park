import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slotId: string }> },
) {
  const { slotId } = await context.params;
  const bookings = await prisma.booking.findMany({ where: { slotId: slotId } });

  return NextResponse.json({ message: bookings }, { status: 200 });
}
