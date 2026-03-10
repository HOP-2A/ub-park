"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SignInButton, useUser } from "@clerk/nextjs";
import { LogIn, UserPlus, MapPin, Sparkles, Clock, Shield } from "lucide-react";

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
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Sora:wght@100;200;300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      <div
        className="min-h-screen flex"
        style={{ fontFamily: "'Sora', sans-serif" }}
      >
        {/* Left Panel - Logo & Branding */}
        <div className="hidden md:flex md:w-1/2 relative flex justify-center items-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 animate-[slideInLeft_0.8s_ease-out]">
          {/* Animated background rings */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/2 left-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-400 animate-[ping_4s_infinite]"></div>
            <div className="absolute top-1/2 left-1/2 w-72 h-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-300 animate-[ping_3s_infinite_1s]"></div>
            <div className="absolute top-1/2 left-1/2 w-48 h-48 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-500 animate-[ping_2s_infinite_0.5s]"></div>
          </div>

          {/* Dot grid pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          ></div>

          <div className="relative z-10 flex flex-col items-center justify-center px-12 text-center">
            {/* Logo Card */}
            <div className="mb-8 p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl animate-[floatRotate_6s_ease-in-out_infinite]">
              <img
                src="/logo.png"
                alt="UBPARK Logo"
                className="w-32 h-32 object-contain"
              />
            </div>

            {/* Brand Title */}
            <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
              UBPARK
            </h1>
            <p className="text-blue-200 text-xl mb-12 max-w-sm leading-relaxed">
              Smart parking solutions for the modern world
            </p>

            {/* Feature Pills */}
            <div className="space-y-4 w-full max-w-sm">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-3">
                <MapPin className="w-5 h-5 text-blue-300" />
                <span className="text-white font-medium">
                  500+ Parking Spots
                </span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-3">
                <Clock className="w-5 h-5 text-sky-300" />
                <span className="text-white font-medium">
                  Reserve in 2 Seconds
                </span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-3">
                <Shield className="w-5 h-5 text-emerald-300" />
                <span className="text-white font-medium">100% Secure</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Auth Options */}
        <div className="w-full md:w-1/2 bg-[#f0f6ff] flex flex-col justify-center items-center px-6 md:px-16 lg:px-24 animate-[slideInRight_0.8s_ease-out]">
          {/* Mobile Logo Header */}
          <div className="md:hidden flex items-center gap-3 mb-8 justify-center">
            <img
              src="/logo.png"
              alt="UBPARK"
              className="w-12 h-12 object-contain"
            />
            <div className="text-2xl font-bold text-slate-900">UBPARK</div>
          </div>

          {/* Welcome Text */}
          <div className="mb-8 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
              Get Started
            </h2>
            <p className="text-slate-600 text-lg">
              Find and reserve parking spots in seconds
            </p>
          </div>

          {/* Auth Cards */}
          <div className="space-y-6">
            {/* Sign Up Card */}
            <div className="group p-6 bg-white rounded-3xl border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-200">
              <div className="flex items-center gap-2 text-blue-600 mb-4">
                <Sparkles className="w-5 h-5" />
                <span className="text-sm font-semibold uppercase tracking-wider">
                  New here?
                </span>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Create Account
              </h3>
              <p className="text-slate-600 mb-6">
                Join thousands of users who save time with smart parking
              </p>

              <button
                type="button"
                onClick={() => push("/signUp")}
                className="w-full group/btn relative overflow-hidden rounded-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-sky-500 to-blue-600 transition-all duration-300 group-hover/btn:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-sky-300 to-blue-400 opacity-0 group-hover/btn:opacity-100 blur-xl transition-opacity duration-300" />
                <div className="relative px-6 py-4 flex items-center justify-center gap-3 text-white font-bold">
                  <UserPlus className="w-5 h-5" />
                  <span>CREATE ACCOUNT</span>
                </div>
              </button>
            </div>

            {/* Sign In Card */}
            <div className="group p-6 bg-white rounded-3xl border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-2 text-slate-500 mb-4">
                <LogIn className="w-5 h-5" />
                <span className="text-sm font-semibold uppercase tracking-wider">
                  Welcome back
                </span>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Sign In
              </h3>
              <p className="text-slate-600 mb-6">Continue where you left off</p>

              <SignInButton mode="modal">
                <Button className="w-full h-14 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-base flex items-center justify-center gap-3 transition-colors duration-200">
                  <LogIn className="w-5 h-5" />
                  SIGN IN
                </Button>
              </SignInButton>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-slate-500 text-sm">
            By continuing, you agree to our{" "}
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => push("/terms")}
            >
              Terms
            </span>{" "}
            and{" "}
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => push("/privacy")}
            >
              Privacy Policy
            </span>
          </div>
          <div
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => push("/credits")}
          >
            CREDITS
          </div>
        </div>

        <style jsx>{`
          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-100px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(100px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          @keyframes floatRotate {
            0%,
            100% {
              transform: translateY(0px) rotate(0deg);
            }
            25% {
              transform: translateY(-10px) rotate(1deg);
            }
            50% {
              transform: translateY(-20px) rotate(0deg);
            }
            75% {
              transform: translateY(-10px) rotate(-1deg);
            }
          }
        `}</style>
      </div>
    </>
  );
}
