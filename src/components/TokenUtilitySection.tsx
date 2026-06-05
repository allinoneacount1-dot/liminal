"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Coins, TrendingUp, Users, BarChart3, ArrowUpRight } from "lucide-react";
import { ScrollReveal, GlowingOrb } from "./CinematicEffects";

gsap.registerPlugin(ScrollTrigger);

const tokenUtilities = [
  {
    icon: Coins,
    title: "Governance",
    description: "Vote on protocol upgrades, treasury allocations, and strategic direction. Your voice shapes the future.",
    percent: 25,
    gradient: "from-[#7B2FFF] to-[#00D4FF]",
  },
  {
    icon: TrendingUp,
    title: "Staking Rewards",
    description: "Earn passive income by staking $LIMINAL to secure the network. Compounding rewards, auto-compounded.",
    percent: 30,
    gradient: "from-[#00D4FF] to-[#FF3366]",
  },
  {
    icon: Users,
    title: "Fee Reduction",
    description: "Hold $LIMINAL to receive up to 75% reduction on all protocol fees. More holdings, more savings.",
    percent: 20,
    gradient: "from-[#FF3366] to-[#7B2FFF]",
  },
  {
    icon: BarChart3,
    title: "Revenue Share",
    description: "Pro-rata share of protocol revenue distributed to stakers quarterly. Real yield, real value.",
    percent: 25,
    gradient: "from-[#00D4FF] to-[#7B2FFF]",
  },
];

export function TokenUtilitySection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const bars = sectionRef.current.querySelectorAll(".progress-bar");
    bars.forEach((bar) => {
      const target = bar.getAttribute("data-width");
      if (!target) return;
      gsap.fromTo(
        bar,
        { width: "0%" },
        {
          width: target,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bar,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    const cards = sectionRef.current.querySelectorAll(".token-card");
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, x: i % 2 === 0 ? -60 : 60 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          delay: i * 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (sectionRef.current?.contains(t.trigger as Node)) t.kill();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="wealth"
      className="relative py-40 px-6 overflow-hidden"
    >
      <GlowingOrb color="#7B2FFF" size={600} className="absolute top-0 left-1/2 -translate-x-1/2 opacity-20" />

      <div className="max-w-7xl mx-auto relative">
        <ScrollReveal className="text-center mb-24">
          <span className="text-sm font-medium tracking-[0.3em] text-[#7B2FFF] uppercase mb-6 block">
            Token Utility
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-[0.9]">
            $LIMINAL{" "}
            <span className="bg-gradient-to-r from-[#00D4FF] to-[#7B2FFF] bg-clip-text text-transparent">
              TOKEN
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-[#6b6b80] max-w-2xl mx-auto leading-relaxed font-light">
            More than a token — it&apos;s your key to the Liminal ecosystem.
            Stake, govern, earn, and access exclusive features.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tokenUtilities.map((item, index) => (
            <div
              key={item.title}
              className="token-card glass rounded-3xl p-8 group hover:border-[#7B2FFF]/20 transition-all duration-700 relative overflow-hidden cursor-pointer"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700`} />

              <div className="relative flex items-start gap-6">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shrink-0 group-hover:shadow-[0_0_30px_rgba(123,47,255,0.2)] transition-shadow duration-500`}>
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-[#00D4FF] transition-colors duration-500">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className={`text-3xl font-black bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}>
                        {item.percent}%
                      </span>
                      <ArrowUpRight className="w-5 h-5 text-[#6b6b80] group-hover:text-[#00D4FF] transition-colors" />
                    </div>
                  </div>
                  <p className="text-[#6b6b80] leading-relaxed text-sm mb-5">
                    {item.description}
                  </p>
                  {/* Progress bar */}
                  <div className="w-full h-1.5 bg-[#1a1a24] rounded-full overflow-hidden">
                    <div
                      className={`progress-bar h-full bg-gradient-to-r ${item.gradient} rounded-full`}
                      data-width={`${item.percent}%`}
                      style={{ width: "0%" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
