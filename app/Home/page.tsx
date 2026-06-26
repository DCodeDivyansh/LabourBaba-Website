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

import TopNavbar from "@/components/TopNavbar";
import BottomNav from "@/components/BottomNav";
import GreetingSection from "@/components/HomePage/GreetingSection";
import LocationCard from "@/components/CreateRequest/LocationCard";

const quickActions = [
  { title: "Book Now", icon: Zap },
  { title: "Schedule", icon: Calendar },
  { title: "Emergency", icon: AlertTriangle, danger: true },
  { title: "Repeat Prev.", icon: History },
];

const stats = [
  { label: "Verified Workers", value: "10k+" },
  { label: "Jobs Completed", value: "50k+" },
  { label: "Background Checked", value: "100%" },
];

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

export default function HomePage() {
  const [showTracking, setShowTracking] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <main className="min-h-screen bg-[#F8F9FB] pb-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-orange-400/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-40 left-0 w-72 h-72 bg-cyan-400/10 blur-[120px] rounded-full" />

      <TopNavbar />

      <section className="max-w-md mx-auto px-4 pt-20 relative z-10">
        {/* Hero: greeting + weather + location combined */}
        <GreetingSection/>

        {/* Promo Carousel — swipeable */}
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
                className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#FF5404] to-[#FF7A33] p-5 shadow-md cursor-grab active:cursor-grabbing"
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

        {/* Quick Actions — horizontal scroll chips */}
        <div className="mt-5 -mx-4 px-4 overflow-x-auto scrollbar-none">
          <div className="flex gap-3 w-max">
            {quickActions.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={item.title}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  className="bg-white border border-[#EFE2DC] rounded-2xl shadow-sm px-4 py-3.5 flex items-center gap-2.5 hover:shadow-md transition-shadow shrink-0"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      item.danger ? "bg-red-50" : "bg-[#FFF1EA]"
                    }`}
                  >
                    <Icon
                      size={15}
                      className={item.danger ? "text-red-500" : "text-[#FF5404]"}
                    />
                  </div>
                  <span className="text-[13px] font-medium text-[#1F2937] whitespace-nowrap">
                    {item.title}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Live Tracking — circular progress style */}
        <AnimatePresence>
          {showTracking && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ delay: 0.3, duration: 0.35 }}
              className="mt-5 bg-white rounded-2xl border border-[#EFE2DC] shadow-sm p-4 relative overflow-hidden"
            >
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#FF5404]/8 rounded-full blur-2xl" />

              <div className="flex items-center gap-3.5 relative">
                {/* Circular ring around avatar instead of glow */}
                <div className="relative shrink-0">
                  <svg width="48" height="48" className="-rotate-90">
                    <circle
                      cx="24"
                      cy="24"
                      r="20"
                      fill="none"
                      stroke="#F1ECE9"
                      strokeWidth="3"
                    />
                    <motion.circle
                      cx="24"
                      cy="24"
                      r="20"
                      fill="none"
                      stroke="#FF5404"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 20}
                      initial={{ strokeDashoffset: 2 * Math.PI * 20 }}
                      animate={{ strokeDashoffset: 2 * Math.PI * 20 * 0.5 }}
                      transition={{ duration: 0.9, delay: 0.4 }}
                    />
                  </svg>
                  <img
                    src="https://i.pravatar.cc/64?img=12"
                    alt="Rajesh M."
                    className="absolute inset-0 m-auto w-9 h-9 rounded-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-semibold text-[#1F2937] truncate">
                    Rajesh M. is arriving
                  </p>
                  <p className="text-xs text-[#FF5404] font-medium">
                    ETA: 12 mins &bull; Electrician
                  </p>
                  <div className="mt-1.5 flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-full bg-[#FFF1EA] text-[#FF5404] text-[10px] font-semibold">
                      On the way
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setShowTracking(false)}
                  className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors shrink-0"
                >
                  <X size={14} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trust & Safety — tile row instead of plain block */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.35 }}
          className="mt-5"
        >
          <p className="flex items-center gap-1.5 text-sm font-semibold text-[#1F2937] mb-2.5 px-1">
            <ShieldCheck size={16} className="text-[#5B5FC7]" />
            Trust & Safety Guaranteed
          </p>

          <div className="grid grid-cols-3 gap-2.5">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.08 }}
                className="bg-[#EEF1FF] rounded-xl py-3 text-center"
              >
                <p className="text-base font-bold text-[#3B3F75]">
                  {stat.value}
                </p>
                <p className="text-[9.5px] text-[#5B5FC7] leading-tight mt-0.5 px-1">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Refer & Earn — illustrated banner style */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.35 }}
          className="mt-4 relative rounded-2xl border border-dashed border-[#FF5404]/40 bg-[#FFF8F4] p-4 flex items-center gap-3 overflow-hidden"
        >
          <div className="absolute -right-4 -top-4 w-20 h-20 bg-[#FF5404]/10 rounded-full blur-xl" />

          <div className="w-10 h-10 shrink-0 rounded-full bg-white shadow-sm flex items-center justify-center relative z-10">
            <Gift size={18} className="text-[#FF5404]" />
          </div>

          <div className="flex-1 min-w-0 relative z-10">
            <p className="text-[14px] font-semibold text-[#1F2937]">
              Refer & Earn ₹200
            </p>
            <p className="text-xs text-[#6B7280]">
              Invite friends to LabourBaba
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="w-9 h-9 shrink-0 rounded-full bg-white shadow-sm flex items-center justify-center text-[#FF5404] relative z-10"
          >
            <Share2 size={15} />
          </motion.button>
        </motion.div>

        <div className="h-4" />
      </section>

      <BottomNav />
    </main>
  );
}
