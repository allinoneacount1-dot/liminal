"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ChevronDown, Play } from "lucide-react";
import Link from "next/link";
import Scene3DInner from "./Scene3DInner";
import { ScrollReveal, CinematicText, MagneticButton, GlowingOrb } from "./CinematicEffects";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  useEffect(() => {
    setIsLoaded(true);

    if (headlineRef.current) {
      const words = headlineRef.current.querySelectorAll(".word");
      gsap.fromTo(
        words,
        { opacity: 0, y: 120, rotateX: -80 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1.5,
          stagger: 0.15,
          ease: "power4.out",
          delay: 0.8,
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === sectionRef.current) t.kill();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[200vh] flex items-start justify-center"
    >
      {/* 3D Background */}
      <div className="fixed inset-0 z-0">
        <Scene3DInner />
      </div>

      {/* Gradient overlays */}
      <div className="fixed inset-0 z-10 pointer-events-none bg-gradient-to-b from-[#050505]/80 via-transparent to-[#050505]" />
      <div className="fixed inset-0 z-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(123,47,255,0.06)_0%,transparent_70%)]" />

      {/* Orbs */}
      <GlowingOrb color="#7B2FFF" size={600} className="fixed -top-40 -left-40 z-0" />
      <GlowingOrb color="#00D4FF" size={400} className="fixed -bottom-20 -right-20 z-0" />

      {/* Main content */}
      <motion.div
        style={{ opacity, scale, y }}
        className="sticky top-0 h-screen flex items-center justify-center z-20"
      >
        <div className="max-w-6xl mx-auto px-6 text-center">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-[#1a1a24] bg-[#111118]/50 backdrop-blur-xl text-sm font-medium tracking-[0.2em] text-[#6b6b80]">
              <span className="w-2 h-2 rounded-full bg-[#00D4FF] animate-pulse shadow-[0_0_10px_#00D4FF]" />
              THE INTELLIGENCE LAYER OF WEB3
            </span>
          </motion.div>

          {/* Main Headline */}
          <div ref={headlineRef} className="mb-8 perspective-[1000px]">
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-[-0.04em] leading-[0.85]">
              <span className="word inline-block text-white">POWER</span>
              <br />
              <span className="word inline-block text-white">HIDDEN</span>
              <br />
              <span className="word inline-block text-white">IN</span>
              <br />
              <span className="word inline-block bg-gradient-to-r from-[#7B2FFF] via-[#00D4FF] to-[#7B2FFF] bg-clip-text text-transparent bg-[length:200%_auto] animate-[shimmer_3s_linear_infinite]">
                SILENCE
              </span>
            </h1>
          </div>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 1, delay: 1.5, ease: "easeOut" }}
            className="text-lg sm:text-xl md:text-2xl text-[#6b6b80] max-w-3xl mx-auto mb-12 leading-relaxed font-light"
          >
            Liminal is the invisible infrastructure shaping the future of
            decentralized finance. Built for those who understand that the
            greatest power operates without spectacle.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 1, delay: 1.8, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            <MagneticButton className="btn-glow px-10 py-5 rounded-2xl text-base font-bold text-white tracking-wide flex items-center gap-3 min-w-[240px] justify-center">
              REQUEST ACCESS
              <ArrowRight className="w-5 h-5" />
            </MagneticButton>

            <MagneticButton className="px-10 py-5 rounded-2xl text-base font-medium text-[#6b6b80] border border-[#1a1a24] hover:border-[#7B2FFF]/50 hover:text-white transition-all duration-500 flex items-center gap-3 min-w-[240px] justify-center backdrop-blur-xl bg-[#111118]/30">
              <Play className="w-5 h-5" />
              Watch Film
            </MagneticButton>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 1.5, delay: 2.2 }}
            className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
          >
            {[
              { value: "$2.4B+", label: "Total Value Locked", accent: "#7B2FFF" },
              { value: "147K+", label: "Active Users", accent: "#00D4FF" },
              { value: "$89M+", label: "Treasury", accent: "#FF3366" },
              { value: "99.9%", label: "Uptime", accent: "#00D4FF" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
                transition={{ duration: 0.8, delay: 2.4 + i * 0.1 }}
                className="text-center group"
              >
                <div
                  className="text-3xl sm:text-4xl md:text-5xl font-black mb-2 transition-all duration-500"
                  style={{ color: stat.accent }}
                >
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-[#6b6b80] tracking-wider uppercase">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ delay: 3 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] tracking-[0.3em] text-[#6b6b80] uppercase">
            Scroll
          </span>
          <ChevronDown size={20} className="text-[#7B2FFF]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
