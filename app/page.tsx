import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { FeatureStrip } from "@/components/landing/FeatureStrip";
import { DeconstructedDemo } from "@/components/landing/DeconstructedDemo";
import { GallerySection } from "@/components/landing/GallerySection";
import { Footer } from "@/components/landing/Footer";

export default function LandingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "BezierForge",
    "description": "An open-source, browser-based tool for creating unique, algorithmically-generated SVG logos and graphics. Stop dragging pixels. Start forging parameters.",
    "url": "https://bezierforge.com",
    "applicationCategory": "DesignApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "80+ Generative Shape Types",
      "Real-Time Parameter Control",
      "Seeded Randomization",
      "Export to SVG & PNG",
      "Zero Backend Required",
      "Dark Mode Interface"
    ],
    "screenshot": "https://bezierforge.com/og-image.png",
    "softwareVersion": "0.1.0",
    "author": {
      "@type": "Organization",
      "name": "BezierForge Team"
    },
    "license": "https://opensource.org/licenses/MIT"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
    </>
  );
}
