"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ChevronDown, Play, Wallet, Copy, Check, X } from "lucide-react";
import Link from "next/link";
import Scene3DInner from "./Scene3DInner";
import { ScrollReveal, MagneticButton, GlowingOrb } from "./CinematicEffects";
import { useWalletStore, useNotificationStore } from "@/stores";

gsap.registerPlugin(ScrollTrigger);

function WalletModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { connect, connected, address, disconnect } = useWalletStore();
  const { add } = useNotificationStore();
  const [connecting, setConnecting] = useState(false);

  const handleConnect = async (wallet: string) => {
    setConnecting(true);
    try {
      await connect();
      add({ type: "success", title: "Wallet Connected", message: `Connected to ${wallet}` });
      onClose();
    } catch {
      add({ type: "error", title: "Connection Failed", message: "Please try again" });
    }
    setConnecting(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="glass-strong rounded-3xl p-8 w-full max-w-md relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/5 transition-colors text-[#6b6b80] hover:text-white">
              <X size={20} />
            </button>

            <h3 className="text-2xl font-bold text-white mb-2">Connect Wallet</h3>
            <p className="text-[#6b6b80] mb-8">Choose your preferred wallet to connect to Liminal.</p>

            {connected && address ? (
              <div className="space-y-4">
                <div className="bg-[#111118] rounded-xl p-4">
                  <div className="text-xs text-[#6b6b80] mb-2">Connected</div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-white text-sm">{address.slice(0, 8)}...{address.slice(-6)}</span>
                    <button onClick={() => navigator.clipboard.writeText(address)} className="p-1.5 rounded-lg hover:bg-white/5 transition-colors">
                      <Copy size={14} className="text-[#6b6b80]" />
                    </button>
                  </div>
                </div>
                <button onClick={disconnect} className="w-full py-3 rounded-xl border border-red-400/20 text-red-400 hover:bg-red-400/10 transition-colors text-sm font-medium">
                  Disconnect
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {[
                  { name: "Phantom", icon: "👻", desc: "Connect with Phantom wallet" },
                  { name: "Solflare", icon: "☀️", desc: "Connect with Solflare wallet" },
                  { name: "Backpack", icon: "🎒", desc: "Connect with Backpack wallet" },
                  { name: "WalletConnect", icon: "🔗", desc: "Scan with WalletConnect" },
                ].map((wallet) => (
                  <button
                    key={wallet.name}
                    onClick={() => handleConnect(wallet.name)}
                    disabled={connecting}
                    className="w-full flex items-center gap-4 p-4 rounded-xl bg-[#111118] hover:bg-[#1a1a24] transition-all group disabled:opacity-50"
                  >
                    <span className="text-2xl">{wallet.icon}</span>
                    <div className="text-left">
                      <div className="font-semibold text-white group-hover:text-[#00D4FF] transition-colors">{wallet.name}</div>
                      <div className="text-xs text-[#6b6b80]">{wallet.desc}</div>
                    </div>
                    <ArrowRight size={16} className="ml-auto text-[#6b6b80] group-hover:text-[#00D4FF] transition-colors" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);
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
        { opacity: 1, y: 0, rotateX: 0, duration: 1.5, stagger: 0.15, ease: "power4.out", delay: 0.8 }
      );
    }
    return () => {
      ScrollTrigger.getAll().forEach((t) => { if (t.trigger === sectionRef.current) t.kill(); });
    };
  }, []);

  return (
    <>
      <section ref={sectionRef} className="relative min-h-[200vh] flex items-start justify-center">
        <div className="fixed inset-0 z-0"><Scene3DInner /></div>
        <div className="fixed inset-0 z-10 pointer-events-none bg-gradient-to-b from-[#050505]/80 via-transparent to-[#050505]" />
        <div className="fixed inset-0 z-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(123,47,255,0.06)_0%,transparent_70%)]" />
        <GlowingOrb color="#7B2FFF" size={600} className="fixed -top-40 -left-40 z-0" />
        <GlowingOrb color="#00D4FF" size={400} className="fixed -bottom-20 -right-20 z-0" />

        <motion.div style={{ opacity, scale, y }} className="sticky top-0 h-screen flex items-center justify-center z-20">
          <div className="max-w-6xl mx-auto px-6 text-center">
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

            <div ref={headlineRef} className="mb-8" style={{ perspective: "1000px" }}>
              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-[-0.04em] leading-[0.85]">
                <span className="word inline-block text-white">POWER</span><br />
                <span className="word inline-block text-white">HIDDEN</span><br />
                <span className="word inline-block text-white">IN</span><br />
                <span className="word inline-block bg-gradient-to-r from-[#7B2FFF] via-[#00D4FF] to-[#7B2FFF] bg-clip-text text-transparent" style={{ backgroundSize: "200% auto", animation: "shimmer 3s linear infinite" }}>SILENCE</span>
              </h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 1, delay: 1.5, ease: "easeOut" }}
              className="text-lg sm:text-xl md:text-2xl text-[#6b6b80] max-w-3xl mx-auto mb-12 leading-relaxed font-light"
            >
              Liminal is the invisible infrastructure shaping the future of decentralized finance. Built for those who understand that the greatest power operates without spectacle.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 1, delay: 1.8, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-center justify-center gap-5"
            >
              <MagneticButton
                onClick={() => setShowWalletModal(true)}
                className="btn-glow px-10 py-5 rounded-2xl text-base font-bold text-white tracking-wide flex items-center gap-3 min-w-[240px] justify-center"
              >
                REQUEST ACCESS
                <ArrowRight className="w-5 h-5" />
              </MagneticButton>

              <MagneticButton
                onClick={() => {
                  const el = document.getElementById("intelligence");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-10 py-5 rounded-2xl text-base font-medium text-[#6b6b80] border border-[#1a1a24] hover:border-[#7B2FFF]/50 hover:text-white transition-all duration-500 flex items-center gap-3 min-w-[240px] justify-center backdrop-blur-xl bg-[#111118]/30"
              >
                <Play className="w-5 h-5" />
                Explore Protocol
              </MagneticButton>
            </motion.div>

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
                  className="text-center group cursor-default"
                >
                  <div className="text-3xl sm:text-4xl md:text-5xl font-black mb-2 transition-all duration-500" style={{ color: stat.accent }}>
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-[#6b6b80] tracking-wider uppercase">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: isLoaded ? 1 : 0 }} transition={{ delay: 3 }} className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30">
          <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} className="flex flex-col items-center gap-2">
            <span className="text-[10px] tracking-[0.3em] text-[#6b6b80] uppercase">Scroll</span>
            <ChevronDown size={20} className="text-[#7B2FFF]" />
          </motion.div>
        </motion.div>
      </section>

      <WalletModal isOpen={showWalletModal} onClose={() => setShowWalletModal(false)} />
    </>
  );
}
