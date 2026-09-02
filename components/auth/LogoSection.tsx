"use client";

import Image from "next/image";

export default function LogoSection() {
  return (
    <div className="mb-5 text-center sm:mb-8">
      <div className="flex justify-center">
        <Image
          src="/Logo.svg"
          alt="LabourBaba Logo"
          width={260}
          height={78}
          priority
          className="h-auto w-[190px] select-none sm:w-[260px]"
        />
      </div>

      <p className="mt-1 text-sm tracking-wide text-[#6a5447] sm:mt-3 sm:text-lg">
        Find&nbsp;&nbsp;Book&nbsp;&nbsp;Build
      </p>

      <div className="mx-auto mt-2 h-1 w-14 rounded-full bg-linear-to-r from-orange-400 via-orange-500 to-green-500 sm:mt-4 sm:w-20" />
    </div>
  );
}