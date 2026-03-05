"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SignInButton, useUser } from "@clerk/nextjs";
import { LogIn, UserPlus, MapPin, Sparkles } from "lucide-react";

export default function StartPage() {
  const { push } = useRouter();
  const { isSignedIn, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded) return;
    if (isSignedIn === true) push("/");
  }, [isLoaded, isSignedIn, push]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50 flex items-center justify-center p-6">
        <div className="w-full max-w-xl bg-white rounded-3xl p-8 shadow-xl border border-blue-100 animate-[slideUp_0.8s_ease-out]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-sky-500 shadow-lg shadow-blue-200 animate-[float_3s_ease-in-out_infinite]" />
            <div className="min-w-0">
              <div className="text-lg font-bold text-slate-900">UBPARK</div>
              <div className="text-sm text-slate-500">Loading...</div>
            </div>
          </div>

          <div className="mt-6 space-y-3">
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
          `}</style>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50 flex items-center justify-center p-6">
      <div className="relative w-full max-w-4xl">
        <div className="text-center mb-10 animate-[fadeIn_0.6s_ease-out]">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-sky-500 rounded-2xl mb-6 shadow-xl shadow-blue-200 animate-[float_3s_ease-in-out_infinite]">
            <MapPin className="w-10 h-10 text-white" />
          </div>

          <h1 className="text-5xl font-bold text-slate-900 mb-3 tracking-tight">
            Welcome to UBPARK
          </h1>
          <p className="text-slate-500 text-lg">
            Sign in to find a parking lot and reserve in seconds.
          </p>
        </div>

        <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-blue-100 animate-[slideUp_0.8s_ease-out] overflow-hidden">
          <div className="grid md:grid-cols-2 gap-6 items-stretch">
            <div className="space-y-5">
              <div className="flex items-center gap-2 text-blue-600">
                <Sparkles className="w-5 h-5" />
                <span className="text-sm font-semibold uppercase tracking-wider">
                  Get started
                </span>
              </div>

              <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                <div className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
                  New here?
                </div>
                <div className="mt-2 text-slate-900 font-bold text-lg">
                  Create an account
                </div>
                <div className="mt-1 text-sm text-slate-600">
                  It takes less than a minute.
                </div>

                <button
                  type="button"
                  onClick={() => push("/signUp")}
                  className="mt-4 relative w-full group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-sky-500 to-blue-600 rounded-2xl transition-all duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-sky-300 to-blue-400 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                  <div className="relative px-6 py-4 flex items-center justify-center gap-3 text-white font-bold">
                    <UserPlus className="w-5 h-5" />
                    <span>SIGN UP</span>
                  </div>
                </button>
              </div>

              <div className="rounded-2xl border border-blue-100 p-4">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Already have an account?
                </div>
                <div className="mt-2 text-slate-900 font-bold text-lg">
                  Sign in
                </div>
                <div className="mt-1 text-sm text-slate-600">
                  Continue where you left off.
                </div>

                <div className="mt-4">
                  <SignInButton mode="modal">
                    <Button className="w-full rounded-2xl bg-blue-700 hover:bg-blue-800 h-12 font-bold flex items-center gap-2">
                      <LogIn className="w-5 h-5" />
                      SIGN IN
                    </Button>
                  </SignInButton>
                </div>
              </div>
            </div>
            <img
              src={
                "https://cdn.britannica.com/70/234870-050-D4D024BB/Orange-colored-cat-yawns-displaying-teeth.jpg"
              }
            />
          </div>
        </div>
        <div></div>

        <div className="text-center mt-8 text-slate-400 text-sm animate-[fadeIn_1s_ease-out]">
          By continuing, you agree to the app’s terms and policies.
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
              transform: translateY(-18px);
            }
          }
        `}</style>
      </div>
    </div>
  );
}
