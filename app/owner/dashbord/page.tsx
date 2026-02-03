"use client";

import { OwnerCard } from "@/app/_components/ownerCard";
import { placetype } from "@/app/page";
import { useAuth } from "@/provider/authProvider";
import { UserButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
  console.log(clerkUser, "clerkshit");

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
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-blue-600">My Places</h1>
            <p className="text-sm text-gray-500">
              Manage your parking locations
            </p>
          </div>
          <div className="flex gap-5">
            <div className="text-xl text-blue-600 font-bold ">{user?.name}</div>
            <UserButton />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {myPlaces?.map((place) => (
            <div
              key={place.id}
              onClick={() => router.push(`/owner/dashbord/${place.id}`)}
              className="bg-white rounded-xl shadow-md border-2 border-blue-100 
                     cursor-pointer transition-all duration-300 overflow-hidden
                     hover:shadow-xl hover:-translate-y-2 hover:border-blue-300"
            >
              <OwnerCard place={place} />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {(!myPlaces || myPlaces.length === 0) && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🏢</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No places yet
            </h3>
            <p className="text-gray-500">
              Add your first parking location to get started
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
