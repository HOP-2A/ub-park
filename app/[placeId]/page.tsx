"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
type parkingsType = {
  id: string;
  number: string;
  pricePerHour: string;
  isAvailable: string;
};
type placetype = {
  id: string;
  name: string;
  address: string;
  city: string;
  latitude: string;
  longitude: string;
  parkings: parkingsType[];
};

export default function Home() {
  const router = useRouter();
  const [places, setPlaces] = useState<placetype>();
  const params = useParams();
  const place = params.placeId as string;
  useEffect(() => {
    const getplaces = async () => {
      const response = await fetch(`/api/place/${place}`);
      const data = await response.json();
      setPlaces(data.message);
    };
    getplaces();
  }, []);
  const trueaa = places?.parkings.filter((park) => park.isAvailable);
  return (
    <div className="min-h-screen  px-6 py-10">
      <h1 className="text-4xl font-extrabold text-center  mb-8">
        {places?.name}
      </h1>

      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6 space-y-5">
        <div className="flex items-center gap-3">
          <span className="font-semibold "> ADDRESS:</span>
          <span className="text-gray-700">{places?.address}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-semibold "> CITY:</span>
          <span className="text-gray-700">{places?.city}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-semibold "> NUMBER OF PARKINGLOTS:</span>
          <span className="text-gray-700">{places?.parkings.length}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-semibold "> AVAILABLE PARKINGLOTS:</span>
          <span className="text-gray-700">{trueaa?.length}</span>
        </div>
      </div>

      <Button>START BOOKING</Button>
    </div>
  );
}
