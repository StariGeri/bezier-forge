"use client";

import { useEffect, useState } from "react";
import { getShapeComponent } from "@/components/shapes/ShapeRegistry";
import { EditorConfig } from "@/store/use-store";
import { Slider } from "@/components/ui/slider";
import { motion } from "framer-motion";

export function HeroGenerator() {
  // Config state for the shape
  const [config, setConfig] = useState<EditorConfig>({
    primaryColor: "#f97316", // Orange-500
    secondaryColor: "#ef4444", // Red-500
    strokeWidth: 2,
    scale: 1,
    rotation: 0,
    roundness: 50,
    radius: 35,
    count: 12,
    seed: 1234,
  });

  const [complexity, setComplexity] = useState(50);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-morph effect
  useEffect(() => {
    const interval = setInterval(() => {
      setConfig((prev) => ({
        ...prev,
        seed: prev.seed + 1,
        rotation: (prev.rotation + 0.5) % 360,
      }));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Map complexity slider to multiple parameters
  useEffect(() => {
    setConfig((prev) => ({
      ...prev,
      count: Math.max(3, Math.floor(complexity / 4)), // 3 to 25
      roundness: complexity, // 0 to 100
      radius: 20 + (complexity / 100) * 20, // 20 to 40
    }));
  }, [complexity]);

  const ShapeComponent = getShapeComponent("flower"); // Using 'flower' as base

  if (!mounted) return null;

  return (
    <div className="relative w-full h-[500px] flex flex-col items-center justify-center">
      
      {/* 3D Floating Effect Container */}
      <motion.div 
        animate={{ 
            y: [0, -20, 0],
            rotateX: [0, 5, 0],
            rotateY: [0, 10, 0]
        }}
        transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut" 
        }}
        className="relative w-[400px] h-[400px] flex items-center justify-center"
        style={{ perspective: 1000 }}
      >
        <svg 
            viewBox="0 0 100 100" 
            className="w-full h-full drop-shadow-[0_0_50px_rgba(249,115,22,0.4)]"
        >
            <ShapeComponent config={config} />
        </svg>
      </motion.div>

      {/* Interactive Slider Overlay */}
      <div className="absolute bottom-10 w-64 bg-zinc-900/80 backdrop-blur border border-white/10 p-4 rounded-xl shadow-2xl">
        <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-mono text-orange-300 uppercase tracking-wider">Complexity</span>
            <span className="text-xs font-mono text-zinc-400">{complexity}%</span>
        </div>
        <Slider 
            value={[complexity]} 
            max={100} 
            step={1} 
            onValueChange={(vals) => setComplexity(vals[0])}
            className="cursor-pointer"
        />
      </div>
    </div>
  );
}
