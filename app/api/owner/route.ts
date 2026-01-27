import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      address,
      city,
      latitude,
      longitude,
      ownerId,
      spots,
    } = body;

    if (!name || !address || !city || !ownerId || !Array.isArray(spots)) {
      return NextResponse.json(
        { message: "Invalid payload" },
        { status: 400 }
      );
    }

    // 1️⃣ Create Place
    const place = await prisma.place.create({
      data: {
        name,
        address,
        city,
        latitude,
        longitude,
        ownerId,
      },
    });

    // 2️⃣ Bulk create parking spots
    if (spots.length > 0) {
      await prisma.parkingSpot.createMany({
        data: spots.map((spot: any) => ({
          number: spot.number,
          pricePerHour: spot.pricePerHour,
          placeId: place.id,
        })),
      });
    }

    return NextResponse.json(
      { message: "Parking lot created", placeId: place.id },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
