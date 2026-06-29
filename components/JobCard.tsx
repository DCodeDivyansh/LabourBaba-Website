"use client";

import { motion } from "framer-motion";
import {
  MapPin,
  Clock,
  IndianRupee,
  Users,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Circle,
} from "lucide-react";
import { Job } from "@/lib/types";
import { format } from "date-fns";

interface Props {
  job: Job;
  index: number;
}

export default function JobCard({ job, index }: Props) {
  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case "OPEN":
        return { bg: "bg-blue-50", text: "text-blue-700", icon: "text-blue-600" };
      case "ACTIVE":
        return { bg: "bg-green-50", text: "text-green-700", icon: "text-green-600" };
      case "COMPLETED":
        return { bg: "bg-green-50", text: "text-green-700", icon: "text-green-600" };
      case "CANCELLED":
        return { bg: "bg-red-50", text: "text-red-700", icon: "text-red-600" };
      case "PENDING":
        return { bg: "bg-yellow-50", text: "text-yellow-700", icon: "text-yellow-600" };
      default:
        return { bg: "bg-gray-50", text: "text-gray-700", icon: "text-gray-600" };
    }
  };

  const statusColors = getStatusColor(job.status);
  const primaryRequirement = job.job_requirement[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 250, damping: 18 }}
      className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm"
    >
      <div className="flex">
        <div className="w-1.5 bg-[#FF5404]" />
        <div className="flex-1 p-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className={`rounded-full px-2.5 py-0.5 ${statusColors.bg}`}>
                  <div className="flex items-center gap-1.5">
                    <Circle size={8} fill="currentColor" className={statusColors.icon} />
                    <span className={`text-xs font-semibold ${statusColors.text}`}>
                      {job.status}
                    </span>
                  </div>
                </div>
                {job.dispatch_status && (
                  <span className="text-xs text-slate-400">
                    • {job.dispatch_status}
                  </span>
                )}
              </div>
              
              <h3 className="font-semibold text-lg text-slate-900 mb-1">
                {primaryRequirement?.skill_type || "Labour"}
              </h3>
            </div>
            
            <div className="text-right">
              <div className="flex items-center justify-end text-orange-500 mb-1">
                <IndianRupee size={18} />
                <span className="text-2xl font-bold">
                  {primaryRequirement?.rate_per_day || 0}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Per Day</p>
            </div>
          </div>

          {/* Location & Date */}
          <div className="mt-3 space-y-2">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <MapPin size={16} className="text-orange-500" />
              <span className="truncate">{job.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Clock size={16} className="text-slate-400" />
              <span>
                {format(new Date(job.created_at), "MMM d, yyyy • h:mm a")}
              </span>
            </div>
          </div>

          {/* Requirements Summary */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-slate-50 p-3">
              <p className="text-xs text-slate-400 mb-1">Workers Needed</p>
              <div className="flex items-center gap-1.5">
                <Users size={16} className="text-orange-500" />
                <span className="font-bold text-slate-800">
                  {primaryRequirement?.worker_count_needed || 0}
                </span>
                {primaryRequirement?.worker_count_filled > 0 && (
                  <span className="text-sm text-slate-500">
                    ({primaryRequirement.worker_count_filled} filled)
                  </span>
                )}
              </div>
            </div>
            <div className="rounded-lg bg-slate-50 p-3">
              <p className="text-xs text-slate-400 mb-1">Wave Size</p>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-green-500" />
                <span className="font-bold text-slate-800">
                  {primaryRequirement?.wave_size || 0}
                </span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="my-4 h-px bg-orange-100" />

          {/* Action Button */}
          <motion.button
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.02 }}
            className="
              w-full
              rounded-full
              bg-[#FF5404]
              px-4
              py-2.5
              text-sm
              font-semibold
              text-white
              shadow-lg
            "
          >
            <span className="flex items-center justify-center gap-2">
              View Details
              <ChevronRight size={18} />
            </span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
