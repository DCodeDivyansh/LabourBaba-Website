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
    <section className="relative max-w-md mx-auto px-5 py-16 overflow-hidden">
      {/* Background Blur */}
      <motion.div
        animate={{
          x: [0, 40, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-orange-200/40 blur-3xl"
      />

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-4xl font-extrabold text-center mb-14"
      >
        How It Works
      </motion.h2>

      <div className="relative">
        {/* Animated Timeline */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4 }}
          style={{ originY: 0 }}
          className="absolute left-5 top-5 h-[88%] w-0.75 bg-orange-300 rounded-full"
        />

        <div className="space-y-10">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                x: 80,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.2,
              }}
              className="flex gap-5"
            >
              {/* Step Number */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 220,
                  damping: 15,
                }}
                whileHover={{
                  rotate: 360,
                  scale: 1.15,
                }}
                className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange-500 text-white font-bold shadow-lg"
              >
                {index + 1}
              </motion.div>

              {/* Card */}
              <motion.div
                whileHover={{
                  y: -8,
                  scale: 1.02,
                }}
                transition={{
                  duration: 0.25,
                }}
                className="flex-1 rounded-2xl border border-gray-200 bg-white p-6 shadow-md hover:shadow-xl"
              >
                <h3 className="text-xl font-bold text-gray-900">
                  {step.title}
                </h3>

                <p className="mt-3 text-gray-500 leading-7">
                  {step.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Arrow */}
      <motion.div
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.8,
        }}
        className="mt-12 flex justify-center"
      >
        <div className="h-10 w-1 rounded-full bg-orange-300 relative">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-3 w-3 rounded-full bg-orange-500" />
        </div>
      </motion.div>
    </section>
  );
}