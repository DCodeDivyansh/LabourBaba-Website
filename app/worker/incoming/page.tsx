"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getIncomingDispatch, acceptDispatch, declineDispatch, type IncomingJob } from "@/lib/api/dispatch";
import { ArrowLeft, Check, X, Clock, MapPin, DollarSign, Briefcase } from "lucide-react";

export default function WorkerIncomingPage() {
  const router = useRouter();
  const [incoming, setIncoming] = useState<IncomingJob | null>(null);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchIncoming = async () => {
      setLoading(true);
      try {
        const data = await getIncomingDispatch();
        if (isMounted && data.success) {
          setIncoming(data.data as IncomingJob);
        }
      } catch (err: unknown) {
        if (!isMounted) return;
        const error = err as { response?: { data?: { message?: string } } };
        setError(error.response?.data?.message || "Failed to load incoming jobs");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void fetchIncoming();

    return () => {
      isMounted = false;
    };
  }, []);

  const postedAt = incoming?.job?.created_at
    ? new Date(String(incoming.job.created_at)).toLocaleString()
    : "Not available";
  const requirementId = typeof incoming?.requirement?.id === "string" ? incoming.requirement.id : "";
  const jobTitle = typeof incoming?.job?.title === "string" ? incoming.job.title : "Job";
  const skillType = typeof incoming?.requirement?.skill_type === "string" ? incoming.requirement.skill_type : "Labor";
  const ratePerDay = typeof incoming?.requirement?.rate_per_day === "number" ? incoming.requirement.rate_per_day : "0";
  const location = typeof incoming?.job?.location === "string" ? incoming.job.location : "Location not specified";
  const workerCountNeeded = typeof incoming?.requirement?.worker_count_needed === "number" ? incoming.requirement.worker_count_needed : "1";

  const handleAccept = async () => {
    if (!requirementId) return;
    setActionLoading("accept");
    try {
      await acceptDispatch(requirementId);
      router.push("/worker/bookings");
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || "Failed to accept job");
    } finally {
      setActionLoading("");
    }
  };

  const handleDecline = async () => {
    if (!requirementId) return;
    setActionLoading("decline");
    try {
      await declineDispatch(requirementId);
      const data = await getIncomingDispatch();
      if (data.success) {
        setIncoming(data.data as IncomingJob);
      }
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || "Failed to decline job");
    } finally {
      setActionLoading("");
    }
  };

  return (
    <main className="min-h-screen bg-[#F4F6F8]">
      <div className="w-full max-w-md mx-auto min-h-screen relative overflow-hidden">
        <header className="relative z-10 h-16 bg-white shadow-md flex items-center px-4">
          <button onClick={() => router.back()}>
            <ArrowLeft size={24} className="text-[#FF5404]" />
          </button>
          <h1 className="ml-4 text-2xl font-bold text-[#FF5404]">Incoming Job</h1>
        </header>

        <div className="px-6 py-8 relative z-10">
          {error && (
            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex items-center justify-center py-10">
              <p className="text-gray-500">Loading incoming jobs...</p>
            </div>
          ) : !incoming ? (
            <div className="text-center py-10">
              <p className="text-lg text-gray-500">No incoming jobs at the moment</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{jobTitle}</h2>
                  <p className="text-gray-600">{skillType}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 text-orange-500 font-bold text-xl">
                    <DollarSign size={20} />
                    <span>₹{ratePerDay}/day</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-gray-700">
                  <MapPin size={20} />
                  <span>{location}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Briefcase size={20} />
                  <span>{workerCountNeeded} worker(s) needed</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Clock size={20} />
                  <span>Posted at {postedAt}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleDecline}
                  disabled={actionLoading !== ""}
                  className="flex-1 h-14 rounded-2xl border-2 border-red-300 text-red-500 font-semibold flex items-center justify-center gap-2 hover:bg-red-50 transition disabled:opacity-50"
                >
                  {actionLoading === "decline" ? "Declining..." : <X size={20} />}
                  {actionLoading !== "decline" && "Decline"}
                </button>
                <button
                  onClick={handleAccept}
                  disabled={actionLoading !== ""}
                  className="flex-1 h-14 rounded-2xl bg-green-500 text-white font-semibold flex items-center justify-center gap-2 hover:bg-green-600 transition disabled:opacity-50"
                >
                  {actionLoading === "accept" ? "Accepting..." : <Check size={20} />}
                  {actionLoading !== "accept" && "Accept"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
