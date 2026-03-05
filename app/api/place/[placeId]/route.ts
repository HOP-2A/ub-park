import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ placeId: string }> },
) {
  const { placeId } = await context.params;
  const place = await prisma.place.findUnique({
    where: { id: placeId },
    include: { parkings: true },
  });

  return NextResponse.json({ message: place }, { status: 200 });
}
