"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  TrendingUp,
  TrendingDown,
  Activity,
  DollarSign,
  BarChart3,
  PieChart,
  Clock,
  ExternalLink,
  Copy,
  LogOut,
  Settings,
  Bell,
  ChevronRight,
  RefreshCw,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
} from "recharts";

const portfolioData = [
  { name: "Jan", value: 4200 },
  { name: "Feb", value: 5800 },
  { name: "Mar", value: 4900 },
  { name: "Apr", value: 7200 },
  { name: "May", value: 6100 },
  { name: "Jun", value: 8400 },
];

const allocationData = [
  { name: "SOL", value: 45, color: "#9945FF" },
  { name: "LIMINAL", value: 25, color: "#00D4FF" },
  { name: "USDC", value: 15, color: "#2775CA" },
  { name: "ETH", value: 10, color: "#627EEA" },
  { name: "Other", value: 5, color: "#7B2FFF" },
];

const recentActivity = [
  {
    type: "swap",
    description: "Swapped 100 SOL → 2,450 LIMINAL",
    time: "2 min ago",
    icon: ArrowUpRight,
    color: "text-[var(--cyan)]",
  },
  {
    type: "stake",
    description: "Staked 500 LIMINAL",
    time: "1 hour ago",
    icon: TrendingUp,
    color: "text-[var(--violet)]",
  },
  {
    type: "receive",
    description: "Received 250 USDC",
    time: "3 hours ago",
    icon: ArrowDownLeft,
    color: "text-green-400",
  },
  {
    type: "swap",
    description: "Swapped 0.5 ETH → 180 SOL",
    time: "5 hours ago",
    icon: ArrowUpRight,
    color: "text-[var(--cyan)]",
  },
];

const tokens = [
  { symbol: "SOL", name: "Solana", balance: "124.50", value: "$8,964", change: "+12.4%", positive: true },
  { symbol: "LIMINAL", name: "Liminal", balance: "12,450", value: "$3,112", change: "+8.7%", positive: true },
  { symbol: "USDC", name: "USD Coin", balance: "1,250.00", value: "$1,250", change: "0.0%", positive: true },
  { symbol: "ETH", name: "Ethereum", balance: "0.85", value: "$1,516", change: "-2.1%", positive: false },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "portfolio" | "activity">("overview");

  return (
    <div className="min-h-screen bg-[var(--void)] pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-white mb-1">Dashboard</h1>
            <p className="text-[var(--muted)]">Welcome back, Operator</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="glass px-4 py-2 rounded-lg text-sm text-[var(--muted)] hover:text-white transition-colors flex items-center gap-2">
              <Bell size={16} />
              <span className="hidden sm:inline">Notifications</span>
            </button>
            <button className="glass px-4 py-2 rounded-lg text-sm text-[var(--muted)] hover:text-white transition-colors flex items-center gap-2">
              <Settings size={16} />
              <span className="hidden sm:inline">Settings</span>
            </button>
          </div>
        </div>

        {/* Wallet Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-6 mb-8 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--violet)]/5 to-[var(--cyan)]/5" />
          <div className="relative">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Wallet className="w-5 h-5 text-[var(--cyan)]" />
                  <span className="text-sm text-[var(--muted)]">Total Portfolio Value</span>
                </div>
                <div className="text-4xl font-black text-white mb-1">$14,842.50</div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400 text-sm font-medium flex items-center gap-1">
                    <TrendingUp size={14} /> +18.4%
                  </span>
                  <span className="text-[var(--muted)] text-sm">vs last month</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="glass rounded-xl px-4 py-3">
                  <div className="text-xs text-[var(--muted)] mb-1">Wallet</div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-mono text-white">0x7a3...f92d</span>
                    <button className="text-[var(--muted)] hover:text-white transition-colors">
                      <Copy size={14} />
                    </button>
                  </div>
                </div>
                <button className="btn-glow px-6 py-3 rounded-xl text-sm font-bold text-white">
                  Connect Wallet
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Earnings", value: "$2,847", change: "+24%", icon: DollarSign, color: "text-[var(--cyan)]" },
            { label: "Active Positions", value: "7", change: "+2", icon: BarChart3, color: "text-[var(--violet)]" },
            { label: "Staked Value", value: "$8,250", change: "+12%", icon: TrendingUp, color: "text-green-400" },
            { label: "APY Average", value: "18.4%", change: "+2.1%", icon: Activity, color: "text-[var(--accent)]" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-xl p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                <span className="text-xs text-green-400">{stat.change}</span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-xs text-[var(--muted)]">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 mb-6 glass rounded-xl p-1 w-fit">
          {(["overview", "portfolio", "activity"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab
                  ? "bg-gradient-to-r from-[var(--violet)] to-[var(--cyan)] text-white"
                  : "text-[var(--muted)] hover:text-white"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2 glass rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white">Portfolio Performance</h3>
                <button className="text-[var(--muted)] hover:text-white transition-colors">
                  <RefreshCw size={16} />
                </button>
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
                    <Tooltip
                      contentStyle={{
                        background: "#111118",
                        border: "1px solid #1a1a24",
                        borderRadius: "8px",
                        color: "#e4e4ef",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#00D4FF"
                      strokeWidth={2}
                      fill="url(#colorValue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Allocation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass rounded-2xl p-6"
            >
              <h3 className="text-lg font-bold text-white mb-6">Allocation</h3>
              <div className="h-48 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie
                      data={allocationData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {allocationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </RePieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                {allocationData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ background: item.color }} />
                      <span className="text-sm text-[var(--muted)]">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium text-white">{item.value}%</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {activeTab === "portfolio" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl overflow-hidden"
          >
            <div className="p-6 border-b border-[var(--border)]">
              <h3 className="text-lg font-bold text-white">Token Holdings</h3>
            </div>
            <div className="divide-y divide-[var(--border)]">
              {tokens.map((token) => (
                <div key={token.symbol} className="flex items-center justify-between p-6 hover:bg-white/[0.02] transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--violet)]/20 to-[var(--cyan)]/20 flex items-center justify-center">
                      <span className="text-sm font-bold text-white">{token.symbol.slice(0, 2)}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-white">{token.symbol}</div>
                      <div className="text-sm text-[var(--muted)]">{token.name}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-white">{token.balance}</div>
                    <div className="text-sm text-[var(--muted)]">{token.value}</div>
                  </div>
                  <div className={`text-sm font-medium ${token.positive ? "text-green-400" : "text-[var(--accent)]"}`}>
                    {token.change}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "activity" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl p-6"
          >
            <h3 className="text-lg font-bold text-white mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivity.map((activity, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/[0.02] transition-colors">
                  <div className={`w-10 h-10 rounded-xl bg-[var(--surface)] flex items-center justify-center ${activity.color}`}>
                    <activity.icon size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-white">{activity.description}</div>
                    <div className="text-xs text-[var(--muted)] flex items-center gap-1 mt-1">
                      <Clock size={12} /> {activity.time}
                    </div>
                  </div>
                  <button className="text-[var(--muted)] hover:text-white transition-colors">
                    <ExternalLink size={16} />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
