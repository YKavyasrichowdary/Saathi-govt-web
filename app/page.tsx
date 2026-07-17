import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Dreams from "@/components/Dreams";
import How from "@/components/How";
import Features from "@/components/Features";
import Companion from "@/components/Companion";
import Transformation from "@/components/Transformation";
import Testimonials from "@/components/Testimonals";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <Dreams />
      <How />
      <Features />
      <Companion />
      <Transformation />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}