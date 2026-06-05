"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Shield, Zap, Eye, Layers, Globe, Lock, ArrowRight } from "lucide-react";
import { ScrollReveal, ParallaxSection, GlowingOrb } from "./CinematicEffects";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Eye,
    title: "Invisible Infrastructure",
    description: "Liminal operates beneath the surface, providing the backbone for decentralized applications without drawing attention to itself.",
    gradient: "from-[#7B2FFF] to-[#00D4FF]",
    stat: "99.9%",
    statLabel: "Uptime",
  },
  {
    icon: Shield,
    title: "Military-Grade Security",
    description: "Multi-layered security architecture with formal verification, real-time threat detection, and automated response systems.",
    gradient: "from-[#00D4FF] to-[#FF3366]",
    stat: "3",
    statLabel: "Audits Passed",
  },
  {
    icon: Zap,
    title: "Zero-Latency Execution",
    description: "Sub-millisecond transaction finality through optimized consensus mechanisms and parallel processing architecture.",
    gradient: "from-[#FF3366] to-[#7B2FFF]",
    stat: "<1ms",
    statLabel: "Finality",
  },
  {
    icon: Layers,
    title: "Modular Architecture",
    description: "Composable building blocks that developers can assemble like LEGO to create powerful DeFi applications.",
    gradient: "from-[#7B2FFF] to-[#FF3366]",
    stat: "50+",
    statLabel: "Modules",
  },
  {
    icon: Globe,
    title: "Cross-Chain Native",
    description: "Seamlessly bridges assets and data across Solana, Ethereum, and emerging L2 networks without friction.",
    gradient: "from-[#00D4FF] to-[#7B2FFF]",
    stat: "5",
    statLabel: "Chains",
  },
  {
    icon: Lock,
    title: "Privacy by Default",
    description: "Zero-knowledge proofs ensure transaction privacy while maintaining full auditability for compliance.",
    gradient: "from-[#FF3366] to-[#00D4FF]",
    stat: "ZK",
    statLabel: "Proofs",
  },
];

export function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const cards = gridRef.current.querySelectorAll(".feature-card");
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "top 65%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        cards.forEach((c) => {
          if (t.trigger === c) t.kill();
        });
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="intelligence"
      className="relative py-40 px-6 overflow-hidden"
    >
      {/* Background orbs */}
      <GlowingOrb color="#7B2FFF" size={500} className="absolute -top-40 right-0 opacity-30" />
      <GlowingOrb color="#00D4FF" size={400} className="absolute bottom-0 -left-40 opacity-20" />

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-24">
          <span className="text-sm font-medium tracking-[0.3em] text-[#00D4FF] uppercase mb-6 block">
            Intelligence
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-[0.9]">
            BUILT FOR THE{" "}
            <span className="bg-gradient-to-r from-[#7B2FFF] to-[#00D4FF] bg-clip-text text-transparent">
              FUTURE
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-[#6b6b80] max-w-2xl mx-auto leading-relaxed font-light">
            Every component of Liminal is engineered for performance, security,
            and scalability. No compromises. No shortcuts.
          </p>
        </ScrollReveal>

        {/* Features Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="feature-card group glass rounded-3xl p-8 hover:border-[#7B2FFF]/20 transition-all duration-700 relative overflow-hidden cursor-pointer"
            >
              {/* Hover gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700`} />

              {/* Glow on hover */}
              <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[60px] bg-[#7B2FFF] opacity-0 group-hover:opacity-10 transition-opacity duration-700" />

              <div className="relative">
                {/* Icon + Stat */}
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center group-hover:shadow-[0_0_30px_rgba(123,47,255,0.3)] transition-shadow duration-500`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-black bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
                      {feature.stat}
                    </div>
                    <div className="text-[10px] text-[#6b6b80] tracking-wider uppercase">
                      {feature.statLabel}
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00D4FF] transition-colors duration-500">
                  {feature.title}
                </h3>
                <p className="text-[#6b6b80] leading-relaxed text-sm mb-6">
                  {feature.description}
                </p>

                {/* Learn more link */}
                <div className="flex items-center gap-2 text-sm text-[#6b6b80] group-hover:text-[#00D4FF] transition-colors duration-500">
                  <span>Learn more</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
