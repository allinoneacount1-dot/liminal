"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Moon, Globe, Shield, Palette, Volume2, Eye, ChevronRight, ToggleLeft, ToggleRight } from "lucide-react";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [privacy, setPrivacy] = useState(false);
  const [sounds, setSounds] = useState(true);

  const Toggle = ({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) => (
    <button onClick={onToggle} className="text-[var(--muted)] hover:text-white transition-colors">
      {enabled ? <ToggleRight size={28} className="text-[var(--cyan)]" /> : <ToggleLeft size={28} />}
    </button>
  );

  return (
    <div className="min-h-screen bg-[var(--void)] pt-24 pb-12 px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-black text-white mb-8">Settings</h1>

        {/* Preferences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-6 mb-6"
        >
          <h2 className="text-lg font-bold text-white mb-4">Preferences</h2>
          <div className="space-y-4">
            {[
              { icon: Bell, label: "Notifications", desc: "Push notifications for transactions", state: notifications, toggle: () => setNotifications(!notifications) },
              { icon: Moon, label: "Dark Mode", desc: "Always use dark theme", state: darkMode, toggle: () => setDarkMode(!darkMode) },
              { icon: Volume2, label: "Sound Effects", desc: "Play sounds for interactions", state: sounds, toggle: () => setSounds(!sounds) },
              { icon: Globe, label: "Language", desc: "English", state: true, toggle: () => {} },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[var(--surface)] flex items-center justify-center">
                    <item.icon size={18} className="text-[var(--cyan)]" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">{item.label}</div>
                    <div className="text-sm text-[var(--muted)]">{item.desc}</div>
                  </div>
                </div>
                <Toggle enabled={item.state} onToggle={item.toggle} />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Security */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-6 mb-6"
        >
          <h2 className="text-lg font-bold text-white mb-4">Security</h2>
          <div className="space-y-3">
            {[
              { icon: Shield, label: "Two-Factor Authentication", desc: "Add an extra layer of security" },
              { icon: Eye, label: "Privacy Mode", desc: "Hide balances in public", state: privacy, toggle: () => setPrivacy(!privacy) },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[var(--surface)] flex items-center justify-center">
                    <item.icon size={18} className="text-[var(--violet)]" />
                  </div>
                  <div className="font-semibold text-white">{item.label}</div>
                </div>
                {"state" in item ? (
                  <Toggle enabled={item.state!} onToggle={item.toggle!} />
                ) : (
                  <ChevronRight size={18} className="text-[var(--muted)]" />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* About */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-6"
        >
          <h2 className="text-lg font-bold text-white mb-4">About</h2>
          <div className="space-y-3">
            {[
              { label: "Version", value: "0.1.0-beta" },
              { label: "Network", value: "Solana Mainnet" },
              { label: "Terms of Service", href: "#" },
              { label: "Privacy Policy", href: "#" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between p-3 rounded-xl">
                <span className="text-[var(--muted)]">{item.label}</span>
                {"value" in item ? (
                  <span className="text-white font-medium">{item.value}</span>
                ) : (
                  <ChevronRight size={18} className="text-[var(--muted)]" />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
