import React, { Dispatch, SetStateAction } from "react";
import { useDroppable } from "@dnd-kit/core";
import { DraggableSlot } from "./DraggableSlot";
import { ParkingSlot } from "./ParkingSlotTypes";

interface ParkingCanvasProps {
  slots: ParkingSlot[];
<<<<<<< HEAD
  setSelectedParkingId: Dispatch<SetStateAction<string | null>>;
  selectedParkingId: Dispatch<SetStateAction<string | null>>;
=======
  setSelectedSlotId: Dispatch<SetStateAction<string | null>>;
  selectedSlotId: Dispatch<SetStateAction<string | null>>;
>>>>>>> 7f7501f930fb33b517f34313170c012151e4c83e
}

export function ParkingCanvas({
  slots,
<<<<<<< HEAD
  setSelectedParkingId,
  selectedParkingId,
=======
  setSelectedSlotId,
  selectedSlotId,
>>>>>>> 7f7501f930fb33b517f34313170c012151e4c83e
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
<<<<<<< HEAD
          setSelectedParkingId={setSelectedParkingId}
          selectedParkingId={selectedParkingId}
=======
          setSelectedSlotId={setSelectedSlotId}
          selectedSlotId={selectedSlotId}
>>>>>>> 7f7501f930fb33b517f34313170c012151e4c83e
        />
      ))}
    </div>
  );
}
