import { LayoutViewer } from "@/components/client/parking/LayoutViewer";

export default function ParkingPage() {
  return (
    <div className="container mx-auto py-8 min-h-screen flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Book a Parking Slot</h1>
        <p className="text-muted-foreground">
          Select an available slot (Green) to book your spot.
        </p>
      </div>
      <div className="flex-1 border rounded-lg overflow-hidden relative shadow-sm h-[600px]">
        <LayoutViewer />
      </div>
    </div>
  );
}