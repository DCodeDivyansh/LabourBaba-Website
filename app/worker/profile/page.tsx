"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, User, Phone, Briefcase, Upload, Save } from "lucide-react";
import { getMe, updateMe, getDocuments, uploadDocument, type Worker, type WorkerDocument } from "@/lib/api/worker";

export default function WorkerProfilePage() {
  const router = useRouter();
  const [worker, setWorker] = useState<Worker | null>(null);
  const [documents, setDocuments] = useState<WorkerDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editSkillType, setEditSkillType] = useState("");
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      const [meRes, docsRes] = await Promise.all([getMe(), getDocuments()]);
      if (meRes.success) {
        setWorker(meRes.data);
        setEditName(meRes.data.name);
        setEditPhone(meRes.data.phone);
        setEditSkillType(meRes.data.skill_type || "");
      }
      if (docsRes.success) setDocuments(docsRes.data);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSave = async () => {
    if (!editName) return;
    try {
      await updateMe({ name: editName, phone: editPhone, skill_type: editSkillType });
      setEditMode(false);
      await loadData();
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || "Failed to update profile");
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
        <header className="relative z-10 h-16 bg-white shadow-sm flex items-center justify-between px-4">
          <button onClick={() => router.back()}>
            <ArrowLeft size={24} className="text-[#FF5404]" />
          </button>
          <h1 className="text-2xl font-bold text-[#FF5404]">My Profile</h1>
          <button
            onClick={() => (editMode ? handleSave() : setEditMode(true))}
            className="text-orange-500 font-medium"
          >
            {editMode ? <Save size={24} /> : "Edit"}
          </button>
        </header>

        <div className="px-6 py-8 relative z-10 space-y-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          {/* Profile Info */}
          <section className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 rounded-full bg-orange-100 flex items-center justify-center">
                <User size={48} className="text-orange-500" />
              </div>
              <h2 className="mt-4 text-2xl font-bold text-gray-900">
                {editMode ? (
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="text-center border-b-2 border-orange-200 focus:border-orange-500 outline-none"
                  />
                ) : (
                  worker?.name
                )}
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone size={20} className="text-gray-500" />
                {editMode ? (
                  <input
                    type="text"
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    className="flex-1 border-b-2 border-orange-200 focus:border-orange-500 outline-none"
                  />
                ) : (
                  <span className="text-gray-700">{worker?.phone}</span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <Briefcase size={20} className="text-gray-500" />
                {editMode ? (
                  <select
                    value={editSkillType}
                    onChange={(e) => setEditSkillType(e.target.value)}
                    className="flex-1 border-b-2 border-orange-200 focus:border-orange-500 outline-none bg-white"
                  >
                    <option value="Plumber">Plumber</option>
                    <option value="Electrician">Electrician</option>
                    <option value="Carpenter">Carpenter</option>
                    <option value="Painter">Painter</option>
                    <option value="Labour">Labour</option>
                  </select>
                ) : (
                  <span className="text-gray-700">{worker?.skill_type}</span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-gray-500">Verification:</span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    worker?.verification_status === "VERIFIED"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {worker?.verification_status || "PENDING"}
                </span>
              </div>
            </div>
          </section>

          {/* Documents */}
          <section className="bg-white rounded-2xl p-6 shadow-md">
            <h3 className="text-lg font-semibold mb-4">Documents</h3>
            <div className="space-y-3">
              {documents.map((doc) => (
                <div key={doc.id} className="p-4 border border-orange-100 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="font-medium">{doc.document_type}</span>
                    <span
                      className={`ml-3 px-2 py-1 rounded-full text-xs ${
                        doc.status === "VERIFIED"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {doc.status}
                    </span>
                  </div>
                  {doc.file_url && (
                    <a
                      href={doc.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-500 font-medium"
                    >
                      View
                    </a>
                  )}
                </div>
              ))}
              <button className="w-full py-3 rounded-xl border-2 border-dashed border-orange-300 text-orange-500 font-semibold flex items-center justify-center gap-2">
                <Upload size={20} /> Upload Document
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
