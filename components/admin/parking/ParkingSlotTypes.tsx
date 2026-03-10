export type SlotStatus = "AVAILABLE" | "BOOKED" | "DISABLED";
export type SlotType = "CAR";

export interface ParkingSlot {
  id: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  status: SlotStatus;
  placeId: string;
}
