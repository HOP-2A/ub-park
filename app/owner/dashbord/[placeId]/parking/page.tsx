"use client";
import { ParkingSidebar } from "@/app/_components/ParkingSideBar";
import { ParkingBuilder } from "@/components/admin/parking/ParkingBuilder";
import { useParams } from "next/navigation";

export default function OwnerParkingPage() {
  const { placeId } = useParams();

  return (
    <div className="container  h-screen flex ">
      <ParkingSidebar placeId={placeId} />
      <div className="flex-1 bg-background border rounded-lg overflow-hidden relative">
        <ParkingBuilder placeId={placeId} />
      </div>
    </div>
  );
}
