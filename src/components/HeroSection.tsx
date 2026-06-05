"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Play, Zap, ChevronDown, Check, Copy, X, Wallet } from "lucide-react";

/* ─── WALLET HOOK ─── */
function useWallet() {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState("0");
  const connect = async () => {
    if (typeof window !== "undefined" && (window as unknown as { solana?: { isPhantom?: boolean } }).solana?.isPhantom) {
      try {
        const provider = (window as unknown as { solana: { connect: () => Promise<{ publicKey: { toString: () => string } }> } }).solana;
        const response = await provider.connect();
        setAddress(response.publicKey.toString());
        setBalance("124.50");
        setConnected(true);
      } catch { /* ignore */ }
    } else {
      setAddress("7a3F92dK8mNp4Qr5St6Uv7Wx8Yz9Ab0Cd1Ef2Gh3Ij4");
      setBalance("124.50");
      setConnected(true);
    }
  };
  const disconnect = () => { setConnected(false); setAddress(null); setBalance("0"); };
  return { connected, address, balance, connect, disconnect };
}

/* ─── PROTOCOL DIAGRAM ─── */
function ProtocolDiagram() {
  const chains = [
    { name: "Solana", x: 0, y: 50, color: "#9945FF" },
    { name: "Ethereum", x: 200, y: 0, color: "#627EEA" },
    { name: "Arbitrum", x: 200, y: 100, color: "#28A0F0" },
    { name: "Base", x: 100, y: 20, color: "#0052FF" },
    { name: "Optimism", x: 100, y: 80, color: "#FF0420" },
  ];

  return (
    <div className="relative w-full aspect-[4/3] max-w-[500px] mx-auto">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 120">
        {chains.map((chain, i) => (
          <line key={i} x1={chain.x} y1={chain.y + 10} x2="150" y2="60" stroke={chain.color} strokeWidth="0.5" opacity="0.3" />
        ))}
        <circle cx="150" cy="60" r="30" fill="url(#centerGlow)" opacity="0.15" />
        <defs>
          <radialGradient id="centerGlow">
            <stop offset="0%" stopColor="#7B2FFF" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
      </svg>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full flex items-center justify-center" style={{ background: "radial-gradient(circle, rgba(123,47,255,0.15) 0%, transparent 70%)", border: "1px solid rgba(123,47,255,0.3)" }}>
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#7B2FFF] to-[#00D4FF] flex items-center justify-center shadow-[0_0_30px_rgba(123,47,255,0.3)]">
          <span className="text-white font-black text-lg">L</span>
        </div>
      </div>
      {chains.map((chain) => (
        <div key={chain.name} className="absolute flex flex-col items-center gap-1" style={{ left: `${(chain.x / 300) * 100}%`, top: `${(chain.y / 120) * 100}%`, transform: "translate(-50%, -50%)" }}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: chain.color + "30", border: `1px solid ${chain.color}60` }}>
            {chain.name[0]}
          </div>
          <span className="text-[10px] text-[#8888a0] font-medium whitespace-nowrap">{chain.name}</span>
        </div>
      ))}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#0a0a0f]/80 border border-[#2a2a3a] text-[10px] text-[#00D4FF] font-medium">Sub-second finality</div>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#0a0a0f]/80 border border-[#2a2a3a] text-[10px] text-[#7B2FFF] font-medium">ZK-secured</div>
    </div>
  );
}

