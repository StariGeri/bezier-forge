"use client";

import { getShapeComponent } from "@/components/shapes/ShapeRegistry";
import { EditorConfig } from "@/store/use-store";
import Link from "next/link";

const GALLERY_SHAPES = [
    // Production Ready Logos (Row 1)
    'pinwheel', 'wavecurve', 'starframe', 'hexarrow',
    // Mix of Aesthetic Shapes (Row 2)
    'mandala', 'galaxy', 'infinity', 'crystal',
    // More Production Ready Logos (Row 3)
    'bolde', 'equalizer', 'pillstack', 'arcquad'
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
                    
                    // Curated color palette for each shape (aesthetic, vibrant)
                    const colorPalettes = [
                        // Row 1 - Production Logos (vibrant gradients)
                        { primary: '#f97316', secondary: '#fb923c' }, // Orange gradient - pinwheel
                        { primary: '#3b82f6', secondary: '#60a5fa' }, // Blue gradient - wavecurve
                        { primary: '#a855f7', secondary: '#c084fc' }, // Purple gradient - starframe
                        { primary: '#10b981', secondary: '#34d399' }, // Green gradient - hexarrow
                        // Row 2 - Aesthetic Shapes (cosmic, mystical gradients)
                        { primary: '#ec4899', secondary: '#f9a8d4' }, // Pink gradient - mandala
                        { primary: '#6366f1', secondary: '#818cf8' }, // Indigo gradient - galaxy
                        { primary: '#eab308', secondary: '#fbbf24' }, // Yellow gradient - infinity
                        { primary: '#06b6d4', secondary: '#22d3ee' }, // Cyan gradient - crystal
                        // Row 3 - More Production Logos (bold gradients)
                        { primary: '#ef4444', secondary: '#f87171' }, // Red gradient - bolde
                        { primary: '#14b8a6', secondary: '#2dd4bf' }, // Teal gradient - equalizer
                        { primary: '#8b5cf6', secondary: '#a78bfa' }, // Purple gradient - pillstack
                        { primary: '#f59e0b', secondary: '#fbbf24' }, // Amber gradient - arcquad
                    ];
                    
                    const config: EditorConfig = {
                        primaryColor: colorPalettes[i].primary,
                        secondaryColor: colorPalettes[i].secondary,
                        strokeWidth: 2,
                        scale: 1,
                        rotation: i * 12,
                        roundness: 50,
                        radius: 35,
                        count: 6 + (i % 4),
                        seed: seed + i * 100,
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
