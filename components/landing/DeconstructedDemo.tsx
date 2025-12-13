"use client";

import { useState } from "react";
import { getShapeComponent } from "@/components/shapes/ShapeRegistry";
import { EditorConfig } from "@/store/use-store";

const InteractiveValue = ({ 
  param, 
  value, 
  setHoveredParam
}: { 
  param: string, 
  value: string | number,
  setHoveredParam: (param: string | null) => void
}) => (
  <span 
    className="text-red-400 cursor-help border-b border-red-500/30 hover:bg-red-500/20 hover:border-red-500 transition-all px-1 rounded"
    onMouseEnter={() => setHoveredParam(param)}
    onMouseLeave={() => setHoveredParam(null)}
  >
    {value}
  </span>
);

const ShapeComponent = getShapeComponent("flower");

export function DeconstructedDemo() {
  const [hoveredParam, setHoveredParam] = useState<string | null>(null);
  
  const baseConfig: EditorConfig = {
    primaryColor: "#38bdf8", // Sky-400
    secondaryColor: "#fbbf24", // Amber-400
    strokeWidth: 2,
    scale: 1,
    rotation: 0,
    roundness: 50,
    radius: 30,
    count: 8,
    seed: 1234,
  };

  // Compute config based on hover state
  const config = { ...baseConfig };
  
  if (hoveredParam === "count") {
    config.count = 12; // Change count on hover
  } else if (hoveredParam === "roundness") {
    config.roundness = 100; // Max roundness
  } else if (hoveredParam === "tension") {
    // We don't have direct tension in EditorConfig, using radius as proxy or just visual
    config.radius = 45; 
  }

  return (
    <section className="py-24 bg-zinc-950 border-b border-white/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          
          {/* Visual Side */}
          <div className="flex-1 flex justify-center order-2 md:order-1">
            <div className="relative w-[400px] h-[400px] bg-zinc-900 rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:16px_16px]" />
                <div className={`transition-all duration-300 ${hoveredParam ? 'scale-110' : 'scale-100'}`}>
                    <svg viewBox="0 0 100 100" className="w-64 h-64 drop-shadow-[0_0_30px_rgba(56,189,248,0.3)]">
                        <ShapeComponent config={config} />
                    </svg>
                </div>
            </div>
          </div>

          {/* Code Side */}
          <div className="flex-1 order-1 md:order-2 space-y-6">
             <h2 className="text-3xl font-bold text-white font-display">
                Deconstructed Logic
             </h2>
             <p className="text-zinc-400">
                Hover over the parameters to see how the shape reacts in real-time. 
                Direct manipulation of the underlying math.
             </p>

             <div className="font-mono text-sm bg-[#1e1e1e] p-6 rounded-xl border border-white/10 shadow-2xl">
                <div className="text-zinc-500 mb-2">{'// config.json'}</div>
                <div className="text-blue-300">{'{'}</div>
                <div className="pl-4">
                    <span className="text-sky-300">&quot;shape&quot;</span>: <span className="text-green-300">&quot;spline-flower&quot;</span>,
                </div>
                <div className="pl-4">
                    <span className="text-sky-300">&quot;points&quot;</span>: <InteractiveValue param="count" value={12} setHoveredParam={setHoveredParam} />,
                </div>
                <div className="pl-4">
                    <span className="text-sky-300">&quot;tension&quot;</span>: <InteractiveValue param="roundness" value={0.5} setHoveredParam={setHoveredParam} />,
                </div>
                <div className="pl-4">
                    <span className="text-sky-300">&quot;bloom&quot;</span>: <InteractiveValue param="tension" value={30} setHoveredParam={setHoveredParam} />,
                </div>
                <div className="pl-4">
                    <span className="text-sky-300">&quot;seed&quot;</span>: <span className="text-green-300">&quot;bezier-v1&quot;</span>
                </div>
                <div className="text-blue-300">{'}'}</div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
