"use client";

import { useAuth } from "@/provider/authProvider";
import { UserButton, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Booking } from "../booking/[place]/page";
import { MapPin, House, BookMarked } from "lucide-react";
import { useRouter } from "next/navigation";

function getDuration(start: string, end: string) {
  const diff =
    (new Date(end).getTime() - new Date(start).getTime()) / (1000 * 60 * 60);
  return diff === 1 ? "1 hr" : `${diff} hrs`;
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return {
    date: d.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    }),
    time: d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
  };
}

export default function Home() {
  const { user: clerkUser } = useUser();
  const { user } = useAuth(clerkUser?.id);
  const [myBookings, setMyBookings] = useState<Booking[]>([]);
  const userId = user?.id;
  const router = useRouter();

  const displayName =
    clerkUser?.fullName ||
    clerkUser?.username ||
    clerkUser?.primaryEmailAddress?.emailAddress ||
    "User";
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

  return (
    <div className="min-h-screen bg-white-50  flex gap-10 ">
      <aside className="w-72 bg-white/80 backdrop-blur border-r border-slate-200 flex flex-col">
        {/* Brand */}
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-sky-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-xl font-bold text-slate-900 tracking-tight">
                UBPARK
              </div>
              <div className="text-xs text-slate-500 -mt-0.5">
                Find parking fast
              </div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li onClick={() => router.push(`/`)}>
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-3  text-black bg-gradient-to-r  rounded-2xl shadow-md shadow-blue-200">
                <House className="w-5 h-5" />
                <span className="font-semibold">Home</span>
              </a>
            </li>
            <li onClick={() => router.push(`/myBookings`)}>
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-3 text-white bg-gradient-to-r from-blue-600 via-sky-500 to-blue-600  rounded-2xl shadow-md ">
                <BookMarked className="w-5 h-5" />
                <span className="font-semibold">My Bookings</span>
              </a>
            </li>
          </ul>

          {/* Quick stats */}
          <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
              Quick stats
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-slate-50 border border-slate-100 p-3">
                <div className="text-xs text-slate-500">Bookings</div>
                <div className="text-2xl font-bold text-slate-900">
                  {myBookings.length}
                </div>
              </div>
              <div className="rounded-2xl bg-slate-50 border border-slate-100 p-3">
                <div className="text-xs text-slate-500">City</div>
                <div className="text-lg font-bold text-slate-900 truncate">
                  Ulaanbaatar
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Bottom */}
        <div className="p-4 border-t border-slate-200">
          <div className="flex items-center gap-3 p-3 mt-2 rounded-2xl bg-white border border-slate-200">
            <UserButton />
            <div className="min-w-0">
              <div className="text-sm font-semibold text-slate-900 truncate">
                {displayName}
              </div>
              <div className="text-xs text-slate-500 truncate">
                {clerkUser?.primaryEmailAddress?.emailAddress ?? ""}
              </div>
            </div>
          </div>
        </div>
      </aside>
      {/* Header */}
      <div className="w-full  py-14">
        <div className="max-w-2xl mx-auto mb-12">
          <p className="text-blue-500 text-xs font-semibold tracking-widest uppercase mb-2">
            Dashboard
          </p>
          <div className="flex items-end justify-between">
            <h1 className="text-5xl font-black text-slate-900 tracking-tighter leading-none">
              My Bookings
            </h1>
            <span className="text-xs font-semibold bg-blue-600 text-white px-4 py-2 rounded-full">
              {myBookings.length} active
            </span>
          </div>
        </div>

        {/* Cards */}
        <div className="max-w-2xl mx-auto flex flex-col gap-3">
          {myBookings.map((booking) => {
            const isConfirmed = booking.status === "CONFIRMED";
            const start = formatDate(booking.startTime);
            const end = formatDate(booking.endTime);
            const duration = getDuration(booking.startTime, booking.endTime);

            return (
              <div
                key={booking.id}
                className="rounded-2xl border border-blue-300  bg-gradient-to-r from-blue-600 via-sky-500 to-blue-600  cursor-pointer overflow-hidden">
                <div className="flex items-center gap-4 px-5 py-4">
                  {/* Icon */}
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-lg shrink-0 bg-blue-500">
                    🅿️
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm truncate text-white">
                      {booking.parkingSpot?.place.name}
                    </p>
                    <p className="text-xs truncate mt-0.5 text-blue-100">
                      📍 {booking.parkingSpot?.place.city}
                    </p>
                  </div>

                  {/* Right */}
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <span className="text-lg font-black text-white">
                      ${booking.totalAmount}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full border bg-white/20 text-white border-white/30">
                      {isConfirmed ? "Confirmed" : "Pending"}
                    </span>
                  </div>
                </div>

                {/* Always expanded */}
                <div className="px-5 pb-5">
                  <div className="border-t border-blue-500 pt-4 grid grid-cols-3 gap-3">
                    <div>
                      <p className="text-blue-200 text-xs font-semibold uppercase tracking-widest mb-1">
                        Check in
                      </p>
                      <p className="text-white font-bold text-sm">
                        {start.date}
                      </p>
                      <p className="text-blue-100 text-xs mt-0.5">
                        {start.time}
                      </p>
                    </div>
                    <div>
                      <p className="text-blue-200 text-xs font-semibold uppercase tracking-widest mb-1">
                        Check out
                      </p>
                      <p className="text-white font-bold text-sm">{end.date}</p>
                      <p className="text-blue-100 text-xs mt-0.5">{end.time}</p>
                    </div>
                    <div>
                      <p className="text-blue-200 text-xs font-semibold uppercase tracking-widest mb-1">
                        Duration
                      </p>
                      <p className="text-white font-bold text-sm">{duration}</p>
                      <p className="text-blue-100 text-xs mt-0.5">
                        Spot {booking.parkingSpot?.number}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
