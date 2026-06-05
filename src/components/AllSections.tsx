"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Shield, Layers, ArrowRight, Check, X, Globe, Send as SendIcon, Zap, HelpCircle, ChevronDown, MessageCircle, Star, BarChart3, TrendingUp, Lock, Rocket, Code } from "lucide-react";

const Container = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`w-full max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16 ${className}`}>{children}</div>
);

export function ProblemSection() {
  const problems = [
    { icon: Clock, title: "Slow Finality", desc: "Cross-chain bridges take 1-5 minutes. Users wait. Capital is locked. Opportunities are lost." },
    { icon: Shield, title: "Trusted Relayers", desc: "Most bridges rely on trusted third parties. Single point of failure. $2B+ lost to bridge hacks." },
    { icon: Layers, title: "Fragmented Liquidity", desc: "Liquidity is scattered across chains. Slippage is high. Capital efficiency is low." },
  ];
  return (
    <section id="problem" className="py-20 sm:py-28 relative">
      <Container>
        <div className="text-center mb-16">
          <span className="text-sm font-medium tracking-[0.2em] text-[#FF3366] uppercase mb-4 block">The Problem</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-[1.05] mb-6">Cross-Chain Is Broken</h2>
          <p className="text-base sm:text-lg md:text-xl text-[#b0b0c8] leading-relaxed max-w-2xl mx-auto">Existing infrastructure is slow, insecure, and fragmented. Users deserve better.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {problems.map((p, i) => (
            <motion.div key={p.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass rounded-2xl p-8 hover:border-[#FF3366]/20 transition-all duration-500">
              <div className="w-12 h-12 rounded-xl bg-[#FF3366]/10 flex items-center justify-center mb-5"><p.icon size={22} className="text-[#FF3366]" /></div>
              <h3 className="text-lg font-bold text-white mb-3">{p.title}</h3>
              <p className="text-sm sm:text-base text-[#8888a0] leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function HowItWorksSection() {
  const steps = [
    { num: "01", icon: SendIcon, title: "Send Message", desc: "Application sends a cross-chain message through Liminal SDK. Supports arbitrary data, token transfers, and contract calls." },
    { num: "02", icon: Shield, title: "ZK Verification", desc: "Liminal Core generates a zero-knowledge proof of the message. No trusted relayers needed." },
    { num: "03", icon: Globe, title: "Instant Delivery", desc: "Message delivered to destination chain in under 1 second. Unified liquidity ensures optimal execution." },
  ];
  return (
    <section id="how-it-works" className="py-20 sm:py-28 relative">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[150px] bg-[#7B2FFF]/[0.03]" />
      <Container className="relative">
        <div className="text-center mb-16">
          <span className="text-sm font-medium tracking-[0.2em] text-[#00D4FF] uppercase mb-4 block">How It Works</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-[1.05] mb-6">Three Steps. Sub-Second Finality.</h2>
          <p className="text-base sm:text-lg md:text-xl text-[#b0b0c8] leading-relaxed max-w-2xl mx-auto">Send, verify, deliver. No trusted relayers. No waiting.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div key={step.num} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="relative">
              {i < 2 && <div className="hidden md:block absolute top-12 left-[calc(100%+0.5rem)] w-[calc(100%-4rem)] h-[1px] bg-gradient-to-r from-[#7B2FFF]/30 to-transparent" />}
              <div className="glass rounded-2xl p-8 h-full hover:border-[#00D4FF]/20 transition-all duration-500">
                <div className="text-5xl font-black text-[#7B2FFF]/20 mb-4">{step.num}</div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7B2FFF] to-[#00D4FF] flex items-center justify-center mb-5"><step.icon size={22} className="text-white" /></div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-sm sm:text-base text-[#8888a0] leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function FeaturesSectionV2() {
  const features = [
    { icon: Zap, title: "Sub-Second Finality", desc: "Cross-chain messages confirmed in under 1 second. 10x faster than LayerZero (1-5 min) and Wormhole (1-3 min).", stat: "<1s", statLabel: "Finality", color: "#00D4FF" },
    { icon: Shield, title: "ZK-Secured", desc: "Zero-knowledge proofs eliminate trusted relayers. No single point of failure.", stat: "ZK", statLabel: "Proofs", color: "#7B2FFF" },
    { icon: Globe, title: "Unified Liquidity", desc: "Single liquidity pool across all chains. No fragmented liquidity.", stat: "1 Pool", statLabel: "All Chains", color: "#FF3366" },
    { icon: Layers, title: "Modular Architecture", desc: "Plug-and-play modules for messaging, liquidity, and security.", stat: "50+", statLabel: "Modules", color: "#00D4FF" },
    { icon: Lock, title: "No Trusted Relayers", desc: "Cryptographic security through ZK proofs. No oracle networks.", stat: "0", statLabel: "Trusted Parties", color: "#7B2FFF" },
    { icon: Star, title: "Compute Credits", desc: "Use $LIMINAL to pay for cross-chain compute and ZK proof generation.", stat: "Pay", statLabel: "Per Use", color: "#FF3366" },
  ];
  return (
    <section id="features" className="py-20 sm:py-28 relative">
      <Container>
        <div className="text-center mb-16">
          <span className="text-sm font-medium tracking-[0.2em] text-[#7B2FFF] uppercase mb-4 block">Features</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-[1.05] mb-6">Why Liminal Is Different</h2>
          <p className="text-base sm:text-lg md:text-xl text-[#b0b0c8] leading-relaxed max-w-2xl mx-auto">Not just another bridge. A unified infrastructure layer with measurable advantages.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="glass rounded-2xl p-8 hover:border-[#7B2FFF]/20 transition-all duration-500 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] opacity-0 group-hover:opacity-10 transition-opacity duration-500" style={{ background: f.color }} />
              <div className="relative">
                <div className="flex items-start justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: f.color + "15" }}><f.icon size={22} style={{ color: f.color }} /></div>
                  <div className="text-right"><div className="text-2xl font-black" style={{ color: f.color }}>{f.stat}</div><div className="text-[10px] text-[#6b6b80] uppercase tracking-wider">{f.statLabel}</div></div>
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{f.title}</h3>
                <p className="text-sm sm:text-base text-[#8888a0] leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function TokenUtilitySectionV2() {
  const utilities = [
    { icon: BarChart3, title: "Governance Vault Access", desc: "Vote on protocol upgrades, treasury allocation, and new chain integrations. Staked tokens unlock voting power.", percent: "25", color: "#7B2FFF" },
    { icon: TrendingUp, title: "Staking Rewards", desc: "Earn 12-24% APY by staking $LIMINAL. Rewards sourced from protocol fees and ecosystem incentives.", percent: "30", color: "#00D4FF" },
    { icon: Zap, title: "Compute Credits", desc: "Use $LIMINAL to pay for cross-chain compute. Message verification, ZK proof generation, and liquidity routing.", percent: "20", color: "#FF3366" },
    { icon: Star, title: "Premium Access", desc: "Hold $LIMINAL for priority access to new features, early ecosystem launches, and developer grants.", percent: "25", color: "#7B2FFF" },
  ];
  return (
    <section id="token" className="py-20 sm:py-28 relative">
      <Container>
        <div className="text-center mb-16">
          <span className="text-sm font-medium tracking-[0.2em] text-[#00D4FF] uppercase mb-4 block">Token Utility</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-[1.05] mb-6">$LIMINAL Token</h2>
          <p className="text-base sm:text-lg md:text-xl text-[#b0b0c8] leading-relaxed max-w-2xl mx-auto">More than governance. Real utility that powers the protocol.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {utilities.map((u, i) => (
            <motion.div key={u.title} initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass rounded-2xl p-8 hover:border-[#7B2FFF]/20 transition-all duration-500">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: u.color + "15" }}><u.icon size={22} style={{ color: u.color }} /></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-white">{u.title}</h3>
                    <span className="text-2xl font-black" style={{ color: u.color }}>{u.percent}%</span>
                  </div>
                  <p className="text-sm sm:text-base text-[#8888a0] leading-relaxed">{u.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function RoadmapSectionV2() {
  const milestones = [
    { quarter: "Q1 2026", title: "Foundation", status: "completed" as const, icon: Code, items: ["Core protocol architecture", "Smart contracts complete", "CertiK + Halborn audits", "Testnet on Solana Devnet"] },
    { quarter: "Q2 2026", title: "Launch", status: "active" as const, icon: Rocket, items: ["Mainnet beta on Solana", "Token generation event", "Raydium DEX listing", "Staking protocol live"] },
    { quarter: "Q3 2026", title: "Expansion", status: "upcoming" as const, icon: Globe, items: ["Ethereum + Arbitrum integration", "Cross-chain bridge live", "Developer SDK v1", "Ecosystem fund ($10M)"] },
    { quarter: "Q4 2026", title: "Scale", status: "upcoming" as const, icon: Zap, items: ["ZK-proof integration", "Validator program", "Institutional partnerships", "DAO governance transition"] },
  ];
  return (
    <section id="roadmap" className="py-20 sm:py-28 relative">
      <Container>
        <div className="text-center mb-16">
          <span className="text-sm font-medium tracking-[0.2em] text-[#FF3366] uppercase mb-4 block">Roadmap</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-[1.05] mb-6">Technical Milestones</h2>
          <p className="text-base sm:text-lg md:text-xl text-[#b0b0c8] leading-relaxed max-w-2xl mx-auto">Clear, measurable deliverables. Not vague promises.</p>
        </div>
        <div className="hidden lg:block relative">
          <div className="absolute top-[60px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-[#7B2FFF] via-[#00D4FF] to-[#FF3366] rounded-full" />
          <div className="grid grid-cols-4 gap-8">
            {milestones.map((m, i) => {
              const Icon = m.icon;
              const statusColor = m.status === "completed" ? "text-green-400" : m.status === "active" ? "text-[#00D4FF]" : "text-[#6b6b80]";
              const dotColor = m.status === "completed" ? "bg-green-400 border-green-400" : m.status === "active" ? "bg-[#00D4FF] border-[#00D4FF] shadow-[0_0_20px_#00D4FF]" : "bg-[#0a0a0f] border-[#2a2a3a]";
              const statusBg = m.status === "completed" ? "bg-green-400/10 text-green-400" : m.status === "active" ? "bg-[#00D4FF]/10 text-[#00D4FF]" : "bg-[#111118] text-[#6b6b80]";
              const statusText = m.status === "completed" ? "Completed" : m.status === "active" ? "In Progress" : "Planned";
              return (
                <motion.div key={m.quarter} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="relative flex flex-col items-center">
                  <div className={`w-6 h-6 rounded-full border-2 mb-6 z-10 ${dotColor}`} />
                  <div className="glass rounded-2xl p-6 w-full text-center hover:border-[#7B2FFF]/20 transition-all">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <Icon size={16} className={statusColor} />
                      <span className="text-xs font-bold tracking-widest text-[#6b6b80]">{m.quarter}</span>
                    </div>
                    <h3 className="text-xl font-black text-white mb-4">{m.title}</h3>
                    <ul className="space-y-2">
                      {m.items.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-[#8888a0]">
                          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${m.status === "completed" ? "bg-green-400" : m.status === "active" ? "bg-[#00D4FF]" : "bg-[#2a2a3a]"}`} />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className={`mt-4 text-xs font-medium px-3 py-1 rounded-full inline-block ${statusBg}`}>{statusText}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
        <div className="lg:hidden space-y-6">
          {milestones.map((m, i) => {
            const Icon = m.icon;
            const statusColor = m.status === "completed" ? "text-green-400" : m.status === "active" ? "text-[#00D4FF]" : "text-[#6b6b80]";
            const statusBg = m.status === "completed" ? "bg-green-400/10 text-green-400" : m.status === "active" ? "bg-[#00D4FF]/10 text-[#00D4FF]" : "bg-[#111118] text-[#6b6b80]";
            const statusText = m.status === "completed" ? "Completed" : m.status === "active" ? "In Progress" : "Planned";
            return (
              <motion.div key={m.quarter} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Icon size={18} className={statusColor} />
                  <span className="text-sm font-bold text-[#6b6b80]">{m.quarter}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${statusBg}`}>{statusText}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{m.title}</h3>
                <ul className="space-y-2">
                  {m.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-[#8888a0]">
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${m.status === "completed" ? "bg-green-400" : m.status === "active" ? "bg-[#00D4FF]" : "bg-[#2a2a3a]"}`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export function SocialProofSection() {
  const partners = [
    { name: "Solana", type: "Chain", logo: "◎" },
    { name: "Ethereum", type: "Chain", logo: "Ξ" },
    { name: "Arbitrum", type: "L2", logo: "A" },
    { name: "Chainlink", type: "Oracle", logo: "⬡" },
    { name: "Pyth", type: "Oracle", logo: "P" },
    { name: "Jito", type: "MEV", logo: "J" },
  ];
  const auditors = [
    { name: "CertiK", status: "Completed" },
    { name: "Halborn", status: "Completed" },
    { name: "Trail of Bits", status: "In Progress" },
  ];
  return (
    <section id="ecosystem" className="py-20 sm:py-28 relative">
      <Container>
        <div className="text-center mb-16">
          <span className="text-sm font-medium tracking-[0.2em] text-[#7B2FFF] uppercase mb-4 block">Ecosystem</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-[1.05] mb-6">Built With Trust</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="glass rounded-2xl p-8">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><Shield size={18} className="text-[#00D4FF]" /> Security Audits</h3>
            <div className="space-y-3">
              {auditors.map((a) => (
                <div key={a.name} className="flex items-center justify-between p-3 rounded-xl bg-[#0a0a0f]/50">
                  <span className="text-white font-medium">{a.name}</span>
                  <span className={`text-xs px-3 py-1 rounded-full ${a.status === "Completed" ? "bg-green-400/10 text-green-400" : "bg-yellow-400/10 text-yellow-400"}`}>{a.status}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="glass rounded-2xl p-8">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><Globe size={18} className="text-[#7B2FFF]" /> Integrated On</h3>
            <div className="grid grid-cols-2 gap-3">
              {partners.map((p) => (
                <div key={p.name} className="flex items-center gap-3 p-3 rounded-xl bg-[#0a0a0f]/50">
                  <span className="text-lg font-bold text-[#00D4FF]">{p.logo}</span>
                  <div><div className="text-sm text-white font-medium">{p.name}</div><div className="text-[10px] text-[#6b6b80]">{p.type}</div></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="glass rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-[#1a1a24]"><h3 className="text-lg font-bold text-white">Comparison</h3></div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px]">
              <thead><tr className="border-b border-[#1a1a24]">
                <th className="text-left p-4 text-sm text-[#8888a0] font-medium">Feature</th>
                <th className="text-center p-4 text-sm font-bold text-[#00D4FF]">Liminal</th>
                <th className="text-center p-4 text-sm text-[#6b6b80] font-medium">LayerZero</th>
                <th className="text-center p-4 text-sm text-[#6b6b80] font-medium">Wormhole</th>
              </tr></thead>
              <tbody>
                {[
                  { f: "Sub-Second Finality", l: true, lz: false, w: false },
                  { f: "ZK-Secured", l: true, lz: false, w: false },
                  { f: "Unified Liquidity", l: true, lz: false, w: false },
                  { f: "No Trusted Relayers", l: true, lz: false, w: false },
                  { f: "5+ Chain Support", l: true, lz: true, w: true },
                ].map((r) => (
                  <tr key={r.f} className="border-b border-[#1a1a24]/50">
                    <td className="p-4 text-sm text-white">{r.f}</td>
                    <td className="p-4 text-center"><Check size={16} className="text-[#00D4FF] mx-auto" /></td>
                    <td className="p-4 text-center">{r.lz ? <Check size={16} className="text-[#6b6b80] mx-auto" /> : <X size={16} className="text-[#2a2a3a] mx-auto" />}</td>
                    <td className="p-4 text-center">{r.w ? <Check size={16} className="text-[#6b6b80] mx-auto" /> : <X size={16} className="text-[#2a2a3a] mx-auto" />}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function FAQSectionV2() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs = [
    { q: "What is Liminal?", a: "Liminal is a cross-chain messaging and liquidity protocol built on Solana. It enables applications to communicate and transfer value across Solana, Ethereum, and L2s with sub-second finality and zero-knowledge security." },
    { q: "How is Liminal different from LayerZero or Wormhole?", a: "Three key differentiators: (1) Sub-second finality vs 1-5 minutes, (2) ZK-proof security vs trusted relayers, (3) Unified liquidity pool vs fragmented pools." },
    { q: "What chains does Liminal support?", a: "Currently: Solana, Ethereum, Arbitrum, Base, Optimism. Coming Q3 2026: Polygon, Avalanche, BNB Chain." },
    { q: "Is Liminal audited?", a: "Yes. Completed audits by CertiK and Halborn. Additional audit by Trail of Bits in progress." },
    { q: "What is the token utility?", a: "$LIMINAL powers governance, staking (12-24% APY), compute credits for cross-chain operations, and premium feature access." },
  ];
  return (
    <section id="faq" className="py-20 sm:py-28 relative">
      <Container>
        <div className="text-center mb-16">
          <span className="text-sm font-medium tracking-[0.2em] text-[#00D4FF] uppercase mb-4 block">FAQ</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-[1.05] mb-6">Questions & Answers</h2>
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className={`glass rounded-2xl overflow-hidden transition-all duration-500 ${openIndex === i ? "border-[#7B2FFF]/20" : ""}`}>
              <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full flex items-center justify-between p-6 text-left">
                <div className="flex items-center gap-4 pr-4">
                  <HelpCircle size={18} className={`shrink-0 transition-colors ${openIndex === i ? "text-[#7B2FFF]" : "text-[#6b6b80]"}`} />
                  <span className="text-base font-semibold text-white">{faq.q}</span>
                </div>
                <ChevronDown size={18} className={`text-[#6b6b80] shrink-0 transition-transform ${openIndex === i ? "rotate-180" : ""}`} />
              </button>
              {openIndex === i && (
                <div className="px-6 pb-6 pt-2 text-[#8888a0] leading-relaxed border-t border-[#1a1a24] ml-10 mr-4">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function CTASectionV2() {
  const [connected, setConnected] = useState(false);
  const handleConnect = async () => {
    if (typeof window !== "undefined" && (window as unknown as { solana?: { isPhantom?: boolean } }).solana?.isPhantom) {
      try { await (window as unknown as { solana: { connect: () => Promise<unknown> } }).solana.connect(); setConnected(true); } catch { /* ignore */ }
    } else { setConnected(true); }
  };
  return (
    <section id="cta" className="py-20 sm:py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#7B2FFF]/[0.03] to-transparent" />
      <Container className="relative">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.05] mb-6">Cross the Threshold</h2>
          <p className="text-base sm:text-lg md:text-xl text-[#b0b0c8] leading-relaxed max-w-2xl mx-auto mb-10">The future of cross-chain infrastructure is here. Sub-second. ZK-secured. Unified.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={handleConnect} className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-base font-bold text-white tracking-wide transition-all duration-300" style={{ background: "linear-gradient(135deg, #7B2FFF 0%, #00D4FF 100%)", boxShadow: "0 0 30px rgba(123,47,255,0.2)" }}>
              <span className="relative z-10 flex items-center gap-3">{connected ? <><Check size={18} /> Connected</> : <><Zap size={18} /> Enter Protocol <ArrowRight size={16} /></>}</span>
              <span className="absolute inset-0 rounded-2xl bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
            </button>
            <button onClick={() => { const el = document.getElementById("faq"); if (el) el.scrollIntoView({ behavior: "smooth" }); }} className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-base font-medium text-[#b0b0c8] border border-[#2a2a3a] hover:border-[#7B2FFF]/40 hover:text-white transition-all duration-300 bg-[#0a0a0f]/50 backdrop-blur-sm">
              <MessageCircle size={16} /> Learn More
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative py-12 px-6 border-t border-[#1a1a24]">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="LIMINAL" width={32} height={32} />
            <span className="text-lg font-bold tracking-wider text-white">LIMINAL</span>
          </div>
          <div className="flex items-center gap-6">
            {["Docs", "GitHub", "Twitter", "Discord"].map((link) => (
              <button key={link} className="text-sm text-[#6b6b80] hover:text-white transition-colors">{link}</button>
            ))}
          </div>
          <p className="text-sm text-[#6b6b80]">&copy; 2026 Liminal Protocol</p>
        </div>
      </Container>
    </footer>
  );
}
