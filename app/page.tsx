import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import WhyUsSection from "./components/WhyUsSection";
import StatsSection from "./components/StatsSection";
import ServicesSection from "./components/ServicesSection";
import TestimonialsSection from "./components/TestimonialsSection";
import FaqSection from "./components/FaqSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 selection:bg-green-500/30">
      <Navbar />
      <HeroSection />
      <WhyUsSection />
      <StatsSection />
      <ServicesSection />
      <TestimonialsSection />
      <FaqSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
