"use client";

import { motion } from "framer-motion";
import JobCard from "./JobCard";
import { Job } from "@/lib/types";

interface RequestsListProps {
  jobs: Job[];
}

export default function RequestsList({ jobs }: RequestsListProps) {
  const activeJobs = jobs.filter(job => 
    ["OPEN", "PENDING", "ACTIVE"].includes(job.status)
  );
  const completedJobs = jobs.filter(job => job.status === "COMPLETED");
  const cancelledJobs = jobs.filter(job => job.status === "CANCELLED");

  return (
    <>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-slate-900">My Bookings</h1>
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
          <button className="flex-1 rounded-lg bg-[#FF5404] py-2 text-sm font-semibold text-white">
            Active ({activeJobs.length})
          </button>
          <button className="flex-1 rounded-lg py-2 text-sm font-medium text-slate-500 transition hover:text-orange-500">
            Completed ({completedJobs.length})
          </button>
          <button className="flex-1 rounded-lg py-2 text-sm font-medium text-slate-500 transition hover:text-orange-500">
            Cancelled ({cancelledJobs.length})
          </button>
        </div>
      </motion.div>

      {/* Jobs List */}
      <div className="mt-5 space-y-4">
        {activeJobs.length > 0 ? (
          activeJobs.map((job, index) => (
            <JobCard key={job.id} job={job} index={index} />
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl border border-dashed border-orange-200 bg-white p-8 text-center"
          >
            <p className="text-slate-500">No active bookings yet</p>
            <p className="text-sm text-slate-400 mt-1">Create your first booking to get started</p>
          </motion.div>
        )}
      </div>
    </>
  );
}
