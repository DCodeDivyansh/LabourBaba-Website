"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSkills, addSkill, type SkillCategory } from "@/lib/api/skill";
import { ArrowLeft, Plus } from "lucide-react";

export default function AdminSkillsPage() {
  const router = useRouter();
  const [skills, setSkills] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");

  const loadSkills = async () => {
    setLoading(true);
    try {
      const data = await getSkills();
      if (data.success) {
        setSkills(data.data);
      }
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || "Failed to load skills");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const handleAddSkill = async () => {
    if (!name) {
      setError("Please enter a skill name");
      return;
    }

    setAddLoading(true);
    setError("");

    try {
      await addSkill({ name });
      await loadSkills();
      setName("");
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || "Failed to add skill");
    } finally {
      setAddLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F4F6F8]">
      <div className="w-full max-w-md mx-auto min-h-screen relative overflow-hidden">
        <header className="relative z-10 h-16 bg-white shadow-md flex items-center px-4">
          <button onClick={() => router.back()}>
            <ArrowLeft size={24} className="text-[#FF5404]" />
          </button>
          <h1 className="ml-4 text-2xl font-bold text-[#FF5404]">Admin - Skills</h1>
        </header>

        <div className="px-6 py-8 relative z-10">
          {error && (
            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          <div className="mb-8 p-5 bg-white rounded-xl shadow-md">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Add New Skill</h2>
            
            <div className="space-y-3 mb-4">
              <div className="flex items-center border border-[#F2B8A0] rounded-xl h-12 px-3">
                <input
                  type="text"
                  placeholder="Skill Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="flex-1 outline-none text-lg"
                />
              </div>
            </div>

            <button
              onClick={handleAddSkill}
              disabled={addLoading}
              className="w-full h-12 bg-orange-500 text-white font-semibold rounded-xl shadow-md hover:bg-orange-600 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {addLoading ? (
                "Adding..."
              ) : (
                  <>
                    <Plus size={20} /> Add Skill
                  </>
                )}
            </button>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4 text-gray-800">All Skills ({skills.length})</h2>

            {loading ? (
              <div className="flex items-center justify-center py-10">
                <p className="text-gray-500">Loading skills...</p>
              </div>
            ) : (
              <div className="space-y-3">
                {skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="p-4 bg-white rounded-xl shadow-md flex items-center justify-between"
                  >
                    <div>
                      <h3 className="font-semibold text-gray-800">{skill.name}</h3>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
