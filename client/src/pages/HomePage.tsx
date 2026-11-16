import { AboutSection } from "@/features/home/AboutSection";
import { BlogSection } from "@/features/home/BlogSection";
import { CoursesSection } from "@/features/home/CoursesSection";
import { CtaSection } from "@/features/home/CtaSection";
import { FeaturesSection } from "@/features/home/FeaturesSection";
import { HeroSection } from "@/features/home/HeroSection";
import { HowItWorksSection } from "@/features/home/HowItWorksSection";
import { TechStrip } from "@/features/home/TechStrip";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TechStrip />
      <FeaturesSection />
      <CoursesSection />
      <HowItWorksSection />
      <AboutSection />
      <BlogSection />
      <CtaSection />
    </>
  );
}
