"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useAuthStore } from "@/stores/authStore";

export default function TopNavbar() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const user = useAuthStore((state) => state.user);

  // Compute initials
  const initials = user?.name
    ? user.name
        .split(" ")
        .slice(0, 2)
        .map((w) => w[0]?.toUpperCase() || "")
        .join("")
    : "?";

  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY < 50) {
        setShowNavbar(true);
      } else if (window.scrollY > lastScrollY) {
        // scrolling down
        setShowNavbar(false);
      } else {
        // scrolling up
        setShowNavbar(true);
      }

      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", controlNavbar);

    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  return (
    <header
      className={`
        fixed
        top-0
        left-0
        right-0
        max-w-md
        mx-auto
        z-50
        bg-white
        shadow-md
        transition-transform
        duration-300
        ${showNavbar ? "translate-y-1" : "-translate-y-full"}
      `}
    >
      <div className="flex items-center justify-between px-4 py-3">
        <Image src="/logo.svg" alt="LabourBaba" width={180} height={50} />

        <div className="w-10 h-10 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center font-extrabold text-orange-500 text-sm select-none shadow-inner">
          {initials}
        </div>
      </div>
    </header>
  );
}
