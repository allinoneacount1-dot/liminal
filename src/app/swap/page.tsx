"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, Settings, Wallet, ChevronDown, RefreshCw, Zap, Check, X, AlertTriangle } from "lucide-react";
import { useWalletStore, useSwapStore, useNotificationStore } from "@/stores";

const ALL_TOKENS = [
  { symbol: "SOL", name: "Solana", balance: "124.50", price: 72 },
  { symbol: "LIMINAL", name: "Liminal", balance: "12,450", price: 0.25 },
  { symbol: "USDC", name: "USD Coin", balance: "1,250.00", price: 1 },
  { symbol: "ETH", name: "Ethereum", balance: "0.85", price: 1784 },
];

export default function SwapPage() {
  const { connected, connect } = useWalletStore();
  const { add } = useNotificationStore();
  const swap = useSwapStore();
  const [showFromTokens, setShowFromTokens] = useState(false);
  const [showToTokens, setShowToTokens] = useState(false);
  const [swapping, setSwapping] = useState(false);
  const [slippageOpen, setSlippageOpen] = useState(false);
  const [slippage, setSlippage] = useState(0.5);

  const fromToken = ALL_TOKENS.find(t => t.symbol === swap.fromToken) || ALL_TOKENS[0];
  const toToken = ALL_TOKENS.find(t => t.symbol === swap.toToken) || ALL_TOKENS[1];

  const handleSwap = async () => {
    if (!connected) { connect(); return; }
    if (!swap.fromAmount || parseFloat(swap.fromAmount) <= 0) {
      add({ type: "error", title: "Invalid Amount", message: "Please enter an amount to swap" });
      return;
    }
    if (parseFloat(swap.fromAmount) > parseFloat(fromToken.balance)) {
      add({ type: "error", title: "Insufficient Balance", message: `You only have ${fromToken.balance} ${fromToken.symbol}` });
      return;
    }
    setSwapping(true);
    await new Promise(r => setTimeout(r, 2000));
    setSwapping(false);
    add({ type: "success", title: "Swap Successful", message: `Swapped ${swap.fromAmount} ${swap.fromToken} → ${swap.toAmount} ${swap.toToken}` });
    swap.setFromAmount("");
  };

  const handleSwitchTokens = () => {
    const oldFrom = swap.fromToken;
    const oldTo = swap.toToken;
    swap.setFromToken(oldTo);
    swap.setToToken(oldFrom);
    const oldAmount = swap.fromAmount;
    swap.setFromAmount(swap.toAmount);
  };

  return (
    <div className="min-h-screen bg-[var(--void)] pt-24 pb-12 px-6">
      <div className="max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-black text-white">Swap</h1>
          <div className="flex items-center gap-2">
            <button onClick={() => setSlippageOpen(true)} className="glass p-2.5 rounded-xl text-[#6b6b80] hover:text-white transition-colors"><Settings size={18} /></button>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-6 relative">
          {/* From */}
          <div className="bg-[#111118] rounded-xl p-4 mb-2">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-[#6b6b80]">From</span>
              <button onClick={() => swap.setFromAmount(fromToken.balance)} className="text-sm text-[#00D4FF] hover:text-white transition-colors">Balance: {fromToken.balance}</button>
            </div>
            <div className="flex items-center gap-4">
              <input type="number" value={swap.fromAmount} onChange={(e) => swap.setFromAmount(e.target.value)} placeholder="0.00" className="flex-1 bg-transparent text-3xl font-bold text-white outline-none placeholder-[#1a1a24]" />
              <button onClick={() => setShowFromTokens(!showFromTokens)} className="flex items-center gap-2 bg-[#0a0a0f] rounded-xl px-4 py-2 hover:bg-[#1a1a24] transition-colors">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#7B2FFF] to-[#00D4FF] flex items-center justify-center"><span className="text-xs font-bold text-white">{fromToken.symbol.slice(0, 2)}</span></div>
                <span className="font-semibold text-white">{fromToken.symbol}</span>
                <ChevronDown size={16} className="text-[#6b6b80]" />
              </button>
            </div>
            {swap.fromAmount && <div className="text-sm text-[#6b6b80] mt-2">≈ ${(parseFloat(swap.fromAmount || "0") * fromToken.price).toFixed(2)}</div>}
          </div>

          <div className="flex justify-center -my-3 relative z-10">
            <button onClick={handleSwitchTokens} className="w-10 h-10 rounded-xl bg-[#7B2FFF] flex items-center justify-center hover:bg-[#6a1fe0] transition-colors shadow-lg">
              <ArrowDown size={18} className="text-white" />
            </button>
          </div>

          <div className="bg-[#111118] rounded-xl p-4 mt-2">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-[#6b6b80]">To</span>
              <span className="text-sm text-[#6b6b80]">Balance: {toToken.balance}</span>
            </div>
            <div className="flex items-center gap-4">
              <input type="number" value={swap.toAmount} onChange={(e) => swap.setToAmount(e.target.value)} placeholder="0.00" className="flex-1 bg-transparent text-3xl font-bold text-white outline-none placeholder-[#1a1a24]" />
              <button onClick={() => setShowToTokens(!showToTokens)} className="flex items-center gap-2 bg-[#0a0a0f] rounded-xl px-4 py-2 hover:bg-[#1a1a24] transition-colors">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#7B2FFF] flex items-center justify-center"><span className="text-xs font-bold text-white">{toToken.symbol.slice(0, 2)}</span></div>
                <span className="font-semibold text-white">{toToken.symbol}</span>
                <ChevronDown size={16} className="text-[#6b6b80]" />
              </button>
            </div>
            {swap.toAmount && <div className="text-sm text-[#6b6b80] mt-2">≈ ${(parseFloat(swap.toAmount || "0") * toToken.price).toFixed(2)}</div>}
          </div>

          {swap.fromAmount && swap.toAmount && (
            <div className="mt-4 p-3 rounded-xl bg-[#111118]/50 space-y-2">
              <div className="flex justify-between text-sm"><span className="text-[#6b6b80]">Rate</span><span className="text-white">1 {swap.fromToken} = {(parseFloat(swap.toAmount) / parseFloat(swap.fromAmount)).toFixed(4)} {swap.toToken}</span></div>
              <div className="flex justify-between text-sm"><span className="text-[#6b6b80]">Network Fee</span><span className="text-white">~0.000005 SOL</span></div>
              <div className="flex justify-between text-sm"><span className="text-[#6b6b80]">Slippage</span><span className="text-[#00D4FF]">{slippage}%</span></div>
            </div>
          )}

          <button
            onClick={handleSwap}
            disabled={swapping}
            className="w-full mt-6 btn-glow py-4 rounded-xl text-base font-bold text-white flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {!connected ? (<><Wallet size={18} /> Connect Wallet</>) : swapping ? (<><RefreshCw size={18} className="animate-spin" /> Swapping...</>) : (<><Zap size={18} /> Swap</>)}
          </button>
        </motion.div>

        {/* Token Selectors */}
        <AnimatePresence>
          {showFromTokens && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="glass rounded-2xl p-4 mt-4">
              <h3 className="text-sm font-bold text-white mb-3">Select Token</h3>
              <div className="space-y-2">
                {ALL_TOKENS.map((token) => (
                  <button key={token.symbol} onClick={() => { swap.setFromToken(token.symbol); setShowFromTokens(false); }} className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/[0.05] transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7B2FFF]/20 to-[#00D4FF]/20 flex items-center justify-center"><span className="text-xs font-bold text-white">{token.symbol.slice(0, 2)}</span></div>
                      <div className="text-left"><div className="font-semibold text-white">{token.symbol}</div><div className="text-xs text-[#6b6b80]">{token.name}</div></div>
                    </div>
                    <div className="text-right"><div className="font-semibold text-white">{token.balance}</div><div className="text-xs text-[#6b6b80]">${token.price}</div></div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
          {showToTokens && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="glass rounded-2xl p-4 mt-4">
              <h3 className="text-sm font-bold text-white mb-3">Select Token</h3>
              <div className="space-y-2">
                {ALL_TOKENS.map((token) => (
                  <button key={token.symbol} onClick={() => { swap.setToToken(token.symbol); setShowToTokens(false); }} className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/[0.05] transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7B2FFF]/20 to-[#00D4FF]/20 flex items-center justify-center"><span className="text-xs font-bold text-white">{token.symbol.slice(0, 2)}</span></div>
                      <div className="text-left"><div className="font-semibold text-white">{token.symbol}</div><div className="text-xs text-[#6b6b80]">{token.name}</div></div>
                    </div>
                    <div className="text-right"><div className="font-semibold text-white">{token.balance}</div><div className="text-xs text-[#6b6b80]">${token.price}</div></div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Slippage Modal */}
        <AnimatePresence>
          {slippageOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm" onClick={() => setSlippageOpen(false)}>
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="glass-strong rounded-2xl p-6 w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white">Slippage Tolerance</h3>
                  <button onClick={() => setSlippageOpen(false)} className="p-1 rounded-lg hover:bg-white/5"><X size={18} className="text-[#6b6b80]" /></button>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  {[0.1, 0.5, 1.0].map((s) => (
                    <button key={s} onClick={() => setSlippage(s)} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${slippage === s ? "bg-[#7B2FFF] text-white" : "bg-[#111118] text-[#6b6b80] hover:text-white"}`}>{s}%</button>
                  ))}
                </div>
                <input type="number" value={slippage} onChange={(e) => setSlippage(parseFloat(e.target.value) || 0)} className="w-full bg-[#111118] rounded-xl px-4 py-3 text-white outline-none text-center" placeholder="Custom %" />
                {slippage > 2 && <div className="flex items-center gap-2 mt-3 text-sm text-[#FF3366]"><AlertTriangle size="14" /> High slippage may result in unfavorable trades</div>}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
