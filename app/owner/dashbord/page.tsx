"use client";

import { useState } from "react";
import {
  Calendar,
  BarChart3,
  Settings,
  Bell,
  Star,
  ChevronRight,
  MapPin,
} from "lucide-react";

export default function ParkingDashboard() {
  const [view, setView] = useState("days");
  const [selectedDate, setSelectedDate] = useState(29);

  const dates = [
    { day: "Thu", date: 29, month: "Jan" },
    { day: "Fri", date: 30, month: "Jan" },
    { day: "Mon", date: 2, month: "Feb" },
    { day: "Tue", date: 3, month: "Feb" },
    { day: "Wed", date: 4, month: "Feb" },
    { day: "Thu", date: 5, month: "Feb" },
    { day: "Fri", date: 6, month: "Feb" },
    { day: "Mon", date: 9, month: "Feb" },
    { day: "Tue", date: 10, month: "Feb" },
    { day: "Wed", date: 11, month: "Feb" },
    { day: "Thu", date: 12, month: "Feb" },
    { day: "Fri", date: 13, month: "Feb" },
    { day: "Mon", date: 16, month: "Feb" },
    { day: "Tue", date: 17, month: "Feb" },
    { day: "Wed", date: 18, month: "Feb" },
    { day: "Thu", date: 19, month: "Feb" },
    { day: "Fri", date: 20, month: "Feb" },
    { day: "Mon", date: 23, month: "Feb" },
    { day: "Tue", date: 24, month: "Feb" },
    { day: "Wed", date: 25, month: "Feb" },
    { day: "Thu", date: 26, month: "Feb" },
    { day: "Fri", date: 27, month: "Feb" },
  ];

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">UBPARK</span>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            <li>
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <BarChart3 className="w-5 h-5" />
                <span className="font-medium">Dashboard</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-3 text-white bg-blue-600 rounded-lg transition-colors"
              >
                <Calendar className="w-5 h-5" />
                <span className="font-medium">Parking</span>
              </a>
            </li>
            <li>
              <button className="flex items-center justify-between w-full px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-5 h-5" />
                  <span className="font-medium">Reports</span>
                </div>
                <ChevronRight className="w-4 h-4" />
              </button>
            </li>
            <li>
              <button className="flex items-center justify-between w-full px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5" />
                  <span className="font-medium">Settings</span>
                </div>
                <ChevronRight className="w-4 h-4" />
              </button>
            </li>
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
            <div className="relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                2
              </span>
            </div>
            <span className="text-sm font-medium text-gray-700">
              Notifications
            </span>
          </div>

          <div className="flex items-center gap-3 p-3 mt-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
              BB
            </div>
            <span className="text-sm font-medium text-gray-700">
              blobsuki102
            </span>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Parking</h1>
            <input
              type="text"
              placeholder="Find colleague"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
          </div>
        </header>

        <div className="flex-1 overflow-auto p-8">
          <div className="inline-flex bg-gray-100 rounded-lg p-1 mb-6">
            <button
              onClick={() => setView("days")}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                view === "days"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Days
            </button>
            <button
              onClick={() => setView("weeks")}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                view === "weeks"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Weeks
            </button>
          </div>

          <div className="flex gap-2 mb-8 overflow-x-auto pb-4">
            {dates.map((item, index) => (
              <button
                key={index}
                onClick={() => setSelectedDate(item.date)}
                className={`flex-shrink-0 flex flex-col items-center justify-center w-20 h-20 rounded-xl border-2 transition-all ${
                  selectedDate === item.date
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <span className="text-xs text-gray-500 font-medium mb-1">
                  {item.day}
                </span>
                <span
                  className={`text-2xl font-bold ${
                    selectedDate === item.date
                      ? "text-blue-600"
                      : "text-gray-900"
                  }`}
                >
                  {item.date}
                </span>
                <span className="text-xs text-gray-400">{item.month}</span>
              </button>
            ))}
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl h-96 mb-8 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
            <div className="relative z-10">
              <MapPin className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">Parking Map View</p>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Availability
            </h2>

            <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl font-bold text-gray-900">P1</span>
                  </div>
                  <p className="text-sm text-gray-500">Garage · Floor -1</p>
                </div>

                <div className="flex items-center gap-4">
                  <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <Star className="w-5 h-5 text-gray-400 hover:text-yellow-400" />
                  </button>

                  <button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md">
                    Book spot
                  </button>

                  <button className="p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="w-5 h-5 rounded bg-gray-200"></div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
