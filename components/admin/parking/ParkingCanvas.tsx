import React, { Dispatch, SetStateAction } from "react";
import { useDroppable } from "@dnd-kit/core";
import { DraggableSlot } from "./DraggableSlot";
import { ParkingSlot } from "./ParkingSlotTypes";

interface ParkingCanvasProps {
  slots: ParkingSlot[];
  setSelectedSlotId: Dispatch<SetStateAction<string | null>>;
  selectedSlotId: Dispatch<SetStateAction<string | null>>;
}

export function ParkingCanvas({
  slots,
  setSelectedSlotId,
  selectedSlotId,
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
          setSelectedSlotId={setSelectedSlotId}
          selectedSlotId={selectedSlotId}
        />
      ))}
    </div>
  );
}
