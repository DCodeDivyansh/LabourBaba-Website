"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { MapPinned, ChevronRight } from "lucide-react";
import {
  getSavedLocation,
  type SavedLocationData,
} from "@/lib/location-storage";
import TopBar from "@/components/CommonHeader";
import WorkerCard from "@/components/CreateRequest/WorkerCard";
import RateInput from "@/components/CreateRequest/RateInput";
import BottomSummary from "@/components/CreateRequest/BottomSummary";

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

  useEffect(() => {
    const stored = getSavedLocation();
    setSavedLocation(stored);
  }, []);
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
        </div>
      </div>

      <BottomSummary total={totalPrice} />
    </main>
  );
}
