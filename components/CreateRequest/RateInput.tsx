"use client";

import { motion } from "framer-motion";

interface RateInputProps {
  title: string;
  market: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export default function RateInput({
  title,
  market,
  value,
  onChange,
  placeholder,
}: RateInputProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      whileHover={{ y: -2 }}
      className="rounded-3xl border border-orange-200 bg-white p-5 shadow-sm"
    >
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <h3 className="font-semibold text-lg text-neutral-900">{title}</h3>

        <motion.span
          whileHover={{ scale: 1.05 }}
          className="rounded-lg bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600"
        >
          {market}
        </motion.span>
      </div>

      {/* Input */}
      <motion.input
        whileFocus={{
          scale: 1.02,
        }}
        type="number"
        inputMode="numeric"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="
          h-16
          w-full
          rounded-2xl
          border
          border-orange-200
          bg-gray-50
          px-5
          text-xl
          outline-none
          transition-all
          focus:border-orange-500
          focus:bg-white
          focus:ring-4
          focus:ring-orange-100
        "
      />
    </motion.div>
  );
}
