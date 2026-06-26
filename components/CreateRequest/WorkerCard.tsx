"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Hammer, BriefcaseBusiness, Minus, Plus } from "lucide-react";

interface WorkerCardProps {
  title: string;
  subtitle: string;
  color: "orange" | "blue";
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

export default function WorkerCard({
  title,
  subtitle,
  color,
  count,
  setCount,
}: WorkerCardProps) {
  const orange = color === "orange";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      whileHover={{ y: -3 }}
      className="rounded-3xl border border-orange-200 bg-white p-5 shadow-sm"
    >
      <div className="flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-4">
          <motion.div
            whileHover={{ rotate: 12, scale: 1.08 }}
            className={`flex h-14 w-14 items-center justify-center rounded-full ${
              orange ? "bg-orange-100" : "bg-blue-100"
            }`}
          >
            {orange ? (
              <Hammer size={24} className="text-orange-500" />
            ) : (
              <BriefcaseBusiness size={24} className="text-slate-500" />
            )}
          </motion.div>

          <div>
            <h3 className="text-3xl font-bold text-neutral-900">{title}</h3>

            <p className="mt-1 text-sm text-neutral-500">{subtitle}</p>
          </div>
        </div>

        {/* Counter */}

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="flex items-center rounded-full bg-neutral-100 p-1"
        >
          {/* Minus */}

          <motion.button
            whileTap={{ scale: 0.85 }}
            whileHover={{
              backgroundColor: "#FFF4ED",
            }}
            onClick={() => setCount((c) => Math.max(0, c - 1))}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white"
          >
            <Minus size={18} className="text-orange-500" />
          </motion.button>

          {/* Count */}

          <div className="w-12 text-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={count}
                initial={{
                  opacity: 0,
                  scale: 0.6,
                  y: -8,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.6,
                  y: 8,
                }}
                transition={{
                  duration: 0.18,
                }}
                className="block text-3xl font-bold"
              >
                {count}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Plus */}

          <motion.button
            whileTap={{ scale: 0.85 }}
            whileHover={{
              scale: 1.08,
            }}
            onClick={() => setCount((c) => c + 1)}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg"
          >
            <Plus size={18} />
          </motion.button>
        </motion.div>
      </div>

      {/* Progress */}

      <motion.div
        initial={{ width: 0 }}
        animate={{
          width: `${Math.min(count * 20, 100)}%`,
        }}
        transition={{
          duration: 0.4,
        }}
        className="mt-5 h-2 rounded-full bg-orange-500"
      />
    </motion.div>
  );
}
