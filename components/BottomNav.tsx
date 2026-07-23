"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {Home,NotepadText ,BellRing,UserRoundArrowLeft } from "lucide-react"
const navItems = [
  {
    label: "Home",
    href: "/home",
    icon: Home,
  },
  {
    label: "Create Request",
    href: "/create-request",
    icon: NotepadText,
  },
  {
    label: "Alerts",
    href: "/alerts",
    icon: BellRing,
    hasNotification: true,
  },
  {
    label: "Profile",
    href: "/profile",
    icon: UserRoundArrowLeft,
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="
    fixed
    bottom-3
    left-1/2
    -translate-x-1/2
    z-50
    w-[calc(100%-20px)]
    max-w-md
    rounded-2xl
    border
    border-orange-100
    bg-white/95
    backdrop-blur-xl
    shadow-xl
    px-2
    py-2
  "
    >
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.label}
              href={item.href}
            >
              <motion.div
                whileHover={{
                  y: -4,
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.9,
                }}
                className="relative flex flex-col items-center"
              >
                {/* Notification Dot */}
                {item.hasNotification && (
                  <motion.span
                    animate={{
                      scale: [1, 1.4, 1],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                    }}
                    className="
                      absolute
                      top-0
                      right-1
                      h-2
                      w-2
                      rounded-full
                      bg-red-500
                    "
                  />
                )}

                {/* Active Background */}
                <motion.div
                  animate={{
                    backgroundColor: isActive
                      ? "#FF5404"
                      : "rgba(0,0,0,0)",
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                  className="
                    flex
                    h-10
                    w-14
                    items-center
                    justify-center
                    rounded-full
                  "
                >
                  <motion.div
                    animate={{
                      rotate: isActive ? [0, -10, 10, 0] : 0,
                      scale: isActive ? 1.08 : 1,
                    }}
                    transition={{
                      duration: 0.4,
                    }}
                  >
                    <Icon
                      size={20}
                      color={isActive ? "#FFFFFF" : "#64748B"}
                    />
                  </motion.div>
                </motion.div>

                <motion.span
                  animate={{
                    color: isActive
                      ? "#FF5404"
                      : "#64748B",
                  }}
                  className="mt-1 text-[11px] font-medium"
                >
                  {item.label}
                </motion.span>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
