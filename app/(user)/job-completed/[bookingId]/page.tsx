"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { ChevronLeft, Calendar, Clock, Star, Heart, CheckCircle2, Home } from "lucide-react";
import { getBooking, confirmCompleteBooking } from "@/lib/api/booking";

const FEEDBACK_TAGS = ["Quality Work", "Punctual", "Polite Behavior", "Good Value"];

function formatDate(dateStr?: string) {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatTime(dateStr?: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export default function JobCompletedPage() {
  const router = useRouter();
  const { bookingId } = useParams() as { bookingId: string };

  const [booking, setBooking] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [commentText, setCommentText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!bookingId) return;
    const fetchBooking = async () => {
      try {
        const res = await getBooking(bookingId);
        if (res?.success && res.data) {
          setBooking(res.data);
        } else if (res?.data) {
          setBooking(res.data);
        } else {
          setBooking(res);
        }
      } catch (err: any) {
        console.error("Failed to load booking details:", err);
        setError("Failed to load booking details.");
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, [bookingId]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleFinish = async () => {
    if (!bookingId) return;
    setSubmitting(true);
    try {
      // Assemble final review comment with selected tags
      let finalComment = commentText;
      if (selectedTags.length > 0) {
        const tagsStr = selectedTags.map(t => `#${t.replace(/\s+/g, '')}`).join(" ");
        finalComment = finalComment ? `${tagsStr} | ${finalComment}` : tagsStr;
      }

      await confirmCompleteBooking(bookingId, {
        rating: rating || 5, // Default to 5 if no stars selected
        comment: finalComment || "Job completed successfully.",
      });
      router.push("/home");
    } catch (err) {
      console.error("Failed to submit review:", err);
      // Fallback
      router.push("/home");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 rounded-full border-4 border-orange-500 border-t-transparent animate-spin" />
          <p className="text-gray-600 font-medium">Preparing booking summary...</p>
        </div>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-red-100 shadow-sm text-center space-y-4">
          <p className="text-red-500 font-semibold text-lg">{error || "Booking details not found."}</p>
          <button
            onClick={() => router.push("/home")}
            className="px-6 py-2.5 bg-orange-500 text-white rounded-2xl font-medium hover:bg-orange-600 transition"
          >
            Go back Home
          </button>
        </div>
      </div>
    );
  }

  const worker = booking.worker;
  const req = booking.job_requirement;

  // Generate initials for avatar fallback
  const initials = worker?.name
    ? worker.name
        .split(" ")
        .slice(0, 2)
        .map((w: string) => w[0]?.toUpperCase() || "")
        .join("")
    : "?";

  const serviceFee = req?.rate_per_day || 850;
  const platformFee = 49;
  const totalPaid = serviceFee + platformFee;

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
          <span className="font-bold text-lg text-slate-800">Job Completed</span>
          <button
            onClick={() => router.push("/home")}
            className="flex h-10 w-10 items-center justify-center rounded-full text-slate-700 hover:bg-slate-50 transition"
          >
            <Home size={20} />
          </button>
        </header>

        {/* Body content */}
        <main className="flex-1 overflow-y-auto px-5 py-6 pb-28 space-y-6">
          {/* Worker Avatar & Name */}
          <div className="flex flex-col items-center text-center mt-2">
            <div className="relative">
              <div className="h-20 w-20 rounded-full border-2 border-orange-500 bg-slate-100 flex items-center justify-center overflow-hidden shadow-md">
                {worker?.avatar ? (
                  <Image
                    src={worker.avatar}
                    alt={worker.name || "Worker"}
                    width={80}
                    height={80}
                    className="object-cover h-full w-full"
                  />
                ) : (
                  <span className="text-2xl font-extrabold text-orange-500">{initials}</span>
                )}
              </div>
              <span className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full border border-white bg-green-500 text-white shadow-sm">
                <CheckCircle2 size={12} className="fill-green-500" />
              </span>
            </div>
            <h2 className="mt-3 text-xl font-extrabold text-slate-900 tracking-tight">{worker?.name || "Rajesh Kumar"}</h2>
            <p className="text-xs text-slate-500 font-bold tracking-wide uppercase">
              {worker?.skill_type || req?.skill_type || "Plumbing Services"}
            </p>
          </div>

          {/* Service Details Card */}
          <section className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">SERVICE TYPE</span>
                <h3 className="text-lg font-black text-orange-500 leading-tight">
                  {req?.skill_type || worker?.skill_type || "General Repair"}
                </h3>
              </div>
              <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold font-mono shadow-sm">
                #{bookingId ? bookingId.substring(0, 8).toUpperCase() : "LB-88294"}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-slate-50 pt-3">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500">
                  <Calendar size={16} />
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 tracking-wide uppercase">Date</span>
                  <span className="text-sm font-semibold text-slate-700">{formatDate(booking.created_at)}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500">
                  <Clock size={16} />
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 tracking-wide uppercase">Time</span>
                  <span className="text-sm font-semibold text-slate-700">{formatTime(booking.created_at)}</span>
                </div>
              </div>
            </div>
          </section>

          {/* Payment Summary */}
          <section className="rounded-3xl border border-gray-100 bg-white overflow-hidden shadow-sm">
            <div className="bg-slate-100 px-5 py-3 border-b border-slate-200/50">
              <h4 className="font-bold text-sm text-slate-800 uppercase tracking-wide">Payment Summary</h4>
            </div>
            <div className="p-5 space-y-3">
              <div className="flex justify-between text-sm text-slate-600 font-medium">
                <span>Service Fee</span>
                <span>₹{serviceFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-600 font-medium">
                <span>Safety & Platform Fee</span>
                <span>₹{platformFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center border-t border-slate-100 pt-3 text-slate-800">
                <span className="font-bold">Total Paid</span>
                <span className="text-2xl font-black text-orange-500">₹{totalPaid.toFixed(2)}</span>
              </div>
            </div>
            <div className="bg-orange-50/50 border-t border-orange-100/55 px-5 py-3 text-center text-xs text-orange-700 font-semibold flex items-center justify-center gap-2">
              💳 Paid via Cash on Completion
            </div>
          </section>

          {/* Rate your experience */}
          <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm text-center space-y-4">
            <h3 className="font-extrabold text-slate-800 text-lg">Rate your experience</h3>

            {/* Stars */}
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((index) => {
                const isActive = index <= (hoverRating || rating);
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setRating(index)}
                    onMouseEnter={() => setHoverRating(index)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="transition transform active:scale-95"
                  >
                    <Star
                      size={36}
                      className={`${
                        isActive ? "fill-orange-400 text-orange-400" : "text-slate-200"
                      } transition`}
                    />
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Tap to rate</p>

            {/* Feedback Tags */}
            <div className="space-y-3 border-t border-slate-50 pt-4">
              <span className="block text-[10px] font-bold text-slate-400 tracking-wider uppercase text-left">
                WHAT STOOD OUT?
              </span>
              <div className="flex flex-wrap gap-2.5">
                {FEEDBACK_TAGS.map((tag) => {
                  const isSelected = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-4 py-2 rounded-full border text-xs font-semibold transition ${
                        isSelected
                          ? "bg-orange-500 border-orange-500 text-white shadow-sm"
                          : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Review Comment Box */}
            <div className="border-t border-slate-50 pt-4">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Leave a detailed review (optional)"
                rows={3}
                className="w-full rounded-2xl border border-gray-200 bg-[#FBFBFB] p-4 text-sm text-slate-700 placeholder-slate-400 focus:border-orange-500 focus:outline-none transition resize-none"
              />
            </div>
          </section>
        </main>

        {/* Footer Action */}
        <footer className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-slate-100 shadow-[0_-8px_30px_rgba(0,0,0,0.06)] px-5 py-4 z-40 rounded-t-[2.5rem]">
          <button
            onClick={handleFinish}
            disabled={submitting}
            className="w-full h-12 rounded-2xl bg-orange-500 text-white font-bold hover:bg-orange-600 transition shadow-md shadow-orange-500/10 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Home size={18} />
            {submitting ? "Submitting..." : "Back to Home"}
          </button>
        </footer>
      </div>
    </div>
  );
}
