import { Globe, ChevronDown, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-[#f5f6f8] flex flex-col items-center justify-center px-5">
            {/* Logo Section */}
            <div className="mb-10 text-center">
                <div className="flex items-center justify-center gap-2">
                    <Image
                        src="/logo.svg"
                        alt="LabourBaba Logo"
                        width={300}
                        height={90}
                    />
                </div>

                <p className="mt-2 text-xl tracking-wide text-[#6a5447]">
                    Find&nbsp;&nbsp; Book&nbsp;&nbsp; Build
                </p>
            </div>

            {/* Login Card */}
            <div className="w-full max-w-md rounded-3xl bg-white p-7 shadow-xl relative overflow-hidden">
                {/* Background Glow */}
                <div className="absolute top-0 right-0 h-52 w-52 bg-orange-200 blur-3xl opacity-40"></div>
                <div className="absolute bottom-0 left-0 h-40 w-40 bg-green-200 blur-3xl opacity-40"></div>

                <div className="relative z-10">
                    <h2 className="text-4xl font-bold text-gray-800 mb-8">
                        Welcome Back
                    </h2>

                    {/* Mobile Input */}
                    <div className="relative mb-8">
                        <label className="absolute -top-3 left-4 bg-white px-2 text-sm font-medium text-orange-500">
                            Mobile Number
                        </label>

                        <div className="flex border-2 border-orange-500 rounded-xl overflow-hidden h-16">
                            <div className="w-20 flex items-center justify-center border-r bg-gray-50">
                                <span className="text-lg">+91</span>
                                <ChevronDown size={16} />
                            </div>

                            <input
                                type="tel"
                                placeholder="98765 43210"
                                className="flex-1 px-4 outline-none text-xl text-gray-700"
                            />
                        </div>
                    </div>

                    {/* OTP Button */}
                    <button className="w-full h-16 rounded-full bg-orange-500 hover:bg-orange-600 transition text-white text-2xl font-semibold flex items-center justify-center gap-2 shadow-lg">
                        Get OTP
                        <ArrowRight size={24} />
                    </button>

                    {/* Signup */}
                    <div className="text-center mt-8">
                        <button className="text-[#006d8f] text-lg font-medium">
                            New here? Create Account
                        </button>
                    </div>

                    {/* Language Selector */}
                    <div className="flex justify-center mt-8">
                        <button className="flex items-center gap-3 px-5 py-3 bg-gray-100 rounded-full text-gray-700">
                            <Globe size={18} />
                            English
                            <ChevronDown size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}