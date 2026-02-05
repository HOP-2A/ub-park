"use server";

import prisma from "@/lib/prisma"; // Assuming standard Prism setup
import { ParkingSlot } from "@/components/admin/parking/ParkingSlotTypes";

export async function saveParkingLayout(slots: ParkingSlot[]) {
  if (!process.env.DATABASE_URL) {
    console.warn("No database URL, mock save");
    return { success: true };
  }

  try {
    // This is a simplified "replace all" strategy for the MVP.
    // In a real app, you might want to diff changes to preserve booking history if IDs match.
    // But since we are using uuids in the builder, let's try to upsert or just careful replacement.

    // Actually for this MVP, let's assume "Save" overwrites the layout configuration.
    // BUT we must be careful not to delete slots that have active bookings if we were checking that.
    // For now, simpler approach: Upsert each slot.

    // 1. Get existing slot IDs from input
    const incomingIds = slots.map(s => s.id);

    // 2. Delete slots not in the incoming list (optional, if we want to support deletion)
    // await prisma.parkingSlot.deleteMany({
    //     where: { id: { notIn: incomingIds } }
    // });

    // 3. Upsert each slot
    for (const slot of slots) {
      await prisma.parkingSlot.upsert({
        where: { id: slot.id },
        create: {
          id: slot.id,
          label: slot.label,
          x: slot.x,
          y: slot.y,
          width: slot.width,
          height: slot.height,
          rotation: slot.rotation,
          type: slot.type,
          status: slot.status
        },
        update: {
          label: slot.label,
          x: slot.x,
          y: slot.y,
          width: slot.width,
          height: slot.height,
          rotation: slot.rotation,
          type: slot.type,
          status: slot.status
        }
      });
    }

    return { success: true };
  } catch (error) {
    console.error("Failed to save layout:", error);
    return { success: false, error: "Failed to save layout" };
  }
}

export async function getParkingLayout() {
  try {
    const slots = await prisma.parkingSlot.findMany();
    return slots;
  } catch (error) {
    console.error("Failed to load layout:", error);
    return [];
  }
}
