import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LIMINAL — Cross the Threshold",
  description: "Power Hidden in Silence. Cross-chain messaging and liquidity infrastructure.",
  keywords: ["LIMINAL", "Web3", "DeFi", "Solana", "Crypto", "Protocol"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[var(--void)] text-[var(--text)] antialiased font-sans overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
