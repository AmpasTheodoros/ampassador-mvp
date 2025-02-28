import Hero from "../components/Hero";
import Features from "../components/Features";
import Pricing from "../components/Pricing";
import Problem from "../components/Problem";
import Solution from "../components/Solution";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import GetStarted from "../components/GetStarted";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <Problem />
      <Solution />
      <GetStarted />
      <Features />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
  </main>
  );
}