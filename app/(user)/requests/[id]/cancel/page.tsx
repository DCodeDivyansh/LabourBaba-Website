"use client";

import { useState } from "react";
import TopHeader from "@/components/CommonHeader";
import Button from "@/components/PrimaryButton";

const reasons = [
  "Worker hasn't arrived",
  "Found someone else",
  "Plans changed",
  "Price is too high",
  "Booked by mistake",
  "Other reason",
];

export default function CancelJobPage() {
  const [selectedReason, setSelectedReason] = useState("");
  const [comments, setComments] = useState("");

  const handleSubmit = () => {
    console.log({
      reason: selectedReason,
      comments,
    });

    // API Call Here
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7] flex flex-col">
      {/* Header */}
      <TopHeader title="Cancel Job" />

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-6 py-5">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img
            src="/Logo.svg"
            alt="LabourBaba"
            className="h-14 object-contain"
          />
        </div>

        {/* Heading */}
        <h1 className="text-[34px] font-bold text-[#222] leading-tight">
          Why do you want to cancel?
        </h1>

        <p className="mt-2 text-[18px] text-gray-500">
          Please select a reason to help us improve our service.
        </p>

        {/* Reasons */}
        <div className="mt-8 space-y-5">
          {reasons.map((reason) => (
            <label
              key={reason}
              className={`flex items-center gap-5 p-5 rounded-2xl border cursor-pointer transition
              ${
                selectedReason === reason
                  ? "border-orange-500 bg-orange-50"
                  : "border-[#F4B79C] bg-white"
              }`}
            >
              <input
                type="radio"
                name="reason"
                checked={selectedReason === reason}
                onChange={() => setSelectedReason(reason)}
                className="w-6 h-6 accent-orange-500"
              />

              <span className="text-[22px] font-medium text-[#222]">
                {reason}
              </span>
            </label>
          ))}
        </div>

        {/* Comments */}
        <div className="mt-8">
          <h2 className="text-[26px] font-semibold text-[#222]">
            Additional Comments (Optional)
          </h2>

          <textarea
            placeholder="Let us know more about why you're cancelling..."
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            rows={5}
            className="mt-4 w-full rounded-2xl border border-[#F4B79C] bg-white p-5 text-[18px] resize-none outline-none focus:border-orange-500"
          />
        </div>
      </div>

      {/* Bottom Button */}
      <div className="bg-white p-6 shadow-[0_-2px_8px_rgba(0,0,0,0.06)]">
        <Button title="Confirm Cancellation" />
      </div>
    </div>
  );
}
