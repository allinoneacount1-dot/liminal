"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Play, ExternalLink, Zap } from "lucide-react";
import Link from "next/link";
import Scene3DInner from "./Scene3DInner";
import { MagneticButton, GlowingOrb } from "./CinematicEffects";
import { useWalletStore, useNotificationStore } from "@/stores";

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
    <>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm" onClick={onClose}>
          <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="glass-strong rounded-3xl p-8 w-full max-w-md relative" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-bold text-white mb-2">Connect Wallet</h3>
            <p className="text-[#6b6b80] mb-8">Choose your preferred wallet to connect to Liminal.</p>
            {connected && address ? (
              <div className="space-y-4">
                <div className="bg-[#111118] rounded-xl p-4">
                  <div className="text-xs text-[#6b6b80] mb-2">Connected</div>
                  <div className="font-mono text-white text-sm">{address.slice(0, 8)}...{address.slice(-6)}</div>
                </div>
                <button onClick={disconnect} className="w-full py-3 rounded-xl border border-red-400/20 text-red-400 hover:bg-red-400/10 transition-colors text-sm font-medium">Disconnect</button>
              </div>
            ) : (
              <div className="space-y-3">
                {[{ name: "Phantom", icon: "👻" }, { name: "Solflare", icon: "☀️" }, { name: "Backpack", icon: "🎒" }, { name: "WalletConnect", icon: "🔗" }].map((wallet) => (
                  <button key={wallet.name} onClick={() => handleConnect(wallet.name)} disabled={connecting} className="w-full flex items-center gap-4 p-4 rounded-xl bg-[#111118] hover:bg-[#1a1a24] transition-all group disabled:opacity-50">
                    <span className="text-2xl">{wallet.icon}</span>
                    <div className="text-left"><div className="font-semibold text-white group-hover:text-[#00D4FF] transition-colors">{wallet.name}</div></div>
                    <ArrowRight size={16} className="ml-auto text-[#6b6b80] group-hover:text-[#00D4FF] transition-colors" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </>
  );
}

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.4], [0, 80]);

  useEffect(() => {
    setIsLoaded(true);
    if (headlineRef.current) {
      const words = headlineRef.current.querySelectorAll(".word");
      gsap.fromTo(words, { opacity: 0, y: 100, rotateX: -80 }, { opacity: 1, y: 0, rotateX: 0, duration: 1.5, stagger: 0.12, ease: "power4.out", delay: 0.8 });
    }
    return () => { ScrollTrigger.getAll().forEach((t) => { if (t.trigger === sectionRef.current) t.kill(); }); };
  }, []);

  return (
    <>
      <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* 3D Background */}
        <div className="fixed inset-0 z-0"><Scene3DInner /></div>
        <div className="fixed inset-0 z-10 pointer-events-none bg-gradient-to-b from-[#050505]/70 via-[#050505]/40 to-[#050505]" />
        <div className="fixed inset-0 z-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(123,47,255,0.05)_0%,transparent_70%)]" />
        <GlowingOrb color="#7B2FFF" size={500} className="fixed -top-40 -left-40 z-0" />
        <GlowingOrb color="#00D4FF" size={350} className="fixed -bottom-20 -right-20 z-0" />

        <motion.div style={{ opacity, y }} className="relative z-20 max-w-6xl mx-auto px-6 pt-24 pb-16">
          {/* Eyebrow */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }} transition={{ duration: 0.8, delay: 0.5 }} className="mb-6">
            <span className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-[#1a1a24] bg-[#111118]/60 backdrop-blur-xl text-xs font-medium tracking-[0.2em] text-[#6b6b80]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] animate-pulse shadow-[0_0_8px_#00D4FF]" />
              INFRASTRUCTURE FOR ONCHAIN APPLICATIONS
            </span>
          </motion.div>

          {/* Headline */}
          <div ref={headlineRef} className="mb-6" style={{ perspective: "1000px" }}>
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[-0.04em] leading-[0.85]">
              <span className="word inline-block text-white">POWER</span><br />
              <span className="word inline-block text-white">HIDDEN</span><br />
              <span className="word inline-block text-white">IN</span><br />
              <span className="word inline-block bg-gradient-to-r from-[#7B2FFF] via-[#00D4FF] to-[#7B2FFF] bg-clip-text text-transparent" style={{ backgroundSize: "200% auto", animation: "shimmer 3s linear infinite" }}>SILENCE</span>
            </h1>
          </div>

          {/* Value Proposition — CLEAR */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }} transition={{ duration: 0.8, delay: 1.2 }} className="mb-8 max-w-2xl">
            <p className="text-base sm:text-lg md:text-xl text-[#a0a0b8] leading-relaxed">
              Liminal is a <span className="text-white font-semibold">cross-chain messaging and liquidity infrastructure</span> that enables applications to communicate and transfer value across Solana, Ethereum, and L2s — with sub-second finality and zero-knowledge security.
            </p>
          </motion.div>

          {/* Comparison badges */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 15 }} transition={{ duration: 0.8, delay: 1.4 }} className="flex flex-wrap items-center gap-3 mb-10">
            {[
              { label: "vs LayerZero", diff: "Sub-second finality" },
              { label: "vs Wormhole", diff: "ZK-secured" },
              { label: "vs Axelar", diff: "Unified liquidity" },
            ].map((comp) => (
              <span key={comp.label} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#111118]/60 border border-[#1a1a24] text-xs">
                <span className="text-[#6b6b80]">{comp.label}</span>
                <span className="text-[#00D4FF]">→ {comp.diff}</span>
              </span>
            ))}
          </motion.div>

          {/* CTAs — Specific & Actionable */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }} transition={{ duration: 0.8, delay: 1.6 }} className="flex flex-col sm:flex-row items-start gap-4">
            <MagneticButton onClick={() => setShowWalletModal(true)} className="btn-glow px-8 py-4 rounded-xl text-sm font-bold text-white tracking-wide flex items-center gap-3">
              <Zap size={16} /> Launch App
              <ArrowRight size={16} />
            </MagneticButton>
            <MagneticButton onClick={() => { const el = document.getElementById("why-liminal"); if (el) el.scrollIntoView({ behavior: "smooth" }); }} className="px-8 py-4 rounded-xl text-sm font-medium text-[#6b6b80] border border-[#1a1a24] hover:border-[#7B2FFF]/50 hover:text-white transition-all duration-500 flex items-center gap-3 backdrop-blur-xl bg-[#111118]/30">
              <Play size={16} /> Read Litepaper
            </MagneticButton>
            <Link href="/dashboard" className="px-8 py-4 rounded-xl text-sm font-medium text-[#6b6b80] hover:text-white transition-colors flex items-center gap-2">
              <ExternalLink size={16} /> View Dashboard
            </Link>
          </motion.div>

          {/* Trusted by / Built with */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: isLoaded ? 1 : 0 }} transition={{ duration: 1, delay: 2 }} className="mt-16 pt-8 border-t border-[#1a1a24]">
            <div className="text-[10px] tracking-[0.2em] text-[#6b6b80] uppercase mb-4">Built With & Integrated On</div>
            <div className="flex flex-wrap items-center gap-6">
              {["Solana", "Ethereum", "Arbitrum", "Base", "Optimism", "Chainlink"].map((chain) => (
                <span key={chain} className="text-sm text-[#6b6b80] hover:text-white transition-colors cursor-default font-medium">{chain}</span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      <WalletModal isOpen={showWalletModal} onClose={() => setShowWalletModal(false)} />
    </>
  );
}
