"use client";

import { useState } from "react";
import {
  LocateFixed,
  ChevronDown,
  MapPin,
  Edit3,
} from "lucide-react";

export default function LocationCard() {
  const [location, setLocation] = useState(
    "402, Shiv Shakti Apts"
  );

  const [isEditing, setIsEditing] = useState(false);

  const [manualLocation, setManualLocation] =
    useState(location);

  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        // Later replace this with reverse geocoding
        setLocation(
          `Lat: ${latitude.toFixed(
            5
          )}, Lng: ${longitude.toFixed(5)}`
        );

        setIsEditing(false);
      },
      () => {
        alert("Unable to fetch location.");
      }
    );
  };

  const saveLocation = () => {
    if (manualLocation.trim() === "") return;

    setLocation(manualLocation);

    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-[#FF5404] shadow-sm p-4">

      {/* Current Address */}
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
            <LocateFixed className="text-orange-500" />
          </div>

          <div>
            <p className="text-xs tracking-[0.2em] text-gray-400">
              CURRENT LOCATION
            </p>

            <p className="font-semibold text-gray-800">
              {location}
            </p>
          </div>
        </div>

        <ChevronDown className="text-gray-500" />
      </div>

      {/* Buttons */}
      <div className="mt-5 flex gap-3">

        <button
          onClick={useCurrentLocation}
          className="
            flex-1
            h-11
            rounded-xl
            bg-[#FF5404]
            text-white
            font-medium
            flex
            items-center
            justify-center
            gap-2
            hover:bg-orange-600
            transition
          "
        >
          <MapPin size={18} />
          Current
        </button>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="
            flex-1
            h-11
            rounded-xl
            border
            border-[#FF5404]
            text-[#FF5404]
            font-medium
            flex
            items-center
            justify-center
            gap-2
            hover:bg-orange-50
            transition
          "
        >
          <Edit3 size={18} />
          Manual
        </button>
      </div>

      {/* Manual Input */}
      {isEditing && (
        <div className="mt-4 space-y-3">

          <input
            value={manualLocation}
            onChange={(e) =>
              setManualLocation(e.target.value)
            }
            placeholder="Enter your address"
            className="
              w-full
              h-12
              rounded-xl
              border
              border-[#E2BFB0]
              px-4
              outline-none
              focus:border-[#FF5404]
            "
          />

          <button
            onClick={saveLocation}
            className="
              w-full
              h-11
              rounded-xl
              bg-[#FF5404]
              text-white
              font-medium
            "
          >
            Save Location
          </button>
        </div>
      )}
    </div>
  );
}