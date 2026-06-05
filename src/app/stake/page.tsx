"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Unlock, TrendingUp, Clock, Zap, Shield, ChevronRight, Wallet, Check, X } from "lucide-react";
import { useWalletStore, useStakeStore, useNotificationStore } from "@/stores";

const stakingPools = [
  { name: "LIMINAL Flexible", apy: "12.4%", tvl: "$2.4M", minStake: "10", lockPeriod: "None", type: "flexible" as const, color: "from-[#00D4FF] to-[#7B2FFF]" },
  { name: "LIMINAL 30-Day Lock", apy: "18.7%", tvl: "$1.8M", minStake: "100", lockPeriod: "30 days", type: "locked" as const, color: "from-[#7B2FFF] to-[#FF3366]" },
  { name: "LIMINAL 90-Day Lock", apy: "24.2%", tvl: "$980K", minStake: "500", lockPeriod: "90 days", type: "locked" as const, color: "from-[#FF3366] to-[#00D4FF]" },
];

const userStakes = [
  { pool: "LIMINAL Flexible", amount: "5,000", rewards: "124.50", apy: "12.4%" },
  { pool: "LIMINAL 30-Day Lock", amount: "2,500", rewards: "89.20", apy: "18.7%" },
];

export default function StakePage() {
  const [tab, setTab] = useState<"stake" | "positions">("stake");
  const [staking, setStaking] = useState(false);
  const { connected, connect } = useWalletStore();
  const stake = useStakeStore();
  const { add } = useNotificationStore();

  const handleStake = async () => {
    if (!connected) { connect(); return; }
    if (!stake.amount || parseFloat(stake.amount) <= 0) {
      add({ type: "error", title: "Invalid Amount", message: "Please enter an amount to stake" });
      return;
    }
    const pool = stakingPools[stake.selectedPool];
    if (parseFloat(stake.amount) < parseFloat(pool.minStake)) {
      add({ type: "error", title: "Below Minimum", message: `Minimum stake is ${pool.minStake} LIMINAL` });
      return;
    }
    setStaking(true);
    await new Promise(r => setTimeout(r, 2000));
    setStaking(false);
    add({ type: "success", title: "Staking Successful", message: `Staked ${stake.amount} LIMINAL in ${pool.name}` });
    stake.setAmount("");
  };

  const handleClaim = async (index: number) => {
    const s = userStakes[index];
    add({ type: "success", title: "Rewards Claimed", message: `Claimed ${s.rewards} LIMINAL from ${s.pool}` });
  };

  return (
    <div className="min-h-screen bg-[var(--void)] pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-black text-white mb-2">Stake</h1>
        <p className="text-[#6b6b80] mb-8">Earn passive income by staking $LIMINAL tokens</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Staked", value: "$5.2M", icon: Lock },
            { label: "Average APY", value: "18.4%", icon: TrendingUp },
            { label: "Your Staked", value: "7,500", icon: Shield },
            { label: "Pending Rewards", value: "213.70", icon: Zap },
          ].map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass rounded-xl p-4">
              <stat.icon className="w-5 h-5 text-[#00D4FF] mb-2" />
              <div className="text-xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-[#6b6b80]">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center gap-1 mb-6 glass rounded-xl p-1 w-fit">
          {(["stake", "positions"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${tab === t ? "bg-gradient-to-r from-[#7B2FFF] to-[#00D4FF] text-white" : "text-[#6b6b80] hover:text-white"}`}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {tab === "stake" && (
            <motion.div key="stake" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                {stakingPools.map((pool, i) => (
                  <motion.div key={pool.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                    onClick={() => stake.setSelectedPool(i)}
                    className={`glass rounded-xl p-5 cursor-pointer transition-all ${stake.selectedPool === i ? "border-[#00D4FF]/30 glow-cyan" : "hover:border-[#1a1a24]"}`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${pool.color} flex items-center justify-center`}>
                          {pool.type === "flexible" ? <Unlock size={18} className="text-white" /> : <Lock size={18} className="text-white" />}
                        </div>
                        <div>
                          <h3 className="font-bold text-white">{pool.name}</h3>
                          <div className="flex items-center gap-2 text-xs text-[#6b6b80]"><Clock size={12} /> {pool.lockPeriod}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-black text-[#00D4FF]">{pool.apy}</div>
                        <div className="text-xs text-[#6b6b80]">APY</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div><div className="text-[#6b6b80]">TVL</div><div className="font-semibold text-white">{pool.tvl}</div></div>
                      <div><div className="text-[#6b6b80]">Min Stake</div><div className="font-semibold text-white">{pool.minStake} LIM</div></div>
                      <div><div className="text-[#6b6b80]">Lock</div><div className="font-semibold text-white">{pool.lockPeriod}</div></div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-xl p-6 h-fit">
                <h3 className="text-lg font-bold text-white mb-4">Stake LIMINAL</h3>
                <div className="bg-[#111118] rounded-xl p-4 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-[#6b6b80]">Amount</span>
                    <span className="text-sm text-[#6b6b80]">Balance: 12,450 LIM</span>
                  </div>
                  <input type="number" value={stake.amount} onChange={(e) => stake.setAmount(e.target.value)} placeholder="0.00" className="w-full bg-transparent text-2xl font-bold text-white outline-none placeholder-[#1a1a24]" />
                  <div className="flex items-center gap-2 mt-2">
                    {["25%", "50%", "75%", "MAX"].map((pct) => (
                      <button key={pct} onClick={() => {
                        if (pct === "MAX") stake.setAmount("12450");
                        else if (pct === "75%") stake.setAmount("9337.5");
                        else if (pct === "50%") stake.setAmount("6225");
                        else stake.setAmount("3112.5");
                      }} className="px-3 py-1 rounded-lg bg-[#0a0a0f] text-xs text-[#6b6b80] hover:text-white transition-colors">{pct}</button>
                    ))}
                  </div>
                </div>
                {stake.amount && (
                  <div className="p-3 rounded-xl bg-[#111118]/50 mb-4 space-y-2">
                    <div className="flex justify-between text-sm"><span className="text-[#6b6b80]">APY</span><span className="text-[#00D4FF]">{stakingPools[stake.selectedPool].apy}</span></div>
                    <div className="flex justify-between text-sm"><span className="text-[#6b6b80]">Est. Daily</span><span className="text-white">{((parseFloat(stake.amount || "0") * parseFloat(stakingPools[stake.selectedPool].apy) / 100) / 365).toFixed(2)} LIM</span></div>
                  </div>
                )}
                <button onClick={handleStake} disabled={staking} className="w-full btn-glow py-3 rounded-xl text-sm font-bold text-white disabled:opacity-50 flex items-center justify-center gap-2">
                  {!connected ? (<><Wallet size={16} /> Connect Wallet</>) : staking ? (<><Lock size={16} className="animate-spin" /> Staking...</>) : (<><Zap size={16} /> Stake Now</>)}
                </button>
              </motion.div>
            </motion.div>
          )}

          {tab === "positions" && (
            <motion.div key="positions" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
              {userStakes.map((s, i) => (
                <div key={i} className="glass rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-white">{s.pool}</h3>
                    <span className="text-sm text-[#00D4FF]">{s.apy} APY</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div><div className="text-sm text-[#6b6b80]">Staked</div><div className="text-lg font-bold text-white">{s.amount} LIM</div></div>
                    <div><div className="text-sm text-[#6b6b80]">Pending Rewards</div><div className="text-lg font-bold text-[#00D4FF]">{s.rewards} LIM</div></div>
                    <div className="flex items-end justify-end">
                      <button onClick={() => handleClaim(i)} className="px-4 py-2 rounded-lg bg-[#7B2FFF]/20 text-[#7B2FFF] text-sm font-medium hover:bg-[#7B2FFF]/30 transition-colors flex items-center gap-1">
                        Claim <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
