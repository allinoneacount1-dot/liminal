"use client";

import { motion } from "framer-motion";
import { Shield, Zap, Eye, Layers, Globe, Lock } from "lucide-react";

const features = [
  {
    icon: Eye,
    title: "Invisible Infrastructure",
    description:
      "Liminal operates beneath the surface, providing the backbone for decentralized applications without drawing attention to itself.",
    gradient: "from-[var(--violet)] to-[var(--cyan)]",
  },
  {
    icon: Shield,
    title: "Military-Grade Security",
    description:
      "Multi-layered security architecture with formal verification, real-time threat detection, and automated response systems.",
    gradient: "from-[var(--cyan)] to-[var(--accent)]",
  },
  {
    icon: Zap,
    title: "Zero-Latency Execution",
    description:
      "Sub-millisecond transaction finality through optimized consensus mechanisms and parallel processing architecture.",
    gradient: "from-[var(--accent)] to-[var(--violet)]",
  },
  {
    icon: Layers,
    title: "Modular Architecture",
    description:
      "Composable building blocks that developers can assemble like LEGO to create powerful DeFi applications.",
    gradient: "from-[var(--violet)] to-[var(--accent)]",
  },
  {
    icon: Globe,
    title: "Cross-Chain Native",
    description:
      "Seamlessly bridges assets and data across Solana, Ethereum, and emerging L2 networks without friction.",
    gradient: "from-[var(--cyan)] to-[var(--violet)]",
  },
  {
    icon: Lock,
    title: "Privacy by Default",
    description:
      "Zero-knowledge proofs ensure transaction privacy while maintaining full auditability for compliance.",
    gradient: "from-[var(--accent)] to-[var(--cyan)]",
  },
];

export function FeaturesSection() {
  return (
    <section id="intelligence" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-sm font-medium tracking-widest text-[var(--cyan)] uppercase mb-4 block">
            Intelligence
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
            BUILT FOR THE{" "}
            <span className="bg-gradient-to-r from-[var(--violet)] to-[var(--cyan)] bg-clip-text text-transparent">
              FUTURE
            </span>
          </h2>
          <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto">
            Every component of Liminal is engineered for performance, security, and scalability.
            No compromises. No shortcuts.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group glass rounded-2xl p-8 hover:border-[var(--violet)]/30 transition-all duration-500 relative overflow-hidden"
            >
              {/* Hover glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:shadow-lg transition-shadow duration-300`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>

              <h3 className="text-xl font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-[var(--muted)] leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
