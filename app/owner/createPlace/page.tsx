"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  MapPin,
  DollarSign,
  Navigation,
  Building2,
  Map as MapIcon,
  Sparkles,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useAuth } from "@/provider/authProvider";

// ✅ Leaflet + react-leaflet
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";

// ✅ Fix default marker icon paths in Next.js
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

export type User = {
  id: string;
  name: string;
  clerkId: string;
  email: string;
};

type LatLng = { lat: number; lng: number };

function ClickToPick({ onPick }: { onPick: (pos: LatLng) => void }) {
  useMapEvents({
    click(e) {
      onPick({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
}

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
    slotCount: 10,
    pricePerHour: 5,
  });

  // ✅ Map state (default: Ulaanbaatar-ish center; change if you want)
  const defaultCenter = useMemo<LatLng>(
    () => ({ lat: 47.9185, lng: 106.917 }),
    [],
  );
  const [picked, setPicked] = useState<LatLng | null>(null);

  // keep map instance (optional)
  const mapRef = useRef<L.Map | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    if (
      type === "number" &&
      (name === "spotCount" || name === "pricePerHour")
    ) {
      setForm((prev) => ({
        ...prev,
        [name]: value === "" ? "" : Number(value),
      }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const setLatLng = (lat: number, lng: number) => {
    const latStr = String(lat);
    const lngStr = String(lng);
    setForm((prev) => ({
      ...prev,
      latitude: latStr,
      longitude: lngStr,
    }));
  };

  const handlePickOnMap = (pos: LatLng) => {
    setPicked(pos);
    // nice rounding for input display (still accurate enough for parking lots)
    const lat = Number(pos.lat.toFixed(6));
    const lng = Number(pos.lng.toFixed(6));
    setLatLng(lat, lng);
  };

  // If user manually types lat/lng, update marker
  useEffect(() => {
    const lat = Number(form.latitude);
    const lng = Number(form.longitude);
    if (
      Number.isFinite(lat) &&
      Number.isFinite(lng) &&
      form.latitude !== "" &&
      form.longitude !== ""
    ) {
      setPicked({ lat, lng });
    }
  }, [form.latitude, form.longitude]);

  const generateSpots = () => {
    return Array.from({ length: Number(form.slotCount) || 0 }, (_, i) => ({
      number: `${i + 1}`,
      pricePerHour: Number(form.pricePerHour) || 0,
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

  // ✅ UI classes
  const labelClass = "block text-sm font-medium text-slate-700 mb-2 ml-1";
  const inputBase =
    "w-full px-4 py-4 bg-white border border-blue-200 rounded-xl " +
    "text-slate-900 placeholder-slate-400 " +
    "focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none " +
    "transition-all duration-300";
  const inputWithIcon =
    "w-full pl-12 pr-4 py-4 bg-white border border-blue-200 rounded-xl " +
    "text-slate-900 placeholder-slate-400 " +
    "focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none " +
    "transition-all duration-300";

  // ✅ Preview computed values
  const preview = useMemo(() => {
    const lat = Number(form.latitude);
    const lng = Number(form.longitude);
    const okLatLng =
      form.latitude !== "" &&
      form.longitude !== "" &&
      Number.isFinite(lat) &&
      Number.isFinite(lng);

    return {
      name: form.name || "—",
      city: form.city || "—",
      address: form.address || "—",
      lat: okLatLng ? lat : null,
      lng: okLatLng ? lng : null,
      spotCount: Number(form.slotCount) || 0,
      pricePerHour: Number(form.pricePerHour) || 0,
      totalIfFullPerHour:
        (Number(form.slotCount) || 0) * (Number(form.pricePerHour) || 0),
      okLatLng,
    };
  }, [form]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50 flex items-center justify-center p-6">
      <div className="relative w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-10 animate-[fadeIn_0.6s_ease-out]">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-sky-500 rounded-2xl mb-6 shadow-xl shadow-blue-200 animate-[float_3s_ease-in-out_infinite]">
            <Building2 className="w-10 h-10 text-white" />
          </div>

          <h1 className="text-5xl font-bold text-slate-900 mb-3 tracking-tight">
            Create Parking Lot
          </h1>
          <p className="text-slate-500 text-lg">
            Click on the map to auto-fill latitude & longitude
          </p>
        </div>

        {/* Layout: form + preview */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Form */}
          <div className="lg:col-span-2 relative bg-white rounded-3xl p-8 shadow-xl border border-slate-200 animate-[slideUp_0.8s_ease-out]">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Location */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-blue-600 mb-4">
                  <MapPin className="w-5 h-5" />
                  <span className="text-sm font-semibold uppercase tracking-wider">
                    Location Details
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="relative group">
                    <label className={labelClass}>Parking Lot Name *</label>
                    <input
                      name="name"
                      type="text"
                      placeholder="Downtown Plaza"
                      value={form.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField("")}
                      required
                      className={inputBase}
                    />
                  </div>

                  <div className="relative group">
                    <label className={labelClass}>City *</label>
                    <input
                      name="city"
                      type="text"
                      placeholder="Ulaanbaatar"
                      value={form.city}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("city")}
                      onBlur={() => setFocusedField("")}
                      required
                      className={inputBase}
                    />
                  </div>
                </div>

                <div className="relative group">
                  <label className={labelClass}>Street Address *</label>
                  <input
                    name="address"
                    type="text"
                    placeholder="123 Main Street, Suite 100"
                    value={form.address}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("address")}
                    onBlur={() => setFocusedField("")}
                    required
                    className={inputBase}
                  />
                </div>
              </div>

              {/* Map Picker */}
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-2 text-blue-600 mb-2">
                  <MapIcon className="w-5 h-5" />
                  <span className="text-sm font-semibold uppercase tracking-wider">
                    Map Picker
                  </span>
                </div>

                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                  <div className="bg-blue-50 px-4 py-3 text-sm text-slate-600 flex items-center justify-between gap-3">
                    <span>
                      Tip: click anywhere on the map → lat/lng auto fills
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setPicked(null);
                        setForm((p) => ({ ...p, latitude: "", longitude: "" }));
                      }}
                      className="text-blue-700 hover:text-blue-800 font-semibold"
                    >
                      Clear pin
                    </button>
                  </div>

                  <div className="h-[320px]">
                    <MapContainer
                      center={picked ?? defaultCenter}
                      zoom={13}
                      scrollWheelZoom
                      className="h-full w-full"
                      whenReady={(e) => {
                        mapRef.current = e.target;
                      }}
                    >
                      <TileLayer
                        attribution="&copy; OpenStreetMap contributors"
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />

                      <ClickToPick onPick={handlePickOnMap} />

                      {picked && <Marker position={[picked.lat, picked.lng]} />}
                    </MapContainer>
                  </div>
                </div>
              </div>

              {/* GPS */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2 text-blue-600 mb-4">
                  <Navigation className="w-5 h-5" />
                  <span className="text-sm font-semibold uppercase tracking-wider">
                    GPS Coordinates
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="relative group">
                    <label className={labelClass}>Latitude *</label>
                    <div className="relative">
                      <MapIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
                      <input
                        name="latitude"
                        type="number"
                        step="any"
                        placeholder="47.9185"
                        value={form.latitude}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("latitude")}
                        onBlur={() => setFocusedField("")}
                        required
                        className={inputWithIcon}
                      />
                    </div>
                  </div>

                  <div className="relative group">
                    <label className={labelClass}>Longitude *</label>
                    <div className="relative">
                      <MapIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
                      <input
                        name="longitude"
                        type="number"
                        step="any"
                        placeholder="106.9170"
                        value={form.longitude}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("longitude")}
                        onBlur={() => setFocusedField("")}
                        required
                        className={inputWithIcon}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Capacity & Pricing */}
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-2 text-blue-600 mb-4">
                  <Sparkles className="w-5 h-5" />
                  <span className="text-sm font-semibold uppercase tracking-wider">
                    Capacity & Pricing
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="relative group">
                    <label className={labelClass}>Number of Spots</label>
                    <input
                      name="spotCount"
                      type="number"
                      min="1"
                      placeholder="50"
                      value={String(form.slotCount)}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("spotCount")}
                      onBlur={() => setFocusedField("")}
                      className={inputBase}
                    />
                  </div>

                  <div className="relative group">
                    <label className={labelClass}>Price Per Hour</label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
                      <input
                        name="pricePerHour"
                        type="number"
                        min="0"
                        step="0.5"
                        placeholder="5.00"
                        value={String(form.pricePerHour)}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("pricePerHour")}
                        onBlur={() => setFocusedField("")}
                        className={inputWithIcon}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="pt-6">
                <button
                  type="submit"
                  className="relative w-full group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-sky-500 to-blue-600 rounded-2xl transition-all duration-500 group-hover:scale-105"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-sky-300 to-blue-400 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>

                  <div className="relative px-8 py-5 flex items-center justify-center gap-3 text-white font-bold text-lg">
                    <Building2 className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                    <span>Create Parking Lot</span>
                    <Sparkles className="w-5 h-5 group-hover:scale-125 transition-transform duration-300" />
                  </div>
                </button>
              </div>
            </form>
          </div>

          {/* Preview Card */}
          <div className="relative bg-white rounded-3xl p-6 shadow-xl border border-slate-200 animate-[slideUp_0.9s_ease-out] h-fit">
            <div className="flex items-center gap-2 text-blue-600 mb-4">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">
                Preview
              </span>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-blue-50 p-4">
                <div className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
                  Parking Lot
                </div>
                <div className="mt-2 text-lg font-bold text-slate-900">
                  {preview.name}
                </div>
                <div className="mt-1 text-sm text-slate-600">
                  {preview.address}
                </div>
                <div className="mt-1 text-sm text-slate-600">
                  {preview.city}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Coordinates
                </div>
                <div className="mt-2 text-sm text-slate-700">
                  {preview.okLatLng ? (
                    <>
                      <div>
                        <span className="font-semibold">Lat:</span>{" "}
                        {preview.lat}
                      </div>
                      <div>
                        <span className="font-semibold">Lng:</span>{" "}
                        {preview.lng}
                      </div>
                    </>
                  ) : (
                    <div className="text-slate-500">
                      Click the map or fill lat/lng
                    </div>
                  )}
                </div>

                {picked && (
                  <button
                    type="button"
                    onClick={() => {
                      mapRef.current?.setView([picked.lat, picked.lng], 16, {
                        animate: true,
                      });
                    }}
                    className="mt-3 inline-flex items-center gap-2 text-blue-700 hover:text-blue-800 font-semibold text-sm"
                  >
                    <Navigation className="w-4 h-4" />
                    Zoom to pin
                  </button>
                )}
              </div>

              <div className="rounded-2xl border border-slate-200 p-4">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Capacity & Pricing
                </div>

                <div className="mt-2 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl bg-slate-50 border border-slate-100 p-3">
                    <div className="text-xs text-slate-500">Spots</div>
                    <div className="text-lg font-bold text-slate-900">
                      {preview.spotCount}
                    </div>
                  </div>
                  <div className="rounded-xl bg-slate-50 border border-slate-100 p-3">
                    <div className="text-xs text-slate-500">Per hour</div>
                    <div className="text-lg font-bold text-slate-900">
                      ${preview.pricePerHour}
                    </div>
                  </div>
                </div>

                <div className="mt-3 rounded-xl bg-blue-50 border border-slate-200 p-3 text-sm">
                  <div className="text-xs text-blue-700 font-semibold uppercase tracking-wider">
                    If full (per hour)
                  </div>
                  <div className="mt-1 text-2xl font-bold text-slate-900">
                    ${preview.totalIfFullPerHour}
                  </div>
                </div>
              </div>

              <div className="text-xs text-slate-400">
                Preview updates live as you type.
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8 text-slate-400 text-sm animate-[fadeIn_1s_ease-out]">
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
