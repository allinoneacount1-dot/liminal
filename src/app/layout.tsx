import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "LIMINAL — Cross the Threshold",
  description:
    "Power Hidden in Silence. The intelligence layer of Web3. Built for those who understand that the greatest power operates without spectacle.",
  keywords: ["LIMINAL", "Web3", "DeFi", "Solana", "Crypto", "Protocol"],
  openGraph: {
    title: "LIMINAL — Cross the Threshold",
    description: "Power Hidden in Silence. The intelligence layer of Web3.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[var(--void)] text-[var(--text)] antialiased font-sans">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
