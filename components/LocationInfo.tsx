"use client";

import {
  MapPin,
  Navigation,
  Globe,
} from "lucide-react";

interface LocationInfoProps {
  position: [number, number];
  address?: string;
}

export default function LocationInfo({
  position,
  address = "Fetching address...",
}: LocationInfoProps) {
  return (
    <div className="bg-white rounded-3xl border border-[#E2BFB0] shadow-lg p-5 space-y-5">
      {/* Address */}
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
          <MapPin
            className="text-[#FF5404]"
            size={22}
          />
        </div>

        <div className="flex-1">
          <p className="text-xs tracking-wider uppercase text-gray-400">
            Selected Address
          </p>

          <p className="mt-1 font-semibold text-[#1F2937] leading-6">
            {address}
          </p>
        </div>
      </div>

      <hr className="border-[#E2BFB0]" />

      {/* Coordinates */}
      <div className="grid grid-cols-2 gap-4">

        {/* Latitude */}
        <div className="rounded-2xl bg-[#FFF8F5] border border-orange-100 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Navigation
              size={18}
              className="text-[#FF5404]"
            />

            <span className="text-sm font-medium text-gray-500">
              Latitude
            </span>
          </div>

          <p className="font-bold text-[#1F2937] text-lg">
            {position[0].toFixed(6)}
          </p>
        </div>

        {/* Longitude */}
        <div className="rounded-2xl bg-[#FFF8F5] border border-orange-100 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Globe
              size={18}
              className="text-[#FF5404]"
            />

            <span className="text-sm font-medium text-gray-500">
              Longitude
            </span>
          </div>

          <p className="font-bold text-[#1F2937] text-lg">
            {position[1].toFixed(6)}
          </p>
        </div>

      </div>

      {/* Info */}
      <div className="rounded-2xl bg-blue-50 border border-blue-100 p-4">
        <p className="text-sm text-blue-700">
          📍 Drag the marker on the map or tap{" "}
          <strong>Use Current Location</strong> to
          update your location.
        </p>
      </div>
    </div>
  );
}