"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Wallet, LogOut, Copy, Check, ChevronDown, ExternalLink } from "lucide-react";
import { useWalletStore } from "@/stores";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [showWalletMenu, setShowWalletMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const { connected, address, balance, connect, disconnect } = useWalletStore();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleConnect = async () => {
    await connect();
  };

  const handleDisconnect = () => {
    disconnect();
    setShowWalletMenu(false);
  };

  const truncateAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled ? "glass-strong py-3" : "py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/logo.svg"
              alt="LIMINAL"
              width={40}
              height={40}
              className="group-hover:drop-shadow-[0_0_8px_rgba(123,47,255,0.5)] transition-all duration-300"
            />
            <span className="text-xl font-bold tracking-wider text-white">LIMINAL</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium tracking-wider text-[#6b6b80] hover:text-white transition-colors duration-300 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-[#7B2FFF] to-[#00D4FF] group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Wallet / CTA */}
          <div className="hidden lg:flex items-center gap-4">
            {connected && address ? (
              <div className="relative">
                <button
                  onClick={() => setShowWalletMenu(!showWalletMenu)}
                  className="glass px-4 py-2.5 rounded-xl flex items-center gap-3 hover:border-[#7B2FFF]/30 transition-all"
                >
                  <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_#4ade80]" />
                  <span className="text-sm font-mono text-white">{truncateAddress(address)}</span>
                  <span className="text-xs text-[#6b6b80]">{balance} SOL</span>
                  <ChevronDown size={14} className={cn("text-[#6b6b80] transition-transform", showWalletMenu && "rotate-180")} />
                </button>

                <AnimatePresence>
                  {showWalletMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className="absolute right-0 top-full mt-2 w-64 glass-strong rounded-xl p-4 shadow-2xl"
                    >
                      <div className="text-xs text-[#6b6b80] mb-2">Connected Wallet</div>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-sm font-mono text-white flex-1 truncate">{address}</span>
                        <button onClick={handleCopyAddress} className="p-1.5 rounded-lg hover:bg-white/5 transition-colors">
                          {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} className="text-[#6b6b80]" />}
                        </button>
                      </div>
                      <div className="text-lg font-bold text-white mb-4">{balance} SOL</div>
                      <div className="space-y-2">
                        <Link href="/dashboard" onClick={() => setShowWalletMenu(false)} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors text-sm text-[#6b6b80] hover:text-white">
                          <ExternalLink size={14} /> Dashboard
                        </Link>
                        <button onClick={handleDisconnect} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-500/10 transition-colors text-sm text-red-400">
                          <LogOut size={14} /> Disconnect
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button
                onClick={handleConnect}
                className="btn-glow px-6 py-2.5 rounded-xl text-sm font-semibold text-white tracking-wide flex items-center gap-2"
              >
                <Wallet size={16} />
                Connect Wallet
              </button>
            )}
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="lg:hidden text-white p-2">
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#050505]/95 backdrop-blur-xl lg:hidden pt-24"
          >
            <div className="flex flex-col items-center gap-8 p-8">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="text-lg font-medium tracking-wider text-[#6b6b80] hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-4 w-full max-w-xs">
                {connected && address ? (
                  <div className="space-y-3">
                    <div className="glass rounded-xl p-4 text-center">
                      <div className="text-sm font-mono text-white mb-1">{truncateAddress(address)}</div>
                      <div className="text-xs text-[#6b6b80]">{balance} SOL</div>
                    </div>
                    <Link href="/dashboard" onClick={() => setIsMobileOpen(false)} className="w-full btn-glow px-6 py-3 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2">
                      Dashboard
                    </Link>
                    <button onClick={handleDisconnect} className="w-full px-6 py-3 rounded-xl text-sm font-medium text-red-400 border border-red-400/20 hover:bg-red-400/10 transition-colors flex items-center justify-center gap-2">
                      <LogOut size={16} /> Disconnect
                    </button>
                  </div>
                ) : (
                  <button onClick={handleConnect} className="w-full btn-glow px-6 py-3 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2">
                    <Wallet size={16} /> Connect Wallet
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
