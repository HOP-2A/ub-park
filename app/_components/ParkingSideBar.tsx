"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import {
  MapPin,
  Calendar,
  BarChart3,
  ChevronRight,
  Settings,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";

export const ParkingSidebar = (placeId: any) => {
  const { user: clerkUser } = useUser();
  const router = useRouter();

  console.log(placeId.placeId, "plce");

  const displayName =
    clerkUser?.fullName ||
    clerkUser?.username ||
    clerkUser?.primaryEmailAddress?.emailAddress ||
    "User";
  return (
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
            <li
              onClick={() => {
                router.push(`/owner/dashbord/${placeId.placeId}`);
              }}>
              <button className="flex items-center justify-between w-full px-4 py-3 text-slate-600 rounded-xl hover:bg-slate-100 transition-all duration-200 group">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 group-hover:rotate-360 group-hover:scale-110 transition-transform duration-700" />
                  <span className="font-medium">Parking</span>
                </div>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
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
              onClick={() => {
                router.push(`/owner/dashbord/${placeId.placeId}/parking`);
              }}>
              <button className="flex items-center justify-between w-full text-white px-4 py-3 text-slate-600 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl hover:bg-slate-100 transition-all duration-200 group">
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5 group-hover:rotate-360 group-hover:scale-110 transition-transform duration-700" />
                  <span className="font-medium">Edit parking</span>
                </div>
                <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
              </button>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-4">
            Quick Actions
          </p>
          <ul
            className="space-y-1"
            onClick={() => {
              router.push("/owner/dashbord");
            }}>
            <li>
              <button className="flex items-center justify-between w-full px-4 py-3 text-slate-600 rounded-xl hover:bg-slate-100 transition-all duration-200 group">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">My places</span>
                </div>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Bottom section */}
      <div className="p-4 border-t border-slate-200/60 space-y-2">
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
  );
};
