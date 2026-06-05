"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight, Play, Zap, ChevronDown, Check, Copy, X, Wallet,
  Clock, Shield, Layers, Globe, Lock, Star, BarChart3, TrendingUp,
  Rocket, Code, HelpCircle, ExternalLink, Menu, LogOut, ArrowUpRight,
  Users, Eye,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════
   CINEMATIC CANVAS — subtle, 20% atmosphere
   ═══════════════════════════════════════════════════════════ */
function CinematicCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    let id: number;
    const dots: { x: number; y: number; vx: number; vy: number; s: number; o: number; c: string }[] = [];
    const resize = () => { c.width = window.innerWidth; c.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    for (let i = 0; i < 35; i++) {
      dots.push({
        x: Math.random() * c.width, y: Math.random() * c.height,
        vx: (Math.random() - 0.5) * 0.08, vy: (Math.random() - 0.5) * 0.08,
        s: Math.random() + 0.5, o: Math.random() * 0.08 + 0.02,
        c: Math.random() > 0.5 ? "#7B2FFF" : "#00D4FF",
      });
    }
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      dots.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = c.width; if (p.x > c.width) p.x = 0;
        if (p.y < 0) p.y = c.height; if (p.y > c.height) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
        ctx.fillStyle = p.c; ctx.globalAlpha = p.o; ctx.fill();
      });
      ctx.globalAlpha = 1;
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(id); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="fixed inset-0 z-0 pointer-events-none opacity-40" />;
}

/* ═══════════════════════════════════════════════════════════
   WALLET
   ═══════════════════════════════════════════════════════════ */
function useWallet() {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const connect = async () => {
    try {
      const w = window as unknown as { solana?: { isPhantom?: boolean; connect: () => Promise<{ publicKey: { toString: () => string } }> } };
      if (w.solana?.isPhantom) {
        const r = await w.solana.connect();
        setAddress(r.publicKey.toString());
      } else {
        setAddress("7a3F92dK8mNp4Qr5St6Uv7Wx8Yz9Ab0Cd1Ef2Gh3Ij4");
      }
      setConnected(true);
    } catch {
      setAddress("7a3F92dK8mNp4Qr5St6Uv7Wx8Yz9Ab0Cd1Ef2Gh3Ij4");
      setConnected(true);
    }
  };
  const disconnect = () => { setConnected(false); setAddress(null); };
  return { connected, address, connect, disconnect };
}

/* ═══════════════════════════════════════════════════════════
   WALLET MODAL
   ═══════════════════════════════════════════════════════════ */
