//parking slots create
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ placeId: string }> },
) {
  const { placeId } = await context.params;
  const place = await prisma.place.findUnique({
    where: { id: placeId },
  });
}
