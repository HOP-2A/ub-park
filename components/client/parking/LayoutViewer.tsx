"use client";

import React, { useEffect, useState } from "react";
import { getParkingLayout } from "@/app/actions/parkingExtensions"; // Reuse retrieval action
import { ParkingSlot } from "@/components/admin/parking/ParkingSlotTypes";
import { cn } from "@/lib/utils";
import { Car, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { bookParkingSlot } from "@/app/actions/bookingActions"; // We need to create this
import { toast } from "sonner";

export function LayoutViewer() {
  const [slots, setSlots] = useState<ParkingSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState<ParkingSlot | null>(null);
  const [isBooking, setIsBooking] = useState(false);

  const fetchLayout = async () => {
    setLoading(true);
    const data = await getParkingLayout();
    // @ts-expect-error - Prisma types vs UI types
    setSlots(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchLayout();
  }, []);

  const handleSlotClick = (slot: ParkingSlot) => {
    if (slot.status === "AVAILABLE") {
      setSelectedSlot(slot);
    }
  };

  const confirmBooking = async () => {
    if (!selectedSlot) return;
    setIsBooking(true);
    try {
      const result = await bookParkingSlot(selectedSlot.id);
      if (result.success) {
        toast.success("Spot booked successfully!");
        // Update local state to reflect change immediately
        setSlots((prev) =>
          prev.map((s) =>
            s.id === selectedSlot.id ? { ...s, status: "BOOKED" } : s,
          ),
        );
        setSelectedSlot(null);
      } else {
        toast.error(result.message || "Failed to book spot");
      }
    } catch {
      toast.error("An error occurred");
    } finally {
      setIsBooking(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="animate-spin h-8 w-8 text-primary" />
      </div>
    );
  }

  // Reuse similar slot rendering logic but static (non-draggable)
  return (
    <div className="w-full h-full relative bg-slate-50 overflow-auto">
      <div
        className="absolute inset-0"
        style={{
          backgroundSize: "20px 20px",
          backgroundImage: "radial-gradient(circle, #ddd 1px, transparent 1px)",
        }}
      >
        {slots.map((slot) => (
          <div
            key={slot.id}
            onClick={() => handleSlotClick(slot)}
            style={{
              left: slot.x,
              top: slot.y,
              width: slot.width,
              height: slot.height,
              transform: `rotate(${slot.rotation}deg)`,
            }}
            className={cn(
              "absolute rounded-md border-2 shadow-sm flex flex-col items-center justify-center p-1 select-none transition-all",
              slot.status === "AVAILABLE"
                ? "cursor-pointer hover:scale-105 hover:shadow-md"
                : "opacity-80",
              slot.status === "BOOKED" && "bg-red-100 border-red-300",
              slot.status === "AVAILABLE" &&
                "bg-white border-slate-300 hover:border-primary",
              slot.status === "DISABLED" && "bg-gray-200 border-gray-400",
            )}
          >
            <div className="absolute top-1 left-1/2 -translate-x-1/2">
              <Car className="h-4 w-4 text-slate-600" />
            </div>
            <span className="text-xs font-bold truncate max-w-full mt-4">
              {slot.label}
            </span>
          </div>
        ))}
      </div>

      <Dialog
        open={!!selectedSlot}
        onOpenChange={(open) => !open && setSelectedSlot(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Booking</DialogTitle>
            <DialogDescription>
              Are you sure you want to book{" "}
              <span className="font-bold text-primary">
                {selectedSlot?.label}
              </span>
              ?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedSlot(null)}>
              Cancel
            </Button>
            <Button onClick={confirmBooking} disabled={isBooking}>
              {isBooking && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Confirm Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
