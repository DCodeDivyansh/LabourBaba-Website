"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sun, CloudSun, MoonStar, Cloud, CloudRain, MapPin } from "lucide-react";

const INK = "#16181D";
const MUTED = "#6B7280";
const BORDER = "#E6E6E2";
const ACCENT = "#FF5A1F";
const ACCENT_TINT = "rgba(255, 90, 31, 0.10)";

type WeatherCondition = "sunny" | "cloudy" | "rainy" | "clear-night";

interface GreetingSectionProps {
  /** Person's display name. Falls back to a generic greeting if omitted. */
  userName?: string;
  /** e.g. "Lucknow, UP" — pass in real reverse-geocoded location once wired up. */
  location?: string;
  temperatureC?: number;
  weatherCondition?: WeatherCondition;
}

function getGreeting(hour: number) {
  if (hour < 12) return { text: "Good morning", Icon: Sun };
  if (hour < 17) return { text: "Good afternoon", Icon: CloudSun };
  return { text: "Good evening", Icon: MoonStar };
}

function getWeatherIcon(condition: WeatherCondition) {
  switch (condition) {
    case "sunny":
      return Sun;
    case "cloudy":
      return Cloud;
    case "rainy":
      return CloudRain;
    case "clear-night":
      return MoonStar;
    default:
      return Sun;
  }
}

const weatherLabel: Record<WeatherCondition, string> = {
  sunny: "Sunny",
  cloudy: "Cloudy",
  rainy: "Rain",
  "clear-night": "Clear",
};

export default function GreetingSection({
  userName = "there",
  location = "Lucknow, UP",
  temperatureC = 34,
  weatherCondition = "sunny",
}: GreetingSectionProps) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
  }, []);

  const hour = now ? now.getHours() : 9;
  const { text, Icon } = getGreeting(hour);
  const WeatherIcon = getWeatherIcon(weatherCondition);

  const dateStr = now
    ? now.toLocaleDateString("en-IN", { weekday: "long", day: "2-digit", month: "short" })
    : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-white rounded-2xl border p-4"
      style={{ borderColor: BORDER }}
    >
      {/* Greeting row */}
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <motion.h1
            key={text}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="text-xl font-semibold tracking-tight truncate"
            style={{ color: INK }}
          >
            {text}, {userName}
          </motion.h1>
          <p className="mt-1 text-xs tracking-wide" style={{ color: MUTED }}>
            {dateStr}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, delay: 0.15 }}
          className="w-11 h-11 shrink-0 rounded-full flex items-center justify-center"
          style={{ background: ACCENT_TINT }}
        >
          <Icon size={19} style={{ color: ACCENT }} strokeWidth={1.8} />
        </motion.div>
      </div>

      {/* Detail chips: location + weather */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.22 } } }}
        className="mt-3.5 grid grid-cols-2 gap-2"
      >
        <motion.div
          variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-2 rounded-xl border px-3 py-2"
          style={{ borderColor: BORDER }}
        >
          <MapPin size={14} style={{ color: MUTED }} strokeWidth={1.8} />
          <div className="min-w-0">
            <p className="text-xs font-medium truncate" style={{ color: INK }}>
              {location}
            </p>
            <p className="text-[10px]" style={{ color: MUTED }}>
              Current location
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-2 rounded-xl border px-3 py-2"
          style={{ borderColor: BORDER }}
        >
          <WeatherIcon size={14} style={{ color: MUTED }} strokeWidth={1.8} />
          <div className="min-w-0">
            <p className="text-xs font-medium truncate" style={{ color: INK }}>
              {temperatureC}°C · {weatherLabel[weatherCondition]}
            </p>
            <p className="text-[10px]" style={{ color: MUTED }}>
              Weather now
            </p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}