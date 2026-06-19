import { Footer } from "@/components/footer";
import { FeaturesSection } from "@/components/landing/sections/feature-section";
import { HeroSection } from "@/components/landing/sections/hero-section";
import { ContributorsSection } from "@/components/landing/sections/contributors-section";

export default function Home() {
  return (
    <div className="w-full max-w-6xl flex flex-col items-center justify-center p-4 md:px-8 lg:px-10 space-y-14">
      <HeroSection />
      <FeaturesSection />
      <ContributorsSection />
      <Footer />
    </div>
  );
}
