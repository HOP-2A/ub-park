"use client";

import { useState } from "react";
import {
  MapPin,
  DollarSign,
  Navigation,
  Building2,
  Map,
  Sparkles,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useAuth } from "@/provider/authProvider";

export type User = {
  id: string;
  name: string;
  clerkId: string;
  email: string;
};

export default function AddParkingLot() {
  const [focusedField, setFocusedField] = useState("");
  const { user: clerkUser } = useUser();
  const { user } = useAuth(clerkUser?.id);
  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    latitude: "",
    longitude: "",
    spotCount: 10,
    pricePerHour: 5,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generateSpots = () => {
    return Array.from({ length: Number(form.spotCount) }, (_, i) => ({
      number: `${i + 1}`,
      pricePerHour: Number(form.pricePerHour),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      address: form.address,
      city: form.city,
      latitude: Number(form.latitude),
      longitude: Number(form.longitude),
      ownerId: user?.id,
      spots: generateSpots(),
    };

    const res = await fetch("/api/owner", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      alert("Failed to create parking lot");
      return;
    }

    alert("Parking lot created 🚗");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12 animate-[fadeIn_0.6s_ease-out]">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-6 shadow-2xl shadow-purple-500/50 animate-[float_3s_ease-in-out_infinite]">
            <Building2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-3 tracking-tight">
            Create Parking Lot
          </h1>
          <p className="text-purple-200 text-lg">
            Add a new location to your parking network
          </p>
        </div>

        {/* Form Card */}
        <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 animate-[slideUp_0.8s_ease-out]">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Location Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-purple-300 mb-4">
                <MapPin className="w-5 h-5" />
                <span className="text-sm font-semibold uppercase tracking-wider">
                  Location Details
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Name Input */}
                <div className="relative group">
                  <label className="block text-sm font-medium text-purple-200 mb-2 ml-1">
                    Parking Lot Name
                  </label>
                  <div className="relative">
                    <input
                      name="name"
                      type="text"
                      placeholder="Downtown Plaza"
                      onChange={handleChange}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField("")}
                      required
                      className="w-full px-4 py-4 bg-white/5 border-2 border-purple-500/30 rounded-xl text-white placeholder-purple-300/50 focus:border-purple-400 focus:bg-white/10 focus:outline-none transition-all duration-300 hover:border-purple-400/50"
                    />
                    <div
                      className={`absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 -z-10 blur-xl transition-opacity duration-300 ${focusedField === "name" ? "opacity-100" : "opacity-0"}`}
                    ></div>
                  </div>
                </div>

                {/* City Input */}
                <div className="relative group">
                  <label className="block text-sm font-medium text-purple-200 mb-2 ml-1">
                    City
                  </label>
                  <div className="relative">
                    <input
                      name="city"
                      type="text"
                      placeholder="San Francisco"
                      onChange={handleChange}
                      onFocus={() => setFocusedField("city")}
                      onBlur={() => setFocusedField("")}
                      required
                      className="w-full px-4 py-4 bg-white/5 border-2 border-purple-500/30 rounded-xl text-white placeholder-purple-300/50 focus:border-purple-400 focus:bg-white/10 focus:outline-none transition-all duration-300 hover:border-purple-400/50"
                    />
                    <div
                      className={`absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 -z-10 blur-xl transition-opacity duration-300 ${focusedField === "city" ? "opacity-100" : "opacity-0"}`}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Address Input - Full Width */}
              <div className="relative group">
                <label className="block text-sm font-medium text-purple-200 mb-2 ml-1">
                  Street Address
                </label>
                <div className="relative">
                  <input
                    name="address"
                    type="text"
                    placeholder="123 Main Street, Suite 100"
                    onChange={handleChange}
                    onFocus={() => setFocusedField("address")}
                    onBlur={() => setFocusedField("")}
                    required
                    className="w-full px-4 py-4 bg-white/5 border-2 border-purple-500/30 rounded-xl text-white placeholder-purple-300/50 focus:border-purple-400 focus:bg-white/10 focus:outline-none transition-all duration-300 hover:border-purple-400/50"
                  />
                  <div
                    className={`absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 -z-10 blur-xl transition-opacity duration-300 ${focusedField === "address" ? "opacity-100" : "opacity-0"}`}
                  ></div>
                </div>
              </div>
            </div>

            {/* Coordinates Section */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-2 text-blue-300 mb-4">
                <Navigation className="w-5 h-5" />
                <span className="text-sm font-semibold uppercase tracking-wider">
                  GPS Coordinates
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Latitude */}
                <div className="relative group">
                  <label className="block text-sm font-medium text-purple-200 mb-2 ml-1">
                    Latitude
                  </label>
                  <div className="relative">
                    <Map className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400/50" />
                    <input
                      name="latitude"
                      type="number"
                      step="any"
                      placeholder="37.7749"
                      onChange={handleChange}
                      onFocus={() => setFocusedField("latitude")}
                      onBlur={() => setFocusedField("")}
                      required
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border-2 border-purple-500/30 rounded-xl text-white placeholder-purple-300/50 focus:border-purple-400 focus:bg-white/10 focus:outline-none transition-all duration-300 hover:border-purple-400/50"
                    />
                    <div
                      className={`absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 -z-10 blur-xl transition-opacity duration-300 ${focusedField === "latitude" ? "opacity-100" : "opacity-0"}`}
                    ></div>
                  </div>
                </div>

                {/* Longitude */}
                <div className="relative group">
                  <label className="block text-sm font-medium text-purple-200 mb-2 ml-1">
                    Longitude
                  </label>
                  <div className="relative">
                    <Map className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400/50" />
                    <input
                      name="longitude"
                      type="number"
                      step="any"
                      placeholder="-122.4194"
                      onChange={handleChange}
                      onFocus={() => setFocusedField("longitude")}
                      onBlur={() => setFocusedField("")}
                      required
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border-2 border-purple-500/30 rounded-xl text-white placeholder-purple-300/50 focus:border-purple-400 focus:bg-white/10 focus:outline-none transition-all duration-300 hover:border-purple-400/50"
                    />
                    <div
                      className={`absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 -z-10 blur-xl transition-opacity duration-300 ${focusedField === "longitude" ? "opacity-100" : "opacity-0"}`}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Capacity & Pricing Section */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-2 text-emerald-300 mb-4">
                <Sparkles className="w-5 h-5" />
                <span className="text-sm font-semibold uppercase tracking-wider">
                  Capacity & Pricing
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Spot Count */}
                <div className="relative group">
                  <label className="block text-sm font-medium text-purple-200 mb-2 ml-1">
                    Number of Spots
                  </label>
                  <div className="relative">
                    <input
                      name="spotCount"
                      type="number"
                      min="1"
                      placeholder="50"
                      onChange={handleChange}
                      onFocus={() => setFocusedField("spotCount")}
                      onBlur={() => setFocusedField("")}
                      className="w-full px-4 py-4 bg-white/5 border-2 border-purple-500/30 rounded-xl text-white placeholder-purple-300/50 focus:border-purple-400 focus:bg-white/10 focus:outline-none transition-all duration-300 hover:border-purple-400/50"
                    />
                    <div
                      className={`absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/20 to-green-500/20 -z-10 blur-xl transition-opacity duration-300 ${focusedField === "spotCount" ? "opacity-100" : "opacity-0"}`}
                    ></div>
                  </div>
                </div>

                {/* Price Per Hour */}
                <div className="relative group">
                  <label className="block text-sm font-medium text-purple-200 mb-2 ml-1">
                    Price Per Hour
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400/50" />
                    <input
                      name="pricePerHour"
                      type="number"
                      min="0"
                      step="0.5"
                      placeholder="5.00"
                      onChange={handleChange}
                      onFocus={() => setFocusedField("pricePerHour")}
                      onBlur={() => setFocusedField("")}
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border-2 border-purple-500/30 rounded-xl text-white placeholder-purple-300/50 focus:border-purple-400 focus:bg-white/10 focus:outline-none transition-all duration-300 hover:border-purple-400/50"
                    />
                    <div
                      className={`absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/20 to-green-500/20 -z-10 blur-xl transition-opacity duration-300 ${focusedField === "pricePerHour" ? "opacity-100" : "opacity-0"}`}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                className="relative w-full group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-2xl transition-all duration-500 group-hover:scale-105"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
                <div className="relative px-8 py-5 flex items-center justify-center gap-3 text-white font-bold text-lg">
                  <Building2 className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                  <span>Create Parking Lot</span>
                  <Sparkles className="w-5 h-5 group-hover:scale-125 transition-transform duration-300" />
                </div>
              </button>
            </div>
          </form>

          {/* Decorative corner elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-transparent rounded-tl-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-pink-500/20 to-transparent rounded-br-3xl pointer-events-none"></div>
        </div>

        {/* Footer hint */}
        <div className="text-center mt-8 text-purple-300/60 text-sm animate-[fadeIn_1s_ease-out]">
          All fields marked with * are required
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
