"use client";

import { useState } from "react";
import { Calendar, Clock } from "lucide-react";
import { addDays, format } from "date-fns";

export default function ScheduleSelector() {
  const [selectedOption, setSelectedOption] = useState<"Now" | "Later">("Now");

  const [selectedDay, setSelectedDay] = useState<
    "Tomorrow" | "Day After Tomorrow" | null
  >(null);

  const tomorrow = addDays(new Date(), 1);
  const dayAfterTomorrow = addDays(new Date(), 2);

  return (
    <div className="space-y-5">
      {/* Heading */}
      <h2 className="text-[24px] font-bold text-[#1F2937]">
        When do you need them?
      </h2>

      {/* Toggle */}
      <div className="bg-[#F1F3F5] rounded-2xl p-1 flex shadow-sm">
        <button
          onClick={() => {
            setSelectedOption("Now");
            setSelectedDay(null);
          }}
          className={`flex-1 h-14 rounded-xl flex items-center justify-center gap-2 font-medium transition-all duration-300 ${
            selectedOption === "Now"
              ? "bg-white shadow text-[#FF6B00]"
              : "text-gray-600"
          }`}
        >
          <Clock size={18} />
          Now (Urgent)
        </button>

        <button
          onClick={() => setSelectedOption("Later")}
          className={`flex-1 h-14 rounded-xl flex items-center justify-center gap-2 font-medium transition-all duration-300 ${
            selectedOption === "Later"
              ? "bg-white shadow text-[#FF6B00]"
              : "text-gray-600"
          }`}
        >
          <Calendar size={18} />
          Schedule Later
        </button>
      </div>

      {/* Later Options */}
      {selectedOption === "Later" && (
        <div className="bg-white rounded-3xl border border-[#E2BFB0] shadow-lg p-5 animate-in fade-in duration-300">

          <p className="font-semibold text-[#1F2937] mb-4">
            Select Date
          </p>

          <div className="space-y-3">

            {/* Tomorrow */}
            <button
              onClick={() => setSelectedDay("Tomorrow")}
              className={`w-full rounded-2xl border p-4 text-left transition-all ${
                selectedDay === "Tomorrow"
                  ? "border-[#FF6B00] bg-orange-50"
                  : "border-[#E2BFB0] hover:border-[#FF6B00]"
              }`}
            >
              <h3 className="font-semibold text-lg">
                Tomorrow
              </h3>

              <p className="text-gray-500 text-sm">
                {format(tomorrow, "EEEE, dd MMM")}
              </p>
            </button>

            {/* Day After Tomorrow */}
            <button
              onClick={() => setSelectedDay("Day After Tomorrow")}
              className={`w-full rounded-2xl border p-4 text-left transition-all ${
                selectedDay === "Day After Tomorrow"
                  ? "border-[#FF6B00] bg-orange-50"
                  : "border-[#E2BFB0] hover:border-[#FF6B00]"
              }`}
            >
              <h3 className="font-semibold text-lg">
                Day After Tomorrow
              </h3>

              <p className="text-gray-500 text-sm">
                {format(dayAfterTomorrow, "EEEE, dd MMM")}
              </p>
            </button>

          </div>

          {/* Summary */}
          {selectedDay && (
            <div className="mt-6 rounded-2xl bg-orange-50 border border-orange-200 p-4">

              <p className="text-sm text-gray-500">
                Scheduled For
              </p>

              <p className="mt-2 text-lg font-semibold text-[#FF5404]">
                📅{" "}
                {selectedDay === "Tomorrow"
                  ? format(tomorrow, "EEEE, dd MMMM yyyy")
                  : format(
                      dayAfterTomorrow,
                      "EEEE, dd MMMM yyyy"
                    )}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}