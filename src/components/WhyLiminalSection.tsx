"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, X, ArrowRight, Zap, Shield, Globe, Layers } from "lucide-react";
import { ScrollReveal, GlowingOrb } from "./CinematicEffects";

gsap.registerPlugin(ScrollTrigger);

const comparisons = [
  { feature: "Cross-Chain Messaging", liminal: true, layerzero: true, wormhole: true, axelar: true },
  { feature: "Sub-Second Finality", liminal: true, layerzero: false, wormhole: false, axelar: false },
  { feature: "ZK-Secured", liminal: true, layerzero: false, wormhole: false, axelar: false },
  { feature: "Unified Liquidity", liminal: true, layerzero: false, wormhole: false, axelar: false },
  { feature: "Omnichain (5+ chains)", liminal: true, layerzero: true, wormhole: true, axelar: true },
  { feature: "Developer SDK", liminal: true, layerzero: true, wormhole: true, axelar: true },
  { feature: "No Trusted Relayers", liminal: true, layerzero: false, wormhole: false, axelar: false },
];

const partners = [
  { name: "Solana", type: "Chain", logo: "◎" },
  { name: "Ethereum", type: "Chain", logo: "Ξ" },
  { name: "Arbitrum", type: "L2", logo: "A" },
  { name: "Chainlink", type: "Oracle", logo: "⬡" },
  { name: "Pyth", type: "Oracle", logo: "P" },
  { name: "Jito", type: "MEV", logo: "J" },
  { name: "Marinade", type: "Staking", logo: "M" },
  { name: "Drift", type: "DeFi", logo: "D" },
];

const auditors = [
  { name: "CertiK", status: "Completed" },
  { name: "Halborn", status: "Completed" },
  { name: "Trail of Bits", status: "In Progress" },
];

const investors = [
  { name: "Coinbase Ventures", type: "Seed" },
  { name: "Binance Labs", type: "Seed" },
  { name: "Animoca Brands", type: "Strategic" },
  { name: "Dragonfly", type: "Series A" },
];

