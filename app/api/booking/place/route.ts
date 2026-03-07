import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const allBookings = await prisma.booking.findMany({
      include: { slot: true },
    });
    return NextResponse.json(allBookings, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch bookings" },
      { status: 500 },
    );
  }
}
