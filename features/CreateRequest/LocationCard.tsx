"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPinned, ChevronRight } from "lucide-react";
import {
  getSavedLocation,
  type SavedLocationData,
} from "@/lib/location-storage";

export default function LocationCard() {
  const [savedLocation, setSavedLocation] = useState<SavedLocationData | null>(
    null,
  );

  useEffect(() => {
    const stored = getSavedLocation();
    setSavedLocation(stored);
  }, []);

  return (
    <motion.div
      onClick={() => {
        window.location.href = "/location";
      }}
      initial={{
        opacity: 0,
        y: 35,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.45,
      }}
      whileHover={{
        y: -4,
      }}
      whileTap={{
        scale: 0.99,
      }}
      className="
      rounded-2xl
      border
      border-orange-200
      bg-white
      p-4
      shadow-sm
      cursor-pointer
      "
    >
      <div className="flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-4">
          <motion.div
            animate={{
              scale: [1, 1.12, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            bg-orange-100
            "
          >
            <MapPinned size={22} className="text-orange-500" />
          </motion.div>

          <div>
            <h3 className="font-semibold text-lg">
              {savedLocation ? "Saved Location" : "Select Location"}
            </h3>

            <p className="text-sm text-gray-500">
              {savedLocation?.address || "123 Main St, Sector 4, City"}
            </p>
          </div>
        </div>

        {/* Arrow */}

        <motion.div
          animate={{
            x: [0, 5, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
          }}
        >
          <ChevronRight className="text-gray-500" size={22} />
        </motion.div>
      </div>
    </motion.div>
  );
}
