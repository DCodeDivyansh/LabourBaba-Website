"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface CommonHeaderProps {
  title: string;
}

export default function CommonHeader({ title }: CommonHeaderProps) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-md mx-auto h-16 px-4 flex items-center">
        <button onClick={() => router.back()} className="mr-4">
          <ArrowLeft size={24} className="text-[#FF5404]" />
        </button>

        <h1 className="flex-1 text-center text-3xl font-bold text-[#FF5404] pr-8">
          {title}
        </h1>
      </div>
    </header>
  );
}
