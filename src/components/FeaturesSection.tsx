"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Zap, Shield, Eye, Layers, Globe, Lock, ArrowRight } from "lucide-react";
import { ScrollReveal, GlowingOrb } from "./CinematicEffects";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Zap,
    title: "Sub-Second Finality",
    description: "Cross-chain messages confirmed in under 1 second. 10x faster than LayerZero (1-5 min) and Wormhole (1-3 min).",
    gradient: "from-[#7B2FFF] to-[#00D4FF]",
    stat: "<1s",
    statLabel: "Finality",
    comparison: "vs 1-5 min (competitors)",
  },
  {
    icon: Shield,
    title: "ZK-Secured",
    description: "Zero-knowledge proofs eliminate the need for trusted relayers. No single point of failure, no validator sets to compromise.",
    gradient: "from-[#00D4FF] to-[#FF3366]",
    stat: "ZK",
    statLabel: "Proofs",
    comparison: "vs trusted relayers",
  },
  {
    icon: Eye,
    title: "Unified Liquidity",
    description: "Single liquidity pool across all chains. No more fragmented liquidity or bridging between isolated pools.",
    gradient: "from-[#FF3366] to-[#7B2FFF]",
    stat: "1 Pool",
    statLabel: "All Chains",
    comparison: "vs fragmented pools",
  },
  {
    icon: Layers,
    title: "Modular Architecture",
    description: "Plug-and-play modules for messaging, liquidity, and security. Developers choose what they need, nothing they don't.",
    gradient: "from-[#7B2FFF] to-[#FF3366]",
    stat: "50+",
    statLabel: "Modules",
    comparison: "vs monolithic design",
  },
  {
    icon: Globe,
    title: "Omnichain Native",
    description: "Built for multi-chain from day one. Solana, Ethereum, Arbitrum, Base, Optimism — with more chains coming.",
    gradient: "from-[#00D4FF] to-[#7B2FFF]",
    stat: "5+",
    statLabel: "Chains",
    comparison: "vs single-chain bridges",
  },
  {
    icon: Lock,
    title: "No Trusted Relayers",
    description: "Cryptographic security through ZK proofs. No oracle networks, no validator sets, no trusted third parties.",
    gradient: "from-[#FF3366] to-[#00D4FF]",
    stat: "0",
    statLabel: "Trusted Parties",
    comparison: "vs 1-of-N trust",
  },
];

export function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const cards = sectionRef.current.querySelectorAll(".feature-card");
    cards.forEach((card, i) => {
      gsap.fromTo(card, { opacity: 0, y: 50, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.7, delay: i * 0.08, ease: "power3.out", scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none reverse" } });
    });
    return () => { ScrollTrigger.getAll().forEach((t) => { if (sectionRef.current?.contains(t.trigger as Node)) t.kill(); }); };
  }, []);

  return (
    <section ref={sectionRef} id="intelligence" className="relative py-32 px-6 overflow-hidden">
      <GlowingOrb color="#7B2FFF" size={500} className="absolute -top-40 right-0 opacity-15" />
      <GlowingOrb color="#00D4FF" size={400} className="absolute bottom-0 -left-40 opacity-10" />

      <div className="max-w-7xl mx-auto relative">
        <ScrollReveal className="text-center mb-20">
          <span className="text-sm font-medium tracking-[0.3em] text-[#00D4FF] uppercase mb-6 block">Features</span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 leading-[0.9]">
            WHY LIMINAL IS<br />
            <span className="bg-gradient-to-r from-[#7B2FFF] to-[#00D4FF] bg-clip-text text-transparent">DIFFERENT</span>
          </h2>
          <p className="text-lg text-[#6b6b80] max-w-2xl mx-auto">
            Not just another bridge. A unified infrastructure layer with measurable advantages.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={feature.title} className="feature-card group glass rounded-2xl p-6 sm:p-8 hover:border-[#7B2FFF]/20 transition-all duration-700 relative overflow-hidden cursor-pointer">
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700`} />
              <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[60px] bg-[#7B2FFF] opacity-0 group-hover:opacity-10 transition-opacity duration-700" />

              <div className="relative">
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center group-hover:shadow-[0_0_30px_rgba(123,47,255,0.3)] transition-shadow duration-500`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-black bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>{feature.stat}</div>
                    <div className="text-[10px] text-[#6b6b80] tracking-wider uppercase">{feature.statLabel}</div>
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-[#00D4FF] transition-colors duration-500">{feature.title}</h3>
                <p className="text-[#6b6b80] leading-relaxed text-sm mb-4">{feature.description}</p>
                <div className="flex items-center gap-2 text-xs text-[#7B2FFF] font-medium">
                  <span>{feature.comparison}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
