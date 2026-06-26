"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function LogoSection() {
  return (
    <div className="mb-10 text-center">
      {/* Animated Logo */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9,
          y: -20,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
        className="flex justify-center"
      >
        <motion.div
          animate={{
            y: [0, -6, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Image
            src="/logo.svg"
            alt="LabourBaba Logo"
            width={300}
            height={90}
            priority
            className="select-none"
          />
        </motion.div>
      </motion.div>

      {/* Tagline */}
      <motion.p
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.35,
          duration: 0.6,
        }}
        className="mt-3 text-xl tracking-wide text-[#6a5447]"
      >
        Find&nbsp;&nbsp;Book&nbsp;&nbsp;Build
      </motion.p>

      {/* Decorative Line */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: 80 }}
        transition={{
          delay: 0.6,
          duration: 0.5,
        }}
        className="mx-auto mt-4 h-1 rounded-full bg-linear-to-r from-orange-400 via-orange-500 to-green-500"
      />
    </div>
  );
}
