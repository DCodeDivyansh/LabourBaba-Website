"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Lock, ChevronDown, ArrowRight, Globe } from "lucide-react";
import { loginWorker } from "@/lib/api/worker";
import { setAuthToken } from "@/lib/api/auth";

export default function WorkerLoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!phone || !password) {
      setError("Please enter phone and password");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await loginWorker({ phone: "+91" + phone, password });
      if (data.token) {
        await setAuthToken(data.token);
        router.push("/worker/home");
      }
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || "Failed to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-5">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Image src="/Logo.svg" alt="LabourBaba" width={280} height={90} className="mx-auto w-48" />
        </div>

        <div className="relative bg-white p-7 rounded-3xl shadow-xl overflow-hidden">
          <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-orange-200 opacity-40 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-green-200 opacity-40 blur-3xl" />

          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-8 text-gray-800">Worker Login</h2>

            {error && (
              <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            <div className="relative mb-6">
              <label className="absolute -top-3 left-4 bg-white px-2 text-sm font-medium text-orange-500">
                Mobile Number
              </label>
              <div className="flex h-16 overflow-hidden rounded-xl border-2 border-orange-500 transition-all duration-300 focus-within:shadow-lg focus-within:ring-4 focus-within:ring-orange-100">
                <button className="flex w-20 items-center justify-center gap-1 border-r bg-gray-50" type="button">
                  <span className="text-lg">+91</span>
                  <ChevronDown size={16} />
                </button>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  type="tel"
                  placeholder="9876543210"
                  className="flex-1 px-4 text-xl text-gray-700 outline-none"
                />
              </div>
            </div>

            <div className="relative mb-8">
              <label className="absolute -top-3 left-4 bg-white px-2 text-sm font-medium text-orange-500">
                Password
              </label>
              <div className="flex h-16 overflow-hidden rounded-xl border-2 border-orange-500 transition-all duration-300 focus-within:shadow-lg focus-within:ring-4 focus-within:ring-orange-100">
                <div className="flex w-12 items-center justify-center border-r bg-gray-50">
                  <Lock size={18} />
                </div>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Enter your password"
                  className="flex-1 px-4 text-xl text-gray-700 outline-none"
                />
              </div>
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className="relative flex h-16 w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-orange-500 text-2xl font-semibold text-white shadow-lg transition hover:bg-orange-600 disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
              {!loading && <ArrowRight size={24} className="relative" />}
            </button>

            <p className="mt-8 text-center">
              New here?{" "}
              <button
                onClick={() => router.push("/worker/register")}
                className="text-lg font-medium text-[#006d8f] transition hover:text-orange-600"
              >
                Create Account
              </button>
            </p>

            <div className="mt-8 flex justify-center">
              <button className="flex items-center gap-3 rounded-full bg-gray-100 px-5 py-3 text-gray-700 transition hover:bg-gray-200">
                <Globe size={18} /> English <ChevronDown size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
