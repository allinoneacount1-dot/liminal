"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Unlock, TrendingUp, Clock, Zap, Shield, ChevronRight } from "lucide-react";

const stakingPools = [
  {
    name: "LIMINAL Flexible",
    apy: "12.4%",
    tvl: "$2.4M",
    minStake: "10",
    lockPeriod: "None",
    type: "flexible" as const,
    color: "from-[var(--cyan)] to-[var(--violet)]",
  },
  {
    name: "LIMINAL 30-Day Lock",
    apy: "18.7%",
    tvl: "$1.8M",
    minStake: "100",
    lockPeriod: "30 days",
    type: "locked" as const,
    color: "from-[var(--violet)] to-[var(--accent)]",
  },
  {
    name: "LIMINAL 90-Day Lock",
    apy: "24.2%",
    tvl: "$980K",
    minStake: "500",
    lockPeriod: "90 days",
    type: "locked" as const,
    color: "from-[var(--accent)] to-[var(--cyan)]",
  },
];

const userStakes = [
  { pool: "LIMINAL Flexible", amount: "5,000", rewards: "124.50", apy: "12.4%" },
  { pool: "LIMINAL 30-Day Lock", amount: "2,500", rewards: "89.20", apy: "18.7%" },
];

export default function StakePage() {
  const [stakeAmount, setStakeAmount] = useState("");
  const [selectedPool, setSelectedPool] = useState(0);
  const [tab, setTab] = useState<"stake" | "positions">("stake");

  return (
    <div className="min-h-screen bg-[var(--void)] pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-black text-white mb-2">Stake</h1>
        <p className="text-[var(--muted)] mb-8">Earn passive income by staking $LIMINAL tokens</p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Staked", value: "$5.2M", icon: Lock },
            { label: "Average APY", value: "18.4%", icon: TrendingUp },
            { label: "Your Staked", value: "7,500", icon: Shield },
            { label: "Pending Rewards", value: "213.70", icon: Zap },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-xl p-4"
            >
              <stat.icon className="w-5 h-5 text-[var(--cyan)] mb-2" />
              <div className="text-xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-[var(--muted)]">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 mb-6 glass rounded-xl p-1 w-fit">
          {(["stake", "positions"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                tab === t
                  ? "bg-gradient-to-r from-[var(--violet)] to-[var(--cyan)] text-white"
                  : "text-[var(--muted)] hover:text-white"
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {tab === "stake" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Pools */}
            <div className="lg:col-span-2 space-y-4">
              {stakingPools.map((pool, i) => (
                <motion.div
                  key={pool.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setSelectedPool(i)}
                  className={`glass rounded-xl p-5 cursor-pointer transition-all ${
                    selectedPool === i ? "border-[var(--cyan)]/30 glow-cyan" : "hover:border-[var(--border)]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${pool.color} flex items-center justify-center`}>
                        {pool.type === "flexible" ? <Unlock size={18} className="text-white" /> : <Lock size={18} className="text-white" />}
                      </div>
                      <div>
                        <h3 className="font-bold text-white">{pool.name}</h3>
                        <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
                          <Clock size={12} /> {pool.lockPeriod}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black text-[var(--cyan)]">{pool.apy}</div>
                      <div className="text-xs text-[var(--muted)]">APY</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-[var(--muted)]">TVL</div>
                      <div className="font-semibold text-white">{pool.tvl}</div>
                    </div>
                    <div>
                      <div className="text-[var(--muted)]">Min Stake</div>
                      <div className="font-semibold text-white">{pool.minStake} LIM</div>
                    </div>
                    <div>
                      <div className="text-[var(--muted)]">Lock</div>
                      <div className="font-semibold text-white">{pool.lockPeriod}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stake Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-xl p-6 h-fit"
            >
              <h3 className="text-lg font-bold text-white mb-4">Stake LIMINAL</h3>
              <div className="bg-[var(--surface)] rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[var(--muted)]">Amount</span>
                  <span className="text-sm text-[var(--muted)]">Balance: 12,450 LIM</span>
                </div>
                <input
                  type="number"
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-transparent text-2xl font-bold text-white outline-none placeholder-[var(--border)]"
                />
                <div className="flex items-center gap-2 mt-2">
                  {["25%", "50%", "75%", "MAX"].map((pct) => (
                    <button
                      key={pct}
                      className="px-3 py-1 rounded-lg bg-[var(--deep)] text-xs text-[var(--muted)] hover:text-white transition-colors"
                    >
                      {pct}
                    </button>
                  ))}
                </div>
              </div>

              {stakeAmount && (
                <div className="p-3 rounded-xl bg-[var(--surface)]/50 mb-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--muted)]">APY</span>
                    <span className="text-[var(--cyan)]">{stakingPools[selectedPool].apy}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--muted)]">Est. Daily Rewards</span>
                    <span className="text-white">
                      {((parseFloat(stakeAmount || "0") * parseFloat(stakingPools[selectedPool].apy) / 100) / 365).toFixed(2)} LIM
                    </span>
                  </div>
                </div>
              )}

              <button className="w-full btn-glow py-3 rounded-xl text-sm font-bold text-white">
                Stake Now
              </button>
            </motion.div>
          </div>
        )}

        {tab === "positions" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {userStakes.map((stake, i) => (
              <div key={i} className="glass rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-white">{stake.pool}</h3>
                  <span className="text-sm text-[var(--cyan)]">{stake.apy} APY</span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm text-[var(--muted)]">Staked</div>
                    <div className="text-lg font-bold text-white">{stake.amount} LIM</div>
                  </div>
                  <div>
                    <div className="text-sm text-[var(--muted)]">Pending Rewards</div>
                    <div className="text-lg font-bold text-[var(--cyan)]">{stake.rewards} LIM</div>
                  </div>
                  <div className="flex items-end justify-end">
                    <button className="px-4 py-2 rounded-lg bg-[var(--violet)]/20 text-[var(--violet)] text-sm font-medium hover:bg-[var(--violet)]/30 transition-colors flex items-center gap-1">
                      Claim <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
