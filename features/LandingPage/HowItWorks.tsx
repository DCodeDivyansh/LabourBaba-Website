"use client";

import { motion } from "framer-motion";

const steps = [
  {
    title: "Post a Job",
    description:
      "Specify the skills, duration, budget and location for your requirement.",
  },
  {
    title: "Get Matched",
    description:
      "Our intelligent matching system instantly connects you with nearby verified workers.",
  },
  {
    title: "Manage & Track",
    description:
      "Approve bookings, monitor progress and manage everything from one dashboard.",
  },
  {
    title: "Pay Securely",
    description:
      "Complete payments safely after the work is finished.",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative max-w-md mx-auto px-5 py-16">

      <h2 className="text-4xl font-extrabold text-center mb-14">
        How It Works
      </h2>

      <div className="relative">
        <div className="absolute left-5 top-5 h-[88%] w-0.75 bg-orange-300 rounded-full" />

        <div className="space-y-10">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.25, delay: index * 0.05 }}
              className="flex gap-5"
            >
              <div className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange-500 text-white font-bold shadow-lg">
                {index + 1}
              </div>

              <div className="flex-1 rounded-2xl border border-gray-200 bg-white p-6 shadow-md transition-shadow duration-150 hover:shadow-xl">
                <h3 className="text-xl font-bold text-gray-900">
                  {step.title}
                </h3>
                <p className="mt-3 text-gray-500 leading-7">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
}