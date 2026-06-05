"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, MessageCircle, ArrowRight } from "lucide-react";
import { ScrollReveal, GlowingOrb } from "./CinematicEffects";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "What is Liminal?",
    answer: "Liminal is a decentralized intelligence layer built on Solana. It provides invisible infrastructure for DeFi applications, enabling zero-latency execution, cross-chain interoperability, and privacy-preserving transactions.",
  },
  {
    question: "How do I get $LIMINAL tokens?",
    answer: "$LIMINAL tokens can be acquired through our initial token generation event, or on supported decentralized exchanges after launch. Staking is available immediately upon acquisition.",
  },
  {
    question: "Is Liminal audited?",
    answer: "Yes. Liminal has undergone comprehensive security audits by three independent firms including Trail of Bits and OpenZeppelin. All reports are publicly available in our documentation portal.",
  },
  {
    question: "What makes Liminal different from other protocols?",
    answer: "Liminal operates as invisible infrastructure — we don't compete with existing protocols, we empower them. Our modular architecture allows developers to integrate Liminal's capabilities without rebuilding their applications.",
  },
  {
    question: "How does governance work?",
    answer: "$LIMINAL holders can propose and vote on protocol changes through our on-chain governance system. Each token equals one vote, with quadratic voting to prevent plutocratic control.",
  },
  {
    question: "What is the total supply of $LIMINAL?",
    answer: "The total supply is 1 billion tokens, distributed across ecosystem development (30%), staking rewards (25%), treasury (20%), team (15% with 3-year vest), and community (10%).",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const items = sectionRef.current.querySelectorAll(".faq-item");
    items.forEach((item, i) => {
      gsap.fromTo(
        item,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: i * 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (sectionRef.current?.contains(t.trigger as Node)) t.kill();
      });
    };
  }, []);

  return (
    <section ref={sectionRef} id="infrastructure" className="relative py-40 px-6 overflow-hidden">
      <GlowingOrb color="#7B2FFF" size={400} className="absolute bottom-0 left-0 opacity-20" />

      <div className="max-w-4xl mx-auto relative">
        <ScrollReveal className="text-center mb-20">
          <span className="text-sm font-medium tracking-[0.3em] text-[#00D4FF] uppercase mb-6 block">
            FAQ
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-8 leading-[0.9]">
            QUESTIONS &{" "}
            <span className="bg-gradient-to-r from-[#7B2FFF] to-[#00D4FF] bg-clip-text text-transparent">
              ANSWERS
            </span>
          </h2>
        </ScrollReveal>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="faq-item glass rounded-2xl overflow-hidden group hover:border-[#7B2FFF]/20 transition-all duration-500"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 sm:p-8 text-left"
              >
                <span className="text-lg font-semibold text-white pr-4 group-hover:text-[#00D4FF] transition-colors duration-300">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="shrink-0"
                >
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
                    <div className="px-6 sm:px-8 pb-6 sm:pb-8 text-[#6b6b80] leading-relaxed border-t border-[#1a1a24] pt-6">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <ScrollReveal delay={0.3} className="text-center mt-16">
          <p className="text-[#6b6b80] mb-6">Still have questions?</p>
          <button className="glass px-8 py-4 rounded-xl text-sm font-medium text-white hover:border-[#7B2FFF]/30 transition-all duration-300 inline-flex items-center gap-3 group">
            <MessageCircle size={18} className="text-[#7B2FFF] group-hover:text-[#00D4FF] transition-colors" />
            Contact Support
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </ScrollReveal>
      </div>
    </section>
  );
}
