import React, { Dispatch, SetStateAction } from "react";
import { useDroppable } from "@dnd-kit/core";
import { DraggableSlot } from "./DraggableSlot";
import { ParkingSlot } from "./ParkingSlotTypes";

interface ParkingCanvasProps {
  slots: ParkingSlot[];
  setSelectedParkingId: Dispatch<SetStateAction<string | null>>;
  selectedParkingId: string | null;
}

export function ParkingCanvas({
  slots,
  setSelectedParkingId,
  selectedParkingId,
}: ParkingCanvasProps) {
  const { setNodeRef } = useDroppable({
    id: "canvas",
  });

  return (
    <div
      ref={setNodeRef}
      className="w-full h-full relative bg-[url('/grid.svg')] bg-repeat"
      style={{
        backgroundSize: "20px 20px",
        backgroundImage:
          "radial-gradient(circle, #26bd28ff 1px, transparent 1px)",
      }}
    >
      {slots.map((slot) => (
        <DraggableSlot
          key={slot.id}
          slot={slot}
          setSelectedParkingId={setSelectedParkingId}
          selectedParkingId={selectedParkingId}
        />
      ))}
    </div>
  );
}
