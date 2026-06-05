"use client";

import { motion } from "framer-motion";
import { Coins, TrendingUp, Users, BarChart3 } from "lucide-react";

const tokenUtilities = [
  {
    icon: Coins,
    title: "Governance",
    description: "Vote on protocol upgrades, treasury allocations, and strategic direction.",
    percent: 25,
  },
  {
    icon: TrendingUp,
    title: "Staking Rewards",
    description: "Earn passive income by staking $LIMINAL to secure the network.",
    percent: 30,
  },
  {
    icon: Users,
    title: "Fee Reduction",
    description: "Hold $LIMINAL to receive up to 75% reduction on all protocol fees.",
    percent: 20,
  },
  {
    icon: BarChart3,
    title: "Revenue Share",
    description: "Pro-rata share of protocol revenue distributed to stakers quarterly.",
    percent: 25,
  },
];

export function TokenUtilitySection() {
  return (
    <section id="wealth" className="relative py-32 px-6">
      {/* Background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(123,47,255,0.06)_0%,transparent_60%)]" />

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-sm font-medium tracking-widest text-[var(--violet)] uppercase mb-4 block">
            Token Utility
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
            $LIMINAL{" "}
            <span className="bg-gradient-to-r from-[var(--cyan)] to-[var(--violet)] bg-clip-text text-transparent">
              TOKEN
            </span>
          </h2>
          <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto">
            More than a token — it&apos;s your key to the Liminal ecosystem.
            Stake, govern, earn, and access exclusive features.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tokenUtilities.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass rounded-2xl p-8 group hover:border-[var(--cyan)]/20 transition-all duration-500"
            >
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--violet)]/20 to-[var(--cyan)]/20 flex items-center justify-center shrink-0 group-hover:from-[var(--violet)]/30 group-hover:to-[var(--cyan)]/30 transition-all">
                  <item.icon className="w-7 h-7 text-[var(--cyan)]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                    <span className="text-2xl font-black text-[var(--cyan)]">
                      {item.percent}%
                    </span>
                  </div>
                  <p className="text-[var(--muted)] leading-relaxed mb-4">
                    {item.description}
                  </p>
                  {/* Progress bar */}
                  <div className="w-full h-1.5 bg-[var(--border)] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.percent}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                      className="h-full bg-gradient-to-r from-[var(--violet)] to-[var(--cyan)] rounded-full"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
