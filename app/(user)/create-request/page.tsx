"use client";

import { useEffect, useState, useMemo } from "react";
import { MapPinned, ChevronRight, ArrowRight } from "lucide-react";
import { motion, animate } from "framer-motion";
import {
  getSavedLocation,
  type SavedLocationData,
} from "@/lib/location-storage";
import TopBar from "@/components/CommonHeader";
import WorkerCard from "@/components/CreateRequest/WorkerCard";
import RateInput from "@/components/CreateRequest/RateInput";
import { createJob } from "@/lib/api/job";
export default function NewRequestPage() {
  const [masonCount, setMasonCount] = useState(0);
  const [labourCount, setLabourCount] = useState(0);
  const [masonRate, setMasonRate] = useState("");
  const [labourRate, setLabourRate] = useState("");
  const masonPrice = Number(masonRate || 0);
  const labourPrice = Number(labourRate || 0);
  const totalWorkers = masonCount + labourCount;
  const totalPrice = useMemo(() => {
    return masonCount * masonPrice + labourCount * labourPrice;
  }, [masonCount, labourCount, masonPrice, labourPrice]);
  const [savedLocation, setSavedLocation] = useState<SavedLocationData | null>(
    null,
  );
  const findWorkers = async () => {
    const data = {
      masonCount,
      labourCount,
      masonRate,
      labourRate,
      longitude: savedLocation?.longitude,
      latitude: savedLocation?.latitude,
      location: savedLocation?.address,
      
    };
    await createJob(data);
  };
  useEffect(() => {
    const stored = getSavedLocation();
    setSavedLocation(stored);
  }, []);
  const [displayTotal, setDisplayTotal] = useState(0);
  useEffect(() => {
    const controls = animate(displayTotal, totalPrice, {
      duration: 0.45,
      onUpdate(value) {
        setDisplayTotal(Math.round(value));
      },
    });

    return () => controls.stop();
  }, [totalPrice]);
  return (
    <main className="min-h-screen bg-[#FAFAFA] pb-40">
      <TopBar title={"Create Request"} />
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Mason */}
        <WorkerCard
          title="Mason"
          subtitle="Skilled Construction"
          color="orange"
          count={masonCount}
          setCount={setMasonCount}
        />
        <RateInput
          title="Mason Rate (₹/day)"
          market="Market: ₹700-₹1000"
          value={masonRate}
          onChange={setMasonRate}
          placeholder="e.g. 800"
        />
        {/* Labour */}
        <WorkerCard
          title="Labour"
          subtitle="General Assistance"
          color="blue"
          count={labourCount}
          setCount={setLabourCount}
        />
        <RateInput
          title="Labour Rate (₹/day)"
          market="Market: ₹400-₹600"
          value={labourRate}
          onChange={setLabourRate}
          placeholder="e.g. 500"
        />
        {/* Total */}
        <div className="text-right">
          <p className="text-lg font-semibold text-neutral-700">
            Total Workers:
            <span className="ml-2 text-black">{totalWorkers}</span>
          </p>
        </div>
        {/* Location */}
        <div>
          <h2 className="text-3xl font-bold mb-5">Location</h2>
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
            className="rounded-2xl border border-orange-200 bg-white p-4 shadow-sm cursor-pointer"
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
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100"
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
        </div>
      </div>

      <motion.button
        initial={{ y: 120, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.45,
          ease: "easeOut",
        }}
        className="
        fixed
        bottom-3
        left-1/2
        -translate-x-1/2
        w-[calc(100%-24px)]
        max-w-md
        z-50
      "
      >
        <div
          className="
          rounded-3xl
          border
          border-orange-100
          bg-white/95
          backdrop-blur-xl
          shadow-xl
          p-4
        "
        >
          {/* Total */}
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-500">
                Total Estimate
              </span>

              <motion.span
                key={displayTotal}
                initial={{
                  scale: 0.95,
                  opacity: 0.6,
                }}
                animate={{
                  scale: 1,
                  opacity: 1,
                }}
                transition={{
                  duration: 0.25,
                }}
                className="text-xl font-bold text-gray-900"
              >
                ₹{displayTotal.toLocaleString()}
              </motion.span>
            </div>

            {/* <motion.div
            animate={{
              rotate: [0, 8, -8, 0],
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              bg-orange-100
              text-xl
            "
          >
            💰
          </motion.div> */}
          </div>
          {/* CTA */}
          <motion.button
            whileHover={{
              scale: 1.015,
            }}
            whileTap={{
              scale: 0.97,
            }}
            animate={{
              boxShadow: [
                "0 0 0 rgba(249,115,22,0)",
                "0 0 18px rgba(249,115,22,.3)",
                "0 0 0 rgba(249,115,22,0)",
              ],
            }}
            transition={{
              boxShadow: {
                duration: 2,
                repeat: Infinity,
              },
            }}
            className="
            relative
            w-full
            overflow-hidden
            rounded-2xl
            bg-orange-500
            py-2
            text-base
            font-semibold
            text-white
            shadow-lg
          "
          >
            {/* Shine */}
            <motion.div
              initial={{ x: "-150%" }}
              animate={{ x: "250%" }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
              }}
              className="
              absolute
              inset-y-0
              w-8
              -skew-x-12
              bg-white/30
            "
            />
            <span className="relative flex items-center justify-center gap-2">
              Find Workers Now
              <motion.div
                animate={{
                  x: [0, 4, 0],
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
      </motion.button>
    </main>
  );
}


