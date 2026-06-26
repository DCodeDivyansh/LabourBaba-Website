"use client";

import { useRouter } from "next/navigation";

import { Zap, Calendar, AlertTriangle, RotateCcw } from "lucide-react";

const actions = [
  { icon: Zap, href: "/CreateRequest", label: "Book Now" },
  { icon: Calendar, href: "/CreateRequest", label: "Schedule" },
  { icon: AlertTriangle, href: "/CreateRequest", label: "Emergency" },
  { icon: RotateCcw, href: "/Requests", label: "Repeat Prev." },
];

export default function QuickActions() {
  const router = useRouter();
  return (
    <div className="grid grid-cols-2 gap-4">
      {actions.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.label}
            className="bg-white border border-[#FF5404] rounded-2xl p-6 shadow-sm flex flex-col items-center"
            onClick={() => router.push(item.href)}
          >
            <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center">
              <Icon className="text-[#FF5404]" />
            </div>

            <p className="mt-4 font-medium">{item.label}</p>
          </div>
        );
      })}
    </div>
  );
}
