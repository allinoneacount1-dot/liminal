"use client";
import { CinematicBackground } from "@/components/CinematicEffects";
import { HeroSection } from "@/components/HeroSection";
import { ProblemSection, HowItWorksSection, FeaturesSectionV2, TokenUtilitySectionV2, RoadmapSectionV2, SocialProofSection, FAQSectionV2, CTASectionV2, Footer } from "@/components/AllSections";

export default function Home() {
  return (
    <>
      <CinematicBackground />
      <HeroSection />
      <ProblemSection />
      <HowItWorksSection />
      <FeaturesSectionV2 />
      <TokenUtilitySectionV2 />
      <RoadmapSectionV2 />
      <SocialProofSection />
      <FAQSectionV2 />
      <CTASectionV2 />
      <Footer />
    </>
  );
}
