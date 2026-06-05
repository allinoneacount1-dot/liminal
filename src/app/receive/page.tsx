"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { QrCode, Copy, Check, Download, Share2 } from "lucide-react";

export default function ReceivePage() {
  const [copied, setCopied] = useState(false);
  const walletAddress = "7a3F92dK8mNp4Qr5St6Uv7Wx8Yz9Ab0Cd1Ef2Gh3Ij4";

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[var(--void)] pt-24 pb-12 px-6">
      <div className="max-w-lg mx-auto">
        <h1 className="text-3xl font-black text-white mb-2">Receive</h1>
        <p className="text-[var(--muted)] mb-8">Share your wallet address to receive tokens</p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-8 text-center"
        >
          {/* QR Code Placeholder */}
          <div className="w-48 h-48 mx-auto mb-6 rounded-2xl bg-white p-4 flex items-center justify-center">
            <div className="w-full h-full bg-[var(--void)] rounded-lg flex items-center justify-center">
              <QrCode size={80} className="text-[var(--cyan)]" />
            </div>
          </div>

          {/* Address */}
          <div className="mb-6">
            <div className="text-sm text-[var(--muted)] mb-2">Your Wallet Address</div>
            <div className="bg-[var(--surface)] rounded-xl p-4 flex items-center justify-between gap-3">
              <span className="text-sm font-mono text-white truncate">{walletAddress}</span>
              <button
                onClick={handleCopy}
                className="shrink-0 p-2 rounded-lg hover:bg-[var(--border)] transition-colors"
              >
                {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} className="text-[var(--muted)]" />}
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-center gap-4">
            <button className="glass px-6 py-3 rounded-xl text-sm text-[var(--muted)] hover:text-white transition-colors flex items-center gap-2">
              <Download size={16} /> Save QR
            </button>
            <button className="glass px-6 py-3 rounded-xl text-sm text-[var(--muted)] hover:text-white transition-colors flex items-center gap-2">
              <Share2 size={16} /> Share
            </button>
          </div>
        </motion.div>

        {/* Supported Tokens */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 glass rounded-2xl p-6"
        >
          <h3 className="text-lg font-bold text-white mb-4">Supported Tokens</h3>
          <div className="space-y-3">
            {[
              { symbol: "LIMINAL", name: "Liminal", network: "Solana" },
              { symbol: "SOL", name: "Solana", network: "Solana" },
              { symbol: "USDC", name: "USD Coin", network: "Solana" },
              { symbol: "ETH", name: "Ethereum", network: "Ethereum" },
            ].map((token) => (
              <div key={token.symbol} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--violet)]/20 to-[var(--cyan)]/20 flex items-center justify-center">
                    <span className="text-xs font-bold text-white">{token.symbol.slice(0, 2)}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-white">{token.symbol}</div>
                    <div className="text-xs text-[var(--muted)]">{token.name}</div>
                  </div>
                </div>
                <span className="text-xs text-[var(--muted)]">{token.network}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
