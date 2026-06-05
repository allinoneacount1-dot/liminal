"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { CinematicBackground, CinematicLoader, NoiseOverlay } from "@/components/CinematicEffects";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { TokenUtilitySection } from "@/components/TokenUtilitySection";
import { RoadmapSection } from "@/components/RoadmapSection";
import { FAQSection } from "@/components/FAQSection";
import { CTASection } from "@/components/CTASection";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <CinematicLoader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <>
          <CinematicBackground />
          <NoiseOverlay />
          <HeroSection />
          <FeaturesSection />
          <TokenUtilitySection />
          <RoadmapSection />
          <FAQSection />
          <CTASection />
        </>
      )}
    </>
  );
}
