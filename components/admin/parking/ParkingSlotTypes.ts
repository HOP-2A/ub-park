
export type SlotType = 'CAR';
export type SlotStatus = 'AVAILABLE' | 'BOOKED' | 'DISABLED';

export interface ParkingSlot {
  id: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  type: SlotType;
  status: SlotStatus;
}
