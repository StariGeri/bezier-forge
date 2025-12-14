import Link from "next/link";
import { Star } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full h-full bg-zinc-950 flex flex-col justify-between py-12 px-6 overflow-hidden relative">
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-12 z-10">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
            <div className="flex flex-col gap-4">
                <h3 className="text-2xl font-bold text-white">
                    Loved this tool?
                </h3>
                <Link 
                    href="https://github.com/starigeri/bezier-forge" 
                    target="_blank"
                    className="group flex items-center gap-3 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all w-fit"
                >
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400/20 group-hover:scale-110 transition-transform" />
                    <span className="text-white font-medium">Star on GitHub</span>
                </Link>
            </div>

            <div className="flex flex-col gap-2 text-right">
                <p className="text-zinc-400">
                    Created by <Link href="https://staridev.hu" target="_blank" className="text-white hover:text-orange-400 transition-colors font-semibold">StariGeri</Link>
                </p>
            </div>
        </div>
      </div>

      <div className="relative w-full flex justify-center items-end mt-12 md:mt-0 select-none pointer-events-none opacity-20 md:opacity-40">
        <h1 className="text-[12vw] leading-none font-bold text-white tracking-tighter text-center translate-y-[10%]">
            BezierForge
        </h1>
      </div>
    </footer>
  );
}
