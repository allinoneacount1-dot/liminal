"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Moon, Globe, Shield, Volume2, Eye, ChevronRight, Check, RotateCcw } from "lucide-react";
import { useSettingsStore, useNotificationStore } from "@/stores";

export default function SettingsPage() {
  const settings = useSettingsStore();
  const { add } = useNotificationStore();
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    add({ type: "success", title: "Settings Saved", message: "Your preferences have been updated" });
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    settings.reset();
    add({ type: "info", title: "Settings Reset", message: "All settings restored to defaults" });
  };

  const Toggle = ({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) => (
    <button onClick={onToggle} className="relative w-12 h-7 rounded-full transition-colors duration-300" style={{ background: enabled ? "linear-gradient(135deg, #7B2FFF, #00D4FF)" : "#1a1a24" }}>
      <motion.div animate={{ x: enabled ? 20 : 2 }} transition={{ type: "spring", stiffness: 500, damping: 30 }} className="absolute top-1 w-5 h-5 rounded-full bg-white shadow-lg" />
    </button>
  );

  return (
    <div className="min-h-screen bg-[var(--void)] pt-24 pb-12 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-black text-white">Settings</h1>
          <div className="flex items-center gap-3">
            <button onClick={handleReset} className="glass px-4 py-2 rounded-xl text-sm text-[#6b6b80] hover:text-white transition-colors flex items-center gap-2">
              <RotateCcw size={14} /> Reset
            </button>
            <button onClick={handleSave} className="btn-glow px-6 py-2 rounded-xl text-sm font-bold text-white flex items-center gap-2">
              {saved ? <><Check size={14} /> Saved!</> : "Save Changes"}
            </button>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-6 mb-6">
          <h2 className="text-lg font-bold text-white mb-4">Preferences</h2>
          <div className="space-y-4">
            {[
              { icon: Bell, label: "Notifications", desc: "Push notifications for transactions", state: settings.notifications, toggle: () => settings.setNotifications(!settings.notifications) },
              { icon: Moon, label: "Dark Mode", desc: "Always use dark theme", state: settings.darkMode, toggle: () => settings.setDarkMode(!settings.darkMode) },
              { icon: Volume2, label: "Sound Effects", desc: "Play sounds for interactions", state: settings.sounds, toggle: () => settings.setSounds(!settings.sounds) },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#111118] flex items-center justify-center"><item.icon size={18} className="text-[#00D4FF]" /></div>
                  <div><div className="font-semibold text-white">{item.label}</div><div className="text-sm text-[#6b6b80]">{item.desc}</div></div>
                </div>
                <Toggle enabled={item.state} onToggle={item.toggle} />
              </div>
            ))}
            <div className="flex items-center justify-between p-3 rounded-xl hover:bg-white/[0.02] transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#111118] flex items-center justify-center"><Globe size={18} className="text-[#00D4FF]" /></div>
                <div><div className="font-semibold text-white">Language</div><div className="text-sm text-[#6b6b80]">English</div></div>
              </div>
              <select value={settings.language} onChange={(e) => settings.setLanguage(e.target.value)} className="bg-[#111118] rounded-lg px-3 py-1.5 text-sm text-white outline-none">
                <option value="en">English</option>
                <option value="id">Indonesia</option>
                <option value="zh">中文</option>
                <option value="ja">日本語</option>
              </select>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-2xl p-6 mb-6">
          <h2 className="text-lg font-bold text-white mb-4">Security</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl hover:bg-white/[0.02] transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#111118] flex items-center justify-center"><Eye size={18} className="text-[#7B2FFF]" /></div>
                <div><div className="font-semibold text-white">Privacy Mode</div><div className="text-sm text-[#6b6b80]">Hide balances in public</div></div>
              </div>
              <Toggle enabled={settings.privacy} onToggle={() => settings.setPrivacy(!settings.privacy)} />
            </div>
            <button onClick={() => add({ type: "info", title: "Change Password", message: "Password change coming soon" })} className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/[0.02] transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#111118] flex items-center justify-center"><Shield size={18} className="text-[#7B2FFF]" /></div>
                <div className="font-semibold text-white">Change Password</div>
              </div>
              <ChevronRight size={18} className="text-[#6b6b80]" />
            </button>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass rounded-2xl p-6">
          <h2 className="text-lg font-bold text-white mb-4">About</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3"><span className="text-[#6b6b80]">Version</span><span className="text-white font-medium">0.1.0-beta</span></div>
            <div className="flex items-center justify-between p-3"><span className="text-[#6b6b80]">Network</span><span className="text-white font-medium">Solana Mainnet</span></div>
            <button onClick={() => add({ type: "info", title: "Terms of Service", message: "Terms of Service coming soon" })} className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/[0.02] transition-colors"><span className="text-[#6b6b80]">Terms of Service</span><ChevronRight size={18} className="text-[#6b6b80]" /></button>
            <button onClick={() => add({ type: "info", title: "Privacy Policy", message: "Privacy Policy coming soon" })} className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/[0.02] transition-colors"><span className="text-[#6b6b80]">Privacy Policy</span><ChevronRight size={18} className="text-[#6b6b80]" /></button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
