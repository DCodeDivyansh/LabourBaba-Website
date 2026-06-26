"use client";

import dynamic from "next/dynamic";

import CommonHeader from "@/components/CommonHeader";
import LoadingSpinner from "@/components/LoadingSpinner";

const MapPicker = dynamic(
  () => import("@/components/MapPicker"),
  {
    ssr: false,
    loading: () => (
      <LoadingSpinner message="Loading Map..." />
    ),
  }
);

export default function LocationPage() {
  return (
    <main className="min-h-screen bg-[#F8F9FB]">

      <CommonHeader title="Select Location" />

      <section className="max-w-md mx-auto px-4 pt-6 pb-10">

        {/* Heading */}
        <div className="mb-6">

          <h1 className="text-3xl font-bold text-[#1F2937]">
            Choose Your Location
          </h1>

          <p className="mt-2 text-gray-500 leading-6">
            Drag the marker or use your current location to
            select the exact work location.
          </p>

        </div>

        {/* Map */}
        <MapPicker />

      </section>

    </main>
  );
}