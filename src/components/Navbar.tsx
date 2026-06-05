"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled ? "glass-strong py-3" : "py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/logo.svg"
              alt="LIMINAL"
              width={40}
              height={40}
              className="group-hover:drop-shadow-[0_0_8px_rgba(123,47,255,0.5)] transition-all duration-300"
            />
            <span className="text-xl font-bold tracking-wider text-white">
              LIMINAL
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium tracking-wider text-[var(--muted)] hover:text-white transition-colors duration-300 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-[var(--violet)] to-[var(--cyan)] group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="#access"
              className="btn-glow px-6 py-2.5 rounded-lg text-sm font-semibold text-white tracking-wide"
            >
              REQUEST ACCESS
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden text-white p-2"
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[var(--void)]/95 backdrop-blur-xl lg:hidden pt-24"
          >
            <div className="flex flex-col items-center gap-8 p-8">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="text-lg font-medium tracking-wider text-[var(--muted)] hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="#access"
                onClick={() => setIsMobileOpen(false)}
                className="btn-glow px-8 py-3 rounded-lg text-sm font-semibold text-white tracking-wide mt-4"
              >
                REQUEST ACCESS
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
