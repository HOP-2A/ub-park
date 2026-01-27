import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const AllPlaces = await prisma.place.findMany({
    include: { parkings: true },
  });
  return NextResponse.json({ message: AllPlaces }, { status: 200 });
}
