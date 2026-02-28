"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  SquareParking,
  CheckCircle2,
  ParkingCircle,
  ArrowRight,
} from "lucide-react";
import { Calendar } from "@/components/calendar/page";
import { ParkingCanvas } from "@/components/admin/parking/ParkingCanvas";
import { getParkingLayout } from "@/app/actions/parkingExtensions";
import { ParkingSlot } from "@/components/admin/parking/ParkingSlotTypes";

type Booking = {
  id: string;
  startTime: string;
  endTime: string;
  totalPrice: number;
  status: string;
  parkingSpot: {
    id: string;
    number: string;
    place: { name: string; city: string };
  };
};

type Parking = {
  id: string;
  number: string;
  pricePerHour: string;
  isAvailable: boolean;
};

type Place = {
  id: string;
  name: string;
  city: string;
  parkings?: Parking[];
};

export type parkingSpot = {
  id: string;
  name: string;
  number: string;
  pricePerHour: string;
  isAvailable: boolean;
};

export default function BookingPage() {
  const params = useParams<{ place: string }>();
  const placeId = params.place;

  const USER_ID = "QM9qpIUylTc1dYCJC0YZT";

  const [place, setPlace] = useState<Place | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedParkingId, setSelectedParkingId] = useState<string | null>(
    null,
  );
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [slots, setSlots] = useState<ParkingSlot[]>([]);

  useEffect(() => {
    fetch(`/api/place/${placeId}`)
      .then((res) => res.json())
      .then((data) => setPlace(data.message ?? null));

    fetch(`/api/booking`)
      .then((res) => res.json())
      .then(setBookings);
  }, [placeId]);

  const parkings = Array.isArray(place?.parkings) ? place!.parkings : [];

  // Inside BookingPage
  const isSpotAvailable = (parkingId: string) => {
    if (!startTime || !endTime) return true; // if no time selected, all spots available
    const start = new Date(startTime).getTime();
    const end = new Date(endTime).getTime();

    // Check for any overlapping booking
    return !bookings.some((b) => {
      if (b.parkingSpot.id !== parkingId) return false;
      const s = new Date(b.startTime).getTime();
      const e = new Date(b.endTime).getTime();
      return start < e && end > s;
    });
  };

  const slotsWithAvailability = slots.map((slot) => ({
    ...slot,
    isAvailable: isSpotAvailable(slot.id), // dynamically computed
  }));

  const getBookedTimes = async () => {
    const res = await fetch(`/api/booking`);
    setBookings(await res.json());
    setLoading(false);
  };
  const createBooking = async () => {
    if (!selectedParkingId || !startTime || !endTime) {
      alert("Select time and parking spot");
      return;
    }
    setLoading(true);
    await fetch("/api/booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: USER_ID,
        slotId: selectedParkingId,
        startTime,
        endTime,
      }),
    });
  };

  const totalCount = parkings.length;
  const availableCount = parkings.filter((p) => p.id).length;
  const availabilityPct =
    totalCount > 0 ? Math.round((availableCount / totalCount) * 100) : 0;

  useEffect(() => {
    const load = async () => {
      const loadedSlots = await getParkingLayout(placeId);
      if (loadedSlots && loadedSlots.length > 0) {
        setSlots(loadedSlots);
      }
    };
    load();
    getBookedTimes();
  }, [placeId]);

  console.log(selectedParkingId, "gg");
  console.log(bookings);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl space-y-6">
        {/* Header */}
        <div className="text-center animate-[fadeIn_0.6s_ease-out]">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-sky-500 rounded-2xl mb-6 shadow-xl shadow-blue-200 animate-[float_3s_ease-in-out_infinite]">
            <SquareParking className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-slate-900 mb-3 tracking-tight">
            {place?.name ?? "Loading..."}
          </h1>
          <p className="text-slate-500 text-lg">
            Select your time and reserve a parking spot
          </p>
        </div>

        {/* Time pickers + booking cards */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Booking + Calendar */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-xl border border-blue-100 animate-[slideUp_0.8s_ease-out] space-y-6">
            {/* Calendar */}
            <div className="grid grid-cols-2 gap-4">
              <Calendar
                label="Start"
                value={startTime}
                onChange={setStartTime}
              />
              <Calendar label="End" value={endTime} onChange={setEndTime} />
            </div>
            <div>
              {" "}
              <ParkingCanvas
                slots={slotsWithAvailability}
                setSelectedParkingId={setSelectedParkingId}
                selectedParkingId={selectedParkingId}
              />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 h-[300px]">
              {/* {parkings.map((p) => {
                const available = isSpotAvailable(p.id);
                const bookedTimes = getBookedTimes(p.id);

                return (
                  <div
                    key={p.id}
                    className={`border rounded-2xl p-4 flex flex-col justify-between ${
                      selectedParkingId === p.id
                        ? "bg-green-50 border-green-300"
                        : "bg-white border-blue-100"
                    }`}
                  >
                    <button
                      disabled={!available}
                      onClick={() => setSelectedParkingId(p.id)}
                      className={`w-full p-3 rounded-xl font-semibold text-left ${
                        available
                          ? "border border-blue-200 hover:bg-blue-50 text-blue-700"
                          : "border border-red-200 bg-red-50 text-red-500 cursor-not-allowed"
                      }`}
                    >
                      Spot {p.number}
                      <div className="text-sm mt-1 font-normal">
                        {available ? "Available" : "Unavailable"}
                      </div>
                    </button>

                    <div className="mt-3 text-xs text-slate-500 max-h-28 overflow-y-auto">
                      <strong>Booked:</strong>
                      {bookedTimes.length === 0 && <div>— none</div>}
                      {bookedTimes.map((b) => (
                        <div key={b.id} className="mt-1">
                          {new Date(b.startTime).toLocaleString(undefined, {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}{" "}
                          →{" "}
                          {new Date(b.endTime).toLocaleString(undefined, {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })} */}
            </div>

            <Button
              onClick={createBooking}
              disabled={loading || !selectedParkingId}
              className="relative w-full group overflow-hidden mt-4"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-sky-500 to-blue-600 rounded-2xl transition-all duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-sky-300 to-blue-400 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
              <div className="relative px-8 py-5 flex items-center justify-center gap-3 text-white font-bold text-lg">
                {loading ? "Booking…" : "Confirm Booking"}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </Button>
          </div>

          {/* Stats */}
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-blue-100 animate-[slideUp_0.9s_ease-out] space-y-4">
            <div className="flex items-center gap-2 text-blue-600 mb-4">
              <span className="text-sm font-semibold uppercase tracking-wider">
                Parking lots
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <StatCard
                icon={<ParkingCircle className="w-4 h-4" />}
                label="Parking lots"
                value={String(totalCount)}
              />
              <StatCard
                icon={<CheckCircle2 className="w-4 h-4" />}
                label="Available"
                value={String(availableCount)}
              />
            </div>

            <div className="rounded-2xl border border-blue-100 p-4 mt-4">
              <div className="flex items-center justify-between">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Availability
                </div>
                <div className="text-sm font-bold text-slate-900">
                  {availabilityPct}%
                </div>
              </div>

              <div className="mt-3 h-3 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 via-sky-500 to-blue-600 rounded-full transition-all duration-500"
                  style={{ width: `${availabilityPct}%` }}
                />
              </div>

              <div className="mt-2 text-xs text-slate-400">
                {availableCount} of {totalCount} spots available
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-6 text-slate-400 text-sm animate-[fadeIn_1s_ease-out]">
          Tip: If no spots are available, try another time.
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4">
      <div className="flex items-center gap-2 text-slate-500">
        <span className="text-blue-500">{icon}</span>
        <div className="text-xs uppercase tracking-wider font-semibold">
          {label}
        </div>
      </div>
      <div className="mt-2 text-2xl font-bold text-slate-900">{value}</div>
    </div>
  );
}
