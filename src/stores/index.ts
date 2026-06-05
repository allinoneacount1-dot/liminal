"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

// ─── WALLET STORE ───
interface WalletState {
  connected: boolean;
  address: string | null;
  balance: string;
  network: string;
  connect: () => Promise<void>;
  disconnect: () => void;
}

export const useWalletStore = create<WalletState>()(
  persist(
    (set) => ({
      connected: false,
      address: null,
      balance: "0",
      network: "Solana Mainnet",
      connect: async () => {
        if (typeof window !== "undefined" && (window as unknown as { solana?: { isPhantom?: boolean; connect: () => Promise<{ publicKey: { toString: () => string } }> } }).solana?.isPhantom) {
          try {
            const provider = (window as unknown as { solana: { connect: () => Promise<{ publicKey: { toString: () => string } }> } }).solana;
            const response = await provider.connect();
            const address = response.publicKey.toString();
            set({ connected: true, address, balance: "124.50" });
          } catch (err) {
            console.error("Wallet connection failed:", err);
          }
        } else {
          set({ connected: true, address: "7a3F92dK8mNp4Qr5St6Uv7Wx8Yz9Ab0Cd1Ef2Gh3Ij4", balance: "124.50" });
        }
      },
      disconnect: () => set({ connected: false, address: null, balance: "0" }),
    }),
    { name: "liminal-wallet" }
  )
);

// ─── SWAP STORE ───
interface SwapState {
  fromToken: string;
  toToken: string;
  fromAmount: string;
  toAmount: string;
  slippage: number;
  setFromToken: (t: string) => void;
  setToToken: (t: string) => void;
  setFromAmount: (a: string) => void;
  setToAmount: (a: string) => void;
  setSlippage: (s: number) => void;
  swap: () => void;
}

export const useSwapStore = create<SwapState>((set, get) => ({
  fromToken: "SOL",
  toToken: "LIMINAL",
  fromAmount: "",
  toAmount: "",
  slippage: 0.5,
  setFromToken: (t) => set({ fromToken: t }),
  setToToken: (t) => set({ toToken: t }),
  setFromAmount: (a) => {
    const prices: Record<string, number> = { SOL: 72, LIMINAL: 0.25, USDC: 1, ETH: 1784 };
    const fromPrice = prices[get().fromToken] || 1;
    const toPrice = prices[get().toToken] || 1;
    const toAmt = a ? ((parseFloat(a) * fromPrice) / toPrice).toFixed(6) : "";
    set({ fromAmount: a, toAmount: toAmt });
  },
  setToAmount: (a) => {
    const prices: Record<string, number> = { SOL: 72, LIMINAL: 0.25, USDC: 1, ETH: 1784 };
    const fromPrice = prices[get().fromToken] || 1;
    const toPrice = prices[get().toToken] || 1;
    const fromAmt = a ? ((parseFloat(a) * toPrice) / fromPrice).toFixed(6) : "";
    set({ toAmount: a, fromAmount: fromAmt });
  },
  setSlippage: (s) => set({ slippage: s }),
  swap: () => {
    const state = get();
    if (!state.fromAmount || parseFloat(state.fromAmount) <= 0) return;
    alert(`Swapping ${state.fromAmount} ${state.fromToken} → ${state.toAmount} ${state.toToken}`);
  },
}));

// ─── STAKE STORE ───
interface StakeState {
  amount: string;
  selectedPool: number;
  setAmount: (a: string) => void;
  setSelectedPool: (p: number) => void;
  stake: () => void;
  claim: (index: number) => void;
}

export const useStakeStore = create<StakeState>((set, get) => ({
  amount: "",
  selectedPool: 0,
  setAmount: (a) => set({ amount: a }),
  setSelectedPool: (p) => set({ selectedPool: p }),
  stake: () => {
    const state = get();
    if (!state.amount || parseFloat(state.amount) <= 0) return;
    alert(`Staking ${state.amount} LIMINAL in pool ${state.selectedPool}`);
    set({ amount: "" });
  },
  claim: (index) => {
    alert(`Claiming rewards from position ${index}`);
  },
}));

// ─── SEND STORE ───
interface SendState {
  recipient: string;
  amount: string;
  selectedToken: string;
  memo: string;
  setRecipient: (r: string) => void;
  setAmount: (a: string) => void;
  setSelectedToken: (t: string) => void;
  setMemo: (m: string) => void;
  send: () => boolean;
  errors: Record<string, string>;
  validate: () => boolean;
}

export const useSendStore = create<SendState>((set, get) => ({
  recipient: "",
  amount: "",
  selectedToken: "LIMINAL",
  memo: "",
  setRecipient: (r) => set({ recipient: r }),
  setAmount: (a) => set({ amount: a }),
  setSelectedToken: (t) => set({ selectedToken: t }),
  setMemo: (m) => set({ memo: m }),
  errors: {},
  validate: () => {
    const state = get();
    const errors: Record<string, string> = {};
    if (!state.recipient) errors.recipient = "Recipient address is required";
    else if (state.recipient.length < 32) errors.recipient = "Invalid address format";
    if (!state.amount) errors.amount = "Amount is required";
    else if (parseFloat(state.amount) <= 0) errors.amount = "Amount must be greater than 0";
    set({ errors });
    return Object.keys(errors).length === 0;
  },
  send: () => {
    const state = get();
    if (!state.validate()) return false;
    alert(`Sending ${state.amount} ${state.selectedToken} to ${state.recipient.slice(0, 8)}...${state.recipient.slice(-6)}`);
    set({ recipient: "", amount: "", memo: "" });
    return true;
  },
}));

// ─── NOTIFICATION STORE ───
interface Notification {
  id: string;
  type: "success" | "error" | "info" | "warning";
  title: string;
  message: string;
  timestamp: number;
}

interface NotificationState {
  notifications: Notification[];
  add: (n: Omit<Notification, "id" | "timestamp">) => void;
  remove: (id: string) => void;
  clear: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  add: (n) => {
    const id = Math.random().toString(36).slice(2);
    set((s) => ({ notifications: [...s.notifications, { ...n, id, timestamp: Date.now() }] }));
    setTimeout(() => {
      set((s) => ({ notifications: s.notifications.filter((x) => x.id !== id) }));
    }, 5000);
  },
  remove: (id) => set((s) => ({ notifications: s.notifications.filter((x) => x.id !== id) })),
  clear: () => set({ notifications: [] }),
}));

// ─── SETTINGS STORE ───
interface SettingsState {
  notifications: boolean;
  darkMode: boolean;
  sounds: boolean;
  privacy: boolean;
  language: string;
  setNotifications: (v: boolean) => void;
  setDarkMode: (v: boolean) => void;
  setSounds: (v: boolean) => void;
  setPrivacy: (v: boolean) => void;
  setLanguage: (v: string) => void;
  reset: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      notifications: true,
      darkMode: true,
      sounds: true,
      privacy: false,
      language: "en",
      setNotifications: (v) => set({ notifications: v }),
      setDarkMode: (v) => set({ darkMode: v }),
      setSounds: (v) => set({ sounds: v }),
      setPrivacy: (v) => set({ privacy: v }),
      setLanguage: (v) => set({ language: v }),
      reset: () => set({ notifications: true, darkMode: true, sounds: true, privacy: false, language: "en" }),
    }),
    { name: "liminal-settings" }
  )
);
