"use client";

import { useRouter } from "next/navigation";

export default function BottomCTA() {
  const router = useRouter();
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-md">
      <button
        onClick={() => router.push("/login")}
        className="w-full bg-orange-500 text-white py-4 rounded-xl shadow-2xl font-bold text-lg transition-transform duration-100 active:scale-95"
      >
        Book a Worker
      </button>
    </div>
  );
}