"use client";

import { useEffect, useState } from "react";
import { MapPin, Search, Loader2 } from "lucide-react";
import {
  searchLocation,
  LocationResult,
} from "@/lib/geocode";

interface SearchLocationProps {
  onSelectLocation: (
    position: [number, number],
    address: string
  ) => void;
}

export default function SearchLocation({
  onSelectLocation,
}: SearchLocationProps) {
  const [query, setQuery] = useState("");

  const [loading, setLoading] = useState(false);

  const [results, setResults] = useState<LocationResult[]>([]);

  useEffect(() => {
    if (query.trim().length < 3) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);

      const locations = await searchLocation(query);

      setResults(locations);

      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (location: LocationResult) => {
    onSelectLocation(
      [
        Number(location.lat),
        Number(location.lon),
      ],
      location.display_name
    );

    setQuery(location.display_name);

    setResults([]);
  };

  return (
    <div className="relative w-full">

      {/* Search Input */}
      <div className="relative">
        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          value={query}
          placeholder="Search location..."
          onChange={(e) =>
            setQuery(e.target.value)
          }
          className="
            w-full
            h-14
            rounded-2xl
            border
            border-[#E2BFB0]
            bg-white
            pl-12
            pr-12
            outline-none
            focus:border-[#FF5404]
            shadow-sm
          "
        />

        {loading && (
          <Loader2
            size={20}
            className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-[#FF5404]"
          />
        )}
      </div>

      {/* Suggestions */}
      {results.length > 0 && (
        <div
          className="
            absolute
            z-50
            mt-2
            w-full
            bg-white
            rounded-2xl
            shadow-xl
            border
            border-[#E2BFB0]
            overflow-hidden
            max-h-80
            overflow-y-auto
          "
        >
          {results.map((location, index) => (
            <button
              key={index}
              onClick={() =>
                handleSelect(location)
              }
              className="
                w-full
                text-left
                px-4
                py-4
                flex
                gap-3
                hover:bg-orange-50
                transition
                border-b
                last:border-none
              "
            >
              <MapPin
                size={20}
                className="text-[#FF5404] mt-1 shrink-0"
              />

              <span className="text-sm leading-6">
                {location.display_name}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}