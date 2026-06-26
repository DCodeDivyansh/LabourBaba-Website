"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Zap,
  Calendar,
  AlertTriangle,
  History,
  X,
  ShieldCheck,
  Gift,
  Share2,
  MapPin,
  Sun,
  ArrowRight,
} from "lucide-react";

export default function GreetingSection() {
  return (
    <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative rounded-3xl overflow-hidden bg-[#FFF8F4] p-5 shadow-md"
        >
          {/* subtle orange glow accent */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#FF5404]/25 blur-3xl rounded-full" />

          <div className="relative flex items-start justify-between">
            <div>
              <h1 className="text-xl font-bold text-black flex items-center gap-1.5">
                Good Morning, Divyansh
                <motion.span
                  animate={{ rotate: [0, 20, -10, 20, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 2.5 }}
                  className="inline-block origin-[70%_70%]"
                >
                  👋
                </motion.span>
              </h1>
              <p className="mt-1 text-sm text-black/70 flex items-center gap-1.5">
                <Sun size={14} className="text-amber-400" />
                28°C, Clear skies in Mumbai
              </p>
            </div>
          </div>

          {/* Location pill nested inside hero */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            className="relative mt-4 w-full bg-black/5 hover:bg-white/15 backdrop-blur-sm rounded-2xl p-3 flex items-center gap-3 transition-colors"
          >
            <div className="w-8 h-8 shrink-0 rounded-full bg-[#FF5404]/20 flex items-center justify-center">
              <MapPin size={15} className="text-[#FF8A4C]" />
            </div>
            <div className="flex-1 text-left min-w-0">
              <p className="text-[9.5px] font-semibold tracking-wider text-black/50 uppercase">
                Current Location
              </p>
              <p className="text-[13px] font-medium text-black truncate">
                402, Shiv Shakti Apts, Andheri
              </p>
            </div>
            <ChevronDown size={16} className="text-black/50 shrink-0" />
          </motion.button>
        </motion.div>
  );
}