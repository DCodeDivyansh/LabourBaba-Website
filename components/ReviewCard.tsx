"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface ReviewCardProps {
  name: string;
  profession: string;
  image: string;
  rating: number;
  date: string;
  review: string;
}

export default function ReviewCard({
  name,
  profession,
  image,
  rating,
  date,
  review,
}: ReviewCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-3xl border border-[#E2BFB0] shadow-md p-6"
    >
      {/* Header */}
      <div className="flex justify-between">
        <div className="flex gap-4">
          <Image
            src={image}
            alt={name}
            width={60}
            height={60}
            className="rounded-full object-cover border"
          />

          <div>
            <h2 className="text-[30px] font-bold text-[#1F2937]">
              {name}
            </h2>

            <p className="text-[#5F4B42]">
              {profession}
            </p>
          </div>
        </div>

        <p className="text-sm text-[#5F4B42]">
          {date}
        </p>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1 mt-5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={22}
            fill={star <= rating ? "#FF5404" : "#E5E7EB"}
            color={star <= rating ? "#FF5404" : "#E5E7EB"}
          />
        ))}

        <span className="ml-2 font-semibold text-[#5F4B42]">
          {rating.toFixed(1)}
        </span>
      </div>

      {/* Review */}
      <p className="mt-5 leading-9 text-[18px] text-[#3A3A3A]">
        "{review}"
      </p>
    </motion.div>
  );
}