"use client";

import { motion } from "framer-motion";

import CommonHeader from "@/components/CommonHeader";
import BottomNav from "@/components/BottomNav";
import ReviewCard from "@/components/ReviewCard";

const reviews = [
  {
    name: "Sarah J.",
    profession: "Plumbing Services",
    image: "/workers/sarah.jpg",
    rating: 5,
    date: "Oct 24, 2023",
    review:
      "Sarah was incredible! She arrived exactly when she said she would, found the leak under the sink immediately, and had it fixed within 30 minutes. Extremely professional and left the area cleaner than she found it. Highly recommend for any urgent plumbing needs.",
  },

  {
    name: "Michael T.",
    profession: "Furniture Assembly",
    image: "/workers/michael.jpg",
    rating: 4,
    date: "Sep 12, 2023",
    review:
      "Michael did a solid job assembling the large wardrobe. He was a bit late due to traffic but communicated well. The assembly was sturdy and he was polite throughout the process. Would hire again.",
  },

  {
    name: "Elena R.",
    profession: "Deep Cleaning",
    image: "/workers/elena.jpg",
    rating: 5,
    date: "Aug 05, 2023",
    review:
      "Absolutely stellar cleaning service. Elena brought all her own supplies and tackled the stubborn stains in the kitchen that I couldn't get out for months. The whole house smells amazing. Fast and thorough.",
  },
];

export default function ReviewsPage() {
  return (
    <main className="min-h-screen bg-[#F8F9FB] pb-28 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-orange-400/10 blur-[120px] rounded-full" />

      <div className="absolute bottom-40 left-0 w-72 h-72 bg-cyan-400/10 blur-[120px] rounded-full" />

      <CommonHeader title="Reviews Given" />

      <section className="max-w-md mx-auto px-4 pt-24">

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-[38px] font-bold text-[#1F2937]">
            Your Feedback History
          </h1>

          <p className="mt-3 text-[#5F4B42] text-[18px] leading-8">
            Here are the reviews you've left for workers.
            Your feedback helps maintain our high-quality
            community.
          </p>
        </motion.div>

        <div className="mt-10 space-y-6">
          {reviews.map((review, index) => (
            <motion.div
              key={review.name}
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.15,
              }}
            >
              <ReviewCard {...review} />
            </motion.div>
          ))}
        </div>

        <div className="h-10" />
      </section>

      <BottomNav />
    </main>
  );
}