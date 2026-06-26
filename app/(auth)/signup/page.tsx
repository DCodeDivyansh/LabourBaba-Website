"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  Mail,
  Building2,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#F5F7FA]">
      <div className="w-full max-w-md mx-auto min-h-screen bg-[#F5F7FA] relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-orange-400/30 blur-[120px] rounded-full" />
        <div className="absolute bottom-20 left-0 w-72 h-72 bg-cyan-400/20 blur-[120px] rounded-full" />

        {/* Header */}
        <header className="h-16 bg-white shadow-md flex items-center px-4 relative z-10">
          <button onClick={() => router.back()}>
            <ArrowLeft size={24} className="text-[#FF5404]" />
          </button>

          <h1 className="ml-4 text-2xl font-bold text-[#FF5404]">
            Create Account
          </h1>
        </header>

        {/* Content */}
        <div className="px-6 py-10 relative z-10">
          {/* Logo */}
          <div className="text-center">
            <Image
              src="/logo.svg"
              alt="LabourBaba"
              width={280}
              height={90}
              priority
              className="mx-auto w-[75%] max-w-70 h-auto"
            />

            <p className="mt-3 text-[#6B7280] text-lg tracking-wide">
              Find &amp; Book &amp; Build
            </p>
          </div>

          {/* Form */}
          <div className="mt-10 space-y-5">
            {/* Full Name */}
            <div className="border border-[#F2B8A0] rounded-xl h-14 flex items-center px-4 bg-white">
              <User size={20} className="text-[#6B7280]" />

              <input
                type="text"
                placeholder="Full Name"
                className="flex-1 ml-3 outline-none text-lg"
              />
            </div>

            {/* Mobile */}
            <div className="border border-[#F2B8A0] rounded-xl h-14 overflow-hidden bg-white flex">
              <div className="w-28 border-r flex items-center justify-center gap-2">
                <span>🇮🇳</span>
                <span className="font-medium">+91</span>
              </div>

              <input
                type="tel"
                placeholder="Mobile Number"
                className="flex-1 px-4 outline-none text-lg"
              />
            </div>

            {/* Email */}
            <div className="border border-[#F2B8A0] rounded-xl h-14 flex items-center px-4 bg-white">
              <Mail size={20} className="text-[#6B7280]" />

              <input
                type="email"
                placeholder="Email Address (Optional)"
                className="flex-1 ml-3 outline-none text-lg"
              />
            </div>

            {/* City */}
            <div className="border border-[#F2B8A0] rounded-xl h-14 flex items-center px-4 bg-white">
              <Building2 size={20} className="text-[#6B7280]" />

              <select className="flex-1 ml-3 outline-none bg-transparent text-gray-600">
                <option>Select City</option>
                <option>Lucknow</option>
                <option>Kanpur</option>
                <option>Noida</option>
                <option>Delhi</option>
              </select>

              <ChevronDown size={18} className="text-gray-500" />
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                className="mt-1 w-6 h-6 accent-orange-500"
              />

              <p className="text-sm text-[#6B7280] leading-5">
                By signing up, you agree to our{" "}
                <span className="text-orange-500 underline font-medium">
                  Terms &amp; Conditions
                </span>{" "}
                and{" "}
                <span className="text-orange-500 underline font-medium">
                  Privacy Policy
                </span>
                .
              </p>
            </div>

            {/* Button */}
            <button
              className="
              w-full
              h-14
              bg-[#FF5404]
              rounded-xl
              text-white
              text-xl
              font-semibold
              flex
              items-center
              justify-center
              gap-2
              shadow-lg
              hover:bg-orange-600
              transition
            "
              onClick={() => router.push("/otp")}
            >
              Create Account
              <ArrowRight size={22} />
            </button>

            {/* Login */}
            <p className="text-center text-[#6B7280] text-lg pt-5">
              Already have an account?{" "}
              <Link href="/login" className="text-orange-500 font-semibold">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
