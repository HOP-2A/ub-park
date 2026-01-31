"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("@/components/LeafletMap"), {
  ssr: false,
});

type Parking = {
  id: string;
  number: string;
  pricePerHour: string;
  isAvailable: boolean;
};

type Place = {
  id: string;
  name: string;
  address: string;
  city: string;
  latitude: number;
  longitude: number;
  parkings: Parking[];
};

export default function Home() {
  const { push } = useRouter();
  const params = useParams();
  const placeId = params.placeId as string;

  const [place, setPlace] = useState<Place | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPlace = async () => {
      setLoading(true);
      const response = await fetch(
        `/api/place/${encodeURIComponent(placeId)}`,
        {
          cache: "no-store",
        }
      );
      const data = await response.json();

      const p = data.message;

      setPlace({
        ...p,
        latitude: Number(p.latitude),
        longitude: Number(p.longitude),
        parkings: (p.parkings ?? []).map((x: any) => ({
          ...x,
          isAvailable: Boolean(x.isAvailable),
        })),
      });

      setLoading(false);
    };

    if (placeId) getPlace();
  }, [placeId]);

  const availableCount = useMemo(() => {
    return place?.parkings.filter((p) => p.isAvailable).length ?? 0;
  }, [place]);

  if (loading) {
    return <div className="min-h-screen px-6 py-10">Loading...</div>;
  }

  if (!place) {
    return <div className="min-h-screen px-6 py-10">Place not found.</div>;
  }

  return (
    <div className="min-h-screen px-6 py-10">
      <h1 className="text-4xl font-extrabold text-center mb-8">{place.name}</h1>

      <div className="flex flex-col lg:flex-row gap-8 justify-center items-start">
        <div className="h-[500px] w-[600px]">
          <LeafletMap lat={place.latitude} lng={place.longitude} />
        </div>

        <div className="max-w-3xl bg-white rounded-2xl shadow-lg p-6 space-y-5">
          <div className="flex items-center gap-3">
            <span className="font-semibold">ADDRESS:</span>
            <span className="text-gray-700">{place.address}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-semibold">CITY:</span>
            <span className="text-gray-700">{place.city}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-semibold">NUMBER OF PARKINGLOTS:</span>
            <span className="text-gray-700">{place.parkings.length}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-semibold">AVAILABLE PARKINGLOTS:</span>
            <span className="text-gray-700">{availableCount}</span>
          </div>

          <Button
            onClick={() => push(`/booking/${placeId}`)}
            className="hover:translate-x-1 transition bg-blue-700"
          >
            RESERVE NOW
          </Button>
        </div>
      </div>
    </div>
  );
}
