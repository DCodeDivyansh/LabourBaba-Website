"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";

import LogoSection from "@/components/auth/LogoSection";
import LoginCard from "@/components/auth/LoginCard";

export default function LoginPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f5f6f8]">
      {/* Background Glow */}
      <motion.div
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-28 -right-28 h-72 w-72 rounded-full bg-orange-200 opacity-40 blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, -20, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-green-200 opacity-40 blur-3xl"
      />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-5">
        <div className="w-full max-w-md">
          {/* Logo */}

          <motion.div
            initial={{
              opacity: 0,
              y: -40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
            }}
          >
            <LogoSection />
          </motion.div>

          {/* Login Card */}

          <motion.div
            initial={{
              opacity: 0,
              y: 60,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.25,
              duration: 0.8,
            }}
          >
            <Suspense fallback={null}>
              <LoginCard />
            </Suspense>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
