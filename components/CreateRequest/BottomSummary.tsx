"use client";

import { motion, animate } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

interface BottomSummaryProps {
  total: number;
}

export default function BottomSummary({ total }: BottomSummaryProps) {
  const [displayTotal, setDisplayTotal] = useState(0);

  useEffect(() => {
    const controls = animate(displayTotal, total, {
      duration: 0.45,
      onUpdate(value) {
        setDisplayTotal(Math.round(value));
      },
    });

    return () => controls.stop();
  }, [total]);

  return (
    <motion.div
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
    </motion.div>
  );
}
