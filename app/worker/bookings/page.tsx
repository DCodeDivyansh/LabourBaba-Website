"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Calendar, MapPin, Clock } from "lucide-react";
import { getBookings, type Booking } from "@/lib/api/worker";

export default function WorkerBookingsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadBookings = async () => {
    try {
      const res = await getBookings();
      if (res.success) {
        setBookings(res.data);
      }
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || "Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-700";
      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-700";
      case "CANCELLED":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
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
        <header className="relative z-10 h-16 bg-white shadow-sm flex items-center px-4">
          <button onClick={() => router.back()}>
            <ArrowLeft size={24} className="text-[#FF5404]" />
          </button>
          <h1 className="ml-4 text-2xl font-bold text-[#FF5404]">My Bookings</h1>
        </header>

        <div className="px-6 py-8 relative z-10 space-y-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          {bookings.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-lg text-gray-500">No bookings yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  onClick={() => router.push(`/worker/bookings/${booking.id}`)}
                  className="bg-white rounded-2xl p-6 shadow-md cursor-pointer hover:shadow-lg transition"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-semibold">Booking #{booking.id.slice(0, 8)}</span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        booking.status
                      )}`}
                    >
                      {booking.status || "PENDING"}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-orange-500" />
                      <span>Job ID: {booking.job_id.slice(0, 8)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-orange-500" />
                      <span>Location: To be added</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
