"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import {
  Building2,
  MapPin,
  Map as MapIcon,
  ParkingCircle,
  CheckCircle2,
  ArrowRight,
  SquareParking,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const LeafletMap = dynamic(() => import("@/components/LeafletMap"), {
  ssr: false,
});

type Parking = {
  id: string;
  number: string;
  pricePerHour: string;
  isAvailable: boolean;
};

type Place = {
  id: string;
  name: string;
  address: string;
  city: string;
  latitude: number;
  longitude: number;
  parkings: Parking[];
};

export default function PlaceDetailsPage() {
  const { push } = useRouter();
  const params = useParams();
  const placeId = params.placeId as string;

  const [place, setPlace] = useState<Place | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPlace = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/place/${encodeURIComponent(placeId)}`,
          {
            cache: "no-store",
          }
        );

        if (!response.ok) {
          setPlace(null);
          setLoading(false);
          return;
        }

        const data = await response.json();
        const p = data.message;

        setPlace({
          ...p,
          latitude: Number(p.latitude),
          longitude: Number(p.longitude),
          parkings: (p.parkings ?? []).map((x: any) => ({
            ...x,
            isAvailable: Boolean(x.isAvailable),
          })),
        });
      } catch {
        setPlace(null);
      } finally {
        setLoading(false);
      }
    };

    if (placeId) getPlace();
  }, [placeId]);

  const availableCount = useMemo(() => {
    return place?.parkings.filter((p) => p.isAvailable).length ?? 0;
  }, [place]);

  const totalCount = place?.parkings.length ?? 0;
  const availabilityPct =
    totalCount > 0 ? Math.round((availableCount / totalCount) * 100) : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50 flex items-center justify-center p-6">
        <div className="w-full max-w-3xl bg-white rounded-3xl p-8 shadow-xl border border-blue-100 animate-[slideUp_0.8s_ease-out]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-sky-500 shadow-lg shadow-blue-200 animate-[float_3s_ease-in-out_infinite]" />
            <div>
              <div className="h-5 w-52 bg-slate-100 rounded-md animate-pulse" />
              <div className="mt-2 h-4 w-72 bg-slate-100 rounded-md animate-pulse" />
            </div>
          </div>

          <div className="mt-8 grid md:grid-cols-2 gap-4">
            <div className="h-[340px] rounded-2xl border border-blue-100 bg-blue-50/40 animate-pulse" />
            <div className="space-y-3">
              <div className="h-14 rounded-2xl border border-blue-100 bg-blue-50/40 animate-pulse" />
              <div className="h-14 rounded-2xl border border-blue-100 bg-blue-50/40 animate-pulse" />
              <div className="h-14 rounded-2xl border border-blue-100 bg-blue-50/40 animate-pulse" />
              <div className="h-14 rounded-2xl border border-blue-100 bg-blue-50/40 animate-pulse" />
              <div className="h-12 rounded-2xl bg-slate-100 animate-pulse" />
            </div>
          </div>

          <style jsx>{`
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
                transform: translateY(-14px);
              }
            }
          `}</style>
        </div>
      </div>
    );
  }

  if (!place) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50 flex items-center justify-center p-6">
        <div className="w-full max-w-xl bg-white rounded-3xl p-8 shadow-xl border border-blue-100 animate-[fadeIn_0.6s_ease-out] text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-sky-500 rounded-2xl mb-6 shadow-xl shadow-blue-200">
            <Building2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Place not found</h1>
          <p className="mt-2 text-slate-500">
            This parking location doesn’t exist or was removed.
          </p>

          <div className="mt-6 flex items-center justify-center gap-3">
            <Button
              variant="outline"
              className="rounded-2xl border-blue-200 hover:bg-blue-50"
              onClick={() => push("/")}
            >
              Back home
            </Button>
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
          `}</style>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50 flex items-center justify-center p-6">
      <div className="relative w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-10 animate-[fadeIn_0.6s_ease-out]">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-sky-500 rounded-2xl mb-6 shadow-xl shadow-blue-200 animate-[float_3s_ease-in-out_infinite]">
            <SquareParking className="w-10 h-10 text-white" />
          </div>

          <h1 className="text-5xl font-bold text-slate-900 mb-3 tracking-tight">
            {place.name}
          </h1>
          <p className="text-slate-500 text-lg">
            View location details and reserve a spot
          </p>
        </div>

        {/* Layout: map + info */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map card */}
          <div className="lg:col-span-2 relative bg-white rounded-3xl p-6 shadow-xl border border-blue-100 animate-[slideUp_0.8s_ease-out]">
            <div className="flex items-center gap-2 text-blue-600 mb-4">
              <MapIcon className="w-5 h-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">
                Location Map
              </span>
            </div>

            <div className="rounded-2xl overflow-hidden border border-blue-100 shadow-sm">
              <div className="bg-blue-50 px-4 py-3 text-sm text-slate-600 flex items-center justify-between gap-3">
                <span>
                  Coordinates:{" "}
                  <span className="font-semibold text-slate-800">
                    {place.latitude}, {place.longitude}
                  </span>
                </span>

                <button
                  type="button"
                  onClick={() =>
                    window.open(
                      `https://www.google.com/maps?q=${place.latitude},${place.longitude}`,
                      "_blank"
                    )
                  }
                  className="text-blue-700 hover:text-blue-800 font-semibold"
                >
                  Open in Maps
                </button>
              </div>

              <div className="h-[420px]">
                <LeafletMap lat={place.latitude} lng={place.longitude} />
              </div>
            </div>

            {/* subtle corner accents */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-transparent rounded-tl-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-sky-100 to-transparent rounded-br-3xl pointer-events-none" />
          </div>

          {/* Info card */}
          <div className="relative bg-white rounded-3xl p-6 shadow-xl border border-blue-100 animate-[slideUp_0.9s_ease-out] h-fit">
            <div className="flex items-center gap-2 text-blue-600 mb-4">
              <SparkHeaderIcon />
              <span className="text-sm font-semibold uppercase tracking-wider">
                Details
              </span>
            </div>

            <div className="space-y-4">
              {/* Address */}
              <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                <div className="flex items-center gap-2 text-blue-700">
                  <MapPin className="w-4 h-4" />
                  <div className="text-xs font-semibold uppercase tracking-wider">
                    Address
                  </div>
                </div>
                <div className="mt-2 text-slate-900 font-bold">
                  {place.address}
                </div>
                <div className="mt-1 text-sm text-slate-600">{place.city}</div>
              </div>

              {/* Stats grid */}
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

              {/* Availability bar */}
              <div className="rounded-2xl border border-blue-100 p-4">
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

              {/* CTA */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => push(`/booking/${placeId}`)}
                  className="relative w-full group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-sky-500 to-blue-600 rounded-2xl transition-all duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-sky-300 to-blue-400 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

                  <div className="relative px-8 py-5 flex items-center justify-center gap-3 text-white font-bold text-lg">
                    <span>Reserve Now</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </button>

                <div className="mt-3 text-xs text-slate-400 text-center">
                  You’ll pick a spot on the next step.
                </div>
              </div>
            </div>

            {/* subtle corner accents */}
            <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-blue-100 to-transparent rounded-tl-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-sky-100 to-transparent rounded-br-3xl pointer-events-none" />
          </div>
        </div>

        <div className="text-center mt-8 text-slate-400 text-sm animate-[fadeIn_1s_ease-out]">
          Tip: If there are no available spots, check back later.
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

function SparkHeaderIcon() {
  // small inline sparkle-ish icon without importing extra
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      className="text-blue-600"
    >
      <path
        d="M12 2l1.2 5.2L18 9l-4.8 1.8L12 16l-1.2-5.2L6 9l4.8-1.8L12 2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M19 13l.6 2.6L22 17l-2.4.9L19 20l-.6-2.1L16 17l2.4-1.4L19 13Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
        opacity="0.8"
      />
    </svg>
  );
}
