"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getSocket, disconnectSocket } from "@/services/socket";
import { getClientCustomerId } from "@/lib/client-cookies";
import {  X, Clock, AlertCircle } from "lucide-react";
import TopBar from "@/components/CommonHeader";
import { motion } from "framer-motion";
import { getJobById, cancelJob } from "@/services/job";
import type { Job } from "@/lib/types";

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

  // Timer for waiting time
  useEffect(() => {
    const timer = setInterval(() => {
      setWaitingTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format waiting time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

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

  // Handle cancellation
  const handleCancel = async () => {
    if (!confirm("Are you sure you want to cancel this job request?")) return;

    setCancelling(true);
    try {
      console.log(`[waiting-page] Cancelling job ${jobId}`);
    //   await cancelJob(jobId);

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

  if (error) {
    return (
      <main className="min-h-screen bg-[#FAFAFA]">
        <TopBar title="Error" />
        <div className="max-w-md mx-auto px-4 py-12">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 flex flex-col items-center gap-4 text-center">
            <AlertCircle className="text-red-500 w-12 h-12" />
            <h2 className="text-lg font-semibold text-red-800">Something went wrong</h2>
            <p className="text-red-600">{error}</p>
            <button
              onClick={() => router.push("/home")}
              className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg font-medium"
            >
              Go Home
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAFAFA] pb-40">
      <TopBar title="Finding Workers" />
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Status Indicator */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="relative">
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
              <div className="relative w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white">
                <Clock className="w-6 h-6" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-800">Looking for workers...</h3>
              <p className="text-gray-500 text-sm">
                We're finding the best workers for your job
              </p>
            </div>
          </div>
        </div>

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
                  <span className="font-medium">{req.skill_type}:</span> {req.worker_count_needed} worker(s) at ₹{req.rate_per_day}/day
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Cancel Button */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleCancel}
          disabled={cancelling}
          className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 border border-red-200 rounded-xl py-3 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <X className="w-4 h-4" />
          {cancelling ? "Cancelling..." : "Cancel Job Request"}
        </motion.button>
      </div>
    </main>
  );
}
