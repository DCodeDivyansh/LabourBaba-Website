"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { ChevronLeft, Home } from "lucide-react";
import { cancelBooking } from "@/lib/api/booking";

const CANCEL_REASONS = [
  "Worker hasn't arrived",
  "Found someone else",
  "Plans changed",
  "Price is too high",
  "Booked by mistake",
  "Other reason",
];

export default function CancelJobPage() {
  const router = useRouter();
  const { bookingId } = useParams() as { bookingId: string };

  const [selectedReason, setSelectedReason] = useState<string>("");
  const [comments, setComments] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCancelSubmit = async () => {
    if (!selectedReason) {
      setError("Please select a reason for cancellation.");
      return;
    }
    if (!bookingId) return;

    setSubmitting(true);
    setError(null);
    try {
      const finalReason = comments ? `${selectedReason}: ${comments}` : selectedReason;
      const res = await cancelBooking(bookingId, finalReason);
      if (res?.success) {
        router.push(`/WorkerProfile/${bookingId}`);
      } else {
        // Fallback if API returned success=false but no exception
        router.push(`/WorkerProfile/${bookingId}`);
      }
    } catch (err: any) {
      console.error("Failed to cancel booking:", err);
      setError(err.message || "Failed to cancel the booking. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile-styled Container */}
      <div className="relative mx-auto flex min-h-screen max-w-md flex-col bg-[#F8F9FA] shadow-lg">
        {/* Header bar */}
        <header className="flex h-14 items-center justify-between bg-white px-4 border-b border-gray-100 sticky top-0 z-40">
          <button
            onClick={() => router.back()}
            className="flex h-10 w-10 items-center justify-center rounded-full text-slate-700 hover:bg-slate-50 transition"
          >
            <ChevronLeft size={24} />
          </button>
          <span className="font-bold text-lg text-slate-800">Cancel Job</span>
          <button
            onClick={() => router.push("/home")}
            className="flex h-10 w-10 items-center justify-center rounded-full text-slate-700 hover:bg-slate-50 transition"
          >
            <Home size={20} />
          </button>
        </header>

        {/* Body content */}
        <main className="flex-1 overflow-y-auto px-6 py-6 pb-36 space-y-6">
          {/* Logo & Headline */}
          <div className="flex flex-col items-center text-center space-y-3 mt-2">
            <div className="flex items-center gap-1">
              <span className="text-3xl font-extrabold tracking-tight text-slate-905">
                <span className="text-orange-500">Labour</span>
                <span className="text-slate-800">Baba</span>
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Why do you want to cancel?</h2>
            <p className="text-sm text-slate-500 max-w-[280px]">
              Please select a reason to help us improve our service.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl text-sm font-medium">
              {error}
            </div>
          )}

          {/* Multiple Choice Reasons */}
          <div className="space-y-3">
            {CANCEL_REASONS.map((reason) => {
              const isSelected = selectedReason === reason;
              return (
                <button
                  key={reason}
                  onClick={() => {
                    setSelectedReason(reason);
                    setError(null);
                  }}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl border transition text-left ${
                    isSelected
                      ? "border-orange-500 bg-orange-50/50 text-slate-800 font-bold"
                      : "border-gray-200 bg-white text-slate-700 font-medium hover:bg-slate-50"
                  }`}
                >
                  <span className="text-sm md:text-base">{reason}</span>
                  <div
                    className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                      isSelected ? "border-orange-500" : "border-slate-300"
                    }`}
                  >
                    {isSelected && <div className="h-2.5 w-2.5 rounded-full bg-orange-500 animate-scale-up" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Additional Comments (Optional) */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-800 tracking-wide">
              Additional Comments (Optional)
            </label>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Let us know more about why you're cancelling..."
              rows={4}
              className="w-full rounded-2xl border border-gray-200 bg-white p-4 text-sm text-slate-700 placeholder-slate-400 focus:border-orange-500 focus:outline-none transition resize-none"
            />
          </div>
        </main>

        {/* Footer Action */}
        <footer className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-slate-100 shadow-[0_-8px_30px_rgba(0,0,0,0.06)] px-5 py-4 z-40 rounded-t-[2.5rem]">
          <button
            onClick={handleCancelSubmit}
            disabled={submitting}
            className="w-full h-12 rounded-2xl bg-orange-500 text-white font-bold hover:bg-orange-600 transition shadow-md shadow-orange-500/10 disabled:opacity-50 flex items-center justify-center"
          >
            {submitting ? "Confirming..." : "Confirm Cancellation"}
          </button>
        </footer>
      </div>
    </div>
  );
}
