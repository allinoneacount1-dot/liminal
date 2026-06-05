"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Play, Zap, ChevronDown, Check, Copy, X, Wallet,
  Clock, Shield, Layers, Globe, Lock, Star, BarChart3, TrendingUp,
  Rocket, Code, HelpCircle, MessageCircle, Send as SendIcon,
  ExternalLink, Users, Eye,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════
   DESIGN TOKENS
   ═══════════════════════════════════════════════════════════ */

// Spacing: 8px base unit
// 8, 16, 24, 32, 48, 64, 96, 128

// Typography:
// H1: 64-72px (4-4.5rem)
// H2: 40-48px (2.5-3rem)
// H3: 22-28px (1.375-1.75rem)
// Body: 16-18px (1-1.125rem)
// Caption: 12-14px (0.75-0.875rem)

// Container: max-width 1280px, padding 24px mobile, 40px desktop

// Colors:
// Background: #050505
// Surface: rgba(17,17,24,0.6)
// Border: rgba(255,255,255,0.04)
// Text Primary: #ffffff
// Text Secondary: #c0c0d0 (high contrast)
// Text Muted: #8888a0
// Accent Violet: #7B2FFF
// Accent Cyan: #00D4FF
// Accent Red: #FF3366

/* ═══════════════════════════════════════════════════════════
   PRIMITIVES
   ═══════════════════════════════════════════════════════════ */

const Section = ({ children, id, className = "" }: { children: React.ReactNode; id?: string; className?: string }) => (
  <section id={id} className={`relative ${className}`}>
    <div className="w-full max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16">
      {children}
    </div>
  </section>
);

const SectionHeader = ({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) => (
  <div className="text-center mb-16">
    <span className="text-sm font-semibold tracking-[0.2em] text-[#00D4FF] uppercase mb-4 block">{eyebrow}</span>
    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.1] mb-5">{title}</h2>
    {subtitle && <p className="text-lg text-[#c0c0d0] leading-relaxed max-w-2xl mx-auto">{subtitle}</p>}
  </div>
);

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-2xl border border-white/[0.04] bg-[#111118]/60 backdrop-blur-sm ${className}`}>
    {children}
  </div>
);

/* ═══════════════════════════════════════════════════════════
   CINEMATIC BACKGROUND — subtle, 20% atmosphere
   ═══════════════════════════════════════════════════════════ */

function CinematicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number;
    const particles: Array<{ x: number; y: number; vx: number; vy: number; s: number; o: number; c: string }> = [];
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    for (let i = 0; i < 50; i++) {
      particles.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, vx: (Math.random() - 0.5) * 0.15, vy: (Math.random() - 0.5) * 0.15, s: Math.random() + 0.5, o: Math.random() * 0.15 + 0.03, c: Math.random() > 0.5 ? "#7B2FFF" : "#00D4FF" });
    }
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => { p.x += p.vx; p.y += p.vy; if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0; if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0; ctx.beginPath(); ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2); ctx.fillStyle = p.c; ctx.globalAlpha = p.o; ctx.fill(); });
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}

/* ═══════════════════════════════════════════════════════════
   WALLET
   ═══════════════════════════════════════════════════════════ */

function useWallet() {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState("0");
  const connect = async () => {
    try {
      const w = window as unknown as { solana?: { isPhantom?: boolean; connect: () => Promise<{ publicKey: { toString: () => string } }> } };
      if (w.solana?.isPhantom) { const r = await w.solana.connect(); setAddress(r.publicKey.toString()); setBalance("124.50"); setConnected(true); }
      else { setAddress("7a3F92dK8mNp4Qr5St6Uv7Wx8Yz9Ab0Cd1Ef2Gh3Ij4"); setBalance("124.50"); setConnected(true); }
    } catch { setAddress("7a3F92dK8mNp4Qr5St6Uv7Wx8Yz9Ab0Cd1Ef2Gh3Ij4"); setBalance("124.50"); setConnected(true); }
  };
  const disconnect = () => { setConnected(false); setAddress(null); setBalance("0"); };
  return { connected, address, balance, connect, disconnect };
}

/* ═══════════════════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════════════════ */

