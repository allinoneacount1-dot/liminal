"use client";

import { motion } from "framer-motion";
import { Check, Clock, Rocket } from "lucide-react";

const roadmapPhases = [
  {
    phase: "Phase 0",
    title: "Genesis",
    status: "completed" as const,
    items: [
      "Core protocol architecture",
      "Smart contract development",
      "Security audit (3 firms)",
      "Testnet deployment",
    ],
  },
  {
    phase: "Phase 1",
    title: "Awakening",
    status: "active" as const,
    items: [
      "Mainnet beta launch",
      "Token generation event",
      "Initial DEX listing",
      "Staking protocol live",
      "Governance framework",
    ],
  },
  {
    phase: "Phase 2",
    title: "Expansion",
    status: "upcoming" as const,
    items: [
      "Cross-chain bridge deployment",
      "Developer SDK release",
      "Ecosystem fund activation",
      "Mobile application",
      "Enterprise partnerships",
    ],
  },
  {
    phase: "Phase 3",
    title: "Ascension",
    status: "upcoming" as const,
    items: [
      "DAO transition",
      "Advanced privacy features",
      "Institutional integration",
      "Global expansion",
      "Layer 2 scaling",
    ],
  },
];

export function RoadmapSection() {
  return (
    <section id="resources" className="relative py-32 px-6">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,212,255,0.04)_0%,transparent_60%)]" />

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-sm font-medium tracking-widest text-[var(--accent)] uppercase mb-4 block">
            Roadmap
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
            THE PATH{" "}
            <span className="bg-gradient-to-r from-[var(--accent)] to-[var(--violet)] bg-clip-text text-transparent">
              FORWARD
            </span>
          </h2>
          <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto">
            Every great protocol has a plan. Ours is built to last,
            designed to scale, and committed to decentralization.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roadmapPhases.map((phase, index) => (
            <motion.div
              key={phase.phase}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`glass rounded-2xl p-6 relative overflow-hidden ${
                phase.status === "active"
                  ? "border-[var(--cyan)]/30 glow-cyan"
                  : ""
              }`}
            >
              {/* Status indicator */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-bold tracking-widest text-[var(--muted)]">
                  {phase.phase}
                </span>
                {phase.status === "completed" && (
                  <span className="flex items-center gap-1 text-xs text-green-400">
                    <Check size={14} /> Done
                  </span>
                )}
                {phase.status === "active" && (
                  <span className="flex items-center gap-1 text-xs text-[var(--cyan)]">
                    <Rocket size={14} /> Live
                  </span>
                )}
                {phase.status === "upcoming" && (
                  <span className="flex items-center gap-1 text-xs text-[var(--muted)]">
                    <Clock size={14} /> Soon
                  </span>
                )}
              </div>

              <h3 className="text-2xl font-black text-white mb-6">
                {phase.title}
              </h3>

              <ul className="space-y-3">
                {phase.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-[var(--muted)]"
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                        phase.status === "completed"
                          ? "bg-green-400"
                          : phase.status === "active"
                          ? "bg-[var(--cyan)]"
                          : "bg-[var(--border)]"
                      }`}
                    />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Active phase glow */}
              {phase.status === "active" && (
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--cyan)]/5 to-transparent pointer-events-none" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
