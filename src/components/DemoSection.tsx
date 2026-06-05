"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ScrollReveal } from "./CinematicEffects";

const terminalLines = [
  { text: "$ liminal bridge --from solana --to ethereum --amount 100", delay: 0 },
  { text: "→ Validating transaction...", delay: 0.8 },
  { text: "→ Generating ZK proof...", delay: 1.4 },
  { text: "→ Submitting to Liminal Core...", delay: 2.0 },
  { text: "✓ Cross-chain message sent in 0.8s", delay: 2.8, highlight: true },
  { text: "→ Waiting for finality...", delay: 3.4 },
  { text: "✓ Confirmed on Ethereum (block #19,847,203)", delay: 4.2, highlight: true },
  { text: "→ Updating unified liquidity pool...", delay: 4.8 },
  { text: "✓ Bridge complete. Gas: 0.002 SOL", delay: 5.4, highlight: true },
];

export function DemoSection() {
  const [visibleLines, setVisibleLines] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted.current) {
          hasStarted.current = true;
          terminalLines.forEach((line, i) => {
            setTimeout(() => setVisibleLines(i + 1), line.delay * 1000);
          });
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <span className="text-sm font-medium tracking-[0.3em] text-[#00D4FF] uppercase mb-6 block">Demo</span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 leading-[0.9]">
            SEE IT IN ACTION
          </h2>
          <p className="text-lg text-[#6b6b80] max-w-2xl mx-auto">
            Cross-chain bridging with sub-second finality and zero-knowledge security.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="glass rounded-2xl overflow-hidden max-w-3xl mx-auto">
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1a1a24] bg-[#0a0a0f]">
              <div className="w-3 h-3 rounded-full bg-[#FF3366]" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <span className="ml-3 text-xs text-[#6b6b80] font-mono">liminal-cli</span>
            </div>
            {/* Terminal body */}
            <div className="p-6 font-mono text-sm space-y-2 min-h-[280px]">
              {terminalLines.slice(0, visibleLines).map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`${line.highlight ? "text-[#00D4FF]" : "text-[#6b6b80]"}`}
                >
                  <span className={line.highlight ? "text-green-400" : "text-[#7B2FFF]"}>{line.highlight ? "✓" : "→"}</span>{" "}
                  {line.text}
                </motion.div>
              ))}
              {visibleLines < terminalLines.length && (
                <span className="inline-block w-2 h-4 bg-[#00D4FF] animate-pulse" />
              )}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
