"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send as SendIcon, QrCode, Copy, Check, ArrowRight, Wallet, AlertCircle, X } from "lucide-react";
import { useWalletStore, useSendStore, useNotificationStore } from "@/stores";

const ALL_TOKENS = [
  { symbol: "LIMINAL", balance: "12,450" },
  { symbol: "SOL", balance: "124.50" },
  { symbol: "USDC", balance: "1,250.00" },
];

const recentContacts = [
  { name: "Alice", address: "7a3F92dK8mNp4Qr5St6Uv7Wx8Yz9Ab0Cd1Ef2Gh3Ij4", avatar: "A" },
  { name: "Bob", address: "8b2E41cD5mNq6Rs7Tu8Vw9Xy0Za1Bc2De3Fg4Hi5Jk6", avatar: "B" },
];

export default function SendPage() {
  const [sending, setSending] = useState(false);
  const [showContacts, setShowContacts] = useState(false);
  const { connected, connect } = useWalletStore();
  const send = useSendStore();
  const { add } = useNotificationStore();

  const selectedToken = ALL_TOKENS.find(t => t.symbol === send.selectedToken) || ALL_TOKENS[0];

  const handleSend = async () => {
    if (!connected) { connect(); return; }
    if (!send.validate()) return;
    setSending(true);
    await new Promise(r => setTimeout(r, 2000));
    setSending(false);
    add({ type: "success", title: "Transaction Sent", message: `Sent ${send.amount} ${send.selectedToken} to ${send.recipient.slice(0, 8)}...` });
    send.setRecipient("");
    send.setAmount("");
  };

  return (
    <div className="min-h-screen bg-[var(--void)] pt-24 pb-12 px-6">
      <div className="max-w-lg mx-auto">
        <h1 className="text-3xl font-black text-white mb-2">Send</h1>
        <p className="text-[#6b6b80] mb-8">Transfer tokens to any wallet address</p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-6">
          {/* Recipient */}
          <div className="mb-6">
            <label className="text-sm text-[#6b6b80] mb-2 block">Recipient</label>
            <div className="flex items-center gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={send.recipient}
                  onChange={(e) => send.setRecipient(e.target.value)}
                  placeholder="Wallet address or ENS name"
                  className={`w-full bg-[#111118] rounded-xl px-4 py-3 text-white outline-none placeholder-[#1a1a24] focus:ring-1 transition-all ${send.errors.recipient ? "ring-1 ring-[#FF3366] focus:ring-[#FF3366]" : "focus:ring-[#7B2FFF]"}`}
                />
                {send.errors.recipient && <div className="absolute -bottom-5 left-0 text-xs text-[#FF3366] flex items-center gap-1"><AlertCircle size={10} /> {send.errors.recipient}</div>}
              </div>
              <button onClick={() => setShowContacts(!showContacts)} className="glass p-3 rounded-xl text-[#6b6b80] hover:text-white transition-colors">
                <QrCode size={20} />
              </button>
            </div>
          </div>

          {/* Recent Contacts */}
          <AnimatePresence>
            {showContacts && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mb-6 overflow-hidden">
                <div className="text-sm text-[#6b6b80] mb-2">Recent Contacts</div>
                <div className="space-y-2">
                  {recentContacts.map((contact) => (
                    <button key={contact.name} onClick={() => { send.setRecipient(contact.address); setShowContacts(false); }} className="w-full flex items-center gap-3 p-3 rounded-xl bg-[#111118] hover:bg-[#1a1a24] transition-colors">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7B2FFF]/20 to-[#00D4FF]/20 flex items-center justify-center"><span className="text-sm font-bold text-white">{contact.avatar}</span></div>
                      <div className="text-left"><div className="font-semibold text-white">{contact.name}</div><div className="text-xs text-[#6b6b80] font-mono">{contact.address.slice(0, 8)}...{contact.address.slice(-6)}</div></div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Token & Amount */}
          <div className="mb-6">
            <label className="text-sm text-[#6b6b80] mb-2 block">Amount</label>
            <div className="bg-[#111118] rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <select value={send.selectedToken} onChange={(e) => send.setSelectedToken(e.target.value)} className="bg-[#0a0a0f] rounded-lg px-3 py-1.5 text-sm text-white outline-none">
                  {ALL_TOKENS.map((t) => (<option key={t.symbol} value={t.symbol}>{t.symbol}</option>))}
                </select>
                <button onClick={() => send.setAmount(selectedToken.balance)} className="text-sm text-[#00D4FF] hover:text-white transition-colors">Balance: {selectedToken.balance}</button>
              </div>
              <input type="number" value={send.amount} onChange={(e) => send.setAmount(e.target.value)} placeholder="0.00" className="w-full bg-transparent text-3xl font-bold text-white outline-none placeholder-[#1a1a24]" />
              {send.errors.amount && <div className="text-xs text-[#FF3366] flex items-center gap-1 mt-1"><AlertCircle size={10} /> {send.errors.amount}</div>}
            </div>
          </div>

          {/* Memo */}
          <div className="mb-6">
            <label className="text-sm text-[#6b6b80] mb-2 block">Memo (optional)</label>
            <input type="text" value={send.memo} onChange={(e) => send.setMemo(e.target.value)} placeholder="Add a note..." className="w-full bg-[#111118] rounded-xl px-4 py-3 text-white outline-none placeholder-[#1a1a24] focus:ring-1 focus:ring-[#7B2FFF] transition-all" />
          </div>

          {/* Summary */}
          {send.amount && send.recipient && (
            <div className="p-4 rounded-xl bg-[#111118]/50 mb-6 space-y-2">
              <div className="flex justify-between text-sm"><span className="text-[#6b6b80]">You send</span><span className="text-white">{send.amount} {send.selectedToken}</span></div>
              <div className="flex justify-between text-sm"><span className="text-[#6b6b80]">Network fee</span><span className="text-white">~0.000005 SOL</span></div>
              <div className="flex justify-between text-sm pt-2 border-t border-[#1a1a24]"><span className="text-[#6b6b80]">Recipient gets</span><span className="font-semibold text-white">{send.amount} {send.selectedToken}</span></div>
            </div>
          )}

          <button onClick={handleSend} disabled={sending} className="w-full btn-glow py-4 rounded-xl text-base font-bold text-white flex items-center justify-center gap-2 disabled:opacity-50">
            {!connected ? (<><Wallet size={18} /> Connect Wallet</>) : sending ? (<><SendIcon size={18} className="animate-pulse" /> Sending...</>) : (<><SendIcon size={18} /> Send {send.amount || "0"} {send.selectedToken}</>)}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
