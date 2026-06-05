"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import Scene3D from "@/components/Scene3D";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <Scene3D />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--void)]/60 via-transparent to-[var(--void)] z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(123,47,255,0.08)_0%,transparent_70%)] z-10 pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm font-medium tracking-wider text-[var(--muted)]">
            <span className="w-2 h-2 rounded-full bg-[var(--cyan)] animate-pulse" />
            THE INTELLIGENCE LAYER OF WEB3
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] mb-8"
        >
          <span className="text-white">POWER</span>
          <br />
          <span className="text-white">HIDDEN IN</span>
          <br />
          <span className="bg-gradient-to-r from-[var(--violet)] via-[var(--cyan)] to-[var(--violet)] bg-clip-text text-transparent animate-shimmer">
            SILENCE
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg sm:text-xl text-[var(--muted)] max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Liminal is the invisible infrastructure shaping the future of decentralized finance.
          Built for those who understand that the greatest power operates without spectacle.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="#access"
            className="group btn-glow px-8 py-4 rounded-xl text-base font-bold text-white tracking-wide flex items-center gap-3"
          >
            REQUEST ACCESS
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="#intelligence"
            className="px-8 py-4 rounded-xl text-base font-medium text-[var(--muted)] border border-[var(--border)] hover:border-[var(--violet)] hover:text-white transition-all duration-300"
          >
            Explore Protocol
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: "$2.4B+", label: "Total Value Locked" },
            { value: "147K+", label: "Active Users" },
            { value: "$89M+", label: "Treasury" },
            { value: "99.9%", label: "Uptime" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-[var(--muted)]">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-[var(--muted)]"
          >
            <ChevronDown size={24} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
