"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getMe,
  getBookings,
  getEarnings,
  updateOnline,
  type Worker,
  type Booking,
} from "@/lib/api/worker";
import { Home, User, Calendar, DollarSign, LogOut, MapPin, CheckCircle, Bell } from "lucide-react";

export default function WorkerHomePage() {
  const router = useRouter();
  const [worker, setWorker] = useState<Worker | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [earnings, setEarnings] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      const [meRes, bookingsRes, earningsRes] = await Promise.all([
        getMe(),
        getBookings(),
        getEarnings(),
      ]);

      if (meRes.success) setWorker(meRes.data);
      if (bookingsRes.success) setBookings(bookingsRes.data);
      if (earningsRes.success && earningsRes.data.earnings) {
        setEarnings(earningsRes.data.earnings);
      }
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleToggleOnline = async (isOnline: boolean) => {
    try {
      await updateOnline({ is_online: isOnline });
      setWorker((prev) => (prev ? { ...prev, is_online: isOnline } : null));
    } catch (err) {
      console.error("Failed to update online status:", err);
    }
  };

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
        <header className="relative z-10 h-16 bg-white shadow-sm flex items-center justify-between px-6">
          <h1 className="text-2xl font-bold text-[#FF5404]">Worker Dashboard</h1>
          <button
            onClick={() => {
              router.push("/");
            }}
            className="text-gray-600"
          >
            <LogOut size={24} />
          </button>
        </header>

        <div className="px-6 py-8 relative z-10 space-y-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          {/* Profile Card */}
          <section className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{worker?.name || "Worker"}</h2>
                <p className="text-gray-600">{worker?.skill_type || "Labour"}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`h-3 w-3 rounded-full ${worker?.is_online ? "bg-green-500" : "bg-gray-400"}`} />
                <span className="text-sm font-medium">{worker?.is_online ? "Online" : "Offline"}</span>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => handleToggleOnline(true)}
                className={`flex-1 py-2 rounded-xl font-semibold ${
                  worker?.is_online
                    ? "bg-green-500 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                Go Online
              </button>
              <button
                onClick={() => handleToggleOnline(false)}
                className={`flex-1 py-2 rounded-xl font-semibold ${
                  !worker?.is_online
                    ? "bg-red-500 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                Go Offline
              </button>
            </div>
          </section>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl p-5 shadow-md">
              <div className="flex items-center gap-3 mb-2">
                <Calendar size={20} className="text-orange-500" />
                <span className="text-sm text-gray-500">Bookings</span>
              </div>
              <h3 className="text-3xl font-bold">{bookings.length}</h3>
            </div>
            <div className="bg-white rounded-2xl p-5 shadow-md">
              <div className="flex items-center gap-3 mb-2">
                <DollarSign size={20} className="text-green-500" />
                <span className="text-sm text-gray-500">Earnings</span>
              </div>
              <h3 className="text-3xl font-bold">₹{earnings}</h3>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => router.push("/worker/profile")}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-orange-50 hover:bg-orange-100 transition"
              >
                <User size={24} className="text-orange-500" />
                <span className="text-sm font-medium">Profile</span>
              </button>
              <button
                onClick={() => router.push("/worker/bookings")}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition"
              >
                <Calendar size={24} className="text-blue-500" />
                <span className="text-sm font-medium">Bookings</span>
              </button>
              <button
                onClick={() => router.push("/worker/earnings")}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-green-50 hover:bg-green-100 transition"
              >
                <DollarSign size={24} className="text-green-500" />
                <span className="text-sm font-medium">Earnings</span>
              </button>
              <button
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition"
              >
                <MapPin size={24} className="text-gray-500" />
                <span className="text-sm font-medium">Location</span>
              </button>
            </div>
          </div>

          {/* Recent Bookings */}
          {bookings.length > 0 && (
            <section className="bg-white rounded-2xl p-6 shadow-md">
              <h3 className="text-lg font-semibold mb-4">Recent Bookings</h3>
              <div className="space-y-3">
                {bookings.slice(0, 3).map((booking) => (
                  <div key={booking.id} className="p-4 border border-orange-100 rounded-xl">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Booking #{booking.id.slice(0, 8)}</span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          booking.status === "COMPLETED"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {booking.status || "PENDING"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