/* ─── WALLET MODAL ─── */
function WalletModal({ isOpen, onClose, wallet }: { isOpen: boolean; onClose: () => void; wallet: ReturnType<typeof useWallet> }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { if (wallet.address) { navigator.clipboard.writeText(wallet.address); setCopied(true); setTimeout(() => setCopied(false), 2000); } };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm" onClick={onClose}>
          <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="glass-strong rounded-3xl p-8 w-full max-w-md relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/5 text-[#6b6b80] hover:text-white transition-colors"><X size={18} /></button>
            <h3 className="text-2xl font-bold text-white mb-2">Connect Wallet</h3>
            <p className="text-[#8888a0] mb-8">Choose your preferred wallet to connect to Liminal.</p>
            {wallet.connected && wallet.address ? (
              <div className="space-y-4">
                <div className="bg-[#111118] rounded-xl p-4">
                  <div className="text-xs text-[#6b6b80] mb-2">Connected</div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-white text-sm">{wallet.address.slice(0, 8)}...{wallet.address.slice(-6)}</span>
                    <button onClick={handleCopy} className="p-1.5 rounded-lg hover:bg-white/5">{copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} className="text-[#6b6b80]" />}</button>
                  </div>
                </div>
                <button onClick={() => { wallet.disconnect(); onClose(); }} className="w-full py-3 rounded-xl border border-red-400/20 text-red-400 hover:bg-red-400/10 transition-colors text-sm font-medium">Disconnect</button>
              </div>
            ) : (
              <div className="space-y-3">
                {[{ name: "Phantom", icon: "👻" }, { name: "Solflare", icon: "☀️" }, { name: "Backpack", icon: "🎒" }, { name: "WalletConnect", icon: "🔗" }].map((w) => (
                  <button key={w.name} onClick={() => { wallet.connect(); onClose(); }} className="w-full flex items-center gap-4 p-4 rounded-xl bg-[#111118] hover:bg-[#1a1a24] transition-all group">
                    <span className="text-2xl">{w.icon}</span>
                    <div className="text-left"><div className="font-semibold text-white group-hover:text-[#00D4FF] transition-colors">{w.name}</div></div>
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

/* ─── HERO SECTION ─── */
export function HeroSection() {
  const wallet = useWallet();
  const [showWalletModal, setShowWalletModal] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const words = sectionRef.current.querySelectorAll(".word");
    if (typeof gsap !== "undefined") {
      gsap.fromTo(words, { opacity: 0, y: 80, rotateX: -80 }, { opacity: 1, y: 0, rotateX: 0, duration: 1.2, stagger: 0.1, ease: "power4.out", delay: 0.5 });
    }
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden pt-20 pb-12">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/50 via-transparent to-[#050505]" />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[150px] bg-[#7B2FFF]/[0.04]" />
        <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] rounded-full blur-[120px] bg-[#00D4FF]/[0.03]" />
      </div>

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#2a2a3a] bg-[#0a0a0f]/60 text-xs font-medium tracking-[0.15em] text-[#8888a0]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] animate-pulse" />
                CROSS-CHAIN INFRASTRUCTURE
              </span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6">
              <span className="word inline-block">Power</span>{" "}
              <span className="word inline-block">Hidden</span><br />
              <span className="word inline-block">in</span>{" "}
              <span className="word inline-block bg-gradient-to-r from-[#7B2FFF] to-[#00D4FF] bg-clip-text text-transparent">Silence</span>
            </h1>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }} className="mb-8">
              <p className="text-lg sm:text-xl text-[#b0b0c8] leading-relaxed mb-4">
                Liminal is a <span className="text-white font-semibold">cross-chain messaging and liquidity protocol</span> that enables applications to communicate and transfer value across Solana, Ethereum, and L2s.
              </p>
              <p className="text-base text-[#8888a0] leading-relaxed">
                Sub-second finality. Zero-knowledge security. Unified liquidity. One protocol.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.9 }} className="flex flex-wrap items-center gap-4 mb-10">
              <button onClick={() => setShowWalletModal(true)} className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-base font-bold text-white tracking-wide transition-all duration-300" style={{ background: "linear-gradient(135deg, #7B2FFF 0%, #00D4FF 100%)", boxShadow: "0 0 30px rgba(123,47,255,0.2)" }}>
                <span className="relative z-10 flex items-center gap-3"><Zap size={18} /> Enter Protocol <ArrowRight size={16} /></span>
                <span className="absolute inset-0 rounded-2xl bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
              </button>
              <button onClick={() => { const el = document.getElementById("how-it-works"); if (el) el.scrollIntoView({ behavior: "smooth" }); }} className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-base font-medium text-[#b0b0c8] border border-[#2a2a3a] hover:border-[#7B2FFF]/40 hover:text-white transition-all duration-300 bg-[#0a0a0f]/50 backdrop-blur-sm">
                <Play size={16} /> How It Works
              </button>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.2 }}>
              <div className="text-xs text-[#6b6b80] uppercase tracking-[0.15em] mb-3">Integrated On</div>
              <div className="flex flex-wrap items-center gap-4">
                {["Solana", "Ethereum", "Arbitrum", "Base", "Optimism"].map((chain) => (
                  <span key={chain} className="text-sm text-[#8888a0] hover:text-white transition-colors cursor-default font-medium">{chain}</span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Protocol Diagram */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.8 }} className="hidden lg:block">
            <ProtocolDiagram />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="flex flex-col items-center gap-2">
          <span className="text-[10px] tracking-[0.2em] text-[#6b6b80] uppercase">Scroll</span>
          <ChevronDown size={16} className="text-[#7B2FFF]" />
        </motion.div>
      </motion.div>

      <WalletModal isOpen={showWalletModal} onClose={() => setShowWalletModal(false)} wallet={wallet} />
    </section>
  );
}
