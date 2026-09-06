"use client";

import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Lock,
  Phone,
  User,
  Mail,
  Building2,
  ChevronDown,
  AlertCircle,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";
import { clientSignup } from "@/lib/api/auth";
import { useAuthStore } from "@/stores/authStore";

const CITIES = ["Lucknow", "Kanpur", "Noida", "Delhi"];

export default function SignupCard() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [touched, setTouched] = useState<{
    name?: boolean;
    phone?: boolean;
    password?: boolean;
    agreed?: boolean;
  }>({});

  const phoneRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const nameValid = name.trim().length > 0;
  const phoneValid = phone.length === 10;
  const passwordValid = password.length >= 6;

  const showNameError = touched.name && !nameValid;
  const showPhoneError = touched.phone && !phoneValid;
  const showPasswordError = touched.password && !passwordValid;
  const showAgreedError = touched.agreed && !agreed;

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setPhone(value);
    if (error) setError("");
  };

  const handleSignup = async () => {
    setTouched({ name: true, phone: true, password: true, agreed: true });

    if (!nameValid) {
      setError("Enter your full name");
      return;
    }
    if (!phoneValid) {
      setError("Enter a valid 10-digit mobile number");
      return;
    }
    if (!passwordValid) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (!agreed) {
      setError("Please accept the Terms & Conditions to continue");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await clientSignup({
        phone: "+91" + phone,
        name,
        password,
      });

      const customerId =
        (response?.data?.id as string) ||
        (response?.customer_id as string) ||
        "";

      if (customerId) {
        setUser({
          id: customerId,
          name: name || "User",
          phone: "+91" + phone,
          customer_id: customerId,
        });
      }

      router.replace("/login?registered=true");
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Something went wrong. Please try again."
      );
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="relative w-full overflow-hidden rounded-3xl bg-white p-4 shadow-xl ring-1 ring-black/5 sm:p-8"
    >
      <div className="relative z-10">
        <h2 className="mb-3 text-xl font-bold text-gray-800 sm:mb-7 sm:text-4xl">
          Create account
        </h2>

        {/* Error banner */}
        <AnimatePresence mode="wait" initial={false}>
          {error && (
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
          )}
        </AnimatePresence>

        {/* Full name */}
        <div className="mb-3 sm:mb-5">
          <label
            htmlFor="name"
            className="mb-1.5 block text-sm font-medium text-gray-600"
          >
            Full name
          </label>
          <div
            className={`flex h-12 items-center overflow-hidden rounded-xl border-2 bg-white transition-colors duration-150 sm:h-14 ${
              showNameError
                ? "border-red-400"
                : "border-gray-200 focus-within:border-orange-500"
            }`}
          >
            <div className="flex h-full w-11 shrink-0 items-center justify-center text-gray-500 sm:w-12">
              <User size={16} />
            </div>
            <input
              id="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError("");
              }}
              onBlur={() => setTouched((t) => ({ ...t, name: true }))}
              onKeyDown={(e) => e.key === "Enter" && phoneRef.current?.focus()}
              type="text"
              autoComplete="name"
              placeholder="Your full name"
              disabled={loading}
              aria-invalid={showNameError}
              aria-describedby={showNameError ? "name-error" : undefined}
              className="h-full flex-1 bg-transparent px-4 text-base text-gray-800 outline-none placeholder:text-gray-300 disabled:opacity-60 sm:text-lg"
            />
          </div>
          {showNameError && (
            <p id="name-error" className="mt-1.5 text-xs font-medium text-red-500">
              Enter your full name
            </p>
          )}
        </div>

        {/* Mobile number */}
        <div className="mb-3 sm:mb-5">
          <label
            htmlFor="phone"
            className="mb-1.5 block text-sm font-medium text-gray-600"
          >
            Mobile number
          </label>
          <div
            className={`flex h-12 items-center overflow-hidden rounded-xl border-2 bg-white transition-colors duration-150 sm:h-14 ${
              showPhoneError
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
              ref={phoneRef}
              value={phone}
              onChange={handlePhoneChange}
              onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
              onKeyDown={(e) =>
                e.key === "Enter" && phoneValid && passwordRef.current?.focus()
              }
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

        {/* Password */}
        <div className="mb-3 sm:mb-5">
          <label
            htmlFor="password"
            className="mb-1.5 block text-sm font-medium text-gray-600"
          >
            Password
          </label>
          <div
            className={`flex h-12 items-center overflow-hidden rounded-xl border-2 bg-white transition-colors duration-150 sm:h-14 ${
              showPasswordError
                ? "border-red-400"
                : "border-gray-200 focus-within:border-orange-500"
            }`}
          >
            <div className="flex h-full w-11 shrink-0 items-center justify-center text-gray-500 sm:w-12">
              <Lock size={16} />
            </div>
            <input
              id="password"
              ref={passwordRef}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError("");
              }}
              onBlur={() => setTouched((t) => ({ ...t, password: true }))}
              onKeyDown={(e) => e.key === "Enter" && handleSignup()}
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Create a password"
              disabled={loading}
              aria-invalid={showPasswordError}
              aria-describedby={showPasswordError ? "password-error" : undefined}
              className="h-full flex-1 bg-transparent px-4 text-base text-gray-800 outline-none placeholder:text-gray-300 disabled:opacity-60 sm:text-lg"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="flex h-full w-11 shrink-0 items-center justify-center text-gray-400 transition-colors hover:text-gray-600 sm:w-12"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {showPasswordError && (
            <p id="password-error" className="mt-1.5 text-xs font-medium text-red-500">
              Password must be at least 6 characters
            </p>
          )}
        </div>

        {/* Email (optional) */}
        <div className="mb-3 sm:mb-5">
          <label
            htmlFor="email"
            className="mb-1.5 block text-sm font-medium text-gray-600"
          >
            Email address <span className="text-gray-400">(optional)</span>
          </label>
          <div className="flex h-12 items-center overflow-hidden rounded-xl border-2 border-gray-200 bg-white transition-colors duration-150 focus-within:border-orange-500 sm:h-14">
            <div className="flex h-full w-11 shrink-0 items-center justify-center text-gray-500 sm:w-12">
              <Mail size={16} />
            </div>
            <input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              disabled={loading}
              className="h-full flex-1 bg-transparent px-4 text-base text-gray-800 outline-none placeholder:text-gray-300 disabled:opacity-60 sm:text-lg"
            />
          </div>
        </div>

        {/* City */}
        <div className="mb-4 sm:mb-6">
          <label
            htmlFor="city"
            className="mb-1.5 block text-sm font-medium text-gray-600"
          >
            City
          </label>
          <div className="flex h-12 items-center overflow-hidden rounded-xl border-2 border-gray-200 bg-white transition-colors duration-150 focus-within:border-orange-500 sm:h-14">
            <div className="flex h-full w-11 shrink-0 items-center justify-center text-gray-500 sm:w-12">
              <Building2 size={16} />
            </div>
            <select
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              disabled={loading}
              className="h-full flex-1 appearance-none bg-transparent pr-2 text-base text-gray-800 outline-none disabled:opacity-60 sm:text-lg"
            >
              <option value="">Select city</option>
              {CITIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <div className="flex h-full w-9 shrink-0 items-center justify-center text-gray-400 sm:w-10">
              <ChevronDown size={16} />
            </div>
          </div>
        </div>

        {/* Terms */}
        <div className="mb-5 sm:mb-7">
          <label className="flex items-start gap-2.5">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => {
                setAgreed(e.target.checked);
                if (error) setError("");
              }}
              disabled={loading}
              className="mt-0.5 h-5 w-5 shrink-0 accent-orange-500"
            />
            <span className="text-sm leading-5 text-gray-500">
              By signing up, you agree to our{" "}
              <span className="font-medium text-orange-500 underline underline-offset-2">
                Terms &amp; Conditions
              </span>{" "}
              and{" "}
              <span className="font-medium text-orange-500 underline underline-offset-2">
                Privacy Policy
              </span>
              .
            </span>
          </label>
          {showAgreedError && (
            <p className="mt-1.5 text-xs font-medium text-red-500">
              Please accept the Terms & Conditions to continue
            </p>
          )}
        </div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleSignup}
          disabled={loading}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-orange-500 text-lg font-semibold text-white shadow-md shadow-orange-500/20 transition-colors duration-150 hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60 sm:h-14 sm:text-xl"
        >
          {loading ? (
            <>
              <Loader2 size={19} className="animate-spin" />
              <span>Creating account…</span>
            </>
          ) : (
            <>
              <span>Create account</span>
              <ArrowRight size={19} />
            </>
          )}
        </motion.button>

        <div className="mt-4 text-center sm:mt-6">
          <button
            onClick={() => router.push("/login")}
            className="text-sm font-medium text-[#006d8f] transition-colors hover:text-orange-600 sm:text-base"
          >
            Already have an account?{" "}
            <span className="underline underline-offset-2">Log in</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}