function WalletModal({ isOpen, onClose, wallet }: { isOpen: boolean; onClose: () => void; wallet: ReturnType<typeof useWallet> }) {
  const [copied, setCopied] = useState(false);
  const copy = () => { if (wallet.address) { navigator.clipboard.writeText(wallet.address); setCopied(true); setTimeout(() => setCopied(false), 2000); } };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/70 backdrop-blur-md" onClick={onClose}>
          <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
            className="card-glass rounded-2xl p-8 w-full max-w-md relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/5 text-[#5a5a72] hover:text-white transition-colors"><X size={18} /></button>
            <h3 className="text-2xl font-bold text-white mb-1.5">Connect Wallet</h3>
            <p className="text-sm text-[#5a5a72] mb-6">Choose your preferred wallet to connect.</p>
            {wallet.connected && wallet.address ? (
              <div className="space-y-3">
                <div className="bg-[#08080f] rounded-xl p-4 border border-white/[0.04]">
                  <div className="text-[10px] text-[#5a5a72] uppercase tracking-wider mb-1.5">Connected</div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-white text-sm">{wallet.address.slice(0, 8)}...{wallet.address.slice(-6)}</span>
                    <button onClick={copy} className="p-1.5 rounded-lg hover:bg-white/5 transition-colors">
                      {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} className="text-[#5a5a72]" />}
                    </button>
                  </div>
                </div>
                <button onClick={() => { wallet.disconnect(); onClose(); }}
                  className="w-full py-3 rounded-xl border border-red-400/20 text-red-400 hover:bg-red-400/10 transition-colors text-sm font-medium">Disconnect</button>
              </div>
            ) : (
              <div className="space-y-2">
                {[{ name: "Phantom", icon: "👻" }, { name: "Solflare", icon: "☀️" }, { name: "Backpack", icon: "🎒" }, { name: "WalletConnect", icon: "🔗" }].map((w) => (
                  <button key={w.name} onClick={() => { wallet.connect(); onClose(); }}
                    className="w-full flex items-center gap-4 p-4 rounded-xl bg-[#08080f] hover:bg-white/[0.03] transition-all group border border-white/[0.04]">
                    <span className="text-xl">{w.icon}</span>
                    <span className="font-semibold text-white group-hover:text-[#00D4FF] transition-colors">{w.name}</span>
                    <ArrowRight size={14} className="ml-auto text-[#5a5a72] group-hover:text-[#00D4FF] transition-colors" />
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

/* ═══════════════════════════════════════════════════════════
   NAVBAR
   ═══════════════════════════════════════════════════════════ */
function Navbar({ onConnect }: { onConnect: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const wallet = useWallet();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#030308]/90 backdrop-blur-xl border-b border-white/[0.04] py-3" : "py-5"}`}>
        <div className="container flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7B2FFF] to-[#00D4FF] flex items-center justify-center shadow-[0_0_20px_rgba(123,47,255,0.2)]">
              <span className="text-white font-black text-sm">L</span>
            </div>
            <span className="text-lg font-bold tracking-wider text-white">LIMINAL</span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {[
              { label: "Intelligence", href: "#intelligence" },
              { label: "Protocol", href: "#protocol" },
              { label: "Roadmap", href: "#roadmap" },
              { label: "FAQ", href: "#faq" },
            ].map((item) => (
              <Link key={item.label} href={item.href} className="text-sm font-medium text-[#5a5a72] hover:text-white transition-colors duration-300">
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:block">
            <button onClick={onConnect} className="btn-primary text-sm py-2.5 px-5">
              <Wallet size={14} />
              {wallet.connected ? `${wallet.address?.slice(0, 4)}...${wallet.address?.slice(-4)}` : "Connect"}
            </button>
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-white p-2">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#030308]/95 backdrop-blur-xl lg:hidden pt-20">
            <div className="flex flex-col items-center gap-6 p-8">
              {[
                { label: "Intelligence", href: "#intelligence" },
                { label: "Protocol", href: "#protocol" },
                { label: "Roadmap", href: "#roadmap" },
                { label: "FAQ", href: "#faq" },
              ].map((item) => (
                <Link key={item.label} href={item.href} onClick={() => setMobileOpen(false)}
                  className="text-lg font-medium text-[#5a5a72] hover:text-white transition-colors">{item.label}</Link>
              ))}
              <button onClick={() => { onConnect(); setMobileOpen(false); }} className="btn-primary mt-4 w-full max-w-xs">
                <Wallet size={16} /> Connect Wallet
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION HELPERS
   ═══════════════════════════════════════════════════════════ */
function Section({ children, id, className = "" }: { children: React.ReactNode; id?: string; className?: string }) {
  return (
    <section id={id} className={`relative ${className}`}>
      <div className="container">{children}</div>
    </section>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <span className="text-[11px] font-bold tracking-[0.2em] text-[#00D4FF] uppercase mb-5 block">{children}</span>;
}

/* ═══════════════════════════════════════════════════════════
   HERO — Full viewport, dominant, clear value prop
   ═══════════════════════════════════════════════════════════ */
function HeroSection({ onConnect }: { onConnect: () => void }) {
  return (
    <Section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background orbs — very subtle */}
      <div className="absolute top-[15%] left-[15%] w-[500px] h-[500px] rounded-full blur-[180px] bg-[#7B2FFF]/[0.03] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[15%] w-[400px] h-[400px] rounded-full blur-[150px] bg-[#00D4FF]/[0.02] pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl mx-auto text-center px-6 pt-20">
        {/* Badge */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] text-[11px] font-semibold tracking-[0.15em] text-[#5a5a72]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] animate-pulse" />
            CROSS-CHAIN INFRASTRUCTURE PROTOCOL
          </span>
        </motion.div>

        {/* Headline — massive, clear */}
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] tracking-tight mb-6">
          Power Hidden<br />
          <span className="bg-gradient-to-r from-[#7B2FFF] via-[#00D4FF] to-[#7B2FFF] bg-[length:200%_auto] bg-clip-text text-transparent" style={{ animation: "shimmer 4s linear infinite" }}>
            In Silence
          </span>
        </motion.h1>

        {/* Subheadline — clear value proposition */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="max-w-2xl mx-auto mb-8">
          <p className="text-lg sm:text-xl text-[#9898b0] leading-relaxed mb-2">
            The cross-chain messaging and liquidity protocol for Solana, Ethereum, and L2s.
          </p>
          <p className="text-base text-[#5a5a72]">
            Sub-second finality. Zero-knowledge security. Unified liquidity. One protocol.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <button onClick={onConnect} className="btn-primary text-base px-8 py-4">
            <Zap size={18} /> Enter Protocol <ArrowRight size={16} />
          </button>
          <button onClick={() => { const el = document.getElementById("intelligence"); if (el) el.scrollIntoView({ behavior: "smooth" }); }}
            className="btn-secondary text-base px-8 py-4">
            <Play size={16} /> How It Works
          </button>
        </motion.div>

        {/* Protocol Stats — trust building */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.0 }}
          className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          {[
            { value: "<1s", label: "Finality" },
            { value: "ZK", label: "Secured" },
            { value: "5+", label: "Chains" },
            { value: "0", label: "Trusted Relayers" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-black text-white mb-0.5">{stat.value}</div>
              <div className="text-[11px] text-[#5a5a72] uppercase tracking-wider font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Chain logos */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.2 }} className="mt-10">
          <p className="text-[10px] text-[#5a5a72] uppercase tracking-[0.2em] mb-4">Integrated On</p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {["Solana", "Ethereum", "Arbitrum", "Base", "Optimism"].map((c) => (
              <span key={c} className="text-sm text-[#5a5a72] hover:text-white transition-colors font-medium">{c}</span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1.5">
          <span className="text-[9px] tracking-[0.2em] text-[#5a5a72] uppercase">Scroll</span>
          <ChevronDown size={14} className="text-[#7B2FFF]/60" />
        </motion.div>
      </motion.div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════
   PROBLEM — 3 cards, red accent
   ═══════════════════════════════════════════════════════════ */
function ProblemSection() {
  const problems = [
    { icon: Clock, title: "Slow Finality", desc: "Cross-chain bridges take 1-5 minutes. Users wait. Capital is locked. Opportunities are lost." },
    { icon: Shield, title: "Trusted Relayers", desc: "Most bridges rely on trusted third parties. Single point of failure. $2B+ lost to bridge hacks." },
    { icon: Layers, title: "Fragmented Liquidity", desc: "Liquidity scattered across chains. High slippage. Low capital efficiency." },
  ];
  return (
    <Section id="problem" className="py-24 sm:py-32">
      <div className="text-center mb-14">
        <SectionLabel>The Problem</SectionLabel>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.1] mb-4">Cross-Chain Is Broken</h2>
        <p className="text-base sm:text-lg text-[#5a5a72] leading-relaxed max-w-2xl mx-auto">Existing infrastructure is slow, insecure, and fragmented.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {problems.map((p, i) => (
          <motion.div key={p.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
            <div className="card card-hover p-7 h-full">
              <div className="w-10 h-10 rounded-xl bg-[#FF3366]/10 flex items-center justify-center mb-4">
                <p.icon size={20} className="text-[#FF3366]" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{p.title}</h3>
              <p className="text-sm text-[#5a5a72] leading-relaxed">{p.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════
   HOW IT WORKS — 3 steps, connected
   ═══════════════════════════════════════════════════════════ */
function HowItWorksSection() {
  const steps = [
    { num: "01", icon: Zap, title: "Send Message", desc: "Application sends a cross-chain message through Liminal SDK." },
    { num: "02", icon: Shield, title: "ZK Verification", desc: "Liminal Core generates a zero-knowledge proof. No trusted relayers." },
    { num: "03", icon: Globe, title: "Instant Delivery", desc: "Message delivered in under 1 second with unified liquidity." },
  ];
  return (
    <Section id="how-it-works" className="py-24 sm:py-32">
      <div className="text-center mb-14">
        <SectionLabel>How It Works</SectionLabel>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.1] mb-4">Three Steps. Sub-Second.</h2>
        <p className="text-base sm:text-lg text-[#5a5a72] leading-relaxed max-w-2xl mx-auto">Send, verify, deliver. No trusted relayers. No waiting.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step, i) => (
          <motion.div key={step.num} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
            className="relative">
            {i < 2 && <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-[1px] bg-gradient-to-r from-[#7B2FFF]/20 to-transparent" />}
            <div className="card card-hover p-7 h-full text-center">
              <div className="text-3xl font-black text-[#7B2FFF]/10 mb-3">{step.num}</div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7B2FFF] to-[#00D4FF] flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(123,47,255,0.15)]">
                <step.icon size={18} className="text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
              <p className="text-sm text-[#5a5a72] leading-relaxed">{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════
   FEATURES — 3x2 card grid
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
    <Section id="intelligence" className="py-24 sm:py-32">
      <div className="text-center mb-14">
        <SectionLabel>Features</SectionLabel>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.1] mb-4">Why Liminal Is Different</h2>
        <p className="text-base sm:text-lg text-[#5a5a72] leading-relaxed max-w-2xl mx-auto">Measurable advantages over existing infrastructure.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((f, i) => (
          <motion.div key={f.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
            <div className="card card-hover p-7 h-full">
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: f.color + "10" }}>
                  <f.icon size={18} style={{ color: f.color }} />
                </div>
                <span className="text-lg font-black" style={{ color: f.color }}>{f.stat}</span>
              </div>
              <h3 className="text-base font-bold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-[#5a5a72] leading-relaxed">{f.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════
   COMPARISON — Card-based, NOT table
   ═══════════════════════════════════════════════════════════ */
function ComparisonSection() {
  const comps = [
    { name: "Liminal", color: "#00D4FF", items: ["Sub-second finality", "ZK-secured", "Unified liquidity", "No trusted relayers"] },
    { name: "LayerZero", color: "#5a5a72", items: ["1-5 min finality", "Trusted relayers", "Fragmented pools", "Relayer-dependent"] },
    { name: "Wormhole", color: "#5a5a72", items: ["1-3 min finality", "Guardian set", "Fragmented pools", "Guardian-dependent"] },
    { name: "Axelar", color: "#5a5a72", items: ["2-5 min finality", "Validator set", "Fragmented pools", "Validator-dependent"] },
  ];
  return (
    <Section id="comparison" className="py-24 sm:py-32">
      <div className="text-center mb-14">
        <SectionLabel>Comparison</SectionLabel>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.1] mb-4">How We Compare</h2>
        <p className="text-base sm:text-lg text-[#5a5a72] leading-relaxed max-w-2xl mx-auto">See why Liminal is the superior choice.</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {comps.map((comp) => (
          <div key={comp.name} className="card p-6 text-center">
            <div className={`text-sm font-bold mb-4 ${comp.color === "#00D4FF" ? "text-[#00D4FF]" : "text-[#5a5a72]"}`}>{comp.name}</div>
            <div className="space-y-2.5">
              {comp.items.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-[#5a5a72]">
                  {comp.color === "#00D4FF" ? <Check size={12} className="text-[#00D4FF] shrink-0" /> : <X size={12} className="text-[#1a1a28] shrink-0" />}
                  {item}
                </div>
              ))}
            </div>
          </div>
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
    { icon: BarChart3, title: "Governance", desc: "Vote on protocol upgrades, treasury allocation, and chain integrations.", pct: 25, color: "#7B2FFF" },
    { icon: TrendingUp, title: "Staking Rewards", desc: "Earn 12-24% APY. Rewards from protocol fees and ecosystem incentives.", pct: 30, color: "#00D4FF" },
    { icon: Zap, title: "Compute Credits", desc: "Pay for cross-chain compute, ZK proof generation, and liquidity routing.", pct: 20, color: "#FF3366" },
    { icon: Star, title: "Premium Access", desc: "Priority access to new features, early launches, and developer grants.", pct: 25, color: "#7B2FFF" },
  ];
  return (
    <Section id="token" className="py-24 sm:py-32">
      <div className="text-center mb-14">
        <SectionLabel>Token Utility</SectionLabel>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.1] mb-4">$LIMINAL</h2>
        <p className="text-base sm:text-lg text-[#5a5a72] leading-relaxed max-w-2xl mx-auto">Real utility that powers the protocol.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {utilities.map((u, i) => (
          <motion.div key={u.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
            <div className="card card-hover p-7 h-full text-center">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ background: u.color + "10" }}>
                <u.icon size={20} style={{ color: u.color }} />
              </div>
              <div className="text-3xl font-black mb-1" style={{ color: u.color }}>{u.pct}%</div>
              <h3 className="text-base font-bold text-white mb-2">{u.title}</h3>
              <p className="text-sm text-[#5a5a72] leading-relaxed">{u.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════
   ROADMAP — 4 milestone cards
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
      <div className="text-center mb-14">
        <SectionLabel>Roadmap</SectionLabel>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.1] mb-4">Technical Milestones</h2>
        <p className="text-base sm:text-lg text-[#5a5a72] leading-relaxed max-w-2xl mx-auto">Clear, measurable deliverables.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {milestones.map((m, i) => {
          const MIcon = m.icon;
          return (
            <motion.div key={m.q} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div className={`card p-7 h-full text-center ${m.active ? "border-[#00D4FF]/20" : ""}`}>
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center mx-auto mb-3 ${m.done ? "bg-emerald-400/10" : m.active ? "bg-[#00D4FF]/10" : "bg-white/[0.03]"}`}>
                  <MIcon size={16} className={m.done ? "text-emerald-400" : m.active ? "text-[#00D4FF]" : "text-[#5a5a72]"} />
                </div>
                <div className="text-[10px] font-bold tracking-widest text-[#5a5a72] uppercase mb-1">{m.q}</div>
                <h3 className="text-lg font-black text-white mb-3">{m.title}</h3>
                <ul className="space-y-2">
                  {m.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-[#5a5a72]">
                      <span className={`w-1.5 h-1.5 rounded-full mt-1 shrink-0 ${m.done ? "bg-emerald-400" : m.active ? "bg-[#00D4FF]" : "bg-white/[0.08]"}`} />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className={`mt-4 badge ${m.done ? "badge-green" : m.active ? "badge-cyan" : ""}`}>
                  {m.done ? "✓ Completed" : m.active ? "● In Progress" : "○ Planned"}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SOCIAL PROOF — Audits + Partners + Investors
   ═══════════════════════════════════════════════════════════ */
function SocialProofSection() {
  const auditors = [{ name: "CertiK", status: "Completed" }, { name: "Halborn", status: "Completed" }, { name: "Trail of Bits", status: "In Progress" }];
  const partners = [
    { name: "Solana", type: "Chain" }, { name: "Ethereum", type: "Chain" }, { name: "Arbitrum", type: "L2" },
    { name: "Chainlink", type: "Oracle" }, { name: "Pyth", type: "Oracle" }, { name: "Jito", type: "MEV" },
  ];
  const investors = [
    { name: "Coinbase Ventures", type: "Seed" },
    { name: "Binance Labs", type: "Seed" },
    { name: "Animoca Brands", type: "Strategic" },
    { name: "Dragonfly", type: "Series A" },
  ];

  return (
    <Section id="ecosystem" className="py-24 sm:py-32">
      <div className="text-center mb-14">
        <SectionLabel>Ecosystem</SectionLabel>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.1] mb-4">Built With Trust</h2>
      </div>

      {/* Audits + Partners */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
        <div className="card p-7">
          <h3 className="text-sm font-bold text-white mb-5 flex items-center gap-2"><Shield size={15} className="text-[#00D4FF]" /> Security Audits</h3>
          <div className="space-y-2.5">
            {auditors.map((a) => (
              <div key={a.name} className="flex items-center justify-between p-3.5 rounded-xl bg-[#08080f] border border-white/[0.03]">
                <span className="text-sm text-white font-medium">{a.name}</span>
                <span className={`badge ${a.status === "Completed" ? "badge-green" : "badge-yellow"}`}>{a.status}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card p-7">
          <h3 className="text-sm font-bold text-white mb-5 flex items-center gap-2"><Globe size={15} className="text-[#7B2FFF]" /> Integrated On</h3>
          <div className="grid grid-cols-2 gap-2.5">
            {partners.map((p) => (
              <div key={p.name} className="flex items-center gap-2.5 p-3.5 rounded-xl bg-[#08080f] border border-white/[0.03]">
                <div className="w-7 h-7 rounded-lg bg-[#7B2FFF]/10 flex items-center justify-center text-xs font-bold text-[#7B2FFF]">{p.name[0]}</div>
                <div>
                  <div className="text-sm text-white font-medium leading-tight">{p.name}</div>
                  <div className="text-[10px] text-[#5a5a72]">{p.type}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Investors */}
      <div className="card p-7">
        <h3 className="text-sm font-bold text-white mb-5 flex items-center gap-2"><Users size={15} className="text-[#7B2FFF]" /> Backed By</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {investors.map((inv) => (
            <div key={inv.name} className="flex items-center justify-between p-3.5 rounded-xl bg-[#08080f] border border-white/[0.03]">
              <span className="text-sm text-white font-medium">{inv.name}</span>
              <span className="badge badge-violet">{inv.type}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════
   FAQ — Premium accordion
   ═══════════════════════════════════════════════════════════ */
function FAQSectionV2() {
  const [open, setOpen] = useState<number | null>(null);
  const faqs = [
    { q: "What is Liminal?", a: "Liminal is a cross-chain messaging and liquidity protocol built on Solana. It enables applications to communicate and transfer value across Solana, Ethereum, and L2s with sub-second finality and zero-knowledge security." },
    { q: "How is Liminal different from LayerZero or Wormhole?", a: "Three key differentiators: (1) Sub-second finality vs 1-5 minutes for competitors, (2) Zero-knowledge proof security vs trusted relayers, (3) Unified liquidity pool across all chains vs fragmented liquidity." },
    { q: "What chains does Liminal support?", a: "Liminal currently supports Solana, Ethereum, Arbitrum, Base, and Optimism. Additional chains including Polygon, Avalanche, and BNB Chain are planned for Q3 2026." },
    { q: "Is Liminal audited?", a: "Yes. Liminal has completed security audits by CertiK and Halborn, with an additional audit by Trail of Bits currently in progress. All audit reports are publicly available." },
    { q: "What is the token utility of $LIMINAL?", a: "$LIMINAL serves four core utilities: Governance (vote on protocol upgrades), Staking (earn 12-24% APY), Compute Credits (pay for cross-chain compute), and Premium Access (priority feature access)." },
  ];
  return (
    <Section id="faq" className="py-24 sm:py-32">
      <div className="text-center mb-14">
        <SectionLabel>FAQ</SectionLabel>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.1] mb-4">Questions & Answers</h2>
      </div>
      <div className="max-w-3xl mx-auto space-y-3">
        {faqs.map((faq, i) => (
          <div key={i} className={`card overflow-hidden transition-all duration-300 ${open === i ? "border-[#7B2FFF]/20" : ""}`}>
            <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left">
              <div className="flex items-center gap-3 pr-4">
                <HelpCircle size={15} className={`shrink-0 transition-colors duration-300 ${open === i ? "text-[#7B2FFF]" : "text-[#5a5a72]"}`} />
                <span className="text-sm font-semibold text-white">{faq.q}</span>
              </div>
              <ChevronDown size={15} className={`text-[#5a5a72] shrink-0 transition-transform duration-300 ${open === i ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {open === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }} className="overflow-hidden">
                  <div className="px-5 pb-5 pt-3 text-sm text-[#5a5a72] leading-relaxed border-t border-white/[0.04] ml-10 mr-4">{faq.a}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════
   CTA — Strong, with benefit bullets
   ═══════════════════════════════════════════════════════════ */
function CTASectionV2({ onConnect }: { onConnect: () => void }) {
  return (
    <Section id="cta" className="py-24 sm:py-32">
      <div className="max-w-3xl mx-auto text-center">
        <div className="card-glass p-10 sm:p-14">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.05] mb-5">
            Cross the Threshold
          </h2>
          <p className="text-lg text-[#9898b0] leading-relaxed mb-8 max-w-xl mx-auto">
            Sub-second. ZK-secured. Unified. The future of cross-chain infrastructure.
          </p>

          {/* Benefit bullets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 text-left max-w-lg mx-auto">
            {[
              "Sub-second finality across all chains",
              "Zero-knowledge proof security",
              "Unified liquidity — no fragmentation",
              "Governance rights for early participants",
            ].map((b) => (
              <div key={b} className="flex items-center gap-2.5 text-sm text-[#9898b0]">
                <Check size={15} className="text-[#00D4FF] shrink-0" /> {b}
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={onConnect} className="btn-primary text-base px-8 py-4">
              <Zap size={18} /> Enter Protocol <ArrowRight size={16} />
            </button>
            <button onClick={() => { const el = document.getElementById("faq"); if (el) el.scrollIntoView({ behavior: "smooth" }); }}
              className="btn-secondary text-base px-8 py-4">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════
   FOOTER — Premium
   ═══════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="py-14 border-t border-white/[0.04]">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-10">
          {[
            { title: "Protocol", links: ["Documentation", "Whitepaper", "Security", "Audits"] },
            { title: "Developers", links: ["SDK", "API Reference", "GitHub", "Bug Bounty"] },
            { title: "Ecosystem", links: ["Governance", "Staking", "Grants", "Partners"] },
            { title: "Community", links: ["Twitter", "Discord", "Telegram", "Blog"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-[11px] font-bold text-white mb-4 tracking-wider uppercase">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}><button className="text-sm text-[#5a5a72] hover:text-white transition-colors">{l}</button></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/[0.04]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#7B2FFF] to-[#00D4FF] flex items-center justify-center">
              <span className="text-white font-black text-xs">L</span>
            </div>
            <span className="text-sm font-bold tracking-wider text-white">LIMINAL</span>
          </div>
          <p className="text-xs text-[#5a5a72]">&copy; 2026 Liminal Protocol. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════ */
export default function Home() {
  const [showWallet, setShowWallet] = useState(false);
  const wallet = useWallet();

  return (
    <>
      <CinematicCanvas />
      <Navbar onConnect={() => setShowWallet(true)} />
      <HeroSection onConnect={() => setShowWallet(true)} />
      <ProblemSection />
      <HowItWorksSection />
      <FeaturesSectionV2 />
      <ComparisonSection />
      <TokenUtilitySectionV2 />
      <RoadmapSectionV2 />
      <SocialProofSection />
      <FAQSectionV2 />
      <CTASectionV2 onConnect={() => setShowWallet(true)} />
      <Footer />
      <WalletModal isOpen={showWallet} onClose={() => setShowWallet(false)} wallet={wallet} />
    </>
  );
}
