"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  Calendar,
  AlertTriangle,
  History,
  X,
  ShieldCheck,
  Gift,
  ArrowRight,
  Bell,
  MapPin,
} from "lucide-react";

import TopNavbar from "@/components/TopNavbar";
import BottomNav from "@/components/BottomNav";
import GreetingSection from "@/components/HomePage/GreetingSection";
import { useFCM } from "@/lib/hooks/useFCM";
import { useAuthStore } from "@/stores/authStore";
import { getSavedLocation } from "@/lib/location-storage";
import { useRouter } from "next/navigation";
import { getJobs } from "@/services/job";
import { getJobBookings } from "@/lib/api/job";

// Haversine distance in km between two lat/lng points.
function distanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// ---- Design tokens ----------------------------------------------------
const INK = "#16181D";
const MUTED = "#6B7280";
const PAGE_BG = "#FAFAF8";
const SURFACE = "#FFFFFF";
const BORDER = "#E6E6E2";
const ACCENT = "#FF5A1F";
const ACCENT_TINT = "rgba(255, 90, 31, 0.10)";
const VERIFIED = "#16794F";
const DANGER = "#D64545";

const quickActions = [
  { title: "Book Now", icon: Zap },
];

const stats = [
  { label: "Verified Workers", value: 10, suffix: "K+" },
  { label: "Jobs Completed", value: 50, suffix: "K+" },
  { label: "Background Checked", value: 100, suffix: "%" },
];

const promos = [
  {
    tag: "First job",
    title: "50% off your first booking",
    sub: "Applied automatically at checkout",
  },
  {
    tag: "This weekend",
    title: "Free inspection visit",
    sub: "Valid on any booking through Sunday",
  },
  {
    tag: "Referral",
    title: "Earn ₹200 per friend",
    sub: "No limit on how many you invite",
  },
];

// Orchestrated page load: children fade up one after another.
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" as const } },
};

// A small solid dot + label — the one recurring status motif used
// for live dispatch, verified stats, and offer tags.
function StatusDot({ color = ACCENT }: { color?: string }) {
  return <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: color }} />;
}

function AnimatedStat({
  value,
  suffix,
  label,
  delay,
}: {
  value: number;
  suffix: string;
  label: string;
  delay: number;
}) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  const start = () => {
    if (started.current) return;
    started.current = true;
    const duration = 800;
    const t0 = performance.now();
    const step = (t: number) => {
      const p = Math.min((t - t0) / duration, 1);
      setCount(Math.round(p * value));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onViewportEnter={start}
      transition={{ duration: 0.4, delay }}
      className="text-center"
    >
      <p className="text-lg font-semibold" style={{ color: INK }}>
        {count}
        {suffix}
      </p>
      <p className="text-[10px] uppercase tracking-wide mt-0.5" style={{ color: MUTED }}>
        {label}
      </p>
    </motion.div>
  );
}

