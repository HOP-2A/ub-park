"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Building2,
  Mail,
  Lock,
  User,
  Users,
  ArrowRight,
  MapPin,
} from "lucide-react";

type FormState = {
  email: string;
  password: string;
  userType: "USER" | "OWNER" | "";
  username: string;
};

export default function SignUp() {
  const { push } = useRouter();

  const [value, setValue] = useState<FormState>({
    email: "",
    password: "",
    userType: "USER",
    username: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string>("");

  const handler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value: v, name } = e.target;
    setValue((prev) => ({ ...prev, [name]: v }));
    setError("");
  };

  const canSubmit = useMemo(() => {
    const okEmail = value.email.trim().includes("@");
    const okPass = value.password.trim().length >= 6;
    const okUser = value.username.trim().length >= 3;
    const okType = value.userType === "USER" || value.userType === "OWNER";
    return okEmail && okPass && okUser && okType && !submitting;
  }, [value, submitting]);

  const createUser = async () => {
    if (!canSubmit) return;

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: value.email,
          password: value.password,
          username: value.username,
          type: value.userType,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.message || "Failed to sign up. Please try again.");
        setSubmitting(false);
        return;
      }

      push("/");
    } catch {
      setError("Network error. Please try again.");
      setSubmitting(false);
    }
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50 flex items-center justify-center p-6">
      <div className="relative w-full max-w-5xl">
        {/* Header */}
        <div className="text-center mb-10 animate-[fadeIn_0.6s_ease-out]">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-sky-500 rounded-2xl mb-6 shadow-xl shadow-blue-200 animate-[float_3s_ease-in-out_infinite]">
            <Building2 className="w-10 h-10 text-white" />
          </div>

          <h1 className="text-5xl font-bold text-slate-900 mb-3 tracking-tight">
            Create your account
          </h1>
          <p className="text-slate-500 text-lg">
            Sign up to park faster — choose User or Owner.
          </p>
        </div>

        {/* Layout: form + preview */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Form */}
          <div className="lg:col-span-2 relative bg-white rounded-3xl p-8 shadow-xl border border-blue-100 animate-[slideUp_0.8s_ease-out]">
            <div className="flex items-center gap-2 text-blue-600 mb-6">
              <Users className="w-5 h-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">
                Account details
              </span>
            </div>

            <div className="space-y-6">
              {/* Email */}
              <div className="relative">
                <label className={labelClass}>Email *</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
                  <Input
                    className={inputWithIcon}
                    placeholder="you@example.com"
                    value={value.email}
                    name="email"
                    onChange={handler}
                    type="email"
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="relative">
                <label className={labelClass}>Password *</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
                  <Input
                    className={inputWithIcon}
                    placeholder="At least 6 characters"
                    value={value.password}
                    name="password"
                    onChange={handler}
                    type="password"
                    autoComplete="new-password"
                  />
                </div>
                <div className="mt-2 text-xs text-slate-400">
                  Tip: use 8+ characters for better security.
                </div>
              </div>

              {/* Username */}
              <div className="relative">
                <label className={labelClass}>Username *</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
                  <Input
                    className={inputWithIcon}
                    placeholder="kenomu123"
                    value={value.username}
                    name="username"
                    onChange={handler}
                    type="text"
                    autoComplete="username"
                  />
                </div>
              </div>

              {/* Role */}
              <div className="relative">
                <label className={labelClass}>Account type *</label>
                <select
                  value={value.userType}
                  name="userType"
                  onChange={handler}
                  className={inputBase}
                >
                  <option value="USER">USER (find & reserve)</option>
                  <option value="OWNER">OWNER (create parking lots)</option>
                </select>
                <div className="mt-2 text-xs text-slate-400">
                  You can change role later only if your app supports it.
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  {error}
                </div>
              )}

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={createUser}
                  disabled={!canSubmit}
                  className={[
                    "relative w-full group overflow-hidden",
                    !canSubmit ? "opacity-60 cursor-not-allowed" : "",
                  ].join(" ")}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-sky-500 to-blue-600 rounded-2xl transition-all duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-sky-300 to-blue-400 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

                  <div className="relative px-8 py-5 flex items-center justify-center gap-3 text-white font-bold text-lg">
                    <span>
                      {submitting ? "Creating account..." : "SIGN UP"}
                    </span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </button>

                <div className="mt-4 text-center text-sm text-slate-500">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => push("/startPage")}
                    className="font-semibold text-blue-700 hover:text-blue-800"
                  >
                    Sign in
                  </button>
                </div>
              </div>
            </div>

            {/* subtle corner accents */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-transparent rounded-tl-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-sky-100 to-transparent rounded-br-3xl pointer-events-none" />
          </div>

          {/* Preview */}
          <div className="relative bg-white rounded-3xl p-6 shadow-xl border border-blue-100 animate-[slideUp_0.9s_ease-out] h-fit">
            <div className="flex items-center gap-2 text-blue-600 mb-4">
              <MapPin className="w-5 h-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">
                Preview
              </span>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                <div className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
                  Account
                </div>
                <div className="mt-2 text-lg font-bold text-slate-900">
                  {value.username.trim() || "—"}
                </div>
                <div className="mt-1 text-sm text-slate-600">
                  {value.email.trim() || "—"}
                </div>
                <div className="mt-1 text-sm text-slate-600">
                  Type:{" "}
                  <span className="font-semibold text-slate-900">
                    {value.userType || "—"}
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-blue-100 p-4">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  What you can do
                </div>

                {value.userType === "OWNER" ? (
                  <div className="mt-2 text-sm text-slate-700 space-y-1">
                    <div>• Create parking lots</div>
                    <div>• Set coordinates and spot count</div>
                    <div>• Manage availability</div>
                  </div>
                ) : (
                  <div className="mt-2 text-sm text-slate-700 space-y-1">
                    <div>• Browse parking lots</div>
                    <div>• Check available spots</div>
                    <div>• Reserve quickly</div>
                  </div>
                )}
              </div>

              <div className="text-xs text-slate-400">
                Preview updates live as you type.
              </div>
            </div>

            {/* subtle corner accents */}
            <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-blue-100 to-transparent rounded-tl-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-sky-100 to-transparent rounded-br-3xl pointer-events-none" />
          </div>
        </div>

        <div className="text-center mt-8 text-slate-400 text-sm animate-[fadeIn_1s_ease-out]">
          All fields marked with * are required.
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
