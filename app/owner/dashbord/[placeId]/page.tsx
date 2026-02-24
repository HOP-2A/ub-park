"use client";

import React, { useEffect, useState } from "react";
import {
  Calendar,
  BarChart3,
  Settings,
  Bell,
  Star,
  ChevronRight,
  MapPin,
  Search,
  Filter,
  Clock,
  DollarSign,
  Car,
  TrendingUp,
  Users,
} from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";
import { useAuth } from "@/provider/authProvider";
import { useParams, useRouter } from "next/navigation";
import { ParkingCanvas } from "@/components/admin/parking/ParkingCanvas";
import { getParkingLayout } from "@/app/actions/parkingExtensions";
import { ParkingSlot } from "@/components/admin/parking/ParkingSlotTypes";

export type parkingSpot = {
  id: string;
  name: string;
  number: string;
  pricePerHour: string;
  isAvailable: boolean;
};
type CalendarDate = {
  day: string;
  weekday: string;
  month: string;
  isToday: boolean;
};

export default function Parking() {
  const [view, setView] = useState("days");
  const [selectedDate, setSelectedDate] = useState();
  const [currParking, setCurrParking] = useState<parkingSpot[]>([]);
  const [parkingSpots, setParkingSpots] = useState<parkingSpot[]>([]);
  const [slots, setSlots] = useState<ParkingSlot[]>([]);
  const [dates, setDates] = useState<CalendarDate[]>([]);
  const { user: clerkUser, isLoaded } = useUser();
  const { user } = useAuth(clerkUser?.id);
  const { placeId } = useParams();
  const router = useRouter();

  useEffect(() => {
    const getplaces = async () => {
      const response = await fetch(`/api/place/${placeId}`);
      const data = await response.json();
      setCurrParking(data.message);
      setParkingSpots(data.message.parkings);
    };
    getplaces();
  }, [isLoaded]);
  // console.log(selectedDate.toLocaleDateString);

  const displayName =
    clerkUser?.fullName ||
    clerkUser?.username ||
    clerkUser?.primaryEmailAddress?.emailAddress ||
    "User";

  useEffect(() => {
    const now = new Date();
    const currDate = new Date(now);
    const generated = Array.from({ length: 14 }, (_, i) => {
      const d = new Date(now);

      d.setDate(now.getDate() + i);

      return {
        day: d.toLocaleDateString("en-US", { day: "numeric" }),
        weekday: d.toLocaleDateString("en-US", { weekday: "short" }),
        month: d.toLocaleDateString("en-US", { month: "short" }),
        isToday: i === 0,
      };
    });
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDates(generated);
    setSelectedDate(currDate);
  }, []);
  useEffect(() => {
    const load = async () => {
      const loadedSlots = await getParkingLayout(`${placeId}`);
      if (loadedSlots && loadedSlots.length > 0) {
        setSlots(loadedSlots);
      }
    };
    load();
  }, [placeId]);

  const stats = [
    {
      label: "Total Spots",
      value: `${parkingSpots.length}`,
      icon: Car,
      color: "blue",
      trend: "+12%",
    },
    {
      label: "Available",
      value: "87",
      icon: MapPin,
      color: "red",
      trend: "+5%",
    },
    {
      label: "Revenue",
      value: "$24,700",
      icon: DollarSign,
      color: "blue",
      trend: "+18%",
    },
    {
      label: "Occupancy",
      value: "65%",
      icon: TrendingUp,
      color: "red",
      trend: "+8%",
    },
  ];

  return (
    <div className="flex h-fit bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 font-sans">
      {/* Sidebar */}
      <aside className="w-72 bg-white/80 backdrop-blur-xl border-r border-slate-200/60 flex flex-col shadow-xl">
        {/* Logo */}
        <div className="p-6 border-b border-slate-200/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                UBPARK
              </span>
              <p className="text-xs text-slate-500">Smart Parking</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="mb-6">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-4">
              Main Menu
            </p>
            <ul className="space-y-1">
              <li>
                <a
                  href="#"
                  className="flex items-center gap-3 px-4 py-3 text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg shadow-blue-500/30 transition-all duration-200"
                >
                  <Calendar className="w-5 h-5" />
                  <span className="font-medium">Parking</span>
                  <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                </a>
              </li>
              <li>
                <button className="flex items-center justify-between w-full px-4 py-3 text-slate-600 rounded-xl hover:bg-slate-100 transition-all duration-200 group">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="font-medium">Reports</span>
                  </div>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </li>
              <li
                onClick={() =>
                  router.push(`/owner/dashbord/${placeId}/parking`)
                }
              >
                <button className="flex items-center justify-between w-full px-4 py-3 text-slate-600 rounded-xl hover:bg-slate-100 transition-all duration-200 group">
                  <div className="flex items-center gap-3">
                    <Settings className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                    <span className="font-medium">Edit Parking </span>
                  </div>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-4">
              Quick Actions
            </p>
            <ul className="space-y-1">
              <li onClick={() => router.push("/owner/dashbord")}>
                <a
                  href="#"
                  className="flex items-center gap-3 px-4 py-3 text-slate-600 rounded-xl hover:bg-slate-100 transition-all duration-200"
                >
                  <Users className="w-5 h-5" />
                  <span className="font-medium text-sm">My Places</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>

        {/* Bottom section */}
        <div className="p-4 border-t border-slate-200/30 space-y-2">
          <div className="flex items-center gap-3 p-3 mt-2 rounded-2xl  border-blue-100">
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

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 px-8 py-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-1">
                {currParking.name}
              </h1>
              <p className="text-sm text-slate-500">
                Book parking spots near you
              </p>
            </div>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="px-8 pt-6">
          <div className="grid grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-xl rounded-2xl p-5 border border-slate-200/60 shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br from-${stat.color}-500 to-${stat.color}-600 rounded-xl flex items-center justify-center shadow-lg shadow-${stat.color}-500/30 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                    {stat.trend}
                  </span>
                </div>
                <p className="text-2xl font-bold text-slate-900 mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto px-8 py-6">
          {/* View toggle */}
          <div className="flex items-center justify-between mb-6">
            {/* <div className="inline-flex bg-white/80 backdrop-blur-xl rounded-xl p-1.5 border border-slate-200/60 shadow-sm">
              <button
                onClick={() => setView("days")}
                className={`px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 ${
                  view === "days"
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                Days
              </button>
              <button
                onClick={() => setView("weeks")}
                className={`px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 ${
                  view === "weeks"
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                Weeks
              </button>
            </div> */}
          </div>

          {/* Calendar dates */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-4">
            {dates.map((item, index) => (
              <button
                key={index}
                onClick={() => setSelectedDate(item.day)}
                className={`flex-shrink-0 flex flex-col items-center justify-center w-19.5 h-25 rounded-xl border-2 transition-all ${
                  selectedDate === item.day
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <span className="text-xs text-gray-500 font-medium mb-1">
                  {item.weekday}
                </span>
                <span
                  className={`text-2xl font-bold ${
                    selectedDate === item.day
                      ? "text-blue-600"
                      : "text-gray-900"
                  }`}
                >
                  {item.day}
                </span>
                <span className="text-xs text-gray-400">{item.month}</span>
              </button>
            ))}
          </div>
          {/* Map placeholder with enhanced design */}
          <div className="relative bg-blue-900 rounded-3xl h-100 mb-8 flex items-center justify-center overflow-hidden shadow-2xl border-2 border-blue-500">
            {/* Simple blue accent in corner */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 opacity-5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600 opacity-5 rounded-full blur-3xl"></div>

            {/* Clean grid */}
            <div className="absolute inset-0 opacity-[0.15]">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage:
                    "linear-gradient(rgb(59,130,246) 1px, transparent 1px), linear-gradient(90deg, rgb(59,130,246) 1px, transparent 1px)",
                }}
              ></div>
            </div>

            <ParkingCanvas slots={slots} />

            {/* Corner indicators */}
            <div className="absolute top-4 left-4 w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="absolute top-4 right-4 w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="absolute bottom-4 left-4 w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="absolute bottom-4 right-4 w-2 h-2 bg-blue-500 rounded-full"></div>
          </div>

          {/* Availability section */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">
                Available Parking Spots
              </h2>
            </div>

            <div className="space-y-4">
              {parkingSpots.map((spot, index) => (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/60 hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6 flex-1">
                      {/* Spot ID */}
                      <div className="w-15 h-15 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform duration-300">
                        <span className="text-3xl font-bold text-white">
                          {spot.number}
                        </span>
                      </div>

                      {/* Spot Info */}
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-900 mb-1">
                          {spot.number} parking spot
                        </h3>
                        <div className="flex items-center gap-4">
                          {spot.isAvailable === true ? (
                            <div className="flex items-center gap-1.5">
                              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                              <span className="text-sm font-semibold text-slate-700">
                                Available
                              </span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1.5">
                              <div className="w-3 h-3 bg-red-500 rounded-full "></div>
                              <span className="text-sm font-semibold text-slate-700">
                                Occupied
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Price */}
                      <div className="text-center px-6 py-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                        <p className="text-2xl font-bold text-blue-600">
                          {spot.pricePerHour}$
                        </p>
                        <p className="text-xs text-slate-500 font-medium">
                          per hour
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 ml-6">
                      <button className="p-3 hover:bg-slate-100 rounded-xl transition-all duration-200 group/star">
                        <Star className="w-6 h-6 text-slate-400 group-hover/star:text-yellow-400 group-hover/star:fill-yellow-400 transition-colors" />
                      </button>

                      <button className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-blue-500/30 hover:scale-105 transition-all duration-300">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
