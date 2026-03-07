import React, { Dispatch, SetStateAction } from "react";
import { useDraggable } from "@dnd-kit/core";
import { ParkingSlot } from "./ParkingSlotTypes";
import { cn } from "@/lib/utils";
import { Car } from "lucide-react";

interface DraggableSlotProps {
  slot: ParkingSlot;
  setSelectedParkingId: Dispatch<SetStateAction<string | null>>;
  selectedParkingId: Dispatch<SetStateAction<string | null>>;
}

export function DraggableSlot({
  slot,
  setSelectedParkingId,
  selectedParkingId,
}: DraggableSlotProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: slot.id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  const getColor = () => {
    switch (slot.status) {
      case "BOOKED":
        return "bg-red-100 border-red-300";
      case "DISABLED":
        return "bg-gray-200 border-gray-400 opacity-50";
      default:
        return "bg-white border-slate-300";
    }
  };

  const handleSelectParking = (slotId: string) => {
    setSelectedParkingId(slotId);
  };
  const selected = slot.id === selectedParkingId;

  return (
    <div
      onClick={() => handleSelectParking(slot.id)}
      ref={setNodeRef}
      style={{
        ...style,
        left: slot.x,
        top: slot.y,
        width: slot.width,
        height: slot.height,
        transform: `rotate(${slot.rotation}deg)`,
      }}
      className={cn(
        "absolute rounded-md border-2 shadow-sm cursor-move flex flex-col items-center justify-center p-1 select-none transition-colors hover:shadow-md",
        getColor(),
        selected && "border-2 border-blue-500",
      )}
      {...listeners}
      {...attributes}
    >
      <div className="absolute top-1 left-1/2 -translate-x-1/2">
        <Car className="h-4 w-4 text-slate-600" />
      </div>
      <span className="text-xs font-bold truncate max-w-full mt-4">
        {slot.label}
      </span>
    </div>
  );
}
