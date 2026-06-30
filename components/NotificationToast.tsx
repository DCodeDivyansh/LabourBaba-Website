"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface NotificationToastProps {
  title?: string;
  message?: string;
  onClose: () => void;
}

export default function NotificationToast({ title, message, onClose }: NotificationToastProps) {
  return (
    <AnimatePresence>
      {(title || message) && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-white border border-orange-100 shadow-2xl rounded-2xl p-4 max-w-md w-full mx-4"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              {title && (
                <h4 className="font-semibold text-slate-900 text-lg">{title}</h4>
              )}
              {message && (
                <p className="text-sm text-slate-600 mt-1">{message}</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
