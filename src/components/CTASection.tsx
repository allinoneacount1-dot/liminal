"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CTASection() {
  return (
    <section id="access" className="relative py-32 px-6">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--violet)]/5 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(123,47,255,0.1)_0%,transparent_60%)]" />

      <div className="max-w-4xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white mb-8 leading-tight">
            CROSS THE{" "}
            <span className="bg-gradient-to-r from-[var(--violet)] via-[var(--cyan)] to-[var(--violet)] bg-clip-text text-transparent">
              THRESHOLD
            </span>
          </h2>
          <p className="text-xl text-[var(--muted)] max-w-2xl mx-auto mb-12">
            The future of decentralized intelligence awaits.
            Request access to Liminal and become part of the invisible revolution.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#"
              className="group btn-glow px-10 py-5 rounded-xl text-lg font-bold text-white tracking-wide flex items-center gap-3"
            >
              REQUEST ACCESS
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <p className="mt-8 text-sm text-[var(--muted)]">
            Limited access. By invitation only.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
