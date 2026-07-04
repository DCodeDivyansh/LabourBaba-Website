"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, DollarSign, TrendingUp } from "lucide-react";
import { getEarnings } from "@/lib/api/worker";

export default function WorkerEarningsPage() {
  const router = useRouter();
  const [earnings, setEarnings] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadEarnings = async () => {
    try {
      const res = await getEarnings();
      if (res.success && res.data.earnings) {
        setEarnings(res.data.earnings);
      }
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || "Failed to load earnings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEarnings();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F4F6F8]">
      <div className="w-full max-w-md mx-auto min-h-screen relative overflow-hidden">
        {/* Header */}
        <header className="relative z-10 h-16 bg-white shadow-sm flex items-center px-4">
          <button onClick={() => router.back()}>
            <ArrowLeft size={24} className="text-[#FF5404]" />
          </button>
          <h1 className="ml-4 text-2xl font-bold text-[#FF5404]">My Earnings</h1>
        </header>

        <div className="px-6 py-8 relative z-10 space-y-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          {/* Total Earnings Card */}
          <section className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-8 shadow-xl text-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium opacity-90">Total Earnings</h3>
              <TrendingUp size={24} />
            </div>
            <h2 className="text-5xl font-bold">₹{earnings}</h2>
          </section>

          {/* Earnings Breakdown */}
          <section className="bg-white rounded-2xl p-6 shadow-md">
            <h3 className="text-lg font-semibold mb-4">Earnings Breakdown</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                    <DollarSign size={20} className="text-orange-500" />
                  </div>
                  <span className="font-medium">This Week</span>
                </div>
                <span className="text-lg font-bold">₹{Math.floor(earnings * 0.3)}</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <DollarSign size={20} className="text-blue-500" />
                  </div>
                  <span className="font-medium">This Month</span>
                </div>
                <span className="text-lg font-bold">₹{Math.floor(earnings * 0.7)}</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
