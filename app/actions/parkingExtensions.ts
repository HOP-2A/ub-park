"use server";

import prisma from "@/lib/db";
import { ParkingSlot } from "@/components/admin/parking/ParkingSlotTypes";

export async function saveParkingLayout(placeId: string, slots: ParkingSlot[]) {
  if (!process.env.DATABASE_URL) {
    console.warn("No database URL, mock save");
    return { success: true };
  }

  try {
    const incomingIds = slots.map((s) => s.id);

    // Delete slots that were removed in builder
    await prisma.parkingSpot.deleteMany({
      where: { placeId, id: { notIn: incomingIds } },
    });

    // Upsert all incoming slots
    await Promise.all(
      slots.map((slot) =>
        prisma.parkingSpot.upsert({
          where: { id: slot.id },
          create: {
            id: slot.id,
            label: slot.label,
            x: slot.x,
            y: slot.y,
            width: slot.width,
            height: slot.height,
            rotation: slot.rotation,
            status: slot.status,
            placeId,
          },
          update: {
            label: slot.label,
            x: slot.x,
            y: slot.y,
            width: slot.width,
            height: slot.height,
            rotation: slot.rotation,
            status: slot.status,
            placeId,
          },
        }),
      ),
    );

    return { success: true };
  } catch (error) {
    console.error("Failed to save layout:", error);
    return { success: false, error: "Failed to save layout" };
  }
}

export async function getParkingLayout(placeId: string) {
  try {
    return await prisma.parkingSpot.findMany({
      where: { placeId },
      orderBy: { createdAt: "asc" },
    });
  } catch (error) {
    console.error("Failed to load layout:", error);
    return [];
  }
}
