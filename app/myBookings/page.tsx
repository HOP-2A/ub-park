"use client";

import { useAuth } from "@/provider/authProvider";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Booking } from "../booking/[place]/page";

export default function Home() {
  const { user: clerkUser } = useUser();
  const { user } = useAuth(clerkUser?.id);
  const [myBookings, setMyBookings] = useState<Booking[]>([]);
  const userId = user?.id;

  useEffect(() => {
    if (!userId) return;

    const getbookings = async () => {
      try {
        const response = await fetch(`/api/booking/${userId}`);
        const data = await response.json();
        setMyBookings(data.message ?? []);
      } catch {
        setMyBookings([]);
      }
    };

    getbookings();
  }, [userId]);

  console.log(userId);
  console.log(myBookings);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {myBookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 border"
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold">
                {booking.parkingSpot?.place.name}
              </h2>
              <span
                className={`text-xs px-3 py-1 rounded-full font-medium ${
                  booking.status === "CONFIRMED"
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {booking.status}
              </span>
            </div>

            <p className="text-gray-500 text-sm mb-2">
              📍 {booking.parkingSpot?.place.city}
            </p>

            <div className="text-sm space-y-1">
              <p>
                🅿️ Spot:{" "}
                <span className="font-medium">
                  {booking.parkingSpot?.number}
                </span>
              </p>
              <p>
                ⏰ Start:{" "}
                <span className="font-medium">
                  {new Date(booking.startTime).toLocaleString()}
                </span>
              </p>
              <p>
                ⏰ End:{" "}
                <span className="font-medium">
                  {new Date(booking.endTime).toLocaleString()}
                </span>
              </p>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <span className="text-lg font-bold text-blue-600">
                ${booking.totalAmount}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
