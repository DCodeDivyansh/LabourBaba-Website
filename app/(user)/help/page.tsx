"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  Calendar,
  CreditCard,
  User,
  ChevronDown,
  Phone,
  Mail,
} from "lucide-react";

import CommonHeader from "@/components/CommonHeader";
import BottomNav from "@/components/BottomNav";

const faqData = [
  {
    title: "Booking",
    icon: Calendar,
    questions: [
      {
        q: "How do I book a worker?",
        a: "Select the service, enter your offer, choose the location and submit your request.",
      },
      {
        q: "Can I cancel a booking?",
        a: "Yes, before a worker accepts your request.",
      },
    ],
  },
  {
    title: "Payments",
    icon: CreditCard,
    questions: [
      {
        q: "How do I pay?",
        a: "Currently LabourBaba supports cash payments after the work is completed.",
      },
      {
        q: "Are there any booking charges?",
        a: "No. You only pay the agreed amount to the worker.",
      },
    ],
  },
  {
    title: "Account",
    icon: User,
    questions: [
      {
        q: "How do I edit my profile?",
        a: "Open Profile and tap the edit button.",
      },
      {
        q: "Can I change my phone number?",
        a: "Yes, after verifying your new mobile number.",
      },
    ],
  },
];

export default function HelpPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-[#F8F9FB] pb-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-orange-400/10 blur-[120px] rounded-full" />

      <div className="absolute bottom-40 left-0 w-72 h-72 bg-cyan-400/10 blur-[120px] rounded-full" />

      <CommonHeader title="Help & Support" />

      <section className="max-w-md mx-auto px-4 pt-24">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-[#1F2937]">
            Frequently Asked Questions
          </h1>
        </motion.div>

        {/* FAQ */}
        <div className="mt-8 space-y-4">
          {faqData.map((item, index) => {
            const Icon = item.icon;

            const open = openIndex === index;

            return (
              <motion.div
                key={item.title}
                whileHover={{ y: -2 }}
                className="bg-white rounded-2xl border border-[#E2BFB0] shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(open ? null : index)}
                  className="w-full p-5 flex justify-between items-center"
                >
                  <div className="flex items-center gap-4">
                    <Icon size={24} className="text-[#5F6C8D]" />

                    <span className="text-2xl font-semibold text-[#1F2937]">
                      {item.title}
                    </span>
                  </div>

                  <ChevronDown
                    className={`transition-transform duration-300 ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 space-y-4 border-t border-gray-100">
                        {item.questions.map((faq) => (
                          <div key={faq.q}>
                            <h3 className="font-semibold">{faq.q}</h3>

                            <p className="mt-1 text-gray-600 text-sm leading-6">
                              {faq.a}
                            </p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Need Help */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-10"
        >
          <h2 className="text-3xl font-bold text-[#1F2937]">Need More Help?</h2>

          <div className="mt-6 space-y-5">
            {/* Call */}
            <motion.a
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              href="tel:+919696317202"
              className="block bg-white rounded-3xl border border-[#E2BFB0] shadow-md p-8 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-[#FF5404] mx-auto flex items-center justify-center">
                <Phone size={28} className="text-white" />
              </div>

              <h3 className="mt-5 text-3xl font-bold">Call Us</h3>

              <p className="mt-2 text-[#6B7280] font-medium">Available 24/7</p>
            </motion.a>

            {/* Email */}
            <motion.a
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              href="mailto:support@labourbaba.in"
              className="block bg-white rounded-3xl border border-[#E2BFB0] shadow-md p-8 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-[#FF5404] mx-auto flex items-center justify-center">
                <Mail size={28} className="text-white" />
              </div>

              <h3 className="mt-5 text-3xl font-bold">Email Support</h3>

              <p className="mt-2 text-[#6B7280] font-medium">
                Response within 24h
              </p>
            </motion.a>
          </div>
        </motion.div>

        <div className="h-10" />
      </section>

      <BottomNav />
    </main>
  );
}
