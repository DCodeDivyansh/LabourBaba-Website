"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Phone,
  Eye,
  Star,
  Circle,
  IndianRupee,
  ChevronRight,
} from "lucide-react";

interface Booking {
  id: number;
  name: string;
  rating: number;
  workerType: string;
  budget: number;
  status: string;
  image: string;
}

interface Props {
  booking: Booking;
}

export default function BookingCard({ booking }: Props) {
  return (
    <motion.div
      whileHover={{
        y: -4,
        scale: 1.01,
      }}
      transition={{
        type: "spring",
        stiffness: 250,
        damping: 18,
      }}
      className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm"
    >
      <div className="flex">
        {/* Orange Strip */}
        <div className="w-1.5 bg-[#FF5404]" />

        <div className="flex-1 p-4">
          {/* Top Row */}

          <div className="flex items-start justify-between">
            {/* Worker */}

            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{
                  rotate: 6,
                  scale: 1.05,
                }}
              >
                <img
                  src={booking.image}
                  alt={booking.name}
                  className="h-12 w-12 rounded-full border border-orange-100 object-cover"
                />
              </motion.div>

              <div>
                <h3 className="font-semibold text-[16px] text-slate-900">
                  {booking.name}
                </h3>

                <div className="mt-1 flex items-center gap-1">
                  <Star size={13} fill="#FDB022" className="text-[#FDB022]" />

                  <span className="text-xs text-slate-500">
                    {booking.rating}
                  </span>
                </div>
              </div>
            </div>

            {/* Budget */}

            <div className="text-right">
              <div className="flex items-center justify-end text-orange-500">
                <IndianRupee size={18} />

                <span className="text-2xl font-bold">{booking.budget}</span>
              </div>

              <p className="text-[11px] text-slate-400">Estimated</p>
            </div>
          </div>

          {/* Middle */}

          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400">Worker Type</p>

              <h4 className="font-semibold text-slate-800">
                {booking.workerType}
              </h4>
            </div>

            <div className="rounded-full bg-green-50 px-3 py-1">
              <div className="flex items-center gap-2">
                <Circle size={8} fill="#16A34A" className="text-green-600" />

                <span className="text-xs font-semibold text-green-700">
                  Active
                </span>
              </div>
            </div>
          </div>

          {/* Divider */}

          <div className="my-4 h-px bg-orange-100" />

          {/* Buttons */}

          <div className="flex gap-2">
            <motion.button
              whileTap={{
                scale: 0.94,
              }}
              whileHover={{
                backgroundColor: "#FFF7ED",
              }}
              className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              border
              border-orange-100
              "
            >
              <Phone size={18} className="text-orange-500" />
            </motion.button>

            <motion.button
              whileTap={{
                scale: 0.96,
              }}
              whileHover={{
                scale: 1.02,
              }}
              className="
              flex-1
              rounded-full
              bg-[#FF5404]
              px-4
              py-2.5
              text-sm
              font-semibold
              text-white
              shadow-lg
            "
            >
              <span className="flex items-center justify-center gap-2">
                <Eye size={17} />
                View Details
                <motion.div
                  animate={{
                    x: [0, 4, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1,
                  }}
                >
                  <ChevronRight size={18} />
                </motion.div>
              </span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
