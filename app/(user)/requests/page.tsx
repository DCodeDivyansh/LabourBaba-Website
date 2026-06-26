"use client";

import { motion } from "framer-motion";

import TopNavbar from "@/components/TopNavbar";
import BottomNav from "@/components/BottomNav";
import BookingCard from "@/components/BookingCard";
import Image from "next/image";

const bookings = [
  {
    id: 1,
    name: "Rakesh Kumar",
    rating: 4.8,
    workerType: "Labour",
    budget: 850,
    status: "active",
    image: "https://i.pravatar.cc/100?img=12",
  },
  {
    id: 2,
    name: "Rajesh Patel",
    rating: 4.9,
    workerType: "Mason",
    budget: 950,
    status: "active",
    image: "https://i.pravatar.cc/100?img=15",
  },
];

export default function RequestsPage() {
  return (
    <main className="min-h-screen bg-[#F8F9FB] pb-24">
      <TopNavbar />

      <section className="mx-auto max-w-md px-4 pt-20">
        {/* Header */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
        >
          <h1 className="text-2xl font-bold text-slate-900">My Bookings</h1>

          <p className="mt-1 text-sm text-slate-500">
            Track your active and completed labour requests.
          </p>
        </motion.div>

        {/* Tabs */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.15,
          }}
          className="mt-6"
        >
          <div className="flex rounded-xl border border-orange-100 bg-white p-1 shadow-sm">
            <button className="flex-1 rounded-lg bg-[#FF5404] py-2 text-sm font-semibold text-white">
              Active (2)
            </button>

            <button className="flex-1 rounded-lg py-2 text-sm font-medium text-slate-500 transition hover:text-orange-500">
              Completed
            </button>

            <button className="flex-1 rounded-lg py-2 text-sm font-medium text-slate-500 transition hover:text-orange-500">
              Cancelled
            </button>
          </div>
        </motion.div>

        {/* Cards */}

        <div className="mt-5 space-y-4">
          {bookings.map((booking, index) => (
            <motion.div
              key={booking.id}
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.1,
              }}
            >
              <BookingCard booking={booking} />
            </motion.div>
          ))}
        </div>
      </section>

      <BottomNav />
    </main>
  );
}
