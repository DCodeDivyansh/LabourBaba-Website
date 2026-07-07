"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { getSocket, disconnectSocket } from "@/services/socket";
import { getClientCustomerId } from "@/lib/client-cookies";
import { X, Clock, AlertCircle, Phone, Star, Users, CheckCircle2, Plus } from "lucide-react";
import TopBar from "@/components/CommonHeader";
import { motion, AnimatePresence } from "framer-motion";
import { getJobById, cancelJob } from "@/services/job";
import { getJobBookings } from "@/lib/api/job";
import type { Job, AcceptedWorker } from "@/lib/types";

// Normalizes a booking row coming back from GET /api/jobs/:jobId/bookings
// (REST hydration on load/refresh) into the same shape the "worker:accepted"
// socket event uses, so both sources can feed the same UI state.
function normalizeBooking(b: any): AcceptedWorker | null {
  if (!b?.worker) return null;
  return {
    bookingId: b.id,
    requirementId: b.requirement_id,
    worker: {
      id: b.worker.id,
      name: b.worker.name,
      phone: b.worker.phone,
      skill_type: b.worker.skill_type,
      worker_score: b.worker.worker_score,
      latitude: b.worker.latitude,
      longitude: b.worker.longitude,
    },
  };
}

function distanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function WaitingPage() {
  const router = useRouter();
  const params = useParams();
  const jobId = params.jobId as string;
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [waitingTime, setWaitingTime] = useState(0);
  const [acceptedWorkers, setAcceptedWorkers] = useState<AcceptedWorker[]>([]);
  const [jobFullyBooked, setJobFullyBooked] = useState(false);
  // Requirement IDs the backend has told us have no workers left to try.
  const [exhaustedRequirementIds, setExhaustedRequirementIds] = useState<string[]>([]);

  const totalNeeded =
    job?.job_requirement?.reduce((sum, r) => sum + (r.worker_count_needed || 0), 0) || 0;
  const totalFound = acceptedWorkers.length;
  // Prefer the authoritative "job:fully_booked" event from the backend,
  // but fall back to a local count comparison in case that event is missed
  // (e.g. socket briefly disconnected).
  const allWorkersFound = jobFullyBooked || (totalNeeded > 0 && totalFound >= totalNeeded);

  // A job can have multiple requirements (e.g. 2 masons + 1 electrician).
  // "No workers available" only ends the whole search once every
  // requirement that isn't already filled has run out of workers - if one
  // requirement is exhausted but another is still being searched, we keep
  // the timer running for that one.
  const unfilledRequirementIds =
    job?.job_requirement?.filter((r) => r.status !== "filled").map((r) => r.id) || [];
  const noWorkersAvailable =
    unfilledRequirementIds.length > 0 &&
    unfilledRequirementIds.every((id) => exhaustedRequirementIds.includes(id));

  // The timer should stop the moment there's nothing left to actively wait
  // for - either everyone needed has been found, or the backend told us
  // there's no one left to dispatch to.
  const searchEnded = allWorkersFound || noWorkersAvailable;

  // Timer for waiting time - stops as soon as the search is over (worker(s)
  // found, or no workers available), instead of running forever.
  useEffect(() => {
    if (searchEnded) return;
    const timer = setInterval(() => {
      setWaitingTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [searchEnded]);

  // Format waiting time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Add a worker to the accepted list, de-duplicating by bookingId so a
  // socket event and a REST refresh covering the same booking don't create
  // two cards. This is what makes the flow correct when multiple workers
  // are needed/accept: each acceptance just appends to the list.
  const addAcceptedWorker = useCallback((worker: AcceptedWorker | null) => {
    if (!worker) return;
    setAcceptedWorkers((prev) => {
      if (prev.some((w) => w.bookingId === worker.bookingId)) return prev;
      return [...prev, worker];
    });
  }, []);

  // Check socket connection (if enabled)
  useEffect(() => {
    const socket = getSocket();
    if (socket) {
      if (socket.connected) {
        setSocketConnected(true);
      } else {
        socket.on("connect", () => setSocketConnected(true));
      }
    } else {
      // Socket is disabled - just set a different status
      setSocketConnected(false);
    }
  }, []);

  // Load job details
  useEffect(() => {
    const loadJob = async () => {
      try {
        const jobData = await getJobById(jobId);
        setJob(jobData);
      } catch (err) {
        setError("Failed to load job details");
      } finally {
        setLoading(false);
      }
    };
    loadJob();
  }, [jobId]);

  // Hydrate any workers who already accepted before this page loaded (e.g.
  // the customer refreshed the page, or accepted happened before the socket
  // connected). Without this, a page refresh would lose all accepted
  // worker cards even though the bookings exist in the database.
  useEffect(() => {
    const loadBookings = async () => {
      try {
        const res = await getJobBookings(jobId);
        const bookings = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];
        const normalized = bookings.map(normalizeBooking).filter(Boolean) as AcceptedWorker[];
        if (normalized.length > 0) {
          const firstBooking = normalized[0];
          router.push(`/WorkerProfile/${firstBooking.bookingId}`);
        }
      } catch (err) {
        console.error("[waiting-page] Failed to load existing bookings:", err);
      }
    };
    loadBookings();
  }, [jobId, router]);

  // Join customer room on socket connection (if enabled)
  useEffect(() => {
    if (!socketConnected) return;
    const customerId = getClientCustomerId();
    if (customerId) {
      const socket = getSocket();
      if (socket) {
        socket.emit("join:customer", customerId);
        console.log(`[socket.io] Joined room for customer ${customerId} on waiting page`);
      }
    }
  }, [socketConnected]);

  // Listen for real-time worker acceptance. Handles the multi-worker case
  // naturally: every accepted requirement/worker fires its own event, and
  // each one is appended to the list rather than replacing it.
  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const handleWorkerAccepted = (payload: any) => {
      if (!payload || payload.jobId !== jobId) return;
      console.log("[socket.io] worker:accepted", payload);
      router.push(`/WorkerProfile/${payload.bookingId}`);
    };

    const handleJobFullyBooked = (payload: any) => {
      if (!payload || payload.jobId !== jobId) return;
      setJobFullyBooked(true);
    };

    const handleNoWorkers = (payload: any) => {
      if (!payload || payload.jobId !== jobId) return;
      setExhaustedRequirementIds((prev) =>
        prev.includes(payload.requirementId) ? prev : [...prev, payload.requirementId]
      );
      setError(
        "No workers are available right now for one of your requirements. You can keep waiting or cancel this request."
      );
    };

    socket.on("worker:accepted", handleWorkerAccepted);
    socket.on("job:fully_booked", handleJobFullyBooked);
    socket.on("job:no_workers", handleNoWorkers);

    return () => {
      socket.off("worker:accepted", handleWorkerAccepted);
      socket.off("job:fully_booked", handleJobFullyBooked);
      socket.off("job:no_workers", handleNoWorkers);
    };
  }, [jobId, addAcceptedWorker]);

  // Handle cancellation
  const handleCancel = async () => {
    if (!confirm("Are you sure you want to cancel this job request?")) return;

    setCancelling(true);
    try {
      console.log(`[waiting-page] Cancelling job ${jobId}`);
      await cancelJob(jobId);

      // Clean up socket (if enabled)
      disconnectSocket();
      console.log("Socket disconnected on job cancellation");

      // Redirect back
      router.push("/home");
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Failed to cancel job. Please try again.";
      console.error("[waiting-page] Error cancelling job:", err);
      setError(errorMessage);
      setCancelling(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 rounded-full border-4 border-orange-500 border-t-transparent animate-spin"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAFAFA] pb-40">
      <TopBar title={allWorkersFound ? "Workers Found" : noWorkersAvailable ? "No Workers Available" : "Finding Workers"} />
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl flex items-start gap-2">
            <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Status Indicator */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="relative">
              {!searchEnded && (
                <motion.div
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -inset-3 bg-orange-200 rounded-full"
                />
              )}
              <div
                className={`relative w-12 h-12 rounded-full flex items-center justify-center text-white ${allWorkersFound ? "bg-green-500" : noWorkersAvailable ? "bg-gray-400" : "bg-orange-500"
                  }`}
              >
                {allWorkersFound ? (
                  <CheckCircle2 className="w-6 h-6" />
                ) : noWorkersAvailable ? (
                  <AlertCircle className="w-6 h-6" />
                ) : (
                  <Clock className="w-6 h-6" />
                )}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-800">
                {allWorkersFound
                  ? "All workers assigned!"
                  : noWorkersAvailable
                    ? "No workers available"
                    : totalFound > 0
                      ? "Finding remaining workers..."
                      : "Looking for workers..."}
              </h3>
              <p className="text-gray-500 text-sm">
                {totalNeeded > 0
                  ? `${totalFound} of ${totalNeeded} worker${totalNeeded > 1 ? "s" : ""} found`
                  : "We're finding the best workers for your job"}
              </p>
            </div>
          </div>
        </div>

        {/* Accepted Workers */}
        <AnimatePresence>
          {acceptedWorkers.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 px-1">
                <Users size={16} className="text-orange-500" />
                <h4 className="font-semibold text-gray-800">
                  Assigned Worker{acceptedWorkers.length > 1 ? "s" : ""}
                </h4>
              </div>
              {acceptedWorkers.map((aw) => {
                const distance =
                  job?.latitude != null &&
                  job?.longitude != null &&
                  aw.worker?.latitude != null &&
                  aw.worker?.longitude != null
                    ? distanceKm(
                        job.latitude,
                        job.longitude,
                        aw.worker.latitude,
                        aw.worker.longitude
                      ).toFixed(1)
                    : null;

                return (
                  <motion.div
                    key={aw.bookingId}
                    initial={{ opacity: 0, y: 15, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => router.push(`/WorkerProfile/${aw.bookingId}`)}
                    className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm cursor-pointer hover:border-orange-200 hover:shadow-md transition"
                  >
                    <div className="flex">
                      <div className="w-1.5 bg-green-500" />
                      <div className="flex-1 p-4 flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <p className="font-semibold text-slate-900 truncate">
                            {aw.worker?.name || "Worker"}
                          </p>
                          <div className="mt-1 flex items-center gap-3 text-sm text-slate-500">
                            {aw.worker?.skill_type || aw.skill_type ? (
                              <span>{aw.worker?.skill_type || aw.skill_type}</span>
                            ) : null}
                            {aw.worker?.worker_score != null && (
                              <span className="flex items-center gap-1">
                                <Star size={13} fill="#FDB022" className="text-[#FDB022]" />
                                {Number(aw.worker.worker_score).toFixed(1)}
                              </span>
                            )}
                            {distance != null && (
                              <span className="text-orange-500 font-medium">
                                • {distance} km away
                              </span>
                            )}
                          </div>
                        </div>
                        {aw.worker?.phone && (
                          <a
                            href={`tel:${aw.worker.phone}`}
                            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-orange-100 text-orange-500"
                          >
                            <Phone size={18} />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </AnimatePresence>

        {/* Socket Status - Only show if socket is enabled */}
        {(() => {
          const socket = getSocket();
          if (!socket) {
            return null; // Don't show anything if socket is disabled
          }
          return (
            <div className={`flex items-center gap-2 px-4 py-3 rounded-xl ${socketConnected ? "bg-green-50 border border-green-200" : "bg-yellow-50 border border-yellow-200"}`}>
              <div className={`w-3 h-3 rounded-full ${socketConnected ? "bg-green-500" : "bg-yellow-500 animate-pulse"}`} />
              <span className="text-sm font-medium text-gray-700">
                {socketConnected ? "Connected" : "Connecting..."}
              </span>
            </div>
          );
        })()}

        {/* Waiting Time */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm text-center">
          <p className="text-sm text-gray-500 mb-2">Waiting Time</p>
          <p className="text-4xl font-bold text-orange-600">{formatTime(waitingTime)}</p>
        </div>

        {/* Job Details Summary */}
        {job && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-3">Job Details</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <p><span className="font-medium">Location:</span> {job.location}</p>
              <p><span className="font-medium">Status:</span> {job.status}</p>
              {job.job_requirement?.map((req, idx) => (
                <p key={idx}>
                  <span className="font-medium">{req.skill_type}:</span> {req.worker_count_filled || 0}/{req.worker_count_needed} worker(s) at ₹{req.rate_per_day}/day
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Cancel Button - only while still actively searching */}
        {!allWorkersFound && !noWorkersAvailable && (
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleCancel}
            disabled={cancelling}
            className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 border border-red-200 rounded-xl py-3 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X className="w-4 h-4" />
            {cancelling ? "Cancelling..." : "Cancel Job Request"}
          </motion.button>
        )}

        {/* Once there are no workers left to wait for, swap Cancel for a
            direct path to try again with a new request. */}
        {noWorkersAvailable && !allWorkersFound && (
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push("/create-request")}
            className="w-full flex items-center justify-center gap-2 bg-orange-500 text-white rounded-xl py-3 font-medium"
          >
            <Plus className="w-4 h-4" />
            Create New Request
          </motion.button>
        )}

        {allWorkersFound && (
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push("/requests")}
            className="w-full flex items-center justify-center gap-2 bg-orange-500 text-white rounded-xl py-3 font-medium"
          >
            View My Requests
          </motion.button>
        )}
      </div>
    </main>
  );
}
