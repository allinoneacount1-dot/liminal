"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, MessageCircle, ArrowRight, HelpCircle } from "lucide-react";
import { ScrollReveal, GlowingOrb } from "./CinematicEffects";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "What is Liminal?",
    answer: "Liminal is a cross-chain messaging and liquidity infrastructure built on Solana. It enables applications to communicate and transfer value across Solana, Ethereum, and L2s — with sub-second finality and zero-knowledge security. Unlike traditional bridges, Liminal combines messaging, liquidity, and security into a single unified layer.",
  },
  {
    question: "How is Liminal different from LayerZero or Wormhole?",
    answer: "Liminal offers three key differentiators: (1) Sub-second finality vs 1-5 minutes for competitors, (2) Zero-knowledge proof security vs trusted relayers, (3) Unified liquidity pool across all chains vs fragmented liquidity. This means faster, safer, and cheaper cross-chain transactions.",
  },
  {
    question: "What chains does Liminal support?",
    answer: "Liminal currently supports Solana, Ethereum, Arbitrum, Base, and Optimism. Additional chains including Polygon, Avalanche, and BNB Chain are planned for Q3 2026.",
  },
  {
    question: "How do I get $LIMINAL tokens?",
    answer: "$LIMINAL tokens are available on major DEXs including Raydium (Solana) and Uniswap (Ethereum). You can also earn tokens through our staking program, liquidity provision, and community governance participation.",
  },
  {
    question: "Is Liminal audited?",
    answer: "Yes. Liminal has completed security audits by CertiK and Halborn, with an additional audit by Trail of Bits currently in progress. All audit reports are publicly available in our documentation.",
  },
  {
    question: "What is the token utility of $LIMINAL?",
    answer: "$LIMINAL serves three core utilities: (1) Governance — vote on protocol upgrades and treasury allocation, (2) Staking — secure the network and earn 12-24% APY, (3) Fee Reduction — up to 75% reduction on cross-chain fees based on holdings.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const items = sectionRef.current.querySelectorAll(".faq-item");
    items.forEach((item, i) => {
      gsap.fromTo(item, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.5, delay: i * 0.06, ease: "power2.out", scrollTrigger: { trigger: item, start: "top 90%", toggleActions: "play none none reverse" } });
    });
    return () => { ScrollTrigger.getAll().forEach((t) => { if (sectionRef.current?.contains(t.trigger as Node)) t.kill(); }); };
  }, []);

  return (
    <section ref={sectionRef} id="infrastructure" className="relative py-32 px-6 overflow-hidden">
      <GlowingOrb color="#7B2FFF" size={400} className="absolute bottom-0 left-0 opacity-15" />

      <div className="max-w-4xl mx-auto relative">
        <ScrollReveal className="text-center mb-16">
          <span className="text-sm font-medium tracking-[0.3em] text-[#00D4FF] uppercase mb-6 block">FAQ</span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 leading-[0.9]">
            QUESTIONS &<br />
            <span className="bg-gradient-to-r from-[#7B2FFF] to-[#00D4FF] bg-clip-text text-transparent">ANSWERS</span>
          </h2>
        </ScrollReveal>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item glass rounded-2xl overflow-hidden transition-all duration-500 ${
                openIndex === index ? "border-[#7B2FFF]/20 glow-violet" : "hover:border-[#1a1a24]"
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 sm:p-8 text-left"
              >
                <div className="flex items-center gap-4 pr-4">
                  <HelpCircle size={20} className={`shrink-0 transition-colors duration-300 ${openIndex === index ? "text-[#7B2FFF]" : "text-[#6b6b80]"}`} />
                  <span className="text-base sm:text-lg font-semibold text-white">{faq.question}</span>
                </div>
                <motion.div animate={{ rotate: openIndex === index ? 180 : 0 }} transition={{ duration: 0.3 }} className="shrink-0">
                  <ChevronDown className="w-5 h-5 text-[#6b6b80]" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-2 text-[#6b6b80] leading-relaxed border-t border-[#1a1a24] ml-12 sm:ml-14 mr-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <ScrollReveal delay={0.3} className="text-center mt-12">
          <p className="text-[#6b6b80] mb-4">Still have questions?</p>
          <button className="glass px-8 py-4 rounded-xl text-sm font-medium text-white hover:border-[#7B2FFF]/30 transition-all duration-300 inline-flex items-center gap-3 group">
            <MessageCircle size={18} className="text-[#7B2FFF]" />
            Join Community
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </ScrollReveal>
      </div>
    </section>
  );
}
