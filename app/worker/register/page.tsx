"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { User, Lock, ArrowLeft, ArrowRight, ChevronDown } from "lucide-react";
import { registerWorker } from "@/lib/api/worker";
import { getSkills } from "@/lib/api/skill";

export default function WorkerRegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [skillType, setSkillType] = useState("");
  const [skillCategoryId, setSkillCategoryId] = useState("");
  const [aadhaarLast4, setAadhaarLast4] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [skills, setSkills] = useState<{ id: string; name: string }[]>([]);

  const loadSkills = async () => {
    try {
      const data = await getSkills();
      if (data.success) {
        setSkills(data.data);
      }
    } catch (err) {
      console.error("Failed to load skills:", err);
    }
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const handleRegister = async () => {
    if (!name || !phone || !password || !skillType) {
      setError("Please fill all required fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await registerWorker({
        name,
        phone: "+91" + phone,
        password,
        skill_type: skillType,
        skill_category_id: skillCategoryId || skills[0]?.id || "default",
        aadhaar_last4: aadhaarLast4 || undefined,
      });
      router.push("/worker/login");
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || "Failed to register");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F5F7FA]">
      <div className="w-full max-w-md mx-auto min-h-screen relative overflow-hidden">
        <header className="h-16 bg-white shadow-md flex items-center px-4 relative z-10">
          <button onClick={() => router.back()}>
            <ArrowLeft size={24} className="text-[#FF5404]" />
          </button>
          <h1 className="ml-4 text-2xl font-bold text-[#FF5404]">Worker Registration</h1>
        </header>

        <div className="px-6 py-10 relative z-10">
          <div className="text-center mb-8">
            <Image src="/Logo.svg" alt="LabourBaba" width={280} height={90} className="mx-auto w-48" />
          </div>

          {error && (
            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          <div className="space-y-5">
            <div className="border border-[#F2B8A0] rounded-xl h-14 flex items-center px-4 bg-white">
              <User size={20} className="text-[#6B7280]" />
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1 ml-3 outline-none text-lg"
              />
            </div>

            <div className="border border-[#F2B8A0] rounded-xl h-14 overflow-hidden bg-white flex">
              <div className="w-28 flex items-center justify-center gap-1 border-r bg-gray-50">
                <span>+91</span>
                <ChevronDown size={16} />
              </div>
              <input
                type="tel"
                placeholder="Mobile Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                className="flex-1 px-4 outline-none text-lg"
              />
            </div>

            <div className="border border-[#F2B8A0] rounded-xl h-14 flex items-center px-4 bg-white">
              <Lock size={20} className="text-[#6B7280]" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 ml-3 outline-none text-lg"
              />
            </div>

            <div className="border border-[#F2B8A0] rounded-xl h-14 flex items-center px-4 bg-white">
              <select
                value={skillType}
                onChange={(e) => {
                  setSkillType(e.target.value);
                  if (skills.length > 0) setSkillCategoryId(skills[0].id);
                }}
                className="flex-1 ml-3 outline-none text-lg bg-white"
              >
                <option value="">Select Skill</option>
                <option value="Plumber">Plumber</option>
                <option value="Electrician">Electrician</option>
                <option value="Carpenter">Carpenter</option>
                <option value="Painter">Painter</option>
                <option value="Labour">Labour</option>
              </select>
            </div>

            <div className="border border-[#F2B8A0] rounded-xl h-14 flex items-center px-4 bg-white">
              <input
                type="text"
                placeholder="Last 4 digits of Aadhaar"
                value={aadhaarLast4}
                onChange={(e) => setAadhaarLast4(e.target.value.replace(/\D/g, "").slice(0, 4))}
                maxLength={4}
                className="flex-1 outline-none text-lg"
              />
            </div>

            <button
              onClick={handleRegister}
              disabled={loading}
              className="w-full h-14 bg-[#FF5404] rounded-xl text-white text-xl font-semibold flex items-center justify-center gap-2 shadow-md hover:bg-orange-600 transition disabled:opacity-50"
            >
              {loading ? "Registering..." : "Create Account"}
              {!loading && <ArrowRight size={22} />}
            </button>

            <p className="text-center text-lg">
              Already have an account?{" "}
              <button
                onClick={() => router.push("/worker/login")}
                className="text-orange-500 font-semibold hover:text-orange-600"
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
