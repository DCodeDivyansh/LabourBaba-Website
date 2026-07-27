import Navbar from "@/features/LandingPage/Navbar";
import Hero from "@/features/LandingPage/Hero";
import Features from "@/features/LandingPage/Features";
import HowItWorks from "@/features/LandingPage/HowItWorks";
import Footer from "@/features/LandingPage/Footer";
import BottomCTA from "@/features/LandingPage/BottomCTA";
// import { getDemo } from "../../../lib/api/demo";
export default async function Home() {
  // await getDemo();
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
