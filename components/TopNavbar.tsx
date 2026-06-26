"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function TopNavbar() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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

        <div className="w-10 h-10 rounded-full bg-gray-200">
          <img
            src="https://i.pravatar.cc/100"
            alt="Profile"
            width={40}
            height={40}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>
    </header>
  );
}
