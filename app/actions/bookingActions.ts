"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function bookParkingSlot(
  slotId: string,
  userId: string = "guest",
) {
  if (!process.env.DATABASE_URL) {
    return { success: true, message: "Mock booked!" }; // Mock fallback
  }

  try {
    // 1. Transaction to prevent race conditions
    const result = await prisma.$transaction(async (tx) => {
      // Check if slot is still available
      const slot = await tx.parkingSpot.findUnique({
        where: { id: slotId },
      });

      if (!slot || slot.status !== "AVAILABLE") {
        throw new Error("Slot is no longer available");
      }

      // Update slot status
      const updatedSlot = await tx.parkingSpot.update({
        where: { id: slotId },
        data: { status: "BOOKED" },
      });

      // Create booking record
      await tx.booking.create({
        data: {
          userId: userId, // In real app, get from auth()
          slotId: slotId,
          startTime: new Date(),
          status: "ACTIVE",
        },
      });

      return updatedSlot;
    });

    revalidatePath("/parking");
    revalidatePath("/admin/parking");
    return { success: true, message: "Booked successfully", slot: result };
  } catch (error: any) {
    console.error("Booking error:", error);
    return { success: false, message: error.message || "Failed to book slot" };
  }
}
