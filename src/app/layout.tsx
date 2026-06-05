import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LIMINAL — Cross-Chain Messaging & Liquidity Protocol",
  description: "Power Hidden in Silence. Sub-second finality. Zero-knowledge security. Unified liquidity. One protocol for Solana, Ethereum, and L2s.",
  keywords: ["LIMINAL", "Web3", "DeFi", "Solana", "Crypto", "Protocol", "Cross-Chain", "ZK"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-[#050505] text-[#b0b0c8] antialiased">
        {children}
      </body>
    </html>
  );
}
