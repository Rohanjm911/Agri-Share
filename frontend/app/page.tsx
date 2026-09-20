"use client";

import { useAuth } from "@/context/AuthContext";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { CTASection } from "@/components/home/CTASection";

export default function HomePage() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <HeroSection />
      <FeaturesSection />
      {!isAuthenticated && <HowItWorksSection />}
      <CTASection />
    </>
  );
}
