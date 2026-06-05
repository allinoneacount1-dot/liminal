"use client";

import { motion } from "framer-motion";
import { User, Copy, ExternalLink, LogOut, Shield, Clock, Wallet, ChevronRight } from "lucide-react";

const walletInfo = {
  address: "7a3F92dK8mNp4Qr5St6Uv7Wx8Yz9Ab0Cd1Ef2Gh3Ij4",
  connected: true,
  balance: "124.50 SOL",
  usdValue: "$8,964.00",
};

const profileStats = [
  { label: "Total Transactions", value: "1,247" },
  { label: "Member Since", value: "Jun 2026" },
  { label: "Staked Value", value: "$8,250" },
  { label: "Total Earnings", value: "$2,847" },
];

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[var(--void)] pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-black text-white mb-8">Profile</h1>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-8 mb-8 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--violet)]/5 to-[var(--cyan)]/5" />
          <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[var(--violet)] to-[var(--cyan)] flex items-center justify-center">
              <User size={36} className="text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-1">Operator</h2>
              <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
                <Wallet size={14} />
                <span className="font-mono">{walletInfo.address.slice(0, 8)}...{walletInfo.address.slice(-6)}</span>
                <button className="hover:text-white transition-colors"><Copy size={14} /></button>
                <button className="hover:text-white transition-colors"><ExternalLink size={14} /></button>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">{walletInfo.balance}</div>
              <div className="text-sm text-[var(--muted)]">{walletInfo.usdValue}</div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {profileStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-xl p-5"
            >
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-[var(--muted)]">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Menu */}
        <div className="space-y-3">
          {[
            { icon: Shield, label: "Security", desc: "2FA, password, recovery phrase", href: "/settings" },
            { icon: Clock, label: "Transaction History", desc: "View all your transactions", href: "/dashboard" },
            { icon: Wallet, label: "Wallet Management", desc: "Connected wallets & permissions", href: "/settings" },
            { icon: LogOut, label: "Disconnect Wallet", desc: "Sign out of current session", href: "#" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass rounded-xl p-5 flex items-center justify-between cursor-pointer hover:border-[var(--violet)]/20 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[var(--surface)] flex items-center justify-center">
                  <item.icon size={18} className="text-[var(--cyan)]" />
                </div>
                <div>
                  <div className="font-semibold text-white">{item.label}</div>
                  <div className="text-sm text-[var(--muted)]">{item.desc}</div>
                </div>
              </div>
              <ChevronRight size={18} className="text-[var(--muted)] group-hover:text-white transition-colors" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
