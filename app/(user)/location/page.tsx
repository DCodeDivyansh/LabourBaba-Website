"use client";

import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Check } from "lucide-react";

import CommonHeader from "@/components/CommonHeader";
import LoadingSpinner from "@/components/LoadingSpinner";

const MapPicker = dynamic(() => import("@/components/MapPicker"), {
  ssr: false,
  loading: () => <LoadingSpinner message="Loading Map..." />,
});

export default function LocationPage() {
  const router = useRouter();

  const handleConfirm = () => {
    router.back();
  };

  return (
    <main className="min-h-screen bg-[#F8F9FB] pb-28">
      <CommonHeader title="Select Location" />
      <section className="max-w-md mx-auto px-4 pt-6 pb-10">
        {/* Heading */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#1F2937]">
            Choose Your Location
          </h1>
          <p className="mt-2 text-gray-500 leading-6">
            Drag the marker or use your current location to select the exact
            work location.
          </p>
        </div>
        {/* Map */}
        <MapPicker />
      </section>

      {/* Confirm Button Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-4 z-[9999] shadow-[0_-8px_30px_rgba(0,0,0,0.04)]">
        <div className="max-w-md mx-auto">
          <button
            onClick={handleConfirm}
            className="w-full h-12 rounded-2xl bg-[#FF5404] hover:bg-orange-600 text-white font-bold text-center flex items-center justify-center gap-2 shadow-md transition"
          >
            <Check size={18} />
            Confirm Location
          </button>
        </div>
      </div>
    </main>
  );
}
