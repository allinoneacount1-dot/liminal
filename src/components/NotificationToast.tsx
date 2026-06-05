"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check, X, AlertCircle, Info } from "lucide-react";
import { useNotificationStore } from "@/stores";

const icons = {
  success: Check,
  error: X,
  warning: AlertCircle,
  info: Info,
};

const colors = {
  success: "border-green-400/30 bg-green-400/10",
  error: "border-red-400/30 bg-red-400/10",
  warning: "border-yellow-400/30 bg-yellow-400/10",
  info: "border-[#00D4FF]/30 bg-[#00D4FF]/10",
};

const iconColors = {
  success: "text-green-400",
  error: "text-red-400",
  warning: "text-yellow-400",
  info: "text-[#00D4FF]",
};

export function NotificationContainer() {
  const { notifications, remove } = useNotificationStore();

  return (
    <div className="fixed top-24 right-6 z-[70] space-y-3 max-w-sm">
      <AnimatePresence>
        {notifications.map((n) => {
          const Icon = icons[n.type];
          return (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: 100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.9 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`glass-strong rounded-xl p-4 border ${colors[n.type]} flex items-start gap-3 cursor-pointer`}
              onClick={() => remove(n.id)}
            >
              <Icon size={18} className={`${iconColors[n.type]} shrink-0 mt-0.5`} />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-white">{n.title}</div>
                <div className="text-xs text-[#6b6b80] mt-0.5">{n.message}</div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
