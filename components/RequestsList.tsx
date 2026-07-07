"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import JobCard from "./JobCard";
import { Job } from "@/lib/types";

interface RequestsListProps {
  jobs: Job[];
}

type TabType = "active" | "completed" | "cancelled";

export default function RequestsList({ jobs }: RequestsListProps) {
  const [activeTab, setActiveTab] = useState<TabType>("active");

  const activeJobs = jobs.filter(job => 
    ["OPEN", "PENDING", "ACTIVE"].includes(job.status)
  );
  const completedJobs = jobs.filter(job => job.status === "COMPLETED");
  const cancelledJobs = jobs.filter(job => job.status === "CANCELLED");

  const getJobsByTab = () => {
    switch (activeTab) {
      case "active":
        return activeJobs;
      case "completed":
        return completedJobs;
      case "cancelled":
        return cancelledJobs;
      default:
        return activeJobs;
    }
  };

  const currentJobs = getJobsByTab();

  return (
    <>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-slate-900">My Requests</h1>
        <p className="mt-1 text-sm text-slate-500">
          Track your active and completed labour requests.
        </p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="mt-6"
      >
        <div className="flex rounded-xl border border-orange-100 bg-white p-1 shadow-sm">
          <button
            onClick={() => setActiveTab("active")}
            className={`flex-1 rounded-lg py-2 text-sm font-semibold transition ${
              activeTab === "active"
                ? "bg-[#FF5404] text-white"
                : "text-slate-550 text-slate-500 hover:text-orange-500"
            }`}
          >
            Active ({activeJobs.length})
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`flex-1 rounded-lg py-2 text-sm font-semibold transition ${
              activeTab === "completed"
                ? "bg-[#FF5404] text-white"
                : "text-slate-550 text-slate-500 hover:text-orange-500"
            }`}
          >
            Completed ({completedJobs.length})
          </button>
          <button
            onClick={() => setActiveTab("cancelled")}
            className={`flex-1 rounded-lg py-2 text-sm font-semibold transition ${
              activeTab === "cancelled"
                ? "bg-[#FF5404] text-white"
                : "text-slate-550 text-slate-500 hover:text-orange-500"
            }`}
          >
            Cancelled ({cancelledJobs.length})
          </button>
        </div>
      </motion.div>

      {/* Jobs List */}
      <div className="mt-5 space-y-4">
        {currentJobs.length > 0 ? (
          currentJobs.map((job, index) => (
            <JobCard key={job.id} job={job} index={index} />
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl border border-dashed border-orange-200 bg-white p-8 text-center"
          >
            <p className="text-slate-500 font-medium">
              {activeTab === "active" && "No active requests yet"}
              {activeTab === "completed" && "No completed requests yet"}
              {activeTab === "cancelled" && "No cancelled requests yet"}
            </p>
            <p className="text-sm text-slate-400 mt-1">
              {activeTab === "active" && "Create your first request to get started"}
              {activeTab === "completed" && "Your completed request history will show up here"}
              {activeTab === "cancelled" && "Your cancelled requests will show up here"}
            </p>
          </motion.div>
        )}
      </div>
    </>
  );
}
