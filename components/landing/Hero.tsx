import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeroGenerator } from "./HeroGenerator";
import { GridBackground } from "./GridBackground";

export function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-80px)] flex flex-col items-center justify-center overflow-hidden border-b border-white/10">
      <GridBackground />
      
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center py-20 relative z-10">
        
        {/* Left Column: Copy */}
        <div className="space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-sm text-orange-300 font-mono mb-4">
                <span>&lt;GenerativeDesign /&gt;</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-white font-display">
                Computed <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">
                    Identity
                </span>
            </h1>

            <p className="max-w-xl text-lg text-zinc-400 font-light mx-auto lg:mx-0">
                Stop dragging pixels. Start forging parameters. 
                The generative logo engine for fast-moving startups.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <Link href="/editor/radial">
                    <Button size="lg" className="bg-gradient-to-r from-orange-600 to-red-600 text-white border-0 hover:opacity-90 w-full sm:w-auto">
                        Start Forging
                    </Button>
                </Link>
            </div>
        </div>

        {/* Right Column: Visual */}
        <div className="flex justify-center lg:justify-end">
            <HeroGenerator />
        </div>
      </div>
    </section>
  );
}