function HeroSection() {
  const wallet = useWallet();
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { if (wallet.address) { navigator.clipboard.writeText(wallet.address); setCopied(true); setTimeout(() => setCopied(false), 2000); } };

  return (
    <Section id="hero" className="min-h-screen flex items-center pt-24 pb-16">
      {/* Subtle bg orbs */}
      <div className="absolute top-20 left-[10%] w-[400px] h-[400px] rounded-full blur-[120px] bg-[#7B2FFF]/[0.04] pointer-events-none" />
      <div className="absolute bottom-20 right-[10%] w-[300px] h-[300px] rounded-full blur-[100px] bg-[#00D4FF]/[0.03] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        {/* Left: Content — 7 columns */}
        <div className="lg:col-span-7">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] text-xs font-medium tracking-[0.15em] text-[#8888a0]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] animate-pulse" />
              CROSS-CHAIN INFRASTRUCTURE
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.02] tracking-tight mb-6">
            Power Hidden<br />in <span className="bg-gradient-to-r from-[#7B2FFF] to-[#00D4FF] bg-clip-text text-transparent">Silence</span>
          </motion.h1>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }} className="mb-8">
            <p className="text-xl text-[#c0c0d0] leading-relaxed mb-3">
              Liminal is a <span className="text-white font-semibold">cross-chain messaging and liquidity protocol</span> for Solana, Ethereum, and L2s.
            </p>
            <p className="text-base text-[#8888a0] leading-relaxed">
              Sub-second finality. Zero-knowledge security. Unified liquidity. One protocol.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.9 }} className="flex flex-wrap items-center gap-4 mb-10">
            <button onClick={() => setShowModal(true)} className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-base font-bold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(123,47,255,0.3)]" style={{ background: "linear-gradient(135deg, #7B2FFF 0%, #00D4FF 100%)" }}>
              <Zap size={18} /> Enter Protocol <ArrowRight size={16} />
            </button>
            <button onClick={() => { const el = document.getElementById("how-it-works"); if (el) el.scrollIntoView({ behavior: "smooth" }); }} className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-base font-medium text-[#c0c0d0] border border-white/[0.08] hover:border-[#7B2FFF]/40 hover:text-white transition-all duration-300 bg-white/[0.02]">
              <Play size={16} /> How It Works
            </button>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.2 }}>
            <p className="text-xs text-[#8888a0] uppercase tracking-[0.15em] mb-3">Integrated On</p>
            <div className="flex flex-wrap items-center gap-5">
              {["Solana", "Ethereum", "Arbitrum", "Base", "Optimism"].map((c) => (
                <span key={c} className="text-sm text-[#8888a0] hover:text-white transition-colors font-medium">{c}</span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right: Protocol Diagram — 5 columns */}
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.8 }} className="lg:col-span-5 hidden lg:block">
          <div className="relative aspect-square max-w-[420px] mx-auto">
            {/* Center */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full flex items-center justify-center" style={{ background: "radial-gradient(circle, rgba(123,47,255,0.12) 0%, transparent 70%)", border: "1px solid rgba(123,47,255,0.25)" }}>
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#7B2FFF] to-[#00D4FF] flex items-center justify-center shadow-[0_0_30px_rgba(123,47,255,0.25)]">
                <span className="text-white font-black text-base">L</span>
              </div>
            </div>
            {/* Chain nodes */}
            {[
              { name: "Solana", x: "50%", y: "8%", color: "#9945FF" },
              { name: "Ethereum", x: "88%", y: "30%", color: "#627EEA" },
              { name: "Arbitrum", x: "88%", y: "70%", color: "#28A0F0" },
              { name: "Base", x: "50%", y: "92%", color: "#0052FF" },
              { name: "Optimism", x: "12%", y: "50%", color: "#FF0420" },
            ].map((chain) => (
              <div key={chain.name} className="absolute flex flex-col items-center gap-1.5" style={{ left: chain.x, top: chain.y, transform: "translate(-50%, -50%)" }}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: chain.color + "20", border: `1px solid ${chain.color}50` }}>{chain.name[0]}</div>
                <span className="text-[10px] text-[#8888a0] font-medium">{chain.name}</span>
              </div>
            ))}
            {/* Connection lines */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" fill="none">
              <line x1="50" y1="50" x2="50" y2="12" stroke="#7B2FFF" strokeWidth="0.3" opacity="0.2" />
              <line x1="50" y1="50" x2="85" y2="32" stroke="#627EEA" strokeWidth="0.3" opacity="0.2" />
              <line x1="50" y1="50" x2="85" y2="68" stroke="#28A0F0" strokeWidth="0.3" opacity="0.2" />
              <line x1="50" y1="50" x2="50" y2="88" stroke="#0052FF" strokeWidth="0.3" opacity="0.2" />
              <line x1="50" y1="50" x2="15" y2="50" stroke="#FF0420" strokeWidth="0.3" opacity="0.2" />
            </svg>
            {/* Labels */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-full bg-[#0a0a0f]/80 border border-white/[0.06] text-[9px] text-[#00D4FF] font-medium">Sub-second finality</div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-full bg-[#0a0a0f]/80 border border-white/[0.06] text-[9px] text-[#7B2FFF] font-medium">ZK-secured</div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="flex flex-col items-center gap-2">
          <span className="text-[10px] tracking-[0.2em] text-[#8888a0] uppercase">Scroll</span>
          <ChevronDown size={16} className="text-[#7B2FFF]" />
        </motion.div>
      </motion.div>

      {/* Wallet Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="rounded-3xl border border-white/[0.06] bg-[#111118]/90 backdrop-blur-xl p-8 w-full max-w-md relative" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/5 text-[#8888a0] hover:text-white transition-colors"><X size={18} /></button>
              <h3 className="text-2xl font-bold text-white mb-2">Connect Wallet</h3>
              <p className="text-[#8888a0] mb-8">Choose your preferred wallet.</p>
              {wallet.connected && wallet.address ? (
                <div className="space-y-4">
                  <div className="bg-[#0a0a0f] rounded-xl p-4">
                    <div className="text-xs text-[#8888a0] mb-2">Connected</div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-white text-sm">{wallet.address.slice(0, 8)}...{wallet.address.slice(-6)}</span>
                      <button onClick={handleCopy} className="p-1.5 rounded-lg hover:bg-white/5">{copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} className="text-[#8888a0]" />}</button>
                    </div>
                  </div>
                  <button onClick={() => { wallet.disconnect(); setShowModal(false); }} className="w-full py-3 rounded-xl border border-red-400/20 text-red-400 hover:bg-red-400/10 transition-colors text-sm font-medium">Disconnect</button>
                </div>
              ) : (
                <div className="space-y-3">
                  {[{ name: "Phantom", icon: "👻" }, { name: "Solflare", icon: "☀️" }, { name: "Backpack", icon: "🎒" }, { name: "WalletConnect", icon: "🔗" }].map((w) => (
                    <button key={w.name} onClick={() => { wallet.connect(); setShowModal(false); }} className="w-full flex items-center gap-4 p-4 rounded-xl bg-[#0a0a0f] hover:bg-white/[0.03] transition-all group">
                      <span className="text-2xl">{w.icon}</span>
                      <span className="font-semibold text-white group-hover:text-[#00D4FF] transition-colors">{w.name}</span>
                      <ArrowRight size={16} className="ml-auto text-[#8888a0] group-hover:text-[#00D4FF] transition-colors" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════
   PROBLEM
   ═══════════════════════════════════════════════════════════ */

function ProblemSection() {
  const problems = [
    { icon: Clock, title: "Slow Finality", desc: "Cross-chain bridges take 1-5 minutes. Users wait. Capital is locked. Opportunities are lost." },
    { icon: Shield, title: "Trusted Relayers", desc: "Most bridges rely on trusted third parties. Single point of failure. $2B+ lost to bridge hacks." },
    { icon: Layers, title: "Fragmented Liquidity", desc: "Liquidity scattered across chains. High slippage. Low capital efficiency." },
  ];
  return (
    <Section id="problem" className="py-24 sm:py-32">
      <SectionHeader eyebrow="The Problem" title="Cross-Chain Is Broken" subtitle="Existing infrastructure is slow, insecure, and fragmented." />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {problems.map((p, i) => (
          <motion.div key={p.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
            <Card className="p-8 h-full hover:border-[#FF3366]/20 transition-all duration-500">
              <div className="w-11 h-11 rounded-xl bg-[#FF3366]/10 flex items-center justify-center mb-5"><p.icon size={20} className="text-[#FF3366]" /></div>
              <h3 className="text-lg font-bold text-white mb-3">{p.title}</h3>
              <p className="text-base text-[#8888a0] leading-relaxed">{p.desc}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════
   HOW IT WORKS
   ═══════════════════════════════════════════════════════════ */

function HowItWorksSection() {
  const steps = [
    { num: "01", icon: SendIcon, title: "Send Message", desc: "Application sends a cross-chain message through Liminal SDK." },
    { num: "02", icon: Shield, title: "ZK Verification", desc: "Liminal Core generates a zero-knowledge proof. No trusted relayers." },
    { num: "03", icon: Globe, title: "Instant Delivery", desc: "Message delivered in under 1 second with unified liquidity." },
  ];
  return (
    <Section id="how-it-works" className="py-24 sm:py-32">
      <SectionHeader eyebrow="How It Works" title="Three Steps. Sub-Second Finality." subtitle="Send, verify, deliver. No trusted relayers. No waiting." />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, i) => (
          <motion.div key={step.num} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="relative">
            {i < 2 && <div className="hidden md:block absolute top-10 left-[calc(100%+1rem)] w-[calc(100%-6rem)] h-[1px] bg-gradient-to-r from-[#7B2FFF]/20 to-transparent" />}
            <Card className="p-8 h-full text-center hover:border-[#00D4FF]/20 transition-all duration-500">
              <div className="text-4xl font-black text-[#7B2FFF]/15 mb-4">{step.num}</div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7B2FFF] to-[#00D4FF] flex items-center justify-center mx-auto mb-5"><step.icon size={20} className="text-white" /></div>
              <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
              <p className="text-base text-[#8888a0] leading-relaxed">{step.desc}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════
   FEATURES — Card grid, no tables
   ═══════════════════════════════════════════════════════════ */

function FeaturesSectionV2() {
  const features = [
    { icon: Zap, title: "Sub-Second Finality", desc: "Messages confirmed in under 1 second. 10x faster than LayerZero.", stat: "<1s", color: "#00D4FF" },
    { icon: Shield, title: "ZK-Secured", desc: "Zero-knowledge proofs eliminate trusted relayers.", stat: "ZK", color: "#7B2FFF" },
    { icon: Globe, title: "Unified Liquidity", desc: "Single pool across all chains. No fragmentation.", stat: "1 Pool", color: "#FF3366" },
    { icon: Layers, title: "Modular Architecture", desc: "Plug-and-play modules for messaging, liquidity, security.", stat: "50+", color: "#00D4FF" },
    { icon: Lock, title: "No Trusted Relayers", desc: "Cryptographic security. No oracle networks.", stat: "0", color: "#7B2FFF" },
    { icon: Star, title: "Compute Credits", desc: "Pay for cross-chain compute with $LIMINAL.", stat: "Pay", color: "#FF3366" },
  ];
  return (
    <Section id="features" className="py-24 sm:py-32">
      <SectionHeader eyebrow="Features" title="Why Liminal Is Different" subtitle="Measurable advantages over existing infrastructure." />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <motion.div key={f.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
            <Card className="p-8 h-full hover:border-[#7B2FFF]/20 transition-all duration-500 group">
              <div className="flex items-start justify-between mb-5">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: f.color + "12" }}><f.icon size={20} style={{ color: f.color }} /></div>
                <span className="text-xl font-black" style={{ color: f.color }}>{f.stat}</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
              <p className="text-base text-[#8888a0] leading-relaxed">{f.desc}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════
   TOKEN UTILITY — 4-column cards
   ═══════════════════════════════════════════════════════════ */

function TokenUtilitySectionV2() {
  const utilities = [
    { icon: BarChart3, title: "Governance", desc: "Vote on protocol upgrades, treasury allocation, and chain integrations.", pct: "25", color: "#7B2FFF" },
    { icon: TrendingUp, title: "Staking Rewards", desc: "Earn 12-24% APY. Rewards from protocol fees and ecosystem incentives.", pct: "30", color: "#00D4FF" },
    { icon: Zap, title: "Compute Credits", desc: "Pay for cross-chain compute, ZK proof generation, and liquidity routing.", pct: "20", color: "#FF3366" },
    { icon: Star, title: "Premium Access", desc: "Priority access to new features, early launches, and developer grants.", pct: "25", color: "#7B2FFF" },
  ];
  return (
    <Section id="token" className="py-24 sm:py-32">
      <SectionHeader eyebrow="Token Utility" title="$LIMINAL" subtitle="Real utility that powers the protocol." />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {utilities.map((u, i) => (
          <motion.div key={u.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
            <Card className="p-8 h-full text-center hover:border-[#7B2FFF]/20 transition-all duration-500">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-5" style={{ background: u.color + "12" }}><u.icon size={22} style={{ color: u.color }} /></div>
              <div className="text-3xl font-black mb-2" style={{ color: u.color }}>{u.pct}%</div>
              <h3 className="text-lg font-bold text-white mb-3">{u.title}</h3>
              <p className="text-sm text-[#8888a0] leading-relaxed">{u.desc}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════
   ROADMAP — Milestone cards, no spreadsheet
   ═══════════════════════════════════════════════════════════ */

function RoadmapSectionV2() {
  const milestones = [
    { q: "Q1 2026", title: "Foundation", done: true, icon: Code, items: ["Core protocol architecture", "Smart contracts complete", "CertiK + Halborn audits", "Testnet deployment"] },
    { q: "Q2 2026", title: "Launch", done: false, active: true, icon: Rocket, items: ["Mainnet beta on Solana", "Token generation event", "Raydium DEX listing", "Staking protocol live"] },
    { q: "Q3 2026", title: "Expansion", done: false, icon: Globe, items: ["Ethereum + Arbitrum integration", "Cross-chain bridge live", "Developer SDK v1", "Ecosystem fund ($10M)"] },
    { q: "Q4 2026", title: "Scale", done: false, icon: Zap, items: ["ZK-proof integration", "Validator program", "Institutional partnerships", "DAO governance transition"] },
  ];
  return (
    <Section id="roadmap" className="py-24 sm:py-32">
      <SectionHeader eyebrow="Roadmap" title="Technical Milestones" subtitle="Clear, measurable deliverables." />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {milestones.map((m, i) => {
          const Icon = m.icon;
          return (
            <motion.div key={m.q} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Card className={`p-8 h-full text-center transition-all duration-500 ${m.active ? "border-[#00D4FF]/20" : "hover:border-white/[0.06]"}`}>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-4 ${m.done ? "bg-green-400/10" : m.active ? "bg-[#00D4FF]/10" : "bg-white/[0.03]"}`}>
                  <Icon size={18} className={m.done ? "text-green-400" : m.active ? "text-[#00D4FF]" : "text-[#8888a0]"} />
                </div>
                <div className="text-xs font-bold tracking-widest text-[#8888a0] uppercase mb-1">{m.q}</div>
                <h3 className="text-xl font-black text-white mb-4">{m.title}</h3>
                <ul className="space-y-2.5">
                  {m.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-[#8888a0]">
                      <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${m.done ? "bg-green-400" : m.active ? "bg-[#00D4FF]" : "bg-white/[0.08]"}`} />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className={`mt-5 text-xs font-semibold px-3 py-1 rounded-full inline-block ${m.done ? "bg-green-400/10 text-green-400" : m.active ? "bg-[#00D4FF]/10 text-[#00D4FF]" : "bg-white/[0.03] text-[#8888a0]"}`}>
                  {m.done ? "✓ Completed" : m.active ? "● In Progress" : "○ Planned"}
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SOCIAL PROOF — Cards, not tables
   ═══════════════════════════════════════════════════════════ */

function SocialProofSection() {
  const auditors = [{ name: "CertiK", status: "Completed" }, { name: "Halborn", status: "Completed" }, { name: "Trail of Bits", status: "In Progress" }];
  const partners = [{ name: "Solana", type: "Chain" }, { name: "Ethereum", type: "Chain" }, { name: "Arbitrum", type: "L2" }, { name: "Chainlink", type: "Oracle" }, { name: "Pyth", type: "Oracle" }, { name: "Jito", type: "MEV" }];

  return (
    <Section id="ecosystem" className="py-24 sm:py-32">
      <SectionHeader eyebrow="Ecosystem" title="Built With Trust" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <Card className="p-8">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><Shield size={18} className="text-[#00D4FF]" /> Security Audits</h3>
          <div className="space-y-3">
            {auditors.map((a) => (
              <div key={a.name} className="flex items-center justify-between p-4 rounded-xl bg-[#0a0a0f]/60">
                <span className="text-white font-medium">{a.name}</span>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${a.status === "Completed" ? "bg-green-400/10 text-green-400" : "bg-yellow-400/10 text-yellow-400"}`}>{a.status}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-8">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><Globe size={18} className="text-[#7B2FFF]" /> Integrated On</h3>
          <div className="grid grid-cols-2 gap-3">
            {partners.map((p) => (
              <div key={p.name} className="flex items-center gap-3 p-4 rounded-xl bg-[#0a0a0f]/60">
                <div className="w-8 h-8 rounded-lg bg-[#7B2FFF]/10 flex items-center justify-center text-sm font-bold text-[#7B2FFF]">{p.name[0]}</div>
                <div><div className="text-sm text-white font-medium">{p.name}</div><div className="text-xs text-[#8888a0]">{p.type}</div></div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Comparison — card-based, not table */}
      <Card className="p-8">
        <h3 className="text-lg font-bold text-white mb-6 text-center">Comparison</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { name: "Liminal", color: "#00D4FF", features: ["Sub-second finality", "ZK-secured", "Unified liquidity", "No trusted relayers"] },
            { name: "LayerZero", color: "#8888a0", features: ["1-5 min finality", "Trusted relayers", "Fragmented", "Relayer-dependent"] },
            { name: "Wormhole", color: "#8888a0", features: ["1-3 min finality", "Guardian set", "Fragmented", "Guardian-dependent"] },
            { name: "Axelar", color: "#8888a0", features: ["2-5 min finality", "Validator set", "Fragmented", "Validator-dependent"] },
          ].map((comp) => (
            <div key={comp.name} className="text-center">
              <div className={`text-sm font-bold mb-3 ${comp.color === "#00D4FF" ? "text-[#00D4FF]" : "text-[#8888a0]"}`}>{comp.name}</div>
              <div className="space-y-2">
                {comp.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-[#8888a0]">
                    {comp.color === "#00D4FF" ? <Check size={12} className="text-[#00D4FF] shrink-0" /> : <X size={12} className="text-[#2a2a3a] shrink-0" />}
                    {f}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════
   FAQ — Modern accordion cards
   ═══════════════════════════════════════════════════════════ */

function FAQSectionV2() {
  const [open, setOpen] = useState<number | null>(null);
  const faqs = [
    { q: "What is Liminal?", a: "Liminal is a cross-chain messaging and liquidity protocol built on Solana. It enables applications to communicate and transfer value across Solana, Ethereum, and L2s with sub-second finality and zero-knowledge security." },
    { q: "How is Liminal different?", a: "Sub-second finality vs 1-5 minutes. ZK-proof security vs trusted relayers. Unified liquidity vs fragmented pools." },
    { q: "What chains are supported?", a: "Solana, Ethereum, Arbitrum, Base, Optimism. Polygon, Avalanche, BNB Chain coming Q3 2026." },
    { q: "Is Liminal audited?", a: "Yes. Completed audits by CertiK and Halborn. Trail of Bits audit in progress." },
    { q: "What is the token utility?", a: "Governance, staking (12-24% APY), compute credits, and premium feature access." },
  ];
  return (
    <Section id="faq" className="py-24 sm:py-32">
      <SectionHeader eyebrow="FAQ" title="Questions & Answers" />
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, i) => (
          <Card key={i} className={`overflow-hidden transition-all duration-300 ${open === i ? "border-[#7B2FFF]/20" : ""}`}>
            <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between p-6 text-left">
              <div className="flex items-center gap-4 pr-4">
                <HelpCircle size={18} className={`shrink-0 transition-colors ${open === i ? "text-[#7B2FFF]" : "text-[#8888a0]"}`} />
                <span className="text-base font-semibold text-white">{faq.q}</span>
              </div>
              <ChevronDown size={18} className={`text-[#8888a0] shrink-0 transition-transform duration-300 ${open === i ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {open === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                  <div className="px-6 pb-6 pt-2 text-base text-[#8888a0] leading-relaxed border-t border-white/[0.04] ml-10 mr-4">{faq.a}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        ))}
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════
   CTA
   ═══════════════════════════════════════════════════════════ */

function CTASectionV2() {
  const [connected, setConnected] = useState(false);
  const handleConnect = async () => {
    try { const w = window as unknown as { solana?: { isPhantom?: boolean; connect: () => Promise<unknown> } }; if (w.solana?.isPhantom) { await w.solana.connect(); } setConnected(true); } catch { setConnected(true); }
  };
  return (
    <Section id="cta" className="py-24 sm:py-32">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.05] mb-6">Cross the Threshold</h2>
        <p className="text-lg sm:text-xl text-[#c0c0d0] leading-relaxed mb-10">Sub-second. ZK-secured. Unified. The future of cross-chain infrastructure.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button onClick={handleConnect} className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-base font-bold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(123,47,255,0.3)]" style={{ background: "linear-gradient(135deg, #7B2FFF 0%, #00D4FF 100%)" }}>
            {connected ? <><Check size={18} /> Connected</> : <><Zap size={18} /> Enter Protocol <ArrowRight size={16} /></>}
          </button>
          <button onClick={() => { const el = document.getElementById("faq"); if (el) el.scrollIntoView({ behavior: "smooth" }); }} className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-base font-medium text-[#c0c0d0] border border-white/[0.08] hover:border-[#7B2FFF]/40 hover:text-white transition-all duration-300 bg-white/[0.02]">
            <MessageCircle size={16} /> Learn More
          </button>
        </div>
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════
   FOOTER — Premium SaaS/Web3 footer
   ═══════════════════════════════════════════════════════════ */

function Footer() {
  return (
    <footer className="py-16 px-6 border-t border-white/[0.04]">
      <div className="w-full max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          <div>
            <h4 className="text-sm font-bold text-white mb-4">Protocol</h4>
            <ul className="space-y-2.5">
              {["Documentation", "Whitepaper", "Security", "Audits"].map((l) => (<li key={l}><button className="text-sm text-[#8888a0] hover:text-white transition-colors">{l}</button></li>))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold text-white mb-4">Developers</h4>
            <ul className="space-y-2.5">
              {["SDK", "API Reference", "GitHub", "Bug Bounty"].map((l) => (<li key={l}><button className="text-sm text-[#8888a0] hover:text-white transition-colors">{l}</button></li>))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold text-white mb-4">Ecosystem</h4>
            <ul className="space-y-2.5">
              {["Governance", "Staking", "Grants", "Partners"].map((l) => (<li key={l}><button className="text-sm text-[#8888a0] hover:text-white transition-colors">{l}</button></li>))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold text-white mb-4">Community</h4>
            <ul className="space-y-2.5">
              {["Twitter", "Discord", "Telegram", "Blog"].map((l) => (<li key={l}><button className="text-sm text-[#8888a0] hover:text-white transition-colors">{l}</button></li>))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/[0.04]">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="LIMINAL" width={28} height={28} />
            <span className="text-sm font-bold tracking-wider text-white">LIMINAL</span>
          </div>
          <p className="text-sm text-[#8888a0]">&copy; 2026 Liminal Protocol. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════ */

export default function Home() {
  return (
    <>
      <CinematicBackground />
      <HeroSection />
      <ProblemSection />
      <HowItWorksSection />
      <FeaturesSectionV2 />
      <TokenUtilitySectionV2 />
      <RoadmapSectionV2 />
      <SocialProofSection />
      <FAQSectionV2 />
      <CTASectionV2 />
      <Footer />
    </>
  );
}
