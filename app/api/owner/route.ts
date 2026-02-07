import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, address, city, latitude, longitude, ownerId } = body;

    if (!name || !address || !city || !ownerId) {
      return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
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
    // if (slot.length > 0) {
    //   await prisma.parkingSpot.createMany({
    //     data: slot.map((spot: any) => ({
    //       number: spot.number,
    //       pricePerHour: spot.pricePerHour,
    //       placeId: place.id,
    //     })),
    //   });
    // }

    return NextResponse.json(
      { message: "Parking lot created", placeId: place.id },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// || !Array.isArray(slot)
