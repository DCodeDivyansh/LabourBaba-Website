"use client";

import { useRouter } from "next/navigation";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function OtpPage() {
  const router = useRouter();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);

    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <main className="min-h-screen bg-[#F4F6F8]">
      {/* Mobile Container */}
      <div className="relative w-full max-w-md mx-auto min-h-screen flex flex-col overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-orange-500/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-400/20 blur-[120px] rounded-full pointer-events-none" />

        {/* Header */}
        <header className="relative z-10 h-16 bg-white shadow-sm flex items-center px-4">
          <button onClick={() => router.back()}>
            <ArrowLeft size={24} className="text-[#FF5404]" />
          </button>

          <h1 className="ml-4 text-2xl font-bold text-[#FF5404]">
            Verification
          </h1>
        </header>

        {/* Content */}
        <div className="relative z-10 flex-1 px-6 flex flex-col items-center">
          {/* Logo */}
          <div className="mt-10 text-center">
            <Image
              src="/Logo.svg"
              alt="LabourBaba"
              width={280}
              height={90}
              priority
              className="w-[75vw] max-w-70 h-auto mx-auto"
            />

            <p className="mt-3 text-[#6B7280] text-lg tracking-wide">
              Find&nbsp;&nbsp; Book&nbsp;&nbsp; Build
            </p>
          </div>

          {/* Heading */}
          <h2 className="mt-12 text-center font-bold text-[#1F2937] text-[clamp(2rem,5vw,2.5rem)]">
            Verify Your Number
          </h2>

          <p className="mt-4 text-center text-[#6B7280] text-base">
            We have sent a 6-digit code to
          </p>

          <p className="mt-1 text-lg text-[#1F2937] font-medium">
            +91 9876543210
          </p>

          {/* OTP Inputs */}
          <div className="mt-10 w-full max-w-sm">
            <div className="grid grid-cols-6 gap-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="
                    aspect-square
                    w-full
                    border
                    border-[#F2B8A0]
                    rounded-xl
                    bg-transparent
                    text-center
                    text-xl
                    font-semibold
                    outline-none
                    focus:border-[#FF5404]
                    focus:ring-2
                    focus:ring-orange-100
                  "
                />
              ))}
            </div>
          </div>

          {/* Resend */}
          <div className="mt-12 text-center">
            <p className="text-[#6B7280] text-base">Didn't receive the code?</p>

            <button className="mt-4 text-[#C05600] font-medium tracking-wide">
              Resend in 00:30
            </button>
          </div>

          {/* Verify Button */}
          <button
            className="
              mt-12
              w-full
              max-w-sm
              h-14
              rounded-2xl
              bg-[#FF5404]
              text-white
              text-lg
              font-semibold
              flex
              items-center
              justify-center
              gap-2
              shadow-lg
              hover:bg-orange-600
              transition
            "
            onClick={() => router.replace("/home")}
          >
            Verify & Proceed
            <ArrowRight size={22} />
          </button>
        </div>

        {/* Footer */}
        <div className="relative z-10 px-6 pb-6 mt-auto">
          <p className="text-center text-xs text-[#98A2B3] leading-6">
            By continuing, you agree to our Terms of Service
            <br />
            and Privacy Policy.
          </p>
        </div>
      </div>
    </main>
  );
}
