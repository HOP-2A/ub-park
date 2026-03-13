"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  House,
  BookMarked,
  MapPin,
  ArrowRight,
  ParkingCircle,
  Map as MapIcon,
} from "lucide-react";

export type placetype = {
  id: string;
  name: string;
  address: string;
  city: string;
  latitude: string;
  longitude: string;
  parkings: string[];
  ownerId: string;
};

export default function Home() {
  const router = useRouter();
  const { isSignedIn, isLoaded, user: clerkUser } = useUser();

  const [places, setPlaces] = useState<placetype[]>([]);
  const [placesLoading, setPlacesLoading] = useState(true);

  // redirect logic (kept same)
  useEffect(() => {
    if (!isLoaded) return;

    if (isSignedIn === false) {
      router.push("/startPage");
      return;
    }

    if (clerkUser?.publicMetadata.role === "OWNER") {
      router.push("/owner/dashbord");
      return;
    }
  }, [clerkUser?.publicMetadata.role, isLoaded, isSignedIn, router]);

  // fetch places
  useEffect(() => {
    const getplaces = async () => {
      setPlacesLoading(true);
      try {
        const response = await fetch("/api/place", { cache: "no-store" });
        const data = await response.json();
        setPlaces(data.message ?? []);
      } catch {
        setPlaces([]);
      } finally {
        setPlacesLoading(false);
      }
    };

    getplaces();
  }, []);

  const displayName =
    clerkUser?.fullName ||
    clerkUser?.username ||
    clerkUser?.primaryEmailAddress?.emailAddress ||
    "User";

  const placeCount = places.length;

  if (!isLoaded) {
    return <FullPageLoading label="Loading your session..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50">
      <div className="flex min-h-screen">
        {/* Sidebar */}
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
              <li>
                <a
                  href="#"
                  className="flex items-center gap-3 px-4 py-3 text-white bg-gradient-to-r from-blue-600 via-sky-500 to-blue-600 rounded-2xl shadow-md shadow-blue-200">
                  <House className="w-5 h-5" />
                  <span className="font-semibold">Home</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-3 px-4 py-3 text-black bg-gradient-to-r  rounded-2xl shadow-md ">
                  <BookMarked className="w-5 h-5" />
                  <span
                    className="font-semibold"
                    onClick={() => router.push(`/myBookings`)}>
                    My Bookings
                  </span>
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
                  <div className="text-xs text-slate-500">Places</div>
                  <div className="text-2xl font-bold text-slate-900">
                    {placesLoading ? "—" : placeCount}
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

        {/* Main */}
        <main className="flex-1 p-6 lg:p-10">
          {/* Header */}
          <div className="mb-8 animate-[fadeIn_0.6s_ease-out]">
            <div className="inline-flex items-center gap-2 text-blue-600 mb-3">
              <MapIcon className="w-5 h-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">
                Nearby places
              </span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                  Choose a parking lot
                </h1>
                <p className="mt-2 text-slate-500 text-lg">
                  Tap a card to view details and reserve.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm w-full md:w-auto">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Total places
                </div>
                <div className="mt-1 text-3xl font-bold text-slate-900">
                  {placesLoading ? "—" : placeCount}
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          {placesLoading ? (
            <PlacesGridSkeleton />
          ) : places.length === 0 ? (
            <EmptyState onRefresh={() => window.location.reload()} />
          ) : (
            <div className="max-h-[calc(100vh-120px)] overflow-y-auto pr-2">
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {places.map((place) => (
                  <Card
                    key={place.id}
                    onClick={() => router.push(`/${place.id}`)}
                    className="cursor-pointer bg-white rounded-3xl shadow-xl border border-slate-200 transition-all duration-300 hover:shadow-2xl  overflow-hidden">
                    <CardFooter className="p-0">
                      {/* top accent */}
                      <div className="h-2 w-full bg-gradient-to-r from-blue-600 via-sky-500 to-blue-600" />
                    </CardFooter>

                    <CardHeader className="space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <CardTitle className="text-xl font-bold text-slate-900 truncate">
                            {place.name}
                          </CardTitle>
                          <div className="mt-1 text-sm text-slate-500 truncate">
                            {place.city}
                          </div>
                        </div>

                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-sky-500 flex items-center justify-center shadow-lg shadow-blue-200 shrink-0">
                          <ParkingCircle className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="text-sm text-slate-700 space-y-3">
                      <div className="rounded-2xl border border-slate-200 bg-blue-50 p-4">
                        <div className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
                          Address
                        </div>
                        <div className="mt-1 font-semibold text-slate-900 line-clamp-2">
                          {place.address}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <MiniStat
                          label="Parking lots"
                          value={String(place.parkings.length)}
                        />
                        <MiniStat label="City" value={place.city || "—"} />
                      </div>
                    </CardContent>

                    <CardAction className="px-6 pb-6">
                      <button
                        type="button"
                        className="relative w-full group overflow-hidden"
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/${place.id}`);
                        }}>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-sky-500 to-blue-600 rounded-2xl transition-all duration-500 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-sky-300 to-blue-400 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

                        <div className="relative px-6 py-4 flex items-center justify-center gap-3 text-white font-bold text-base">
                          <span>PARK HERE</span>
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </button>
                    </CardAction>
                  </Card>
                ))}
              </div>
            </div>
          )}

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
                transform: translateY(-18px);
              }
            }
          `}</style>
        </main>
      </div>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4">
      <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
        {label}
      </div>
      <div className="mt-1 text-xl font-bold text-slate-900 truncate">
        {value}
      </div>
    </div>
  );
}

function PlacesGridSkeleton() {
  return (
    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 animate-[slideUp_0.6s_ease-out]">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="relative bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="h-2 w-full bg-slate-100 animate-pulse" />
          <div className="p-6">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="h-5 w-44 bg-slate-100 rounded-md animate-pulse" />
                <div className="mt-2 h-4 w-24 bg-slate-100 rounded-md animate-pulse" />
              </div>
              <div className="w-12 h-12 bg-slate-100 rounded-2xl animate-pulse" />
            </div>

            <div className="mt-5 rounded-2xl border border-slate-200 bg-blue-50/40 p-4">
              <div className="h-3 w-16 bg-slate-100 rounded-md animate-pulse" />
              <div className="mt-2 h-4 w-full bg-slate-100 rounded-md animate-pulse" />
              <div className="mt-2 h-4 w-3/4 bg-slate-100 rounded-md animate-pulse" />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="h-20 rounded-2xl bg-slate-50 border border-slate-100 animate-pulse" />
              <div className="h-20 rounded-2xl bg-slate-50 border border-slate-100 animate-pulse" />
            </div>

            <div className="mt-5 h-12 rounded-2xl bg-slate-100 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyState({ onRefresh }: { onRefresh: () => void }) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 text-center animate-[fadeIn_0.6s_ease-out]">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-sky-500 rounded-2xl mb-5 shadow-lg shadow-blue-200">
        <MapPin className="w-8 h-8 text-white" />
      </div>
      <h2 className="text-2xl font-bold text-slate-900">No places found</h2>
      <p className="mt-2 text-slate-500">
        There are no parking places available right now.
      </p>
      <div className="mt-6 flex justify-center">
        <Button
          onClick={onRefresh}
          className="rounded-2xl bg-blue-700 hover:bg-blue-800">
          Refresh
        </Button>
      </div>
    </div>
  );
}

function FullPageLoading({ label }: { label: string }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50 flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white rounded-3xl p-8 shadow-xl border border-slate-200 animate-[slideUp_0.8s_ease-out]">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-sky-500 shadow-lg shadow-blue-200 animate-[float_3s_ease-in-out_infinite]" />
          <div className="min-w-0">
            <div className="text-lg font-bold text-slate-900">UBPARK</div>
            <div className="text-sm text-slate-500">{label}</div>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <div className="h-12 rounded-2xl bg-slate-100 animate-pulse" />
          <div className="h-12 rounded-2xl bg-slate-100 animate-pulse" />
          <div className="h-12 rounded-2xl bg-slate-100 animate-pulse" />
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
