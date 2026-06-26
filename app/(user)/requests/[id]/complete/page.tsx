"use client";

import { useState } from "react";
import { CalendarDays, Clock3, Home, Star, BadgeCheck } from "lucide-react";

import TopHeader from "@/components/CommonHeader";
import Button from "@/components/PrimaryButton";

const tags = ["Quality Work", "Punctual", "Polite Behavior", "Good Value"];

export default function JobCompletedPage() {
  const [rating, setRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [review, setReview] = useState("");

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((item) => item !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7] flex flex-col">
      <TopHeader title="Job Completed" />

      <div className="flex-1 overflow-y-auto px-6 py-6">
        {/* Worker */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              src="/worker.jpg"
              alt="Worker"
              className="w-28 h-28 rounded-full object-cover"
            />

            <div className="absolute bottom-0 right-0 bg-green-600 rounded-full p-1">
              <BadgeCheck size={18} className="text-white" />
            </div>
          </div>

          <h2 className="mt-4 text-3xl font-semibold text-gray-900">
            Rajesh Kumar
          </h2>

          <p className="text-xl text-gray-500">Plumbing Services</p>
        </div>

        {/* Service Card */}

        <div className="mt-8 rounded-3xl border border-orange-200 bg-white p-6 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="uppercase tracking-[3px] text-sm text-gray-500">
                Service Type
              </p>

              <h3 className="mt-2 text-3xl font-semibold text-orange-600">
                Plumbing Repair
              </h3>
            </div>

            <div className="rounded-full bg-blue-100 px-4 py-2 text-sm text-blue-700">
              #LB-88294
            </div>
          </div>

          <hr className="my-6" />

          <div className="grid grid-cols-2 gap-6">
            <div className="flex gap-3">
              <CalendarDays className="text-slate-500" size={22} />

              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="text-xl font-medium">Oct 24, 2023</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Clock3 className="text-slate-500" size={22} />

              <div>
                <p className="text-sm text-gray-500">Time</p>
                <p className="text-xl font-medium">14:30 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment */}

        <div className="mt-8 overflow-hidden rounded-3xl border border-orange-200 bg-white">
          <div className="bg-gray-100 px-5 py-4 text-3xl font-semibold">
            Payment Summary
          </div>

          <div className="space-y-5 p-5">
            <div className="flex justify-between text-xl">
              <span>Service Fee</span>
              <span>₹ 850.00</span>
            </div>

            <div className="flex justify-between text-xl">
              <span>Safety & Platform Fee</span>
              <span>₹ 49.00</span>
            </div>

            <hr />

            <div className="flex justify-between items-center">
              <span className="text-2xl font-medium">Total Paid</span>

              <span className="text-4xl font-bold text-orange-600">
                ₹ 899.00
              </span>
            </div>
          </div>

          <div className="bg-slate-50 py-3 text-center text-gray-500">
            Paid via Wallet • Ending in 4021
          </div>
        </div>

        {/* Rating */}

        <div className="mt-8 rounded-3xl border border-orange-200 bg-white p-8">
          <h3 className="text-center text-3xl font-semibold">
            Rate your experience
          </h3>

          <div className="mt-6 flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} onClick={() => setRating(star)}>
                <Star
                  size={42}
                  fill={star <= rating ? "#F59E0B" : "transparent"}
                  className={
                    star <= rating ? "text-yellow-400" : "text-gray-300"
                  }
                />
              </button>
            ))}
          </div>

          <p className="mt-3 text-center text-lg text-gray-500">Tap to rate</p>
        </div>

        {/* Tags */}

        <div className="mt-8">
          <p className="mb-4 uppercase tracking-[4px] text-sm font-semibold text-gray-500">
            What stood out?
          </p>

          <div className="flex flex-wrap gap-4">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`rounded-full border px-5 py-3 transition
                ${
                  selectedTags.includes(tag)
                    ? "bg-orange-500 text-white border-orange-500"
                    : "border-orange-200 bg-white"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Review */}

        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Leave a detailed review (optional)"
          rows={5}
          className="mt-8 w-full rounded-3xl border border-orange-200 bg-white p-5 outline-none resize-none focus:border-orange-500"
        />
      </div>

      {/* Bottom */}

      <div className="bg-white p-6 shadow-[0_-2px_10px_rgba(0,0,0,0.06)]">
        <Button
          title="Back to Home"
          icon={<Home size={22} />}
          onClick={() => {}}
          className="w-full"
        />
      </div>
    </div>
  );
}
