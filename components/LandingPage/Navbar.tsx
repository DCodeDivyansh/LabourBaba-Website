"use client";

import { useRouter } from "next/navigation";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  return (
    <motion.nav
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-md items-center justify-between px-5 py-4">

        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.08, rotate: 5 }}
          animate={{
            y: [0, -3, 0],
          }}
          transition={{
            y: {
              duration: 2,
              repeat: Infinity,
            },
            rotate: {
              duration: 0.3,
            },
          }}
        >
          <Image
            src="/Logo.svg"
            alt="LabourBaba Logo"
            width={198}
            height={60}
            priority
            className="object-contain"
          />
        </motion.div>

        {/* Login Button */}
        <motion.button
          whileHover={{
            scale: 1.05,
            y: -2,
          }}
          whileTap={{
            scale: 0.95,
          }}
          animate={{
            boxShadow: [
              "0px 0px 0px rgba(249,115,22,0)",
              "0px 0px 18px rgba(249,115,22,0.5)",
              "0px 0px 0px rgba(249,115,22,0)",
            ],
          }}
          transition={{
            boxShadow: {
              duration: 2,
              repeat: Infinity,
            },
          }}
          className="group relative overflow-hidden rounded-full bg-orange-500 px-6 py-3 font-semibold text-white shadow-lg"
        >
          {/* Shine Effect */}
          <motion.span
            initial={{ x: "-150%" }}
            whileHover={{ x: "250%" }}
            transition={{ duration: 0.8 }}
            className="absolute inset-y-0 left-0 w-8 -skew-x-12 bg-white/40"
          />

          <span className="relative flex items-center gap-2" onClick={() => router.push("/login")}>
            Login

            <motion.div
              animate={{
                x: [0, 5, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
              }}
            >
              <ArrowRight size={18} />
            </motion.div>
          </span>
        </motion.button>

      </div>
    </motion.nav>
  );
}