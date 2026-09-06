"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Lock,
  Phone,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Loader2,
  Globe,
  ChevronDown,
} from "lucide-react";
import { clientLogin } from "@/lib/api/auth";
import { useAuthStore } from "@/stores/authStore";
import { useForm, SubmitHandler } from "react-hook-form"

type Inputs = {
  phone: string;
  password: string;
}
export default function LoginCard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setUser = useAuthStore((state) => state.setUser);
  const justRegistered = searchParams.get("registered") === "true";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ mode: "onChange" });

  const handleLogin: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    setError("");

    try {
      const response = await clientLogin({
        phone: "+91" + data.phone,
        password: data.password,
      });
      // console.log("Login response:", response);

      // Store user data in auth store
      if (response?.data) {
        const customerId = (response.data?.id as string) || (response.customer_id as string) || "";
        const userName = (response.data?.name as string) || "";
        const userPhone = "+91" + data.phone;

        if (customerId) {
          setUser({
            id: customerId,
            name: userName || "User",
            phone: userPhone,
            customer_id: customerId,
          });
        }
      }

      router.push("/home");
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
        "Something went wrong. Please try again."
      );

      setLoading(false);
    }
  };

  const phoneRegister = register("phone", {
    required: "Phone number is required",
    pattern: {
      value: /^[6-9]\d{9}$/,
      message: "Enter a valid 10-digit mobile number",
    },
    minLength: {
      value: 10,
      message: "Phone number must be 10 digits",
    },
    maxLength: {
      value: 10,
      message: "Phone number must be 10 digits",
    },
    setValueAs: (value: string) =>
      value.replace(/\D/g, "").slice(0, 10),
  });

  const passwordRegister = register("password", {
    required: "password is required",
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters",
    },
  });

  const showPhoneError = Boolean(errors.phone);


  return (
    <motion.form
      onSubmit={handleSubmit(handleLogin)}
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
      <div className="relative z-10">
        <h2 className="mb-3 text-xl font-bold text-gray-800 sm:mb-7 sm:text-4xl">
          Welcome back
        </h2>

        <AnimatePresence mode="wait" initial={false}>
          {error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              role="alert"
              className="mb-5 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
            >
              <AlertCircle size={18} className="mt-0.5 shrink-0" />
              <span>{error}</span>
            </motion.div>
          ) : justRegistered ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="mb-5 flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700"
            >
              <CheckCircle2 size={18} className="shrink-0" />
              <span>Account created. Log in to get started.</span>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div className="mb-3 sm:mb-5">
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-gray-600">
            Mobile number
          </label>

          <div
            className={`flex h-12 items-center overflow-hidden rounded-xl border-2 bg-white transition-colors duration-150 sm:h-14 ${showPhoneError
              ? "border-red-400"
              : "border-gray-200 focus-within:border-orange-500"
              }`}
          >
            <div className="flex h-full w-14 shrink-0 items-center justify-center gap-1 border-r border-gray-200 bg-gray-50 text-gray-600 sm:w-16">
              <Phone size={14} />
              <span className="text-sm font-medium">+91</span>
            </div>

            <input
              id="phone"
              {...phoneRegister}
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              placeholder="98765 43210"
              disabled={loading}
              aria-invalid={showPhoneError}
              aria-describedby={showPhoneError ? "phone-error" : undefined}
              className="h-full flex-1 bg-transparent px-4 text-base text-gray-800 outline-none placeholder:text-gray-300 disabled:opacity-60 sm:text-lg"
            />
          </div>
          {showPhoneError && (
            <p id="phone-error" className="mt-1.5 text-xs font-medium text-red-500">
              Enter a valid 10-digit mobile number
            </p>
          )}
        </div>

        <div className="mb-4 sm:mb-7">
          <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-gray-600">
            Password
          </label>

          <div className="flex h-12 items-center overflow-hidden rounded-xl border-2 border-gray-200 bg-white transition-colors duration-150 focus-within:border-orange-500 sm:h-14">
            <div className="flex h-full w-11 shrink-0 items-center justify-center text-gray-500 sm:w-12">
              <Lock size={16} />
            </div>
            <input
              {...passwordRegister}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              disabled={loading}
              className="h-full flex-1 bg-transparent px-4 text-base text-gray-800 outline-none placeholder:text-gray-300 disabled:opacity-60 sm:text-lg"
            />
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="flex h-full w-11 shrink-0 items-center justify-center text-gray-400 transition-colors hover:text-gray-600 sm:w-12"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <motion.button
          type="submit"
          whileHover={{
            scale: 1.02,
          }}
          whileTap={{
            scale: 0.98,
          }}
          disabled={loading}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-orange-500 text-lg font-semibold text-white shadow-md shadow-orange-500/20 transition-colors duration-150 hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60 sm:h-14 sm:text-xl"
        >
          {loading ? (
            <>
              <Loader2 size={19} className="animate-spin" />
              <span>Logging in…</span>
            </>
          ) : (
            <>
              <span>Log in</span>
              <ArrowRight size={19} />
            </>
          )}
        </motion.button>

        <motion.div className="mt-4 text-center sm:mt-6">
          <button
            onClick={() => router.push("/signup")}
            className="text-sm font-medium text-[#006d8f] transition-colors hover:text-orange-600 sm:text-base"
          >
            New here? <span className="underline underline-offset-2">Create account</span>
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
    </motion.form>
  );
}
