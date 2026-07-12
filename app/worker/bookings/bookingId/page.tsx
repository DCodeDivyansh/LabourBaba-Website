"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
    ArrowLeft,
    MapPin,
    IndianRupee,
    Phone,
    CheckCircle2,
    X,
    ShieldCheck,
} from "lucide-react";
import { getBooking, verifyBookingOtp, completeBooking } from "@/lib/api/booking";

function normalizeStatus(status?: string) {
    return (status || "").toUpperCase();
}

export default function WorkerBookingDetailPage() {
    const router = useRouter();
    const { bookingId } = useParams() as { bookingId: string };

    const [booking, setBooking] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
    const [verifying, setVerifying] = useState(false);
    const [otpError, setOtpError] = useState<string | null>(null);

    const [completing, setCompleting] = useState(false);
    const [completeError, setCompleteError] = useState<string | null>(null);

    const loadBooking = async () => {
        try {
            const res = await getBooking(bookingId);
            const data = res?.data ?? res;
            setBooking(data);
        } catch (err: any) {
            console.error("Failed to load booking:", err);
            setError(
                err?.response?.data?.message || "Failed to load this booking."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!bookingId) return;
        loadBooking();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bookingId]);

    const handleOtpChange = (value: string, index: number) => {
        if (!/^\d*$/.test(value)) return;
        const next = [...otpDigits];
        next[index] = value.slice(-1);
        setOtpDigits(next);
        setOtpError(null);

        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            nextInput?.focus();
        }
    };

    const handleOtpKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number
    ) => {
        if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`);
            prevInput?.focus();
        }
    };

    const handleVerifyOtp = async () => {
        const otp = otpDigits.join("");
        if (otp.length !== 6) {
            setOtpError("Enter the full 6-digit OTP the customer shared with you.");
            return;
        }
        setVerifying(true);
        setOtpError(null);
        try {
            await verifyBookingOtp(bookingId, otp);
            await loadBooking();
        } catch (err: any) {
            setOtpError(
                err?.response?.data?.message || "Invalid OTP. Please try again."
            );
        } finally {
            setVerifying(false);
        }
    };

    const handleMarkComplete = async () => {
        setCompleting(true);
        setCompleteError(null);
        try {
            await completeBooking(bookingId);
            await loadBooking();
        } catch (err: any) {
            setCompleteError(
                err?.response?.data?.message || "Failed to mark this job as complete."
            );
        } finally {
            setCompleting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F4F6F8] flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="h-10 w-10 rounded-full border-4 border-orange-500 border-t-transparent animate-spin" />
                    <p className="text-gray-600 font-medium">Loading booking...</p>
                </div>
            </div>
        );
    }

    if (error || !booking) {
        return (
            <div className="min-h-screen bg-[#F4F6F8] flex flex-col items-center justify-center p-6">
                <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-red-100 shadow-sm text-center space-y-4">
                    <p className="text-red-500 font-semibold text-lg">
                        {error || "Booking not found."}
                    </p>
                    <button
                        onClick={() => router.push("/worker/bookings")}
                        className="px-6 py-2.5 bg-orange-500 text-white rounded-2xl font-medium hover:bg-orange-600 transition"
                    >
                        Back to bookings
                    </button>
                </div>
            </div>
        );
    }

    const status = normalizeStatus(booking.status);
    const customer = booking.customer;
    const job = booking.job;
    const req = booking.job_requirement;

    const isCancelled = status === "CANCELLED";
    const isCompleted = status === "COMPLETED";
    const isInProgress = status === "IN_PROGRESS";
    // Any other status ("confirmed", "PENDING", etc.) is treated as "accepted,
    // waiting for the worker to start the job with the customer's OTP".
    const needsOtp = !isCancelled && !isCompleted && !isInProgress;

    return (
        <main className="min-h-screen bg-[#F4F6F8]">
            <div className="w-full max-w-md mx-auto min-h-screen relative overflow-hidden pb-10">
                <header className="relative z-10 h-16 bg-white shadow-md flex items-center px-4">
                    <button onClick={() => router.back()}>
                        <ArrowLeft size={24} className="text-[#FF5404]" />
                    </button>
                    <h1 className="ml-4 text-2xl font-bold text-[#FF5404]">Booking Details</h1>
                </header>

                <div className="px-6 py-8 space-y-6">
                    {/* Status banner */}
                    <div
                        className={`rounded-2xl px-4 py-3 text-center font-semibold ${isCompleted
                                ? "bg-green-100 text-green-700"
                                : isCancelled
                                    ? "bg-red-100 text-red-700"
                                    : isInProgress
                                        ? "bg-blue-100 text-blue-700"
                                        : "bg-yellow-100 text-yellow-700"
                            }`}
                    >
                        {isCompleted && "Job Completed"}
                        {isCancelled && "Booking Cancelled"}
                        {isInProgress && "Job In Progress"}
                        {needsOtp && "Accepted — Waiting to Start"}
                    </div>

                    {/* Job / Customer info */}
                    <div className="bg-white rounded-2xl p-6 shadow-md space-y-4">
                        <div>
                            <p className="text-xs font-bold tracking-wider text-slate-400">CUSTOMER</p>
                            <p className="text-lg font-semibold text-slate-900">
                                {customer?.name || "Customer"}
                            </p>
                        </div>

                        <div className="flex items-center gap-3 text-gray-700">
                            <MapPin size={18} className="text-orange-500 shrink-0" />
                            <span className="text-sm">{job?.location || "Location not specified"}</span>
                        </div>

                        <div className="flex items-center gap-3 text-gray-700">
                            <IndianRupee size={18} className="text-orange-500 shrink-0" />
                            <span className="text-sm">
                                ₹{req?.rate_per_day ?? "—"}/day • {req?.skill_type || "Labour"}
                            </span>
                        </div>

                        {customer?.phone && (
                            <a
                                href={`tel:${customer.phone}`}
                                className="flex items-center gap-3 text-orange-600 font-medium text-sm"
                            >
                                <Phone size={18} className="shrink-0" />
                                Call Customer
                            </a>
                        )}
                    </div>

                    {/* OTP entry — only while waiting to start */}
                    {needsOtp && (
                        <div className="bg-white rounded-2xl p-6 shadow-md space-y-4">
                            <div className="flex items-center gap-2 text-slate-800">
                                <ShieldCheck size={20} className="text-orange-500" />
                                <h3 className="font-bold">Start This Job</h3>
                            </div>
                            <p className="text-sm text-slate-500">
                                Ask the customer for the OTP they see on their app, then enter it below to start the job.
                            </p>

                            <div className="flex justify-center gap-2">
                                {otpDigits.map((digit, index) => (
                                    <input
                                        key={index}
                                        id={`otp-${index}`}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleOtpChange(e.target.value, index)}
                                        onKeyDown={(e) => handleOtpKeyDown(e, index)}
                                        className="w-11 h-13 text-center text-xl font-bold rounded-xl border-2 border-orange-200 focus:border-orange-500 outline-none"
                                    />
                                ))}
                            </div>

                            {otpError && (
                                <p className="text-sm text-red-500 text-center">{otpError}</p>
                            )}

                            <button
                                onClick={handleVerifyOtp}
                                disabled={verifying}
                                className="w-full h-12 rounded-2xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition disabled:opacity-50"
                            >
                                {verifying ? "Verifying..." : "Start Job"}
                            </button>
                        </div>
                    )}

                    {/* Mark complete — only while in progress */}
                    {isInProgress && (
                        <div className="bg-white rounded-2xl p-6 shadow-md space-y-4 text-center">
                            <p className="text-sm text-slate-500">
                                Once you&apos;ve finished the work, mark this job as complete. The customer will
                                be asked to confirm and leave a rating.
                            </p>
                            {completeError && (
                                <p className="text-sm text-red-500">{completeError}</p>
                            )}
                            <button
                                onClick={handleMarkComplete}
                                disabled={completing}
                                className="w-full h-12 rounded-2xl bg-green-500 text-white font-semibold hover:bg-green-600 transition disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                <CheckCircle2 size={20} />
                                {completing ? "Marking Complete..." : "Mark Job Complete"}
                            </button>
                        </div>
                    )}

                    {isCompleted && (
                        <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center flex flex-col items-center gap-2">
                            <CheckCircle2 size={28} className="text-green-600" />
                            <p className="text-green-700 font-semibold">
                                This job is complete. Nice work!
                            </p>
                        </div>
                    )}

                    {isCancelled && (
                        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center flex flex-col items-center gap-2">
                            <X size={28} className="text-red-500" />
                            <p className="text-red-600 font-semibold">This booking was cancelled.</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
