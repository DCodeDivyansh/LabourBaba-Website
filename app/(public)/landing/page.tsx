import Navbar from "@/components/LandingPage/Navbar";
import Hero from "@/components/LandingPage/Hero";
import Features from "@/components/LandingPage/Features";
import HowItWorks from "@/components/LandingPage/HowItWorks";
import Footer from "@/components/LandingPage/Footer";
import BottomCTA from "@/components/LandingPage/BottomCTA";
import { getDemo } from "../../../lib/api/demo";
export default async function Home() {
  const demo = await getDemo();
  console.log(demo);
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#F8FAFC] pb-32">
      {/* Navigation */}
      <Navbar />

      {/* Hero */}
      <Hero />

      {/* Features */}
      <Features />

      {/* How It Works */}
      <HowItWorks />

      {/* Footer */}
      <Footer />

      {/* Sticky CTA */}
      <BottomCTA />
    </main>
  );
}
