"use client";

import { getShapeComponent } from "@/components/shapes/ShapeRegistry";
import { EditorConfig } from "@/store/use-store";
import Link from "next/link";

const GALLERY_SHAPES = [
    'radial', 'flower', 'concentric', 'spiral', 
    'polygon', 'wave', 'network', 'glitch', 
    'orbit', 'pyramid', 'maze', 'knot'
];

export function GallerySection() {
    return (
        <section className="py-24 bg-zinc-950">
            <div className="container mx-auto px-6 mb-12 text-center">
                <h2 className="text-3xl font-bold text-white font-display mb-4">The Wall of Entropy</h2>
                <p className="text-zinc-400">Forged by users in seconds. Infinite variations possible.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full">
                {GALLERY_SHAPES.map((shapeName, i) => {
                    const ShapeComponent = getShapeComponent(shapeName);
                    // Deterministic seed based on name
                    const seed = shapeName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
                    
                    const config: EditorConfig = {
                        primaryColor: ['#fb923c', '#ef4444', '#f59e0b', '#dc2626'][i % 4], // Orange/Red/Amber spectrum
                        secondaryColor: '#ffffff',
                        strokeWidth: 2,
                        scale: 1,
                        rotation: i * 15,
                        roundness: 50,
                        radius: 35,
                        count: 8 + (i % 5),
                        seed: seed,
                    };

                    return (
                        <Link 
                            key={shapeName} 
                            href={`/editor/${shapeName}`}
                            className="group relative aspect-square bg-zinc-900 border border-white/5 hover:border-orange-500/50 hover:z-10 hover:scale-105 transition-all duration-300 overflow-hidden"
                        >
                            <div className="absolute inset-0 flex items-center justify-center p-8">
                                <svg viewBox="0 0 100 100" className="w-full h-full opacity-80 group-hover:opacity-100 transition-opacity group-hover:drop-shadow-[0_0_20px_rgba(249,115,22,0.5)]">
                                    <ShapeComponent config={config} />
                                </svg>
                            </div>

                            <div className="absolute inset-0 bg-zinc-950/90 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-center p-4">
                                <span className="font-mono text-xs text-orange-300 uppercase tracking-wider mb-2">{shapeName}</span>
                                <div className="flex gap-2 text-[10px] font-mono text-zinc-500">
                                    <span>{config.primaryColor}</span>
                                    <span>•</span>
                                    <span>12ms</span>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
