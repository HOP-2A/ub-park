import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ParkingSlot, SlotStatus } from "./ParkingSlotTypes";
import { RotateCcw, Trash2 } from "lucide-react";

interface SlotPropertiesProps {
  slot: ParkingSlot;
  onUpdate: (updates: Partial<ParkingSlot>) => void;
  onDelete: () => void;
}

export function SlotProperties({
  slot,
  onUpdate,
  onDelete,
}: SlotPropertiesProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <h3 className="font-semibold text-lg">Properties</h3>
        <Button variant="destructive" size="icon" onClick={onDelete}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="label">Label / ID</Label>
          <Input
            id="label"
            value={slot.label}
            onChange={(e) => onUpdate({ label: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Initial Status</Label>
          <Select
            value={slot.status}
            onValueChange={(value) => onUpdate({ status: value as SlotStatus })}
          >
            <SelectTrigger id="status">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AVAILABLE">Available</SelectItem>
              <SelectItem value="BOOKED">Booked</SelectItem>
              <SelectItem value="DISABLED">Disabled (Closed)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Rotation ({Math.round(slot.rotation)}°)</Label>
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5"
              onClick={() => onUpdate({ rotation: 0 })}
            >
              <RotateCcw className="h-3 w-3" />
            </Button>
          </div>
          <Slider
            value={[slot.rotation]}
            min={0}
            max={360}
            step={15}
            onValueChange={([val]) => onUpdate({ rotation: val })}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Width</Label>
            <Input
              type="number"
              value={slot.width}
              onChange={(e) => onUpdate({ width: Number(e.target.value) })}
            />
          </div>
          <div className="space-y-2">
            <Label>Height</Label>
            <Input
              type="number"
              value={slot.height}
              onChange={(e) => onUpdate({ height: Number(e.target.value) })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
