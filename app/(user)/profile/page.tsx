"use client";

import { useRouter } from "next/navigation";

import { motion } from "framer-motion";
import {
  Bookmark,
  History,
  Star,
  HeadphonesIcon,
  ChevronRight,
  LogOut,
  Phone,
  Pencil,
} from "lucide-react";

import TopNavbar from "@/components/TopNavbar";
import BottomNav from "@/components/BottomNav";
import { logout } from "@/lib/api/auth";

const menuItems = [
  {
    title: "Saved Locations",
    href: "/location",
    subtitle: "Manage home, work & sites",
    icon: Bookmark,
  },
  {
    title: "Request History",
    href: "/requests",
    subtitle: "View past labour bookings",
    icon: History,
  },
  {
    title: "Reviews Given",
    href: "/reviews",
    subtitle: "Ratings you've provided",
    icon: Star,
  },
  {
    title: "Help & Support",
    href: "/help",
    subtitle: "FAQs & Customer Service",
    icon: HeadphonesIcon,
  },
];

export default function ProfilePage() {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-[#F8F9FB] pb-24 relative overflow-hidden">
      {/* Background Glow */}
      {/* <div className="absolute top-0 right-0 w-72 h-72 bg-orange-400/10 blur-[120px] rounded-full" /> */}

      {/* <div className="absolute bottom-40 left-0 w-72 h-72 bg-cyan-400/10 blur-[120px] rounded-full" /> */}

      <TopNavbar />

      <section className="max-w-md mx-auto px-4 pt-24 bg-white">
        {/* Profile Card */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="
            bg-white
            rounded-3xl
            border
            border-[#E2BFB0]
            shadow-lg
            p-4
            text-center
          "
        >
          <div className="relative inline-block">
            <div
              className="
                w-20
                h-20
                rounded-full
                bg-[#FF5404]
                text-white
                flex
                items-center
                justify-center
                text-5xl
                shadow-lg
              "
            >
              JD
            </div>

            <button
              className="
                absolute
                bottom-0
                right-0
                w-6
                h-6
                rounded-full
                bg-[#ffffff]
                text-[#FF5404]
                flex
                items-center
                justify-center
                shadow-md
              "
            >
              <Pencil size={14} />
            </button>
          </div>

          <h2 className="mt-3 text-3xl font-bold text-[#1F2937]">John Doe</h2>

          <div className="mt-1.5 flex items-center justify-center gap-2 text-[#6B7280]">
            <Phone size={16} />
            <span>+91 98765 43210</span>
          </div>
        </motion.div>

        {/* Menu Cards */}
        <div className="mt-6 space-y-2.5">
          {menuItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.button
                key={item.title}
                onClick={() => router.push(item.href)}
                initial={{
                  opacity: 0,
                  x: -20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -3,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                className="
                  w-full
                  bg-white
                  border
                  border-[#E2BFB0]
                  rounded-2xl
                  shadow-sm
                  p-2.5
                  flex
                  items-center
                  justify-between
                  hover:shadow-md
                  transition-all
                "
              >
                <div className="flex items-center gap-4">
                  <div
                    className="
                      w-10
                      h-10
                      rounded-full
                      bg-[#EEF2FF]
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <Icon size={18} className="text-[#5F6C8D]" />
                  </div>

                  <div className="text-left">
                    <h3 className="text-xl font-semibold text-[#1F2937]">
                      {item.title}
                    </h3>

                    <p className="text-sm text-[#6B7280]">{item.subtitle}</p>
                  </div>
                </div>

                <ChevronRight size={22} className="text-[#6B7280]" />
              </motion.button>
            );
          })}
        </div>

        {/* Divider */}
        <div className="my-4 border-t border-[#E2BFB0]" />

        {/* Logout */}
        <motion.button
          whileHover={{
            y: -3,
          }}
          whileTap={{
            scale: 0.98,
          }}
          className="
            w-full
            h-12
            rounded-full
            border-2
            border-[#FF5404]
            bg-white
            text-[#FF5404]
            font-semibold
            text-lg
            flex
            items-center
            justify-center
            gap-3
            shadow-sm
            hover:bg-orange-50
            transition-all
          "
          onClick={() => {logout(); router.push("/login")}}
        >
          <LogOut size={20} />
          Logout
        </motion.button>
      </section>

      <BottomNav />
    </main>
  );
}
