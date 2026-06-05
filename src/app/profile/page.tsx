"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Copy, ExternalLink, LogOut, Shield, Clock, Wallet, ChevronRight, Check } from "lucide-react";
import { useWalletStore, useNotificationStore } from "@/stores";
import Link from "next/link";

export default function ProfilePage() {
  const [copied, setCopied] = useState(false);
  const { connected, address, balance, disconnect } = useWalletStore();
  const { add } = useNotificationStore();

  const handleCopy = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      add({ type: "success", title: "Copied", message: "Address copied to clipboard" });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDisconnect = () => {
    disconnect();
    add({ type: "info", title: "Disconnected", message: "Wallet disconnected successfully" });
  };

  const truncateAddress = (addr: string) => `${addr.slice(0, 8)}...${addr.slice(-6)}`;

  return (
    <div className="min-h-screen bg-[var(--void)] pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-black text-white mb-8">Profile</h1>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-8 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#7B2FFF]/5 to-[#00D4FF]/5" />
          <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#7B2FFF] to-[#00D4FF] flex items-center justify-center">
              <User size={36} className="text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-1">Operator</h2>
              {connected && address ? (
                <div className="flex items-center gap-2 text-sm text-[#6b6b80]">
                  <Wallet size={14} />
                  <span className="font-mono">{truncateAddress(address)}</span>
                  <button onClick={handleCopy} className="p-1 rounded hover:bg-white/5 transition-colors">
                    {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} className="text-[#6b6b80]" />}
                  </button>
                </div>
              ) : (
                <p className="text-sm text-[#6b6b80]">Not connected</p>
              )}
            </div>
            {connected && (
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{balance} SOL</div>
                <div className="text-sm text-[#6b6b80]">${(parseFloat(balance) * 72).toFixed(2)}</div>
              </div>
            )}
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Transactions", value: "1,247" },
            { label: "Member Since", value: "Jun 2026" },
            { label: "Staked Value", value: "$8,250" },
            { label: "Total Earnings", value: "$2,847" },
          ].map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass rounded-xl p-5">
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-[#6b6b80]">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="space-y-3">
          {[
            { icon: Shield, label: "Security", desc: "2FA, password, recovery phrase", action: () => add({ type: "info", title: "Security", message: "Security settings coming soon" }) },
            { icon: Clock, label: "Transaction History", desc: "View all your transactions", href: "/dashboard" },
            { icon: Wallet, label: "Wallet Management", desc: "Connected wallets & permissions", action: () => {} },
          ].map((item, i) => (
            <motion.div key={item.label} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
              {item.href ? (
                <Link href={item.href} className="glass rounded-xl p-5 flex items-center justify-between cursor-pointer hover:border-[#7B2FFF]/20 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#111118] flex items-center justify-center"><item.icon size={18} className="text-[#00D4FF]" /></div>
                    <div><div className="font-semibold text-white">{item.label}</div><div className="text-sm text-[#6b6b80]">{item.desc}</div></div>
                  </div>
                  <ChevronRight size={18} className="text-[#6b6b80] group-hover:text-white transition-colors" />
                </Link>
              ) : (
                <button onClick={item.action} className="w-full glass rounded-xl p-5 flex items-center justify-between cursor-pointer hover:border-[#7B2FFF]/20 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#111118] flex items-center justify-center"><item.icon size={18} className="text-[#00D4FF]" /></div>
                    <div className="text-left"><div className="font-semibold text-white">{item.label}</div><div className="text-sm text-[#6b6b80]">{item.desc}</div></div>
                  </div>
                  <ChevronRight size={18} className="text-[#6b6b80] group-hover:text-white transition-colors" />
                </button>
              )}
            </motion.div>
          ))}
          {connected && (
            <motion.button initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} onClick={handleDisconnect} className="w-full glass rounded-xl p-5 flex items-center justify-between cursor-pointer hover:border-red-400/20 transition-all group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center"><LogOut size={18} className="text-red-400" /></div>
                <div className="text-left"><div className="font-semibold text-red-400">Disconnect Wallet</div><div className="text-sm text-[#6b6b80]">Sign out of current session</div></div>
              </div>
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}
