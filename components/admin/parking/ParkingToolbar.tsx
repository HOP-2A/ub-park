import { Button } from "@/components/ui/button";
import { Car } from "lucide-react";
import { SlotType } from "./ParkingSlotTypes";

interface ParkingToolbarProps {
  onAddCheck: (type: SlotType) => void;
}

export function ParkingToolbar({ onAddCheck }: ParkingToolbarProps) {
  return (
    <div className="space-y-2">
      <Button
        variant="outline"
        className="w-full justify-start gap-2"
        onClick={() => onAddCheck("CAR")}>
        <Car className="h-4 w-4" />
        Add Parking Slot
      </Button>
    </div>
  );
}
