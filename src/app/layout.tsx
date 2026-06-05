import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { NotificationContainer } from "@/components/NotificationToast";

export const metadata: Metadata = {
  title: "LIMINAL — Cross the Threshold",
  description: "Power Hidden in Silence. The intelligence layer of Web3.",
  keywords: ["LIMINAL", "Web3", "DeFi", "Solana", "Crypto", "Protocol"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[var(--void)] text-[var(--text)] antialiased font-sans overflow-x-hidden">
        <Navbar />
        <NotificationContainer />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
