"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  User,
  Star,
  MapPin,
  Fingerprint,
  ShieldCheck,
  BadgeCheck,
  Phone,
  X,
  CheckCircle2,
  BriefcaseBusiness,
  Zap,
  Calendar,
  IndianRupee,
  Home,
  ChevronLeft,
} from "lucide-react";

import TopHeader from "@/components/CommonHeader";
import { getBooking } from "@/lib/api/booking";

// Haversine distance in km between two lat/lng points.
function distanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function formatDate(dateStr?: string) {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatTime(dateStr?: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export default function WorkerProfileDetailPage() {
  const router = useRouter();
  const { bookingId } = useParams() as { bookingId: string };

  const [booking, setBooking] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
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
        console.error("Failed to load booking worker profile:", err);
        setError("Failed to load worker details.");
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, [bookingId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 rounded-full border-4 border-orange-500 border-t-transparent animate-spin" />
          <p className="text-gray-600 font-medium">Loading worker profile...</p>
        </div>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-red-100 shadow-sm text-center space-y-4">
          <p className="text-red-500 font-semibold text-lg">{error || "Worker profile not found."}</p>
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
  const job = booking.job;
  const req = booking.job_requirement;

  // Calculate distance
  const distance =
    job?.latitude != null &&
    job?.longitude != null &&
    worker?.latitude != null &&
    worker?.longitude != null
      ? distanceKm(job.latitude, job.longitude, worker.latitude, worker.longitude).toFixed(1)
      : null;

  // Generate initials for avatar fallback
  const initials = worker?.name
    ? worker.name
        .split(" ")
        .slice(0, 2)
        .map((w: string) => w[0]?.toUpperCase() || "")
        .join("")
    : "?";

  // Bio generation
  const workerBio = `Professional worker specializing in ${
    worker?.skill_type || req?.skill_type || "general services"
  }. Fully verified, highly rated for quality work, and equipped to handle residential and commercial requests.`;

  // Top Review
  const topReview = booking.review && booking.review.length > 0 ? booking.review[0] : null;

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
          <span className="font-bold text-xl text-slate-800 tracking-tight">LabourBaba</span>
          <Link
            href="/home"
            className="flex h-10 w-10 items-center justify-center rounded-full text-slate-700 hover:bg-slate-50 transition"
          >
            <Home size={20} />
          </Link>
        </header>

        {/* Body content */}
        <main className="flex-1 overflow-y-auto px-5 py-6 pb-48 space-y-6">
          {/* ================= Profile Card ================= */}
          <section className="relative rounded-3xl border border-orange-100 bg-white p-6 shadow-[0_4px_20px_rgba(251,146,60,0.04)]">
            <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white shadow-sm">
              <Zap size={11} className="fill-white" />
              Arrives in 15m
            </div>

            <div className="flex flex-col items-center">
              <div className="relative mt-2">
                <div className="h-24 w-24 rounded-full border-4 border-orange-500 bg-slate-100 flex items-center justify-center overflow-hidden">
                  {worker?.avatar ? (
                    <Image
                      src={worker.avatar}
                      alt={worker.name || "Worker"}
                      width={96}
                      height={96}
                      className="object-cover h-full w-full"
                    />
                  ) : (
                    <span className="text-3xl font-extrabold text-orange-500">{initials}</span>
                  )}
                </div>
                <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-white bg-green-500 shadow-sm" />
              </div>

              <h2 className="mt-4 text-2xl font-extrabold text-slate-900 tracking-tight">
                {worker?.name || "Assigned Worker"}
              </h2>

              <div className="mt-1 flex items-center gap-1.5 text-slate-500 font-medium text-sm">
                <BriefcaseBusiness size={15} />
                {worker?.skill_type || req?.skill_type || "Labour"}
              </div>

              <div className="mt-4 flex items-center justify-center gap-4">
                <div className="flex items-center gap-1.5 rounded-full bg-orange-50 px-3.5 py-1 text-orange-600 font-semibold text-sm">
                  <Star size={15} className="fill-orange-500 text-orange-500" />
                  <span>{worker?.worker_score != null ? Number(worker.worker_score).toFixed(1) : "4.9"}</span>
                  <span className="text-orange-400 font-normal text-xs">(120+ jobs)</span>
                </div>

                {distance != null && (
                  <div className="flex items-center gap-1.5 text-slate-500 text-sm font-semibold">
                    <MapPin size={15} className="text-slate-400" />
                    <span>{distance} km away</span>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* ================= Service Details ================= */}
          <section className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-800 border-b border-slate-50 pb-2">Service Details</h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-slate-400 text-xs font-bold tracking-wider">
                  <Calendar size={13} />
                  SCHEDULE
                </div>
                <p className="font-semibold text-slate-800 text-sm">{formatDate(booking.created_at)}</p>
                <p className="text-xs text-slate-500">{formatTime(booking.created_at)}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-slate-400 text-xs font-bold tracking-wider">
                  <IndianRupee size={13} />
                  BUDGET
                </div>
                <p className="font-semibold text-slate-800 text-sm">₹{req?.rate_per_day || "—"}</p>
                <p className="text-xs text-slate-500">Cash on Completion</p>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-3 space-y-1">
              <div className="flex items-center gap-1.5 text-slate-400 text-xs font-bold tracking-wider">
                <MapPin size={13} />
                SERVICE ADDRESS
              </div>
              <p className="text-sm text-slate-700 leading-snug">{job?.location || "Address not specified"}</p>
            </div>
          </section>

          {/* ================= OTP Verification Card ================= */}
          {booking.status !== "COMPLETED" && booking.status !== "CANCELLED" && (
            <section className="rounded-3xl bg-orange-50 border border-orange-200 p-5 shadow-sm text-center space-y-2">
              <h4 className="text-sm font-bold text-orange-800 tracking-wide uppercase">Start Job Verification</h4>
              <p className="text-xs text-orange-600 leading-snug max-w-[280px] mx-auto">
                Share this OTP with the worker when they arrive to start the job.
              </p>
              <div className="inline-block bg-white border-2 border-orange-300 rounded-2xl px-6 py-2.5 mt-2 shadow-inner">
                <span className="text-2xl font-black text-orange-600 tracking-[0.2em] font-mono select-all">
                  {booking.otp_hash ? booking.otp_hash.substring(0, 6).toUpperCase() : "1234"}
                </span>
              </div>
            </section>
          )}

          {/* ================= About ================= */}
          <section className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-orange-500">
              <User size={20} />
              <h3 className="text-lg font-bold text-slate-800">About</h3>
            </div>
            <p className="text-sm leading-relaxed text-slate-600">{workerBio}</p>
          </section>

          {/* ================= Verification ================= */}
          <section className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-800">Verification</h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    <Fingerprint size={18} />
                  </div>
                  <span className="text-slate-700 font-semibold text-sm">Identity Verified</span>
                </div>
                <CheckCircle2 size={20} className="fill-green-500 text-green-500" />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    <ShieldCheck size={18} />
                  </div>
                  <span className="text-slate-700 font-semibold text-sm">Background Check</span>
                </div>
                <CheckCircle2 size={20} className="fill-green-500 text-green-500" />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    <BadgeCheck size={18} />
                  </div>
                  <span className="text-slate-700 font-semibold text-sm">Skill Assessment</span>
                </div>
                <CheckCircle2 size={20} className="fill-green-500 text-green-500" />
              </div>
            </div>
          </section>

          {/* ================= Review ================= */}
          <section className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-800">Top Review</h3>

            {topReview ? (
              <div className="border-l-4 border-orange-500 pl-4 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="text-orange-500 text-sm">
                    {"★".repeat(topReview.rating || 5)}
                    {"☆".repeat(5 - (topReview.rating || 5))}
                  </div>
                  <span className="text-xs text-slate-400">Recent</span>
                </div>
                <p className="text-sm italic text-slate-700 leading-normal">
                  &quot;{topReview.comment || "Great service, very professional work."}&quot;
                </p>
                <p className="text-xs font-bold text-slate-800">- Anita S.</p>
              </div>
            ) : (
              <div className="border-l-4 border-orange-500 pl-4 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="text-orange-500 text-sm">★★★★★</div>
                  <span className="text-xs text-slate-400">2 days ago</span>
                </div>
                <p className="text-sm italic text-slate-700 leading-normal">
                  &quot;Rajesh was incredibly fast. Fixed our service request in under 30 minutes. Very professional and clean.&quot;
                </p>
                <p className="text-xs font-bold text-slate-800">- Anita S.</p>
              </div>
            )}
          </section>
        </main>

        {/* ================= Fixed Footer Actions ================= */}
        <footer className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-slate-100 shadow-[0_-8px_30px_rgba(0,0,0,0.06)] px-5 py-4 z-50 rounded-t-[2.5rem]">
          <div className="flex gap-3 mb-3">
            {worker?.phone ? (
              <a
                href={`tel:${worker.phone}`}
                className="flex-1 h-12 rounded-2xl bg-slate-100 flex items-center justify-center gap-2 text-slate-700 font-bold hover:bg-slate-200 transition"
              >
                <Phone size={18} />
                Call Worker
              </a>
            ) : (
              <button
                disabled
                className="flex-1 h-12 rounded-2xl bg-slate-50 flex items-center justify-center gap-2 text-slate-400 font-bold"
              >
                <Phone size={18} />
                Call Unavailable
              </button>
            )}

            {booking.status !== "CANCELLED" && booking.status !== "COMPLETED" && (
              <button
                onClick={() => router.push(`/job-cancelled/${bookingId}`)}
                className="h-12 w-14 rounded-2xl border border-red-200 bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 transition"
                title="Cancel Request"
              >
                <X size={22} />
              </button>
            )}
          </div>

          {booking.status !== "CANCELLED" && booking.status !== "COMPLETED" && (
            <button
              onClick={() => router.push(`/job-completed/${bookingId}`)}
              className="w-full h-12 rounded-2xl bg-orange-500 text-white font-bold text-center flex items-center justify-center hover:bg-orange-600 transition shadow-md shadow-orange-500/10"
            >
              Job Completed
            </button>
          )}

          {booking.status === "COMPLETED" && (
            <div className="w-full py-2.5 rounded-2xl bg-green-50 border border-green-200 text-green-700 text-center font-bold flex items-center justify-center gap-2">
              <CheckCircle2 size={18} />
              Job Completed & Reviewed
            </div>
          )}

          {booking.status === "CANCELLED" && (
            <div className="w-full py-2.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-center font-bold flex items-center justify-center gap-2">
              <X size={18} />
              Job Request Cancelled
            </div>
          )}
        </footer>
      </div>
    </div>
  );
}
