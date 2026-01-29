import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req: Request) {
  const body = await req.json();
  const { userId, parkingSpotId, startTime, endTime } = body;

  if (!userId || !parkingSpotId || !startTime || !endTime) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const spot = await prisma.parkingSpot.findUnique({
    where: { id: parkingSpotId }
  });

  if (!spot || !spot.isAvailable) {
    return NextResponse.json({ error: "Spot unavailable" }, { status: 400 });
  }

  const start = new Date(startTime);
  const end = new Date(endTime);

  // overlap check
  const overlap = await prisma.booking.findFirst({
    where: {
      parkingSpotId,
      status: { in: ["PENDING", "CONFIRMED"] },
      NOT: {
        OR: [
          { endTime: { lte: start } },
          { startTime: { gte: end } }
        ]
      }
    }
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
      parkingSpotId,
      startTime: start,
      endTime: end,
      totalPrice: hours * spot.pricePerHour
    }
  });

  return NextResponse.json(booking);
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  const bookings = await prisma.booking.findMany({
    where: userId ? { userId } : undefined,
    include: {
      parkingSpot: {
        include: { place: true }
      }
    },
    orderBy: { createdAt: "desc" }
  });

  return NextResponse.json(bookings);
}
