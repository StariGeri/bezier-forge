"use client";

import Link from "next/link";
import { useState, useMemo, useEffect, useRef } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { SHAPE_CATEGORIES, getShapeComponent } from "@/components/shapes/ShapeRegistry";
import { EditorConfig } from "@/store/use-store";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, X } from "lucide-react";

// Deterministic random for preview consistency
const getPreviewConfig = (shapeName: string, index: number): EditorConfig => {
    const seed = shapeName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    // Warm spectrum: Orange, Red, Amber
    const colors = ['#fb923c', '#ef4444', '#f59e0b', '#dc2626', '#ea580c'];
    
    return {
        primaryColor: colors[index % colors.length],
        secondaryColor: "#ffffff", // White contrast
        strokeWidth: 2,
        scale: 1, 
        rotation: index * 15,
        roundness: 50,
        radius: 35,
        count: 8 + (index % 5),
        seed: seed,
    };
};

// Calculate total shapes
const totalShapes = SHAPE_CATEGORIES.reduce((acc, cat) => acc + cat.shapes.length, 0);

export default function GalleryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Filter logic
  const filteredCategories = useMemo(() => {
    const filtered = SHAPE_CATEGORIES.map(category => ({
      ...category,
      shapes: category.shapes.filter(shape => {
        const matchesSearch = shape.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategories.length === 0 || 
                                selectedCategories.includes(category.name);
        return matchesSearch && matchesCategory;
      })
    })).filter(cat => cat.shapes.length > 0);

    // Sort Production Ready to top
    return filtered.sort((a, b) => {
      if (a.name === 'Production Ready') return -1;
      if (b.name === 'Production Ready') return 1;
      return 0;
    });
  }, [searchQuery, selectedCategories]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Focus search on '/'
      if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      // Clear search on 'Escape'
      if (e.key === 'Escape') {
        if (document.activeElement === searchInputRef.current) {
          searchInputRef.current?.blur();
        } else {
            setSearchQuery('');
            setSelectedCategories([]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const filteredCount = filteredCategories.reduce((acc, cat) => acc + cat.shapes.length, 0);

  return (
    <div className="min-h-screen bg-zinc-950 font-sans selection:bg-orange-500/30">
      <div className="relative z-10 bg-zinc-950 mb-0 md:mb-[500px] shadow-2xl shadow-black min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1 container mx-auto px-6 py-20">
            <div className="text-center space-y-6 mb-16">
                <div className="inline-flex items-center rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-sm text-orange-300 font-mono">
                    <span>&lt;Collection /&gt;</span>
                </div>
                
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl text-white font-display">
                    The Forge <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-red-600">Archives</span>
                </h1>
                
                <p className="text-xl text-zinc-400 max-w-2xl mx-auto font-light">
                    Explore the infinite possibilities of parametric design. 
                    Every shape here is a starting point for your unique identity.
                </p>

                {/* Search and Filter Section */}
                <div className="max-w-xl mx-auto space-y-4 pt-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" />
                        <Input 
                            ref={searchInputRef}
                            type="text" 
                            placeholder="Search shapes... (Press '/')" 
                            className="bg-zinc-900/50 border-zinc-800 text-white pl-10 pr-10 focus-visible:ring-orange-500"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <button 
                                onClick={() => setSearchQuery('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>

                    {/* Category Pills */}
                    <div className="flex flex-wrap gap-2 justify-center">
                        <Badge 
                            variant={selectedCategories.length === 0 ? "default" : "outline"}
                            className={`cursor-pointer ${selectedCategories.length === 0 ? "bg-white text-zinc-950 hover:bg-zinc-200" : "text-zinc-400 border-zinc-800 hover:border-zinc-600"}`}
                            onClick={() => setSelectedCategories([])}
                        >
                            All
                        </Badge>
                        {SHAPE_CATEGORIES.map(cat => (
                            <Badge
                                key={cat.name}
                                variant={selectedCategories.includes(cat.name) ? "default" : "outline"}
                                className={`cursor-pointer ${selectedCategories.includes(cat.name) ? "bg-orange-600 hover:bg-orange-700 text-white border-transparent" : "text-zinc-400 border-zinc-800 hover:border-zinc-600"}`}
                                onClick={() => toggleCategory(cat.name)}
                            >
                                {cat.name}
                            </Badge>
                        ))}
                    </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-center gap-8 pt-4">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-white">{filteredCount}</div>
                        <div className="text-sm text-zinc-500 uppercase tracking-wider">Shapes Found</div>
                    </div>
                    <div className="w-px h-10 bg-zinc-800" />
                    <div className="text-center">
                        <div className="text-3xl font-bold text-white">{filteredCategories.length}</div>
                        <div className="text-sm text-zinc-500 uppercase tracking-wider">Categories</div>
                    </div>
                </div>
            </div>

            {/* Category Sections */}
            <div className="space-y-16">
                {filteredCategories.length === 0 ? (
                    <div className="text-center py-20 text-zinc-500">
                        <p className="text-lg">No shapes found matching your search.</p>
                        <button 
                            onClick={() => { setSearchQuery(''); setSelectedCategories([]); }}
                            className="mt-4 text-orange-400 hover:underline"
                        >
                            Clear filters
                        </button>
                    </div>
                ) : (
                    filteredCategories.map((category, categoryIndex) => (
                        <section key={category.name} className={category.name === 'Production Ready' ? 'mb-20' : ''}>
                            {/* Category Header */}
                            <div className="flex items-center gap-4 mb-6">
                                <h2 className={`text-2xl font-bold ${category.name === 'Production Ready' ? 'text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-red-500' : 'text-white'}`}>
                                    {category.name}
                                </h2>
                                <div className={`flex-1 h-px ${category.name === 'Production Ready' ? 'bg-gradient-to-r from-orange-500/50 to-transparent' : 'bg-zinc-800/50'}`} />
                                {category.name === 'Production Ready' && (
                                    <Badge variant="outline" className="border-orange-500/30 text-orange-400 bg-orange-500/10">
                                        PREMIUM
                                    </Badge>
                                )}
                                <span className="inline-flex items-center rounded-full bg-zinc-800 px-2.5 py-0.5 text-xs font-mono text-zinc-400">
                                    {category.shapes.length}
                                </span>
                            </div>

                            {/* Shapes Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                                {category.shapes.map((shape, shapeIndex) => {
                                    const ShapeComponent = getShapeComponent(shape);
                                    // Use stable index based on full list to keep colors consistent
                                    const originalCatIndex = SHAPE_CATEGORIES.findIndex(c => c.name === category.name);
                                    const globalIndex = originalCatIndex * 10 + shapeIndex; 
                                    const config = getPreviewConfig(shape, globalIndex);

                                    const isLogo = category.name === 'Production Ready';

                                    return (
                                        <Link key={shape} href={`/editor/${shape}`} className="group relative">
                                            <div className={`aspect-square bg-zinc-900 border ${isLogo ? 'border-orange-500/20 shadow-[0_0_20px_-5px_rgba(249,115,22,0.15)]' : 'border-white/5'} rounded-xl overflow-hidden group-hover:border-orange-500/50 transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_10px_40px_-10px_rgba(249,115,22,0.2)]`}>
                                                {/* Background Grid */}
                                                <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] bg-size-[16px_16px]" />
                                                
                                                <div className="absolute inset-0 flex items-center justify-center p-4">
                                                    <div className="w-full h-full transition-all duration-700 ease-in-out group-hover:scale-110">
                                                        <svg 
                                                            viewBox="0 0 100 100" 
                                                            className="w-full h-full drop-shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:drop-shadow-[0_0_25px_rgba(249,115,22,0.4)] transition-all duration-500"
                                                        >
                                                            <ShapeComponent config={config} />
                                                        </svg>
                                                    </div>
                                                </div>

                                                {/* Overlay Label */}
                                                <div className="absolute inset-x-0 bottom-0 p-3 bg-linear-to-t from-zinc-950 to-transparent pt-10 flex flex-col items-center justify-end opacity-60 group-hover:opacity-100 transition-opacity">
                                                    {isLogo && (
                                                        <span className="mb-1 text-[8px] font-bold text-orange-500 border border-orange-500/30 px-1.5 py-0.5 rounded-full bg-orange-500/10">
                                                            READY
                                                        </span>
                                                    )}
                                                    <span className="font-mono text-[10px] text-orange-200 uppercase tracking-wider font-bold">
                                                        {shape}
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </section>
                    ))
                )}
            </div>
        </main>
      </div>
      
      <div className="block md:fixed bottom-0 left-0 w-full md:h-[500px] z-0">
        <Footer />
      </div>
    </div>
  );
}
