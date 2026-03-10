"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  FileText,
  Shield,
  Globe,
  Mail,
  AlertTriangle,
} from "lucide-react";

export default function TermsPage() {
  const { push } = useRouter();
  const lastUpdated = "March 10, 2026";

  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: [
        "By accessing or using UBPark, you confirm that you have read, understood, and agreed to be bound by these Terms and Conditions. If you do not agree, please do not use the platform.",
      ],
    },
    {
      title: "2. About UBPark",
      content: [
        "UBPark is a platform that allows users to search, reserve, and book available parking spaces. Availability may vary depending on time, location, and third-party parking providers.",
      ],
    },
    {
      title: "3. User Eligibility",
      content: [
        "You must be legally capable of entering binding agreements to use UBPark. By using the service, you confirm that the information you provide is accurate and complete.",
      ],
    },
    {
      title: "4. Account Registration",
      content: [
        "Some features require creating an account. You are responsible for maintaining the confidentiality of your account credentials and for all activity under your account.",
      ],
    },
    {
      title: "5. Booking and Reservations",
      content: [
        "When making a reservation, you agree to provide correct booking details including vehicle information, booking time, and location.",
        "UBPark does not guarantee that every listed parking space will remain available at all times.",
      ],
    },
    {
      title: "6. Payments",
      content: [
        "By making a booking, you agree to pay all applicable fees displayed at checkout including parking fees, reservation fees, and service charges where applicable.",
      ],
    },
    {
      title: "7. Cancellations and Refunds",
      content: [
        "Cancellation and refund eligibility may depend on the parking provider and booking conditions.",
      ],
    },
    {
      title: "8. User Responsibilities",
      content: ["You agree to use UBPark lawfully and responsibly."],
      list: [
        "Provide accurate information",
        "Use parking spaces only during booked times",
        "Follow local traffic and parking laws",
        "Do not misuse parking facilities",
        "Do not attempt unauthorized access to the platform",
      ],
    },
    {
      title: "9. Prohibited Conduct",
      content: [
        "Users may not use UBPark for illegal, fraudulent, or harmful activities including payment fraud, system abuse, or uploading harmful code.",
      ],
    },
    {
      title: "10. Parking Rules",
      content: [
        "Users must comply with all parking rules at the booked location. UBPark is not responsible for fines, towing, or penalties caused by user violations.",
      ],
    },
    {
      title: "11. Limitation of Liability",
      content: [
        "UBPark is not liable for indirect damages, booking errors, parking unavailability, vehicle damage, theft, or delays caused by third parties.",
      ],
    },
    {
      title: "12. Intellectual Property",
      content: [
        "All platform content including logos, design, and software belongs to UBPark and may not be copied or distributed without permission.",
      ],
    },
    {
      title: "13. Privacy",
      content: [
        "Your use of UBPark is also subject to our Privacy Policy which explains how your personal information is handled.",
      ],
    },
    {
      title: "14. Service Availability",
      content: [
        "UBPark may update or suspend parts of the platform at any time. We do not guarantee uninterrupted service.",
      ],
    },
    {
      title: "15. Changes to Terms",
      content: [
        "We may update these Terms periodically. Continued use of UBPark after changes means you accept the revised terms.",
      ],
    },
    {
      title: "16. Termination",
      content: [
        "UBPark may suspend or terminate your access if you violate these Terms or harm the platform or other users.",
      ],
    },
    {
      title: "17. Governing Law",
      content: [
        "These Terms shall be governed by applicable laws in the jurisdiction where the service operates.",
      ],
    },
    {
      title: "18. Contact Us",
      content: [
        "If you have questions about these Terms, please contact UBPark through the website.",
      ],
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
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
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
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-sky-500 flex items-center justify-center shadow-md">
                <FileText className="w-7 h-7 text-white" />
              </div>

              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
                    Terms & Conditions
                  </span>
                  <span className="text-sm text-slate-500">
                    Last updated: {lastUpdated}
                  </span>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
                  UBPark Terms and Conditions
                </h1>

                <p className="text-slate-600 leading-7">
                  These Terms govern your use of the UBPark parking booking
                  platform and services.
                </p>
              </div>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <div className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="text-sm font-semibold">Security</div>
                  <div className="text-xs text-slate-500">
                    Safe platform usage
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-sky-600" />
                <div>
                  <div className="text-sm font-semibold">Platform Rules</div>
                  <div className="text-xs text-slate-500">
                    Clear responsibilities
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <div>
                  <div className="text-sm font-semibold">Liability</div>
                  <div className="text-xs text-slate-500">
                    Important limitations
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-6">
            {sections.map((section, i) => (
              <section
                key={i}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg transition"
              >
                <h2 className="text-xl font-bold text-slate-900 mb-3">
                  {section.title}
                </h2>

                {section.content.map((text, idx) => (
                  <p key={idx} className="text-slate-600 leading-7 mb-2">
                    {text}
                  </p>
                ))}

                {section.list && (
                  <ul className="mt-3 space-y-2">
                    {section.list.map((item, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2 text-slate-600"
                      >
                        <span className="mt-2 w-2 h-2 rounded-full bg-blue-500"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-10 text-center text-sm text-slate-500">
            Your use of UBPark is also subject to our{" "}
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => push("/privacy")}
            >
              Privacy Policy
            </span>
          </div>
        </div>
      </main>
    </>
  );
}
