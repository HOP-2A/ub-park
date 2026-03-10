"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Shield,
  Lock,
  Eye,
  Database,
  Globe,
  Mail,
} from "lucide-react";

export default function PrivacyPolicyPage() {
  const { push } = useRouter();
  const lastUpdated = "March 10, 2026";

  const sections = [
    {
      title: "1. Information We Collect",
      content: [
        "We may collect personal information that you provide directly to us when you use UBPark, including your name, email address, phone number, vehicle details, payment-related information, and booking details.",
        "We may also collect technical information automatically, such as your IP address, browser type, device information, pages viewed, and usage activity on the platform.",
      ],
    },
    {
      title: "2. How We Use Your Information",
      content: [
        "We use your information to provide and improve our services, process bookings, manage payments, communicate with you, provide customer support, maintain platform security, and comply with legal obligations.",
      ],
      list: [
        "Create and manage your account",
        "Confirm and manage parking reservations",
        "Process transactions and refunds",
        "Send booking updates and service notifications",
        "Improve website performance and user experience",
        "Detect fraud, abuse, and unauthorized access",
      ],
    },
    {
      title: "3. Sharing of Information",
      content: [
        "We may share your information with trusted third parties only when necessary to operate UBPark, such as payment processors, parking providers, hosting services, analytics providers, and legal authorities when required by law.",
        "We do not sell your personal information to third parties.",
      ],
    },
    {
      title: "4. Payment Information",
      content: [
        "Payments made through UBPark may be processed by secure third-party payment providers. We do not store full payment card details unless explicitly stated and lawfully permitted.",
      ],
    },
    {
      title: "5. Cookies and Tracking",
      content: [
        "UBPark may use cookies and similar technologies to remember your preferences, improve site functionality, analyze traffic, and enhance your browsing experience.",
      ],
    },
    {
      title: "6. Data Retention",
      content: [
        "We retain personal information only for as long as necessary to fulfill the purposes described in this Privacy Policy.",
      ],
    },
    {
      title: "7. Data Security",
      content: [
        "We take reasonable administrative, technical, and organizational measures to protect your personal information from unauthorized access, loss, misuse, disclosure, or alteration.",
      ],
    },
    {
      title: "8. Your Rights",
      content: [
        "Depending on your location and applicable law, you may have the right to access, correct, update, or delete your personal information.",
      ],
    },
    {
      title: "9. Third-Party Services",
      content: [
        "UBPark may contain links to third-party services such as payment gateways, map services, analytics tools, or parking operators.",
      ],
    },
    {
      title: "10. Children’s Privacy",
      content: [
        "UBPark is not intended for children without appropriate legal consent where required.",
      ],
    },
    {
      title: "11. International Data Transfers",
      content: [
        "If your information is transferred internationally, we ensure appropriate protection according to applicable laws.",
      ],
    },
    {
      title: "12. Changes to This Policy",
      content: [
        "We may update this Privacy Policy periodically. Changes will be posted on this page.",
      ],
    },
    {
      title: "13. Contact Us",
      content: [
        "If you have any questions regarding this Privacy Policy, please contact us through the website.",
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
                <Shield className="w-7 h-7 text-white" />
              </div>

              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
                    Privacy Policy
                  </span>
                  <span className="text-sm text-slate-500">
                    Last updated: {lastUpdated}
                  </span>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
                  UBPark Privacy Policy
                </h1>

                <p className="text-slate-600 leading-7">
                  This policy explains how UBPark collects, uses, and protects
                  your personal information when using our parking booking
                  platform and services.
                </p>
              </div>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <div className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="text-sm font-semibold">Secure</div>
                  <div className="text-xs text-slate-500">
                    Protected information
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-sky-600" />
                <div>
                  <div className="text-sm font-semibold">Transparent</div>
                  <div className="text-xs text-slate-500">Clear data usage</div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-emerald-600" />
                <div>
                  <div className="text-sm font-semibold">Support</div>
                  <div className="text-xs text-slate-500">Contact anytime</div>
                </div>
              </div>
            </div>
          </div>

          {/* Policy Sections */}
          <div className="space-y-6">
            {sections.map((section, i) => (
              <section
                key={i}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg transition"
              >
                <h2 className="text-xl font-bold text-slate-900 mb-3">
                  {section.title}
                </h2>

                {section.content.map((text, index) => (
                  <p key={index} className="text-slate-600 leading-7 mb-2">
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
            By using UBPark you agree to this policy.{" "}
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => push("/terms")}
            >
              View Terms
            </span>
          </div>
        </div>
      </main>
    </>
  );
}
