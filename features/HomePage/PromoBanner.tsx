"use client";
import { useRouter } from "next/navigation";

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

const promos = [
  {
    tag: "FIRST TIME USER",
    title: "50% Off First Job",
    sub: "Use code WELCOME50",
  },
  {
    tag: "WEEKEND OFFER",
    title: "Free Inspection Visit",
    sub: "Book any service this weekend",
  },
  {
    tag: "REFERRAL BOOST",
    title: "Earn ₹200 Per Friend",
    sub: "No limit on referrals",
  },
];

export default function PromoBanner() {
  const router = useRouter();
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <div className="mt-4">
      <div className="relative overflow-hidden rounded-2xl">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.3 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) {
                setActiveSlide((s) => Math.min(s + 1, promos.length - 1));
              } else if (info.offset.x > 60) {
                setActiveSlide((s) => Math.max(s - 1, 0));
              }
            }}
            className="relative rounded-2xl overflow-hidden bg-linear-to-br from-[#FF5404] to-[#FF7A33] p-5 shadow-md cursor-grab active:cursor-grabbing"
          >
            <div className="absolute -right-4 -bottom-4 opacity-15 text-white">
              <svg width="110" height="110" viewBox="0 0 24 24" fill="none">
                <path
                  d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </div>

            <span className="inline-block text-[10px] font-semibold tracking-wide bg-white/20 text-white px-2.5 py-1 rounded-full">
              {promos[activeSlide].tag}
            </span>

            <h2 className="mt-2.5 text-2xl font-bold text-white leading-tight">
              {promos[activeSlide].title}
            </h2>
            <p className="mt-1 text-sm text-white/85">
              {promos[activeSlide].sub}
            </p>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="mt-3.5 bg-white text-[#FF5404] text-sm font-semibold px-4 py-2 rounded-xl shadow-sm flex items-center gap-1.5"
            >
              Book Now <ArrowRight size={14} />
            </motion.button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Carousel dots */}
      <div className="flex justify-center gap-1.5 mt-3">
        {promos.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveSlide(i)}
            className="transition-all"
            style={{
              width: activeSlide === i ? 18 : 6,
              height: 6,
              borderRadius: 999,
              background: activeSlide === i ? "#FF5404" : "#D8DCE3",
            }}
          />
        ))}
      </div>
    </div>
  );
}
