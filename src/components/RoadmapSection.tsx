"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, Clock, Rocket, Code, Globe, Shield, Cpu, Zap } from "lucide-react";
import { ScrollReveal, GlowingOrb } from "./CinematicEffects";

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  {
    quarter: "Q1 2026",
    title: "Foundation",
    status: "completed" as const,
    icon: Code,
    items: ["Core protocol architecture finalized", "Smart contract development complete", "CertiK + Halborn security audits", "Testnet deployment on Solana Devnet"],
  },
  {
    quarter: "Q2 2026",
    title: "Launch",
    status: "active" as const,
    icon: Rocket,
    items: ["Mainnet beta on Solana", "Token generation event (TGE)", "Raydium DEX listing", "Staking protocol live", "Governance framework v1"],
  },
  {
    quarter: "Q3 2026",
    title: "Expansion",
    status: "upcoming" as const,
    icon: Globe,
    items: ["Ethereum + Arbitrum integration", "Cross-chain bridge deployment", "Developer SDK v1 release", "Ecosystem fund ($10M)", "Polygon + Avalanche support"],
  },
  {
    quarter: "Q4 2026",
    title: "Scale",
    status: "upcoming" as const,
    icon: Zap,
    items: ["ZK-proof integration", "Validator program launch", "Institutional partnerships", "Mobile SDK release", "DAO governance transition"],
  },
];

export function RoadmapSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const cards = sectionRef.current.querySelectorAll(".roadmap-card");
    cards.forEach((card, i) => {
      gsap.fromTo(card, { opacity: 0, y: 40, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.7, delay: i * 0.12, ease: "back.out(1.2)", scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none reverse" } });
    });
    return () => { ScrollTrigger.getAll().forEach((t) => { if (sectionRef.current?.contains(t.trigger as Node)) t.kill(); }); };
  }, []);

  return (
    <section ref={sectionRef} id="resources" className="relative py-32 px-6 overflow-hidden">
      <GlowingOrb color="#00D4FF" size={500} className="absolute top-0 right-0 opacity-15" />

      <div className="max-w-7xl mx-auto relative">
        <ScrollReveal className="text-center mb-20">
          <span className="text-sm font-medium tracking-[0.3em] text-[#FF3366] uppercase mb-6 block">Roadmap</span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 leading-[0.9]">
            TECHNICAL<br />
            <span className="bg-gradient-to-r from-[#FF3366] to-[#7B2FFF] bg-clip-text text-transparent">MILESTONES</span>
          </h2>
          <p className="text-lg text-[#6b6b80] max-w-2xl mx-auto">
            Clear, measurable milestones — not vague promises.
          </p>
        </ScrollReveal>

        {/* Desktop: Horizontal timeline */}
        <div className="hidden lg:block relative">
          <div className="absolute top-[60px] left-0 right-0 h-[2px] bg-gradient-to-r from-[#7B2FFF] via-[#00D4FF] to-[#FF3366] origin-left" ref={(el) => {
            if (el) gsap.fromTo(el, { scaleX: 0 }, { scaleX: 1, duration: 2, ease: "power2.out", scrollTrigger: { trigger: sectionRef.current, start: "top 60%" } });
          }} />
          <div className="grid grid-cols-4 gap-6">
            {milestones.map((m, i) => {
              const Icon = m.icon;
              return (
                <div key={m.quarter} className="roadmap-card relative">
                  <div className="flex justify-center mb-6">
                    <div className={`w-5 h-5 rounded-full border-2 ${m.status === "completed" ? "bg-green-400 border-green-400" : m.status === "active" ? "bg-[#00D4FF] border-[#00D4FF] shadow-[0_0_20px_#00D4FF]" : "bg-[#1a1a24] border-[#6b6b80]"}`} />
                  </div>
                  <div className={`glass rounded-2xl p-6 relative overflow-hidden ${m.status === "active" ? "border-[#00D4FF]/30 glow-cyan" : ""}`}>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold tracking-widest text-[#6b6b80]">{m.quarter}</span>
                      {m.status === "completed" && <span className="flex items-center gap-1 text-xs text-green-400"><Check size={12} /> Done</span>}
                      {m.status === "active" && <span className="flex items-center gap-1 text-xs text-[#00D4FF]"><Rocket size={12} /> Live</span>}
                      {m.status === "upcoming" && <span className="flex items-center gap-1 text-xs text-[#6b6b80]"><Clock size={12} /> Planned</span>}
                    </div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${m.status === "completed" ? "bg-green-400/10" : m.status === "active" ? "bg-[#00D4FF]/10" : "bg-[#1a1a24]"}`}>
                        <Icon size={16} className={m.status === "completed" ? "text-green-400" : m.status === "active" ? "text-[#00D4FF]" : "text-[#6b6b80]"} />
                      </div>
                      <h3 className="text-xl font-black text-white">{m.title}</h3>
                    </div>
                    <ul className="space-y-2.5">
                      {m.items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm text-[#6b6b80]">
                          <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${m.status === "completed" ? "bg-green-400" : m.status === "active" ? "bg-[#00D4FF]" : "bg-[#1a1a24]"}`} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile: Vertical */}
        <div className="lg:hidden space-y-6">
          {milestones.map((m, i) => {
            const Icon = m.icon;
            return (
              <div key={m.quarter} className="roadmap-card glass rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold tracking-widest text-[#6b6b80]">{m.quarter}</span>
                  {m.status === "completed" && <span className="flex items-center gap-1 text-xs text-green-400"><Check size={12} /> Done</span>}
                  {m.status === "active" && <span className="flex items-center gap-1 text-xs text-[#00D4FF]"><Rocket size={12} /> Live</span>}
                  {m.status === "upcoming" && <span className="flex items-center gap-1 text-xs text-[#6b6b80]"><Clock size={12} /> Planned</span>}
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${m.status === "completed" ? "bg-green-400/10" : m.status === "active" ? "bg-[#00D4FF]/10" : "bg-[#1a1a24]"}`}>
                    <Icon size={16} className={m.status === "completed" ? "text-green-400" : m.status === "active" ? "text-[#00D4FF]" : "text-[#6b6b80]"} />
                  </div>
                  <h3 className="text-lg font-black text-white">{m.title}</h3>
                </div>
                <ul className="space-y-2">
                  {m.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[#6b6b80]">
                      <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${m.status === "completed" ? "bg-green-400" : m.status === "active" ? "bg-[#00D4FF]" : "bg-[#1a1a24]"}`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
