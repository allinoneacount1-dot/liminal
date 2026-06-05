"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, Clock, Rocket } from "lucide-react";
import { ScrollReveal, GlowingOrb } from "./CinematicEffects";

gsap.registerPlugin(ScrollTrigger);

const roadmapPhases = [
  {
    phase: "Phase 0",
    title: "Genesis",
    status: "completed" as const,
    items: ["Core protocol architecture", "Smart contract development", "Security audit (3 firms)", "Testnet deployment"],
  },
  {
    phase: "Phase 1",
    title: "Awakening",
    status: "active" as const,
    items: ["Mainnet beta launch", "Token generation event", "Initial DEX listing", "Staking protocol live", "Governance framework"],
  },
  {
    phase: "Phase 2",
    title: "Expansion",
    status: "upcoming" as const,
    items: ["Cross-chain bridge deployment", "Developer SDK release", "Ecosystem fund activation", "Mobile application", "Enterprise partnerships"],
  },
  {
    phase: "Phase 3",
    title: "Ascension",
    status: "upcoming" as const,
    items: ["DAO transition", "Advanced privacy features", "Institutional integration", "Global expansion", "Layer 2 scaling"],
  },
];

export function RoadmapSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll(".roadmap-card");
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: i * 0.15,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Connecting line animation
    const line = sectionRef.current.querySelector(".roadmap-line");
    if (line) {
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (sectionRef.current?.contains(t.trigger as Node)) t.kill();
      });
    };
  }, []);

  return (
    <section ref={sectionRef} id="resources" className="relative py-40 px-6 overflow-hidden">
      <GlowingOrb color="#00D4FF" size={500} className="absolute top-0 right-0 opacity-20" />

      <div className="max-w-7xl mx-auto relative">
        <ScrollReveal className="text-center mb-24">
          <span className="text-sm font-medium tracking-[0.3em] text-[#FF3366] uppercase mb-6 block">
            Roadmap
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-[0.9]">
            THE PATH{" "}
            <span className="bg-gradient-to-r from-[#FF3366] to-[#7B2FFF] bg-clip-text text-transparent">
              FORWARD
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-[#6b6b80] max-w-2xl mx-auto leading-relaxed font-light">
            Every great protocol has a plan. Ours is built to last,
            designed to scale, and committed to decentralization.
          </p>
        </ScrollReveal>

        {/* Desktop: Horizontal timeline */}
        <div className="hidden lg:block relative">
          {/* Connecting line */}
          <div className="roadmap-line absolute top-[60px] left-0 right-0 h-[2px] bg-gradient-to-r from-[#7B2FFF] via-[#00D4FF] to-[#FF3366] origin-left" />

          <div className="grid grid-cols-4 gap-8">
            {roadmapPhases.map((phase, index) => (
              <div key={phase.phase} className="roadmap-card relative">
                {/* Timeline dot */}
                <div className="flex justify-center mb-8">
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    phase.status === "completed" ? "bg-green-400 border-green-400" :
                    phase.status === "active" ? "bg-[#00D4FF] border-[#00D4FF] shadow-[0_0_20px_#00D4FF]" :
                    "bg-[#1a1a24] border-[#6b6b80]"
                  }`} />
                </div>

                <div className={`glass rounded-2xl p-6 relative overflow-hidden ${
                  phase.status === "active" ? "border-[#00D4FF]/30" : ""
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold tracking-widest text-[#6b6b80]">{phase.phase}</span>
                    {phase.status === "completed" && <span className="flex items-center gap-1 text-xs text-green-400"><Check size={12} /> Done</span>}
                    {phase.status === "active" && <span className="flex items-center gap-1 text-xs text-[#00D4FF]"><Rocket size={12} /> Live</span>}
                    {phase.status === "upcoming" && <span className="flex items-center gap-1 text-xs text-[#6b6b80]"><Clock size={12} /> Soon</span>}
                  </div>

                  <h3 className="text-2xl font-black text-white mb-6">{phase.title}</h3>

                  <ul className="space-y-3">
                    {phase.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-[#6b6b80]">
                        <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                          phase.status === "completed" ? "bg-green-400" :
                          phase.status === "active" ? "bg-[#00D4FF]" : "bg-[#1a1a24]"
                        }`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: Vertical cards */}
        <div className="lg:hidden space-y-6">
          {roadmapPhases.map((phase, index) => (
            <div key={phase.phase} className="roadmap-card glass rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold tracking-widest text-[#6b6b80]">{phase.phase}</span>
                {phase.status === "completed" && <span className="flex items-center gap-1 text-xs text-green-400"><Check size={12} /> Done</span>}
                {phase.status === "active" && <span className="flex items-center gap-1 text-xs text-[#00D4FF]"><Rocket size={12} /> Live</span>}
                {phase.status === "upcoming" && <span className="flex items-center gap-1 text-xs text-[#6b6b80]"><Clock size={12} /> Soon</span>}
              </div>
              <h3 className="text-xl font-black text-white mb-4">{phase.title}</h3>
              <ul className="space-y-2">
                {phase.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[#6b6b80]">
                    <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                      phase.status === "completed" ? "bg-green-400" :
                      phase.status === "active" ? "bg-[#00D4FF]" : "bg-[#1a1a24]"
                    }`} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