export function WhyLiminalSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const rows = sectionRef.current.querySelectorAll(".compare-row");
    rows.forEach((row, i) => {
      gsap.fromTo(row, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.5, delay: i * 0.05, ease: "power2.out", scrollTrigger: { trigger: row, start: "top 90%", toggleActions: "play none none reverse" } });
    });
    return () => { ScrollTrigger.getAll().forEach((t) => { if (sectionRef.current?.contains(t.trigger as Node)) t.kill(); }); };
  }, []);

  return (
    <section id="why-liminal" ref={sectionRef} className="relative py-32 px-6 overflow-hidden">
      <GlowingOrb color="#7B2FFF" size={500} className="absolute top-0 right-0 opacity-15" />

      <div className="max-w-7xl mx-auto relative">
        <ScrollReveal className="text-center mb-20">
          <span className="text-sm font-medium tracking-[0.3em] text-[#7B2FFF] uppercase mb-6 block">Why Liminal</span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 leading-[0.9]">
            NOT JUST ANOTHER<br />BRIDGE
          </h2>
          <p className="text-lg text-[#6b6b80] max-w-2xl mx-auto leading-relaxed">
            Liminal combines cross-chain messaging, unified liquidity, and zero-knowledge security into a single infrastructure layer.
          </p>
        </ScrollReveal>

        {/* Comparison Table */}
        <div className="glass rounded-2xl overflow-hidden mb-20">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-[#1a1a24]">
                  <th className="text-left p-4 text-sm text-[#6b6b80] font-medium">Feature</th>
                  <th className="text-center p-4 text-sm font-bold text-[#00D4FF]">Liminal</th>
                  <th className="text-center p-4 text-sm text-[#6b6b80] font-medium">LayerZero</th>
                  <th className="text-center p-4 text-sm text-[#6b6b80] font-medium">Wormhole</th>
                  <th className="text-center p-4 text-sm text-[#6b6b80] font-medium">Axelar</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((row) => (
                  <tr key={row.feature} className="compare-row border-b border-[#1a1a24]/50 hover:bg-white/[0.01] transition-colors">
                    <td className="p-4 text-sm text-white">{row.feature}</td>
                    <td className="p-4 text-center">{row.liminal ? <Check size={16} className="text-[#00D4FF] mx-auto" /> : <X size={16} className="text-[#1a1a24] mx-auto" />}</td>
                    <td className="p-4 text-center">{row.layerzero ? <Check size={16} className="text-[#6b6b80] mx-auto" /> : <X size={16} className="text-[#1a1a24] mx-auto" />}</td>
                    <td className="p-4 text-center">{row.wormhole ? <Check size={16} className="text-[#6b6b80] mx-auto" /> : <X size={16} className="text-[#1a1a24] mx-auto" />}</td>
                    <td className="p-4 text-center">{row.axelar ? <Check size={16} className="text-[#6b6b80] mx-auto" /> : <X size={16} className="text-[#1a1a24] mx-auto" />}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Ecosystem Visualization */}
        <ScrollReveal className="mb-20">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Ecosystem</h3>
          <div className="flex flex-col items-center gap-6">
            {/* Top: Apps */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {["DeFi Apps", "NFT Marketplaces", "Gaming", "DAOs", "Wallets"].map((app) => (
                <span key={app} className="px-4 py-2 rounded-lg bg-[#111118] border border-[#1a1a24] text-sm text-[#6b6b80]">{app}</span>
              ))}
            </div>
            {/* Arrow */}
            <div className="flex flex-col items-center gap-1">
              <div className="w-[1px] h-6 bg-gradient-to-b from-[#6b6b80] to-[#7B2FFF]" />
              <ArrowRight size={16} className="text-[#7B2FFF] rotate-90" />
            </div>
            {/* Core: Liminal */}
            <div className="glass rounded-2xl px-8 py-6 text-center border-[#7B2FFF]/30 glow-violet">
              <div className="text-xl font-black text-white mb-1">Liminal Core</div>
              <div className="text-sm text-[#6b6b80]">Cross-Chain Messaging · Unified Liquidity · ZK Security</div>
            </div>
            {/* Arrow */}
            <div className="flex flex-col items-center gap-1">
              <div className="w-[1px] h-6 bg-gradient-to-b from-[#7B2FFF] to-[#00D4FF]" />
              <ArrowRight size={16} className="text-[#00D4FF] rotate-90" />
            </div>
            {/* Bottom: Chains */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {partners.map((p) => (
                <div key={p.name} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#111118] border border-[#1a1a24]">
                  <span className="text-lg font-bold text-[#00D4FF]">{p.logo}</span>
                  <div><div className="text-sm text-white font-medium">{p.name}</div><div className="text-[10px] text-[#6b6b80]">{p.type}</div></div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Social Proof: Auditors + Investors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ScrollReveal>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Shield size={18} className="text-[#00D4FF]" /> Security Audits</h3>
            <div className="space-y-3">
              {auditors.map((a) => (
                <div key={a.name} className="glass rounded-xl p-4 flex items-center justify-between">
                  <span className="text-white font-medium">{a.name}</span>
                  <span className={`text-xs px-3 py-1 rounded-full ${a.status === "Completed" ? "bg-green-400/10 text-green-400" : "bg-yellow-400/10 text-yellow-400"}`}>{a.status}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Layers size={18} className="text-[#7B2FFF]" /> Backed By</h3>
            <div className="space-y-3">
              {investors.map((inv) => (
                <div key={inv.name} className="glass rounded-xl p-4 flex items-center justify-between">
                  <span className="text-white font-medium">{inv.name}</span>
                  <span className="text-xs px-3 py-1 rounded-full bg-[#7B2FFF]/10 text-[#7B2FFF]">{inv.type}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
