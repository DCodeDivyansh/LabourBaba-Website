"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const router = useRouter();
  return (
    <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-md items-center justify-between px-5 py-4">

        <Link href="/">
          <Image
            src="/Logo.svg"
            alt="LabourBaba Logo"
            width={198}
            height={60}
            priority
            className="object-contain"
          />
        </Link>

        <button
          onClick={() => router.push("/login")}
          className="rounded-full bg-orange-500 px-6 py-3 font-semibold text-white shadow-md transition-transform duration-150 hover:scale-105 active:scale-95"
        >
          Login
        </button>

      </div>
    </nav>
  );
}