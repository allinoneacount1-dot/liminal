"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { MagneticButton, GlowingOrb } from "./CinematicEffects";

gsap.registerPlugin(ScrollTrigger);

export function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const content = sectionRef.current.querySelector(".cta-content");
    if (content) {
      gsap.fromTo(
        content,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
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
    <section ref={sectionRef} id="access" className="relative py-40 px-6 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#7B2FFF]/[0.03] to-transparent" />
      <GlowingOrb color="#7B2FFF" size={800} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30" />
      <GlowingOrb color="#00D4FF" size={400} className="absolute top-1/4 right-0 opacity-20" />

      <div className="max-w-4xl mx-auto relative">
        <div className="cta-content text-center">
          {/* Decorative line */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#7B2FFF]" />
            <div className="w-2 h-2 rounded-full bg-[#7B2FFF] shadow-[0_0_10px_#7B2FFF]" />
            <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#7B2FFF]" />
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white mb-8 leading-[0.85]">
            CROSS THE{" "}
            <span className="bg-gradient-to-r from-[#7B2FFF] via-[#00D4FF] to-[#7B2FFF] bg-clip-text text-transparent bg-[length:200%_auto] animate-[shimmer_3s_linear_infinite]">
              THRESHOLD
            </span>
          </h2>

          <p className="text-xl sm:text-2xl text-[#6b6b80] max-w-2xl mx-auto mb-12 font-light leading-relaxed">
            The future of decentralized intelligence awaits.
            Request access to Liminal and become part of the invisible revolution.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <MagneticButton className="btn-glow px-12 py-6 rounded-2xl text-lg font-bold text-white tracking-wide flex items-center gap-3 min-w-[280px] justify-center">
              REQUEST ACCESS
              <ArrowRight className="w-5 h-5" />
            </MagneticButton>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-10 text-sm text-[#6b6b80] tracking-wider"
          >
            LIMITED ACCESS · BY INVITATION ONLY
          </motion.p>

          {/* Decorative line */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent to-[#00D4FF]/30" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#00D4FF]/50" />
            <div className="w-24 h-[1px] bg-gradient-to-l from-transparent to-[#00D4FF]/30" />
          </div>
        </div>
      </div>
    </section>
  );
}
