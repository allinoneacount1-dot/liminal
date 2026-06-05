"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wallet, ArrowUpRight, ArrowDownLeft, TrendingUp, TrendingDown,
  Activity, DollarSign, BarChart3, PieChart, Clock, ExternalLink,
  Copy, LogOut, Settings, Bell, ChevronRight, RefreshCw,
  ArrowDown, Check, X, Send, Repeat, Download
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart as RePieChart, Pie, Cell,
} from "recharts";
import { useWalletStore, useNotificationStore } from "@/stores";
import Link from "next/link";

const portfolioData = [
  { name: "Jan", value: 4200 }, { name: "Feb", value: 5800 },
  { name: "Mar", value: 4900 }, { name: "Apr", value: 7200 },
  { name: "May", value: 6100 }, { name: "Jun", value: 8400 },
];

const allocationData = [
  { name: "SOL", value: 45, color: "#9945FF" },
  { name: "LIMINAL", value: 25, color: "#00D4FF" },
  { name: "USDC", value: 15, color: "#2775CA" },
  { name: "ETH", value: 10, color: "#627EEA" },
  { name: "Other", value: 5, color: "#7B2FFF" },
];

const recentActivity = [
  { type: "swap", description: "Swapped 100 SOL → 2,450 LIMINAL", time: "2 min ago", icon: ArrowUpRight, color: "text-[#00D4FF]" },
  { type: "stake", description: "Staked 500 LIMINAL", time: "1 hour ago", icon: TrendingUp, color: "text-[#7B2FFF]" },
  { type: "receive", description: "Received 250 USDC", time: "3 hours ago", icon: ArrowDownLeft, color: "text-green-400" },
  { type: "send", description: "Sent 0.5 ETH to 0x7a3...f92d", time: "5 hours ago", icon: ArrowUpRight, color: "text-[#FF3366]" },
];

