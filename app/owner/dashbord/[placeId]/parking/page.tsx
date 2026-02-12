"use client";
import { ParkingBuilder } from "@/components/admin/parking/ParkingBuilder";
import { useParams } from "next/navigation";

export default function OwnerParkingPage() {
  const { placeId } = useParams();

  return (
    <div className="container mx-auto py-8 h-screen flex flex-col">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Parking Layout Builder</h1>
          <p className="text-muted-foreground">
            Design your parking lot layout by dragging and dropping slots.
          </p>
        </div>
      </div>
      <div className="flex-1 bg-background border rounded-lg overflow-hidden relative">
        <ParkingBuilder placeId={placeId} />
      </div>
    </div>
  );
}
