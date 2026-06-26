"use client";

import { motion } from "framer-motion";

import TopNavbar from "@/components/TopNavbar";
import BottomNav from "@/components/BottomNav";

import {
  Check,
  Car,
  Star,
  Receipt,
  Clock,
} from "lucide-react";

const notifications = [
  {
    id: 1,
    title: "Worker Accepted",
    time: "2m ago",
    icon: Check,
    description:
      "Raju has accepted your plumbing request and is preparing to head out.",
    action: "View details",
  },
  {
    id: 2,
    title: "Worker Arriving",
    time: "15m ago",
    icon: Car,
    description:
      "Suresh (Electrician) is arriving in approximately 5 minutes.",
    highlight: true,
  },
  {
    id: 3,
    title: "Review Request",
    time: "Yesterday",
    icon: Star,
    description:
      "Your carpentry job with Amit was completed. How was the service?",
    review: true,
  },
];

export default function AlertsPage() {
  return (
    <main className="min-h-screen bg-[#F8F9FB] pb-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-orange-400/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-40 left-0 w-72 h-72 bg-cyan-400/10 blur-[120px] rounded-full" />

      <TopNavbar />

      <section className="max-w-md mx-auto px-4 pt-20 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold text-[#1F2937]">Alerts</h1>
          <p className="mt-1 text-[#6B7280] text-sm">
            Stay updated on your recent requests.
          </p>
        </motion.div>

        {/* Notification Cards */}
        <div className="mt-5 space-y-3">
          {notifications.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.35 }}
                whileHover={{ y: -2 }}
                className={`
                  bg-white
                  rounded-2xl
                  border
                  border-[#EFE2DC]
                  shadow-sm
                  hover:shadow-md
                  transition-shadow
                  overflow-hidden
                  ${item.highlight ? "border-l-[3px] border-l-[#FF5404]" : ""}
                `}
              >
                <div className="p-4">
                  <div className="flex gap-3">
                    {/* Icon */}
                    <div className="w-10 h-10 shrink-0 rounded-full bg-[#FFEDE3] flex items-center justify-center">
                      <Icon size={18} className="text-[#FF5404]" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="font-semibold text-[15px] text-[#1F2937] leading-tight">
                          {item.title}
                        </h3>
                        <span className="text-xs text-gray-400 whitespace-nowrap pt-0.5">
                          {item.time}
                        </span>
                      </div>

                      <p className="mt-1 text-[13px] text-[#6B7280] leading-5">
                        {item.description}
                      </p>

                      {/* Accepted */}
                      {item.action && (
                        <button className="mt-2 text-[13px] text-[#FF5404] font-medium hover:underline">
                          {item.action}
                        </button>
                      )}

                      {/* Arriving */}
                      {item.highlight && (
                        <motion.div
                          animate={{
                            boxShadow: [
                              "0 0 0 rgba(255,84,4,0)",
                              "0 0 14px rgba(255,84,4,0.18)",
                              "0 0 0 rgba(255,84,4,0)",
                            ],
                          }}
                          transition={{ duration: 3, repeat: Infinity }}
                          className="mt-3 bg-[#F7F8FA] rounded-xl px-3 py-2.5 flex items-center justify-between"
                        >
                          <div>
                            <p className="text-gray-400 text-[11px] flex items-center gap-1">
                              <Clock size={11} />
                              Est. Arrival
                            </p>
                            <h4 className="font-bold text-[14px] text-[#1F2937]">
                              10:45 AM
                            </h4>
                          </div>

                          <button className="px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold">
                            Track
                          </button>
                        </motion.div>
                      )}

                      {/* Review */}
                      {item.review && (
                        <div className="flex gap-1 mt-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              size={16}
                              className="text-orange-300"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Last Week */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="my-5"
        >
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-[#EFE2DC]" />
            <span className="text-[11px] tracking-widest text-gray-400">
              LAST WEEK
            </span>
            <div className="h-px flex-1 bg-[#EFE2DC]" />
          </div>
        </motion.div>

        {/* Old Notification */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.35 }}
          className="bg-white rounded-2xl border border-[#EFE2DC] shadow-sm p-4"
        >
          <div className="flex gap-3">
            <div className="w-10 h-10 shrink-0 rounded-full bg-gray-100 flex items-center justify-center">
              <Receipt size={18} className="text-gray-500" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start gap-2">
                <h3 className="font-semibold text-[15px] text-[#1F2937]">
                  Payment Confirmed
                </h3>
                <span className="text-xs text-gray-400 whitespace-nowrap pt-0.5">
                  Oct 24
                </span>
              </div>

              <p className="mt-1 text-[13px] text-[#6B7280] leading-5">
                ₹450 paid to Mahesh for cleaning services.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="h-4" />
      </section>

      <BottomNav />
    </main>
  );
}