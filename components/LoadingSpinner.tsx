"use client";

import { Loader2, MapPin } from "lucide-react";

interface LoadingSpinnerProps {
  message?: string;
}

export default function LoadingSpinner({
  message = "Loading Map...",
}: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-[500px] rounded-3xl bg-white border border-[#E2BFB0] shadow-lg">

      {/* Icon */}
      <div className="relative">

        <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center">
          <MapPin
            size={34}
            className="text-[#FF5404]"
          />
        </div>

        <Loader2
          size={80}
          className="
            absolute
            -top-3
            -left-3
            text-[#FF5404]
            animate-spin
          "
          strokeWidth={1.5}
        />
      </div>

      {/* Text */}
      <h2 className="mt-6 text-xl font-semibold text-[#1F2937]">
        {message}
      </h2>

      <p className="mt-2 text-gray-500 text-center max-w-xs">
        Please wait while we prepare your map.
      </p>
    </div>
  );
}