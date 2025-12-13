import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { FeatureStrip } from "@/components/landing/FeatureStrip";
import { DeconstructedDemo } from "@/components/landing/DeconstructedDemo";
import { GallerySection } from "@/components/landing/GallerySection";
import { Footer } from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-950 font-sans">
      <div className="relative z-10 bg-zinc-950 mb-0 md:mb-[500px] shadow-2xl shadow-black">
      <Navbar />
      <main className="flex flex-col">
        <Hero />
        <FeatureStrip />
        <DeconstructedDemo />
        <GallerySection />
      </main>
      </div>
      
      <div className="block md:fixed bottom-0 left-0 w-full md:h-[500px] z-0">
      <Footer />
      </div>
    </div>
  );
}
