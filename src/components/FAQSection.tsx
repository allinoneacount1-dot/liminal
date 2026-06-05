"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is Liminal?",
    answer:
      "Liminal is a decentralized intelligence layer built on Solana. It provides invisible infrastructure for DeFi applications, enabling zero-latency execution, cross-chain interoperability, and privacy-preserving transactions.",
  },
  {
    question: "How do I get $LIMINAL tokens?",
    answer:
      "$LIMINAL tokens can be acquired through our initial token generation event, or on supported decentralized exchanges after launch. Staking is available immediately upon acquisition.",
  },
  {
    question: "Is Liminal audited?",
    answer:
      "Yes. Liminal has undergone comprehensive security audits by three independent firms. All reports are publicly available in our documentation portal.",
  },
  {
    question: "What makes Liminal different from other protocols?",
    answer:
      "Liminal operates as invisible infrastructure — we don't compete with existing protocols, we empower them. Our modular architecture allows developers to integrate Liminal's capabilities without rebuilding their applications.",
  },
  {
    question: "How does governance work?",
    answer:
      "$LIMINAL holders can propose and vote on protocol changes through our on-chain governance system. Each token equals one vote, with quadratic voting to prevent plutocratic control.",
  },
  {
    question: "What is the total supply of $LIMINAL?",
    answer:
      "The total supply is 1 billion tokens, distributed across ecosystem development (30%), staking rewards (25%), treasury (20%), team (15% with 3-year vest), and community (10%).",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="infrastructure" className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-sm font-medium tracking-widest text-[var(--cyan)] uppercase mb-4 block">
            FAQ
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">
            QUESTIONS &{" "}
            <span className="bg-gradient-to-r from-[var(--violet)] to-[var(--cyan)] bg-clip-text text-transparent">
              ANSWERS
            </span>
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="glass rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.02] transition-colors"
              >
                <span className="text-lg font-semibold text-white pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-[var(--muted)] shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-[var(--muted)] leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
