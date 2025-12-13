import Link from "next/link";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
      <Link href="/" className="group flex items-center gap-1">
        <span className="font-mono font-bold text-xl text-white tracking-tighter">
          BezierForge
        </span>
        <span className="w-2 h-4 bg-orange-500 animate-pulse" />
      </Link>

      <div className="flex items-center gap-6">
        <Link 
          href="https://github.com/starigeri/bezier-forge" 
          target="_blank"
          className="text-zinc-400 hover:text-white transition-colors"
        >
          <Github className="w-5 h-5" />
        </Link>

        <Link href="/gallery">
            <Button 
            variant="default" 
            className="bg-white text-zinc-950 hover:bg-zinc-200 font-mono text-xs uppercase tracking-wider font-bold"
            >
            Open Editor
            </Button>
        </Link>
      </div>
    </nav>
  );
}
