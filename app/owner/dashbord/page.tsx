"use client";

import { OwnerCard } from "@/app/_components/OwnerCard";
import { placetype } from "@/app/page";
import { useAuth } from "@/provider/authProvider";
import { UserButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CirclePlus, MapPinHouse } from "lucide-react";

export type USER = {
  email: string;
  id: string;
  clerkId: string;
  name: string;
};

export default function Dashboard() {
  const { user: clerkUser, isLoaded } = useUser();
  const { user } = useAuth(clerkUser?.id);
  const router = useRouter();
  const [places, setPlaces] = useState<placetype[]>([]);

  useEffect(() => {
    const getplaces = async () => {
      const response = await fetch("/api/place");
      const data = await response.json();
      setPlaces(data.message);
    };
    getplaces();
  }, [isLoaded]);
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your places...</p>
        </div>
      </div>
    );
  }
  const myPlaces = places.filter((item) => item.ownerId === user?.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-blue-600">My Places</h1>
            <p className="text-sm text-gray-500">
              Manage your parking locations
            </p>
          </div>
          <UserButton />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Card */}
        {myPlaces && myPlaces.length > 0 && (
          <div className="mb-8 bg-white rounded-xl shadow-md border border-slate-200 p-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 
                            flex items-center justify-center shadow-lg"
                >
                  <span className="text-2xl font-bold text-white">
                    <MapPinHouse />
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Locations</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {myPlaces.length} {""}
                    Parking Spots
                  </p>
                </div>
              </div>
              <div onClick={() => router.push("/owner/createPlace")}>
                <button className="flex gap-4 border border-blue-100 p-3 rounded-xl font-semibold">
                  ADD PARKING <CirclePlus color="#2e50dc" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {myPlaces?.map((place, index) => (
            <div
              key={place.id}
              onClick={() => router.push(`/owner/dashbord/${place.id}`)}
              className="bg-white rounded-xl shadow-md border-2 border-slate-200 
                       cursor-pointer transition-all duration-300 overflow-hidden
                       hover:shadow-xl hover:-translate-y-2 hover:border-blue-300
                       animate-fadeIn"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <OwnerCard place={place} />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {(!myPlaces || myPlaces.length === 0) && (
          <div className="text-center py-20">
            <div
              className="w-24 h-24 mx-auto mb-6 rounded-full bg-blue-100 
                          flex items-center justify-center"
            >
              <span className="text-5xl">🏢</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              No places yet
            </h3>
            <p className="text-gray-500 mb-6">
              Add your first parking location to get started
            </p>
            <button
              className="bg-gradient-to-r from-blue-600 to-blue-500 text-white 
                             px-6 py-3 rounded-lg font-medium shadow-md hover:shadow-lg
                             transition-all duration-300"
            >
              Add New Place
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