const tokens = [
  { symbol: "SOL", name: "Solana", balance: "124.50", value: "$8,964", change: "+12.4%", positive: true },
  { symbol: "LIMINAL", name: "Liminal", balance: "12,450", value: "$3,112", change: "+8.7%", positive: true },
  { symbol: "USDC", name: "USD Coin", balance: "1,250.00", value: "$1,250", change: "0.0%", positive: true },
  { symbol: "ETH", name: "Ethereum", balance: "0.85", value: "$1,516", change: "-2.1%", positive: false },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "portfolio" | "activity">("overview");
  const [copied, setCopied] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { connected, address, balance, connect, disconnect } = useWalletStore();
  const { add } = useNotificationStore();

  const handleCopyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      add({ type: "success", title: "Address Copied", message: "Wallet address copied to clipboard" });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      add({ type: "info", title: "Refreshed", message: "Portfolio data updated" });
    }, 1500);
  };

  const truncateAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  return (
    <div className="min-h-screen bg-[var(--void)] pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-white mb-1">Dashboard</h1>
            <p className="text-[#6b6b80]">{connected ? `Connected: ${truncateAddress(address || "")}` : "Connect your wallet to view portfolio"}</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={handleRefresh} className={`glass p-2.5 rounded-xl text-[#6b6b80] hover:text-white transition-colors ${refreshing ? "animate-spin" : ""}`}>
              <RefreshCw size={18} />
            </button>
            <Link href="/settings" className="glass p-2.5 rounded-xl text-[#6b6b80] hover:text-white transition-colors">
              <Settings size={18} />
            </Link>
          </div>
        </div>

        {/* Wallet Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-6 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#7B2FFF]/5 to-[#00D4FF]/5" />
          <div className="relative">
            {connected && address ? (
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Wallet className="w-5 h-5 text-[#00D4FF]" />
                    <span className="text-sm text-[#6b6b80]">Total Portfolio Value</span>
                  </div>
                  <div className="text-4xl font-black text-white mb-1">$14,842.50</div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400 text-sm font-medium flex items-center gap-1"><TrendingUp size={14} /> +18.4%</span>
                    <span className="text-[#6b6b80] text-sm">vs last month</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="glass rounded-xl px-4 py-3">
                    <div className="text-xs text-[#6b6b80] mb-1">Wallet</div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono text-white">{truncateAddress(address)}</span>
                      <button onClick={handleCopyAddress} className="p-1 rounded hover:bg-white/5 transition-colors">
                        {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} className="text-[#6b6b80]" />}
                      </button>
                    </div>
                  </div>
                  <button onClick={disconnect} className="px-4 py-3 rounded-xl border border-red-400/20 text-red-400 hover:bg-red-400/10 transition-colors text-sm font-medium flex items-center gap-2">
                    <LogOut size={14} /> Disconnect
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <div className="text-2xl font-bold text-white mb-2">Connect Your Wallet</div>
                  <p className="text-[#6b6b80]">Connect your wallet to view your portfolio, stake tokens, and access all features.</p>
                </div>
                <button onClick={connect} className="btn-glow px-8 py-4 rounded-xl text-sm font-bold text-white flex items-center gap-2">
                  <Wallet size={18} /> Connect Wallet
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Earnings", value: "$2,847", change: "+24%", icon: DollarSign, color: "text-[#00D4FF]" },
            { label: "Active Positions", value: "7", change: "+2", icon: BarChart3, color: "text-[#7B2FFF]" },
            { label: "Staked Value", value: "$8,250", change: "+12%", icon: TrendingUp, color: "text-green-400" },
            { label: "APY Average", value: "18.4%", change: "+2.1%", icon: Activity, color: "text-[#FF3366]" },
          ].map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass rounded-xl p-5 cursor-default">
              <div className="flex items-center justify-between mb-3">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                <span className="text-xs text-green-400">{stat.change}</span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-xs text-[#6b6b80]">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Swap", icon: Repeat, href: "/swap", color: "from-[#7B2FFF] to-[#00D4FF]" },
            { label: "Stake", icon: TrendingUp, href: "/stake", color: "from-[#00D4FF] to-[#FF3366]" },
            { label: "Send", icon: Send, href: "/send", color: "from-[#FF3366] to-[#7B2FFF]" },
            { label: "Receive", icon: Download, href: "/receive", color: "from-[#00D4FF] to-[#7B2FFF]" },
          ].map((action) => (
            <Link key={action.label} href={action.href} className={`glass rounded-xl p-4 flex items-center gap-3 hover:border-[#7B2FFF]/20 transition-all group`}>
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center`}>
                <action.icon size={18} className="text-white" />
              </div>
              <span className="font-medium text-white group-hover:text-[#00D4FF] transition-colors">{action.label}</span>
              <ChevronRight size={16} className="ml-auto text-[#6b6b80] group-hover:text-white transition-colors" />
            </Link>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 mb-6 glass rounded-xl p-1 w-fit">
          {(["overview", "portfolio", "activity"] as const).map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab ? "bg-gradient-to-r from-[#7B2FFF] to-[#00D4FF] text-white" : "text-[#6b6b80] hover:text-white"}`}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 glass rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-white">Portfolio Performance</h3>
                  <button onClick={handleRefresh} className={`text-[#6b6b80] hover:text-white transition-colors ${refreshing ? "animate-spin" : ""}`}><RefreshCw size={16} /></button>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={portfolioData}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#7B2FFF" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#00D4FF" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="name" stroke="#6b6b80" fontSize={12} />
                      <YAxis stroke="#6b6b80" fontSize={12} />
                      <Tooltip contentStyle={{ background: "#111118", border: "1px solid #1a1a24", borderRadius: "8px", color: "#e4e4ef" }} />
                      <Area type="monotone" dataKey="value" stroke="#00D4FF" strokeWidth={2} fill="url(#colorValue)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="glass rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-6">Allocation</h3>
                <div className="h-48 mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <RePieChart>
                      <Pie data={allocationData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={3} dataKey="value">
                        {allocationData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
                      </Pie>
                    </RePieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2">
                  {allocationData.map((item) => (
                    <div key={item.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ background: item.color }} />
                        <span className="text-sm text-[#6b6b80]">{item.name}</span>
                      </div>
                      <span className="text-sm font-medium text-white">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "portfolio" && (
            <motion.div key="portfolio" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div className="glass rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-[#1a1a24]">
                  <h3 className="text-lg font-bold text-white">Token Holdings</h3>
                </div>
                <div className="divide-y divide-[#1a1a24]">
                  {tokens.map((token) => (
                    <div key={token.symbol} className="flex items-center justify-between p-6 hover:bg-white/[0.02] transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7B2FFF]/20 to-[#00D4FF]/20 flex items-center justify-center">
                          <span className="text-sm font-bold text-white">{token.symbol.slice(0, 2)}</span>
                        </div>
                        <div>
                          <div className="font-semibold text-white">{token.symbol}</div>
                          <div className="text-sm text-[#6b6b80]">{token.name}</div>
                        </div>
                      </div>
                      <div className="text-right mr-4">
                        <div className="font-semibold text-white">{token.balance}</div>
                        <div className="text-sm text-[#6b6b80]">{token.value}</div>
                      </div>
                      <div className={`text-sm font-medium ${token.positive ? "text-green-400" : "text-[#FF3366]"}`}>{token.change}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "activity" && (
            <motion.div key="activity" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-white">Recent Activity</h3>
                  <button className="text-sm text-[#6b6b80] hover:text-white transition-colors">View All</button>
                </div>
                <div className="space-y-4">
                  {recentActivity.map((activity, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/[0.02] transition-colors cursor-pointer group">
                      <div className={`w-10 h-10 rounded-xl bg-[var(--surface)] flex items-center justify-center ${activity.color}`}>
                        <activity.icon size={18} />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-white">{activity.description}</div>
                        <div className="text-xs text-[#6b6b80] flex items-center gap-1 mt-1"><Clock size={12} /> {activity.time}</div>
                      </div>
                      <ExternalLink size={16} className="text-[#6b6b80] group-hover:text-white transition-colors" />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
