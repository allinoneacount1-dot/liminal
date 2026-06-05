"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, QrCode, Copy, Check, ArrowRight, Wallet } from "lucide-react";

const recentContacts = [
  { name: "Alice", address: "0x7a3...f92d", avatar: "A" },
  { name: "Bob", address: "0x8b2...e41c", avatar: "B" },
  { name: "Charlie", address: "0x9c1...d30b", avatar: "C" },
];

export default function SendPage() {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedToken, setSelectedToken] = useState("LIMINAL");
  const [copied, setCopied] = useState(false);

  const tokens = [
    { symbol: "LIMINAL", balance: "12,450" },
    { symbol: "SOL", balance: "124.50" },
    { symbol: "USDC", balance: "1,250.00" },
  ];

  return (
    <div className="min-h-screen bg-[var(--void)] pt-24 pb-12 px-6">
      <div className="max-w-lg mx-auto">
        <h1 className="text-3xl font-black text-white mb-2">Send</h1>
        <p className="text-[var(--muted)] mb-8">Transfer tokens to any wallet address</p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-6"
        >
          {/* Recipient */}
          <div className="mb-6">
            <label className="text-sm text-[var(--muted)] mb-2 block">Recipient</label>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Wallet address or ENS name"
                className="flex-1 bg-[var(--surface)] rounded-xl px-4 py-3 text-white outline-none placeholder-[var(--border)] focus:ring-1 focus:ring-[var(--violet)] transition-all"
              />
              <button className="glass p-3 rounded-xl text-[var(--muted)] hover:text-white transition-colors">
                <QrCode size={20} />
              </button>
            </div>
          </div>

          {/* Recent Contacts */}
          <div className="mb-6">
            <label className="text-sm text-[var(--muted)] mb-2 block">Recent</label>
            <div className="flex items-center gap-3">
              {recentContacts.map((contact) => (
                <button
                  key={contact.name}
                  onClick={() => setRecipient(contact.address)}
                  className="flex flex-col items-center gap-1 group"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--violet)]/20 to-[var(--cyan)]/20 flex items-center justify-center group-hover:from-[var(--violet)]/40 group-hover:to-[var(--cyan)]/40 transition-all">
                    <span className="text-sm font-bold text-white">{contact.avatar}</span>
                  </div>
                  <span className="text-xs text-[var(--muted)]">{contact.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Token & Amount */}
          <div className="mb-6">
            <label className="text-sm text-[var(--muted)] mb-2 block">Amount</label>
            <div className="bg-[var(--surface)] rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <select
                  value={selectedToken}
                  onChange={(e) => setSelectedToken(e.target.value)}
                  className="bg-[var(--deep)] rounded-lg px-3 py-1.5 text-sm text-white outline-none"
                >
                  {tokens.map((t) => (
                    <option key={t.symbol} value={t.symbol}>{t.symbol}</option>
                  ))}
                </select>
                <span className="text-sm text-[var(--muted)]">
                  Balance: {tokens.find(t => t.symbol === selectedToken)?.balance}
                </span>
              </div>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full bg-transparent text-3xl font-bold text-white outline-none placeholder-[var(--border)]"
              />
            </div>
          </div>

          {/* Summary */}
          {amount && recipient && (
            <div className="p-4 rounded-xl bg-[var(--surface)]/50 mb-6 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[var(--muted)]">You send</span>
                <span className="text-white">{amount} {selectedToken}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--muted)]">Network fee</span>
                <span className="text-white">~0.000005 SOL</span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t border-[var(--border)]">
                <span className="text-[var(--muted)]">Recipient gets</span>
                <span className="font-semibold text-white">{amount} {selectedToken}</span>
              </div>
            </div>
          )}

          <button className="w-full btn-glow py-4 rounded-xl text-base font-bold text-white flex items-center justify-center gap-2">
            <Send size={18} />
            Send {amount || "0"} {selectedToken}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