export default function HomePage() {
  const router = useRouter();
  const [showTracking, setShowTracking] = useState(false);
  const [activeBooking, setActiveBooking] = useState<any | null>(null);
  const [activeJob, setActiveJob] = useState<any | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [hideNotificationBanner, setHideNotificationBanner] = useState(false);
  const { permission, requestPermission, isLoading, error, isFCMEnabled } = useFCM();
  const user = useAuthStore((state) => state.user);
  const firstName = user?.name ? user.name.split(" ")[0] : "Guest";
  const [savedLocation, setSavedLocation] = useState("Lucknow, UP");

  useEffect(() => {
    const loc = getSavedLocation();
    if (loc?.address) {
      setSavedLocation(loc.address);
    }
  }, []);

  useEffect(() => {
    const fetchRecentDispatch = async () => {
      try {
        const jobs = await getJobs();
        if (jobs.length === 0) {
          setShowTracking(false);
          return;
        }

        // Sort by created_at descending to get the most recent job
        const sortedJobs = [...jobs].sort(
          (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        const mostRecentJob = sortedJobs[0];

        // Fetch bookings for this job to see if there is an active worker assigned
        const bookingsRes = await getJobBookings(mostRecentJob.id);
        const bookings = Array.isArray(bookingsRes?.data)
          ? bookingsRes.data
          : Array.isArray(bookingsRes)
            ? bookingsRes
            : [];

        // Find the active booking (not completed or cancelled)
        const active = bookings.find(
          (b: any) =>
            b.status !== "COMPLETED" &&
            b.status !== "CANCELLED" &&
            b.status !== "completed" &&
            b.status !== "cancelled"
        );

        setActiveJob(mostRecentJob);

        if (active && active.worker) {
          setActiveBooking(active);
          setShowTracking(true);
        } else if (mostRecentJob.status === "OPEN" || mostRecentJob.status === "PENDING") {
          setActiveBooking(null);
          setShowTracking(true);
        } else {
          setActiveBooking(null);
          setActiveJob(null);
          setShowTracking(false);
        }
      } catch (err) {
        console.error("Failed to load active dispatch tracking:", err);
        setShowTracking(false);
      }
    };

    fetchRecentDispatch();
  }, []);

  const weatherData = { temp: 28, condition: "sunny" as const };

  // Calculate dynamic ETA based on distance
  const distance =
    activeBooking?.job?.latitude != null &&
      activeBooking?.job?.longitude != null &&
      activeBooking?.worker?.latitude != null &&
      activeBooking?.worker?.longitude != null
      ? distanceKm(
        activeBooking.job.latitude,
        activeBooking.job.longitude,
        activeBooking.worker.latitude,
        activeBooking.worker.longitude
      )
      : null;

  const etaMins = distance ? Math.max(5, Math.round(distance * 5)) : 12;

  return (
    <main className="min-h-screen pb-24" style={{ background: PAGE_BG }}>
      <TopNavbar />

      <motion.section
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-md mx-auto px-4 pt-20"
      >
        {/* Notification permission */}
        {/* <AnimatePresence>
          {isFCMEnabled && permission === "default" && !hideNotificationBanner && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="mb-4 bg-white rounded-2xl border p-4"
              style={{ borderColor: BORDER }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: ACCENT_TINT }}
                >
                  <Bell size={16} style={{ color: ACCENT }} strokeWidth={1.8} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold" style={{ color: INK }}>
                    Stay updated
                  </h4>
                  <p className="text-xs mt-0.5" style={{ color: MUTED }}>
                    Get notified when your worker is on the way
                  </p>
                </div>
                <button onClick={() => setHideNotificationBanner(true)} style={{ color: "#B4B4AE" }}>
                  <X size={16} />
                </button>
              </div>
              <div className="mt-3 flex gap-2">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={requestPermission}
                  disabled={isLoading}
                  className="flex-1 text-sm font-medium py-2 rounded-xl disabled:opacity-60"
                  style={{ background: ACCENT, color: "#fff" }}
                >
                  {isLoading ? "Setting up…" : "Enable notifications"}
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setHideNotificationBanner(true)}
                  disabled={isLoading}
                  className="px-4 text-sm font-medium py-2 rounded-xl border disabled:opacity-50"
                  style={{ borderColor: BORDER, color: INK }}
                >
                  Not now
                </motion.button>
              </div>
              {error && (
                <p className="mt-2 text-xs p-2 rounded-lg" style={{ background: "#FBEDED", color: DANGER }}>
                  {error}
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence> */}

        {/* Greeting */}
        <motion.div variants={item}>
          <GreetingSection
            userName={firstName}
            location={savedLocation}
            temperatureC={weatherData.temp}
            weatherCondition={weatherData.condition}
          />
        </motion.div>

        {/* Offer carousel */}
        <motion.div variants={item} className="mt-4">
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
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
                className="relative bg-white rounded-2xl border p-5 cursor-grab active:cursor-grabbing overflow-hidden"
                style={{ borderColor: BORDER }}
              >
                <span className="absolute left-0 top-0 bottom-0 w-1" style={{ background: ACCENT }} />

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs font-medium" style={{ color: ACCENT }}>
                    <StatusDot />
                    {promos[activeSlide].tag}
                  </span>
                  <span className="text-xs tabular-nums" style={{ color: MUTED }}>
                    {String(activeSlide + 1).padStart(2, "0")} / {String(promos.length).padStart(2, "0")}
                  </span>
                </div>

                <h2 className="mt-2.5 text-lg font-semibold tracking-tight leading-snug" style={{ color: INK }}>
                  {promos[activeSlide].title}
                </h2>
                <p className="mt-1 text-sm" style={{ color: MUTED }}>
                  {promos[activeSlide].sub}
                </p>

                <motion.button
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-4 text-sm font-medium px-4 py-2 rounded-xl flex items-center gap-1.5"
                  style={{ background: INK, color: "#fff" }}
                >
                  Book now <ArrowRight size={13} />
                </motion.button>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-1.5 mt-3">
            {promos.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveSlide(i)}
                aria-label={`Show offer ${i + 1}`}
                className="transition-all"
                style={{
                  width: activeSlide === i ? 14 : 5,
                  height: 5,
                  borderRadius: 999,
                  background: activeSlide === i ? ACCENT : BORDER,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Quick actions */}
        <motion.div variants={item} className="mt-5 -mx-4 px-4 overflow-x-auto scrollbar-none">
          <div className="flex gap-2.5 w-max">
            {quickActions.map((qa) => {
              const Icon = qa.icon;
              return (
                <motion.button
                  key={qa.title}
                  whileHover={{ y: -2, boxShadow: "0 6px 16px rgba(22,24,29,0.08)" }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => router.push("/create-request")}
                  className="bg-white rounded-xl px-4 py-3.5 flex flex-col items-center gap-1.5 shrink-0 border"
                  style={{ borderColor: BORDER, width: 82 }}
                >
                  <Icon size={17} strokeWidth={1.8} style={{ color: INK }} />
                  <span className="text-[11px] font-medium text-center leading-tight" style={{ color: INK }}>
                    {qa.title}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Dispatch tracking */}
        <AnimatePresence>
          {showTracking && (
            <motion.div
              variants={item}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, scale: 0.97 }}
              onClick={() => {
                if (activeBooking) {
                  router.push(`/WorkerProfile/${activeBooking.id}`);
                } else if (activeJob) {
                  router.push(`/waiting/${activeJob.id}`);
                }
              }}
              className="mt-5 bg-white rounded-2xl border p-4 cursor-pointer hover:border-orange-200 transition"
              style={{ borderColor: BORDER }}
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-medium" style={{ color: MUTED }}>
                  <motion.span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: ACCENT }}
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                  />
                  {activeBooking ? "Dispatch active" : "Search active"}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowTracking(false);
                  }}
                  style={{ color: "#B4B4AE" }}
                >
                  <X size={14} />
                </button>
              </div>

              {activeBooking && activeBooking.worker ? (
                <div className="mt-3 flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-orange-50 flex items-center justify-center shrink-0 text-orange-500 font-bold border border-orange-100 overflow-hidden">
                    {activeBooking.worker.avatar ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={activeBooking.worker.avatar}
                        alt={activeBooking.worker.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      activeBooking.worker.name
                        .split(" ")
                        .slice(0, 2)
                        .map((w: string) => w[0]?.toUpperCase() || "")
                        .join("")
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate" style={{ color: INK }}>
                      {activeBooking.worker.name}
                    </p>
                    <p className="text-xs" style={{ color: MUTED }}>
                      {activeBooking.worker.skill_type || activeBooking.job_requirement?.skill_type || "Labour"}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-semibold animate-pulse" style={{ color: ACCENT }}>
                      {etaMins} min
                    </p>
                    <p className="flex items-center gap-1 text-[11px] justify-end" style={{ color: MUTED }}>
                      <MapPin size={10} />
                      ETA
                    </p>
                  </div>
                </div>
              ) : activeJob ? (
                <div className="mt-3 flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-orange-50 flex items-center justify-center shrink-0 text-orange-500 font-bold border border-orange-100 overflow-hidden animate-pulse">
                    <Zap size={18} className="fill-orange-500 text-orange-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate" style={{ color: INK }}>
                      Looking for workers...
                    </p>
                    <p className="text-xs truncate" style={{ color: MUTED }}>
                      {activeJob.location}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-semibold animate-pulse" style={{ color: ACCENT }}>
                      Searching
                    </p>
                    <p className="flex items-center gap-1 text-[11px] justify-end" style={{ color: MUTED }}>
                      Status
                    </p>
                  </div>
                </div>
              ) : null}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trust & safety */}
        <motion.div variants={item} className="mt-6 bg-white rounded-2xl border p-4" style={{ borderColor: BORDER }}>
          <p className="flex items-center gap-1.5 text-xs font-medium mb-3" style={{ color: INK }}>
            <ShieldCheck size={14} style={{ color: VERIFIED }} strokeWidth={1.8} />
            Trust & safety
          </p>
          <div className="grid grid-cols-3">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={i > 0 ? "border-l" : ""}
                style={{ borderColor: BORDER }}
              >
                <AnimatedStat value={stat.value} suffix={stat.suffix} label={stat.label} delay={i * 0.08} />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Refer & earn */}
        <motion.div
          variants={item}
          whileHover={{ y: -2, boxShadow: "0 6px 16px rgba(22,24,29,0.08)" }}
          className="mt-5 bg-white rounded-2xl border p-4 flex items-center gap-3"
          style={{ borderColor: BORDER }}
        >
          <div
            className="w-10 h-10 shrink-0 rounded-full flex items-center justify-center"
            style={{ background: ACCENT_TINT }}
          >
            <Gift size={17} style={{ color: ACCENT }} strokeWidth={1.8} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold" style={{ color: INK }}>
              Refer & earn ₹200
            </p>
            <p className="text-xs" style={{ color: MUTED }}>
              Invite a friend to LabourBaba
            </p>
          </div>
          <motion.button
            whileTap={{ scale: 0.96 }}
            className="text-sm font-medium px-3.5 py-2 rounded-xl"
            style={{ background: INK, color: "#fff" }}
          >
            Share
          </motion.button>
        </motion.div>

        <div className="h-4" />
      </motion.section>

      <BottomNav />
    </main>
  );
}