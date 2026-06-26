"use client";

import Image from "next/image";
import {
  User,
  Star,
  MapPin,
  Fingerprint,
  ShieldCheck,
  BadgeCheck,
  Phone,
  X,
  CheckCircle2,
  BriefcaseBusiness,
  Zap,
} from "lucide-react";

import TopHeader from "@/components/CommonHeader";
import PrimaryButton from "@/components/PrimaryButton";

export default function WorkerProfilePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Container */}
      <div className="relative mx-auto flex min-h-screen max-w-107.5 flex-col bg-[#F7F7F7]">

        {/* Header */}
        <TopHeader title="LabourBaba" />

        {/* Body */}
        <main className="flex-1 overflow-y-auto px-6 py-6 pb-44 space-y-8">

          {/* ================= Profile Card ================= */}

          <section className="relative rounded-3xl border border-orange-200 bg-white p-8 shadow-sm">

            <div className="absolute right-0 top-0 flex items-center gap-2 rounded-bl-2xl rounded-tr-3xl bg-[#FF6B00] px-5 py-2 text-sm font-semibold text-white">
              <Zap size={14} />
              Arrives in 15m
            </div>

            <div className="flex flex-col items-center">

              <div className="relative">
                <Image
                  src="/worker.jpg"
                  alt="worker"
                  width={110}
                  height={110}
                  className="rounded-full border-4 border-orange-500 object-cover"
                />

                <span className="absolute bottom-1 right-1 h-5 w-5 rounded-full border-2 border-white bg-green-500" />
              </div>

              <h2 className="mt-6 text-4xl font-bold text-gray-900">
                Rajesh Kumar
              </h2>

              <div className="mt-2 flex items-center gap-2 text-gray-500">
                <BriefcaseBusiness size={18} />
                Labour
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-5">

                <div className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2">
                  <Star
                    size={18}
                    className="fill-orange-500 text-orange-500"
                  />
                  <span className="font-semibold">4.9</span>
                  <span className="text-gray-500">(120+ jobs)</span>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-gray-500" />
                  <span className="text-gray-600">2.5 km away</span>
                </div>

              </div>

            </div>

          </section>

          {/* ================= About ================= */}

          <section className="rounded-3xl border border-orange-200 bg-white p-7 shadow-sm">

            <div className="mb-6 flex items-center gap-3">

              <User
                size={24}
                className="text-orange-500"
              />

              <h3 className="text-3xl font-semibold">
                About
              </h3>

            </div>

            <p className="text-lg leading-9 text-gray-600">
              Professional plumber with over 8 years of experience in
              residential and commercial plumbing. Specialized in
              quick leak repairs, pipe fitting, and bathroom
              renovations. Fully equipped and ready for immediate
              deployment.
            </p>

          </section>

          {/* ================= Verification ================= */}

          <section className="rounded-3xl border border-orange-200 bg-white p-7 shadow-sm">

            <h3 className="mb-8 text-3xl font-semibold">
              Verification
            </h3>

            <div className="space-y-7">

              <VerificationItem
                icon={<Fingerprint size={22} />}
                title="Identity Verified"
              />

              <VerificationItem
                icon={<ShieldCheck size={22} />}
                title="Background Check"
              />

              <VerificationItem
                icon={<BadgeCheck size={22} />}
                title="Skill Assessment"
              />

            </div>

          </section>

          {/* ================= Review ================= */}

          <section className="rounded-3xl border border-orange-200 bg-white p-7 shadow-sm">

            <h3 className="mb-8 text-3xl font-semibold">
              Top Review
            </h3>

            <div className="border-l-4 border-orange-500 pl-5">

              <div className="flex items-center gap-3">

                <div className="text-orange-500">
                  ★★★★★
                </div>

                <span className="text-gray-500">
                  2 days ago
                </span>

              </div>

              <p className="mt-5 text-lg italic leading-8 text-gray-700">
                "Rajesh was incredibly fast. Fixed our burst pipe in
                under 30 minutes. Very professional and clean."
              </p>

              <p className="mt-4 text-xl font-semibold">
                - Anita S.
              </p>

            </div>

            <button className="mt-8 w-full text-center text-lg font-medium text-orange-600 hover:text-orange-700">
              Read All Reviews
            </button>

          </section>

        </main>

        {/* ================= Fixed Footer ================= */}

        <footer
          className="
            fixed
            bottom-0
            left-1/2
            -translate-x-1/2
            w-full
            max-w-107.5
            bg-white
            border-t
            border-gray-200
            shadow-[0_-8px_20px_rgba(0,0,0,0.08)]
            px-5
            py-3
            z-50
          "
        >
          <div className="flex gap-3 mb-3">

            <button
              className="
                flex-1
                h-14
                rounded-2xl
                bg-gray-200
                flex
                items-center
                justify-center
                gap-2
                text-xl
                font-semibold
                hover:bg-gray-300
                transition
              "
            >
              <Phone size={22} />
              Call
            </button>

            <button
              className="
                h-14
                w-20
                rounded-2xl
                border
                border-orange-200
                bg-white
                flex
                items-center
                justify-center
                hover:bg-gray-100
                transition
              "
            >
              <X size={28} />
            </button>

          </div>

          <PrimaryButton
            title="Job Completed"
            className="h-14 rounded-2xl text-lg"
          />
        </footer>

      </div>
    </div>
  );
}

interface VerificationProps {
  icon: React.ReactNode;
  title: string;
}

function VerificationItem({
  icon,
  title,
}: VerificationProps) {
  return (
    <div className="flex items-center justify-between">

      <div className="flex items-center gap-4">

        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-slate-600">
          {icon}
        </div>

        <span className="text-xl text-gray-700">
          {title}
        </span>

      </div>

      <CheckCircle2
        size={28}
        className="fill-green-500 text-green-500"
      />

    </div>
  );
}