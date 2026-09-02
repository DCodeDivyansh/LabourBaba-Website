"use client";

import { motion } from "framer-motion";

import LogoSection from "@/components/auth/LogoSection";
import SignupCard from "@/components/auth/SignupCard";

export default function SignupPage() {
  return (
    <div className="relative flex h-dvh flex-col overflow-hidden bg-[#f5f6f8]">
      {/* Background glow — static, decorative. Lives ONLY on the page. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-28 -right-28 h-72 w-72 rounded-full bg-orange-200 opacity-40 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-green-200 opacity-40 blur-3xl"
      />

      <div className="relative z-10 flex min-h-0 flex-1 items-center justify-center overflow-y-auto px-4 py-3 sm:px-5 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="w-full max-w-md my-auto"
        >
          <LogoSection />
          <SignupCard />
        </motion.div>
      </div>

      <footer className="relative z-10 shrink-0 pb-2 text-center text-[10px] text-gray-400 sm:pb-6 sm:text-xs">
        © {new Date().getFullYear()} LabourBaba. All rights reserved.
      </footer>
    </div>
  );
}