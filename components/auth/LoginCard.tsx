"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  ChevronDown,
  ArrowRight,
  Lock,
  CheckCircle2,
} from "lucide-react";
import { clientLogin } from "@/lib/api/auth";
import { useAuthStore } from "@/stores/authStore";

export default function LoginCard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setUser = useAuthStore((state) => state.setUser);

  const justRegistered = searchParams.get("registered") === "true";
  const redirectTo = searchParams.get("redirect") || "/home";

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePhoneChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setPhone(value);
  };

  const handleLogin = async () => {
    if (!phone || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await clientLogin({
        phone: "+91" + phone,
        password,
      });
      console.log("Login response:", response);
      
      // Store user data in auth store
      if (response?.data) {
        const customerId = (response.data?.id as string) || (response.customer_id as string) || "";
        const userName = (response.data?.name as string) || "";
        const userPhone = "+91" + phone;
        
        if (customerId) {
          setUser({
            id: customerId,
            name: userName || "User",
            phone: userPhone,
            customer_id: customerId,
          });
        }
      }
      
      router.push(redirectTo);
      router.refresh();
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.7,
      }}
      className="relative w-full overflow-hidden rounded-3xl bg-white p-7 shadow-xl"
    >
      {/* Background Glow */}

      <motion.div
        animate={{
          x: [0, 20, 0],
          y: [0, -15, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
        className="absolute right-0 top-0 h-52 w-52 rounded-full bg-orange-200 opacity-40 blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, -15, 0],
          y: [0, 15, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
        }}
        className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-green-200 opacity-40 blur-3xl"
      />

      <div className="relative z-10">

        {/* Heading */}

        <motion.h2
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.2,
          }}
          className="mb-8 text-4xl font-bold text-gray-800"
        >
          Welcome Back
        </motion.h2>

        <AnimatePresence>
          {justRegistered && !error && (
            <motion.div
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 flex items-center gap-2 rounded-xl border border-green-300 bg-green-50 px-4 py-3 text-green-700"
            >
              <CheckCircle2 size={20} className="shrink-0" />
              <span className="text-sm font-medium">
                Account created. Log in to get started.
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        {/* Phone Input */}

        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.3,
          }}
          className="relative mb-6"
        >
          <label className="absolute -top-3 left-4 bg-white px-2 text-sm font-medium text-orange-500">
            Mobile Number
          </label>

          <div className="flex h-16 overflow-hidden rounded-xl border-2 border-orange-500 transition-all duration-300 focus-within:shadow-lg focus-within:ring-4 focus-within:ring-orange-100">

            {/* Country */}

            <button
              className="flex w-20 items-center justify-center gap-1 border-r bg-gray-50"
              type="button"
            >
              <span className="text-lg">
                +91
              </span>

              <ChevronDown size={16} />
            </button>

            {/* Input */}

            <input
              value={phone}
              onChange={handlePhoneChange}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              type="tel"
              placeholder="9876543210"
              disabled={loading}
              className="flex-1 px-4 text-xl text-gray-700 outline-none disabled:opacity-60"
            />

          </div>
        </motion.div>

        {/* Password Input */}
        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.4,
          }}
          className="relative mb-8"
        >
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
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              type="password"
              placeholder="Enter your password"
              disabled={loading}
              className="flex-1 px-4 text-xl text-gray-700 outline-none disabled:opacity-60"
            />
          </div>
        </motion.div>

        {/* Login Button */}

        <motion.button
          whileHover={{
            scale: 1.02,
          }}
          whileTap={{
            scale: 0.98,
          }}
          onClick={handleLogin}
          disabled={loading}
          className="relative flex h-16 w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-orange-500 text-2xl font-semibold text-white shadow-lg transition hover:bg-orange-600 disabled:opacity-50"
        >
          {/* Shimmer */}

          <motion.div
            animate={{
              x: [-250, 300],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-y-0 w-20 -skew-x-12 bg-white/20"
          />

          <span className="relative">
            {loading ? "Logging in..." : "Login"}
          </span>

          {!loading && (
            <ArrowRight
              size={24}
              className="relative"
            />
          )}
        </motion.button>

        {/* Signup */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.5,
          }}
          className="mt-8 text-center"
        >
          <button
            onClick={() =>
              router.push("/signup")
            }
            className="text-lg font-medium text-[#006d8f] transition hover:text-orange-600"
          >
            New here? Create Account
          </button>
        </motion.div>

        {/* Language */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.6,
          }}
          className="mt-8 flex justify-center"
        >
          <motion.button
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            className="flex items-center gap-3 rounded-full bg-gray-100 px-5 py-3 text-gray-700 transition hover:bg-gray-200"
          >
            <Globe size={18} />

            English

            <ChevronDown size={16} />
          </motion.button>
        </motion.div>

      </div>
    </motion.div>
  );
}
