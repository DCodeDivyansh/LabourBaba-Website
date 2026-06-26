"use client";

import { useState } from "react";
import { LocateFixed, Loader2 } from "lucide-react";

interface CurrentLocationButtonProps {
  onLocationFound: (
    position: [number, number]
  ) => void;
}

export default function CurrentLocationButton({
  onLocationFound,
}: CurrentLocationButtonProps) {
  const [loading, setLoading] = useState(false);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        onLocationFound([
          latitude,
          longitude,
        ]);

        setLoading(false);
      },
      (error) => {
        setLoading(false);

        switch (error.code) {
          case error.PERMISSION_DENIED:
            alert("Location permission denied.");
            break;

          case error.POSITION_UNAVAILABLE:
            alert("Location unavailable.");
            break;

          case error.TIMEOUT:
            alert("Location request timed out.");
            break;

          default:
            alert("Unable to fetch your location.");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  return (
    <button
      onClick={getCurrentLocation}
      disabled={loading}
      className="
        w-full
        h-14
        rounded-2xl
        bg-[#FF5404]
        text-white
        font-semibold
        flex
        items-center
        justify-center
        gap-3
        shadow-lg
        hover:bg-orange-600
        transition-all
        disabled:opacity-70
        disabled:cursor-not-allowed
      "
    >
      {loading ? (
        <>
          <Loader2
            size={20}
            className="animate-spin"
          />
          Detecting Location...
        </>
      ) : (
        <>
          <LocateFixed size={20} />
          Use Current Location
        </>
      )}
    </button>
  );
}