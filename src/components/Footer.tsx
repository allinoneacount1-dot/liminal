"use client";

import Link from "next/link";
import { ArrowUpRight, AtSign, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative py-16 px-6 border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--violet)] to-[var(--cyan)] flex items-center justify-center">
                <span className="text-white font-bold text-sm font-mono">L</span>
              </div>
              <span className="text-lg font-bold tracking-wider text-white">
                LIMINAL
              </span>
            </div>
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              The intelligence layer of Web3.
              Power hidden in silence.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-bold tracking-wider text-white mb-4">
              PROTOCOL
            </h4>
            <ul className="space-y-2">
              {["Documentation", "Whitepaper", "Security", "Audits"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-sm text-[var(--muted)] hover:text-white transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold tracking-wider text-white mb-4">
              ECOSYSTEM
            </h4>
            <ul className="space-y-2">
              {["Governance", "Staking", "Grants", "Partners"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-sm text-[var(--muted)] hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold tracking-wider text-white mb-4">
              COMMUNITY
            </h4>
            <div className="flex items-center gap-4">
              <Link
                href="#"
                className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:border-[var(--violet)]/30 transition-colors"
              >
                <AtSign className="w-5 h-5 text-[var(--muted)]" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:border-[var(--violet)]/30 transition-colors"
              >
                <MessageCircle className="w-5 h-5 text-[var(--muted)]" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:border-[var(--violet)]/30 transition-colors"
              >
                <ArrowUpRight className="w-5 h-5 text-[var(--muted)]" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[var(--muted)]">
            © 2026 Liminal Protocol. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="#"
              className="text-sm text-[var(--muted)] hover:text-white transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-sm text-[var(--muted)] hover:text-white transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
