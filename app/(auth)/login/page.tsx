"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";

import LogoSection from "@/components/auth/LogoSection";
import LoginCard from "@/components/auth/LoginCard";

export default function LoginPage() {
  return (
    <div className="relative flex h-dvh flex-col overflow-hidden bg-[#f5f6f8]">
      {/* Background glow — static, decorative */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-28 -right-28 h-72 w-72 rounded-full bg-orange-200 opacity-40 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-green-200 opacity-40 blur-3xl"
      />

      {/* Content — one flex column, centered as a single unit so the
          logo + card move together and the card never reads as "off" */}
      <div className="relative z-10 flex min-h-0 flex-1 items-center justify-center overflow-y-auto px-4 py-3 sm:px-5 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="w-full max-w-md my-auto"
        >
          <LogoSection />

          <Suspense fallback={<LoginCardSkeleton />}>
            <LoginCard />
          </Suspense>
        </motion.div>
      </div>

      {/* Footer — small anchor so the page doesn't feel like a floating
          modal with nothing below it */}
      <footer className="relative z-10 shrink-0 pb-2 text-center text-[10px] text-gray-400 sm:pb-6 sm:text-xs">
        © {new Date().getFullYear()} LabourBaba. All rights reserved.
      </footer>
    </div>
  );
}

function LoginCardSkeleton() {
  return (
    <div className="w-full animate-pulse rounded-3xl bg-white p-7 shadow-xl ring-1 ring-black/5 sm:p-8">
      <div className="mb-7 h-9 w-2/3 rounded-lg bg-gray-100" />
      <div className="mb-5 h-14 rounded-xl bg-gray-100" />
      <div className="mb-7 h-14 rounded-xl bg-gray-100" />
      <div className="h-14 rounded-full bg-gray-100" />
      <div className="mx-auto mt-6 h-4 w-40 rounded bg-gray-100" />
    </div>
  );
}