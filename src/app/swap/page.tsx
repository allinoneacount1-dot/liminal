"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Settings, RefreshCw, Wallet, ChevronDown } from "lucide-react";

const tokens = [
  { symbol: "SOL", name: "Solana", balance: "124.50", price: "$72.00" },
  { symbol: "LIMINAL", name: "Liminal", balance: "12,450", price: "$0.25" },
  { symbol: "USDC", name: "USD Coin", balance: "1,250.00", price: "$1.00" },
  { symbol: "ETH", name: "Ethereum", balance: "0.85", price: "$1,784.00" },
];

export default function SwapPage() {
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [fromToken, setFromToken] = useState(tokens[0]);
  const [toToken, setToToken] = useState(tokens[1]);
  const [showFromTokens, setShowFromTokens] = useState(false);
  const [showToTokens, setShowToTokens] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--void)] pt-24 pb-12 px-6">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-black text-white">Swap</h1>
          <div className="flex items-center gap-2">
            <button className="glass p-2 rounded-lg text-[var(--muted)] hover:text-white transition-colors">
              <RefreshCw size={18} />
            </button>
            <button className="glass p-2 rounded-lg text-[var(--muted)] hover:text-white transition-colors">
              <Settings size={18} />
            </button>
          </div>
        </div>

        {/* Swap Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-6 relative"
        >
          {/* From */}
          <div className="bg-[var(--surface)] rounded-xl p-4 mb-2">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-[var(--muted)]">From</span>
              <span className="text-sm text-[var(--muted)]">
                Balance: {fromToken.balance} {fromToken.symbol}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="number"
                value={fromAmount}
                onChange={(e) => setFromAmount(e.target.value)}
                placeholder="0.00"
                className="flex-1 bg-transparent text-3xl font-bold text-white outline-none placeholder-[var(--border)]"
              />
              <button
                onClick={() => setShowFromTokens(!showFromTokens)}
                className="flex items-center gap-2 bg-[var(--deep)] rounded-xl px-4 py-2 hover:bg-[var(--border)] transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[var(--violet)] to-[var(--cyan)] flex items-center justify-center">
                  <span className="text-xs font-bold text-white">{fromToken.symbol.slice(0, 2)}</span>
                </div>
                <span className="font-semibold text-white">{fromToken.symbol}</span>
                <ChevronDown size={16} className="text-[var(--muted)]" />
              </button>
            </div>
            {fromAmount && (
              <div className="text-sm text-[var(--muted)] mt-2">
                ≈ ${(parseFloat(fromAmount || "0") * parseFloat(fromToken.price.replace("$", ""))).toFixed(2)}
              </div>
            )}
          </div>

          {/* Swap Button */}
          <div className="flex justify-center -my-3 relative z-10">
            <button
              onClick={() => {
                const temp = fromToken;
                setFromToken(toToken);
                setToToken(temp);
                setFromAmount(toAmount);
                setToAmount(fromAmount);
              }}
              className="w-10 h-10 rounded-xl bg-[var(--violet)] flex items-center justify-center hover:bg-[var(--violet)]/80 transition-colors shadow-lg"
            >
              <ArrowDown size={18} className="text-white" />
            </button>
          </div>

          {/* To */}
          <div className="bg-[var(--surface)] rounded-xl p-4 mt-2">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-[var(--muted)]">To</span>
              <span className="text-sm text-[var(--muted)]">
                Balance: {toToken.balance} {toToken.symbol}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="number"
                value={toAmount}
                onChange={(e) => setToAmount(e.target.value)}
                placeholder="0.00"
                className="flex-1 bg-transparent text-3xl font-bold text-white outline-none placeholder-[var(--border)]"
              />
              <button
                onClick={() => setShowToTokens(!showToTokens)}
                className="flex items-center gap-2 bg-[var(--deep)] rounded-xl px-4 py-2 hover:bg-[var(--border)] transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[var(--cyan)] to-[var(--violet)] flex items-center justify-center">
                  <span className="text-xs font-bold text-white">{toToken.symbol.slice(0, 2)}</span>
                </div>
                <span className="font-semibold text-white">{toToken.symbol}</span>
                <ChevronDown size={16} className="text-[var(--muted)]" />
              </button>
            </div>
            {toAmount && (
              <div className="text-sm text-[var(--muted)] mt-2">
                ≈ ${(parseFloat(toAmount || "0") * parseFloat(toToken.price.replace("$", ""))).toFixed(2)}
              </div>
            )}
          </div>

          {/* Rate Info */}
          {fromAmount && toAmount && (
            <div className="mt-4 p-3 rounded-xl bg-[var(--surface)]/50">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[var(--muted)]">Rate</span>
                <span className="text-white">
                  1 {fromToken.symbol} = {(parseFloat(toAmount) / parseFloat(fromAmount)).toFixed(4)} {toToken.symbol}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm mt-1">
                <span className="text-[var(--muted)]">Network Fee</span>
                <span className="text-white">~0.000005 SOL</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-1">
                <span className="text-[var(--muted)]">Slippage</span>
                <span className="text-[var(--cyan)]">0.5%</span>
              </div>
            </div>
          )}

          {/* CTA */}
          <button className="w-full mt-6 btn-glow py-4 rounded-xl text-base font-bold text-white flex items-center justify-center gap-2">
            <Wallet size={18} />
            Connect Wallet to Swap
          </button>
        </motion.div>

        {/* Token Selectors */}
        {showFromTokens && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl p-4 mt-4"
          >
            <h3 className="text-sm font-bold text-white mb-3">Select Token</h3>
            <div className="space-y-2">
              {tokens.map((token) => (
                <button
                  key={token.symbol}
                  onClick={() => {
                    setFromToken(token);
                    setShowFromTokens(false);
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/[0.05] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--violet)]/20 to-[var(--cyan)]/20 flex items-center justify-center">
                      <span className="text-xs font-bold text-white">{token.symbol.slice(0, 2)}</span>
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-white">{token.symbol}</div>
                      <div className="text-xs text-[var(--muted)]">{token.name}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-white">{token.balance}</div>
                    <div className="text-xs text-[var(--muted)]">{token.price}</div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
