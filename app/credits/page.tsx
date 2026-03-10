"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Users,
  GraduationCap,
  Crown,
  Code2,
  Mail,
  Wrench,
  School,
} from "lucide-react";

export default function CreditsPage() {
  const { push } = useRouter();

  const members = [
    {
      name: "LKHAGVADORJ",
      role: "Team Leader • Full-Stack Engineer",
      description:
        "Led the development of the UBPark platform and coordinated the technical architecture of the project.",
      icon: Crown,
    },
    {
      name: "ENEREL",
      role: "Full-Stack Engineer",
      description:
        "Worked on both frontend and backend systems including booking logic and UI implementation.",
      icon: Code2,
    },
    {
      name: "BATSUKH",
      role: "Full-Stack Engineer",
      description:
        "Helped develop core application features and contributed to system functionality.",
      icon: Code2,
    },
    {
      name: "KHURELBAATAR",
      role: "Full-Stack Engineer",
      description:
        "Collaborated on platform development including database integration and feature support.",
      icon: Code2,
    },
  ];

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Sora:wght@100;200;300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      <main
        className="min-h-screen bg-[#f0f6ff] px-6 py-10"
        style={{ fontFamily: "'Sora', sans-serif" }}
      >
        <div className="mx-auto max-w-5xl">
          {/* Back button */}
          <div className="mb-8">
            <Link
              href="/startPage"
              className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>

          {/* Header */}
          <div className="mb-8 rounded-3xl border border-blue-100 bg-white p-8 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-sky-500 shadow-md">
                <Users className="h-7 w-7 text-white" />
              </div>

              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700">
                    Team Credits
                  </span>
                  <span className="text-sm text-slate-500">Team YOLO</span>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
                  UBPark Development Team
                </h1>

                <p className="text-slate-600 leading-7 max-w-3xl">
                  This project was developed by <strong>Team YOLO</strong> from{" "}
                  <strong>PINECONE ACADEMY</strong> under the guidance of our
                  teachers.
                </p>
              </div>
            </div>
          </div>

          {/* School & Teachers */}
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <div className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <School className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="text-sm font-semibold text-slate-900">
                    PINECONE ACADEMY
                  </div>
                  <div className="text-xs text-slate-500">Our School</div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <GraduationCap className="w-5 h-5 text-sky-600" />
                <div>
                  <div className="text-sm font-semibold text-slate-900">
                    TURBOLD
                  </div>
                  <div className="text-xs text-slate-500">Teacher / Mentor</div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <GraduationCap className="w-5 h-5 text-emerald-600" />
                <div>
                  <div className="text-sm font-semibold text-slate-900">
                    TUGULDUR
                  </div>
                  <div className="text-xs text-slate-500">Teacher / Mentor</div>
                </div>
              </div>
            </div>
          </div>

          {/* Members */}
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-2">
            {members.map((member, index) => {
              const Icon = member.icon;

              return (
                <section
                  key={index}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg transition"
                >
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-sky-500 shadow-md">
                      <Icon className="h-7 w-7 text-white" />
                    </div>

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                      Member {index + 1}
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold text-slate-900 mb-1">
                    {member.name}
                  </h2>

                  <p className="text-sm font-semibold uppercase tracking-wider text-blue-700 mb-4">
                    {member.role}
                  </p>

                  <p className="text-slate-600 leading-7">
                    {member.description}
                  </p>
                </section>
              );
            })}
          </div>

          {/* Footer */}
          <div className="mt-10 text-center text-sm text-slate-500">
            Developed by <strong>Team YOLO</strong> at{" "}
            <strong>PINECONE ACADEMY</strong>.
          </div>
        </div>
      </main>
    </>
  );
}
