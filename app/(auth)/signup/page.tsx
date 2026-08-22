"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  Mail,
  Building2,
  ChevronDown,
  ArrowRight,
  Lock,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { clientSignup } from "@/lib/api/auth";

type SignupFormInputs = {
  name: string;
  phone: string;
  password: string;
  email?: string;
  city?: string;
  terms: boolean;
};

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>({
    mode: "onChange",
    defaultValues: {
      email: "",
      city: "",
      terms: false,
    },
  });

  const handleSignup = async (data: SignupFormInputs) => {
    setLoading(true);
    setError("");

    try {
      await clientSignup({
        phone: "+91" + data.phone,
        name: data.name,
        password: data.password,
      });

      router.replace("/login");
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
        err?.message ||
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F5F7FA]">
      <div className="w-full max-w-md mx-auto min-h-screen bg-[#F5F7FA] relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-orange-400/30 blur-[120px] rounded-full" />
        <div className="absolute bottom-20 left-0 w-72 h-72 bg-cyan-400/20 blur-[120px] rounded-full" />

        {/* Header */}
        <header className="h-16 bg-white shadow-md flex items-center px-4 relative z-10">
          <button onClick={() => router.back()}>
            <ArrowLeft size={24} className="text-[#FF5404]" />
          </button>

          <h1 onClick={() => router.replace("/login")} className="ml-4 text-2xl font-bold text-[#FF5404]">
            Create Account
          </h1>
        </header>

        {/* Content */}
        <div className="px-6 py-10 relative z-10">
          {/* Logo */}
          <div className="text-center">
            <Image
              src="/Logo.svg"
              alt="LabourBaba"
              width={280}
              height={90}
              priority
              className="mx-auto w-[75%] max-w-70 h-auto"
            />

            <p className="mt-3 text-[#6B7280] text-lg tracking-wide">
              Find &amp; Book &amp; Build
            </p>
          </div>

          {/* Form */}
          <form className="mt-10 space-y-5" onSubmit={handleSubmit(handleSignup)}>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl">
                {error}
              </div>
            )}
            {/* Full Name */}
            <div className="border border-[#F2B8A0] rounded-xl bg-white px-4">
              <div className="flex h-14 items-center">
                <User size={20} className="text-[#6B7280]" />

                <input
                  type="text"
                  placeholder="Full Name"
                  {...register("name", {
                    required: "Full name is required",
                    minLength: {
                      value: 2,
                      message: "Full name must be at least 2 characters",
                    },
                  })}
                  className="flex-1 ml-3 outline-none text-lg"
                />
              </div>
              {errors.name && (
                <p className="pb-3 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            {/* Mobile */}
            <div className="border border-[#F2B8A0] rounded-xl overflow-hidden bg-white">
              <div className="flex h-14">
                <div className="w-28 border-r flex items-center justify-center gap-2">
                  <span>🇮🇳</span>
                  <span className="font-medium">+91</span>
                </div>

                <input
                  type="tel"
                  placeholder="Mobile Number"
                  {...register("phone", {
                    required: "Mobile number is required",
                    pattern: {
                      value: /^[6-9]\d{9}$/,
                      message: "Enter a valid 10-digit mobile number",
                    },
                    minLength: {
                      value: 10,
                      message: "Mobile number must be 10 digits",
                    },
                    maxLength: {
                      value: 10,
                      message: "Mobile number must be 10 digits",
                    },
                    setValueAs: (value: string) =>
                      value.replace(/\D/g, "").slice(0, 10),
                  })}
                  className="flex-1 px-4 outline-none text-lg"
                />
              </div>
              {errors.phone && (
                <p className="px-4 pb-3 text-sm text-red-600">{errors.phone.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="border border-[#F2B8A0] rounded-xl bg-white px-4">
              <div className="flex h-14 items-center">
                <Lock size={20} className="text-[#6B7280]" />

                <input
                  type="password"
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                  className="flex-1 ml-3 outline-none text-lg"
                />
              </div>
              {errors.password && (
                <p className="pb-3 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="border border-[#F2B8A0] rounded-xl h-14 flex items-center px-4 bg-white">
              <Mail size={20} className="text-[#6B7280]" />

              <input
                type="email"
                placeholder="Email Address (Optional)"
                {...register("email")}
                className="flex-1 ml-3 outline-none text-lg"
              />
            </div>

            {/* City */}
            <div className="border border-[#F2B8A0] rounded-xl h-14 flex items-center px-4 bg-white">
              <Building2 size={20} className="text-[#6B7280]" />

              <select
                {...register("city")}
                className="flex-1 ml-3 outline-none bg-transparent text-gray-600"
              >
                <option>Select City</option>
                <option>Lucknow</option>
                <option>Kanpur</option>
                <option>Noida</option>
                <option>Delhi</option>
              </select>

              <ChevronDown size={18} className="text-gray-500" />
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                {...register("terms", {
                  required: "You must agree to the terms to continue",
                })}
                className="mt-1 w-6 h-6 accent-orange-500"
              />

              <p className="text-sm text-[#6B7280] leading-5">
                By signing up, you agree to our{" "}
                <span className="text-orange-500 underline font-medium">
                  Terms &amp; Conditions
                </span>{" "}
                and{" "}
                <span className="text-orange-500 underline font-medium">
                  Privacy Policy
                </span>
                .
              </p>
            </div>
            {errors.terms && (
              <p className="text-sm text-red-600">{errors.terms.message}</p>
            )}

            {/* Button */}
            <button
              type="submit"
              className="
              w-full
              h-14
              bg-[#FF5404]
              rounded-xl
              text-white
              text-xl
              font-semibold
              flex
              items-center
              justify-center
              gap-2
              shadow-lg
              hover:bg-orange-600
              transition
              disabled:opacity-50
            "
              disabled={loading}
            >
              {loading ? "Signing up..." : "Create Account"}
              {!loading && <ArrowRight size={22} />}
            </button>

            {/* Login */}
            <p className="text-center text-[#6B7280] text-lg pt-5">
              Already have an account?{" "}
              <Link href="/login" className="text-orange-500 font-semibold">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
