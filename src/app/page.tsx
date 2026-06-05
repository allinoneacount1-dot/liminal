import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { TokenUtilitySection } from "@/components/TokenUtilitySection";
import { RoadmapSection } from "@/components/RoadmapSection";
import { FAQSection } from "@/components/FAQSection";
import { CTASection } from "@/components/CTASection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <TokenUtilitySection />
      <RoadmapSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
