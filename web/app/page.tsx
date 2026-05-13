import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { SocialProofBar } from "@/components/sections/SocialProofBar";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { AboutJennieLee } from "@/components/sections/AboutJennieLee";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <SocialProofBar />
      <HowItWorks />
      <AboutJennieLee />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
