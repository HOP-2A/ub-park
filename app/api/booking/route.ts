import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req: Request) {
  const body = await req.json();
  const { userId, slotId, startTime, endTime } = body;

  if (!userId || !slotId || !startTime || !endTime) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const spot = await prisma.parkingSpot.findUnique({
    where: { id: slotId },
  });

  if (!spot) {
    return NextResponse.json({ error: "Spot unavailable" }, { status: 400 });
  }

  const start = new Date(startTime);
  const end = new Date(endTime);

  // overlap check
  const overlap = await prisma.booking.findFirst({
    where: {
      slotId,
      status: { in: ["PENDING", "CONFIRMED"] },
      NOT: {
        OR: [{ endTime: { lte: start } }, { startTime: { gte: end } }],
      },
    },
  });

  if (overlap) {
    return NextResponse.json({ error: "Already booked" }, { status: 409 });
  }

  const hours = (end.getTime() - start.getTime()) / 36e5;
  if (hours <= 0) {
    return NextResponse.json({ error: "Invalid time" }, { status: 400 });
  }

  const booking = await prisma.booking.create({
    data: {
      userId,
      slotId,
      startTime: start,
      endTime: end,
      // totalPrice: hours * spot.pricePerHour
    },
  });

  return NextResponse.json(booking);
}
export async function GET() {
  try {
    const allBookings = await prisma.booking.findMany();
    return NextResponse.json(allBookings, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch bookings" },
      { status: 500 },
    );
  }
}
