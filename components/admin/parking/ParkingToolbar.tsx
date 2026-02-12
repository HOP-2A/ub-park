import { Button } from "@/components/ui/button";
import { Car } from "lucide-react";
import { SlotType } from "./ParkingSlotTypes";

interface ParkingToolbarProps {
  onAddCheck: (type: SlotType) => void; 
}

export function ParkingToolbar({ onAddCheck }: ParkingToolbarProps) {
  return (
    <div className="w-64 bg-background border-r p-4 flex flex-col gap-4">
      <h3 className="font-semibold text-lg">Toolbar</h3>

      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Add Slot</p>
        <Button
          variant="outline"
          className="w-full justify-start gap-2"
          onClick={() => onAddCheck("CAR")}
        >
          <Car className="h-4 w-4" />
          Add Parking Slot
        </Button>
      </div>

      <div className="mt-auto">
        <p className="text-xs text-muted-foreground">
          Drag items on the canvas to move them.
        </p>
      </div>
    </div>
  );
}
