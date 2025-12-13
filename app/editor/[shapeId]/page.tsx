"use client";

import { useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { useEditorStore, ExportSize } from "@/store/use-store";
import { Canvas } from "@/components/editor-ui/Canvas";
import { ControlPanel } from "@/components/editor-ui/ControlPanel";
import { Button } from "@/components/ui/button";
import { Download, ArrowLeft, Copy, ChevronDown, Share2 } from "lucide-react";
import Link from "next/link";
import { 
  downloadSvg, 
  getSvgString, 
  copyTextToClipboard, 
} from "@/lib/download";
import { svgStringToJsx } from "@/lib/svg-to-jsx";
import { configToUrl } from "@/lib/url-state";
import { toast } from "@/lib/toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { useUrlSync } from "@/hooks/use-url-sync";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";
import { KeyboardShortcutsHelp } from "@/components/editor-ui/KeyboardShortcutsHelp";

const EXPORT_SIZES: { value: ExportSize; label: string }[] = [
  { value: 32, label: "32 × 32" },
  { value: 64, label: "64 × 64" },
  { value: 128, label: "128 × 128" },
  { value: 256, label: "256 × 256" },
  { value: 512, label: "512 × 512" },
  { value: 1024, label: "1024 × 1024" },
  { value: 2048, label: "2048 × 2048" },
  { value: 4096, label: "4096 × 4096" },
];

export default function EditorPage() {
  const params = useParams();
  const { setShape, exportSize, randomize, config } = useEditorStore();
  const svgRef = useRef<SVGSVGElement>(null);
  
  useUrlSync();

  useEffect(() => {
    if (params.shapeId) {
      setShape(params.shapeId as string);
    }
  }, [params.shapeId, setShape]);

  const handleDownloadSvg = (size: number) => {
      if (!svgRef.current) return;
      downloadSvg(svgRef.current, `logo-${params.shapeId}`, size);
      toast.success(`Downloaded ${size}×${size} SVG`);
  };

  const handleCopySvg = async () => {
    if (!svgRef.current) return;
    const source = getSvgString(svgRef.current, exportSize);
    try {
        await copyTextToClipboard(source);
        toast.success("SVG copied to clipboard!");
    } catch (e) {
        console.error(e);
        toast.error("Failed to copy SVG to clipboard.");
    }
  };

  const handleCopyJsx = async () => {
    if (!svgRef.current) return;
    const source = getSvgString(svgRef.current, exportSize);
    try {
        const jsx = svgStringToJsx(source);
        await copyTextToClipboard(jsx);
        toast.success("JSX copied to clipboard!");
    } catch (e) {
        console.error(e);
        toast.error("Failed to copy JSX to clipboard.");
    }
  };

  const handleShare = async () => {
    const url = configToUrl(window.location.href.split('?')[0], config);
    try {
      await copyTextToClipboard(url);
      toast.success("Link copied to clipboard!");
    } catch (e) {
      console.error(e);
      toast.error("Failed to copy link.");
    }
  };

  useKeyboardShortcuts({
    onDownload: () => handleDownloadSvg(exportSize),
    onCopy: handleCopySvg,
    onRandomize: randomize,
  });

  return (
    <div className="h-screen w-full flex flex-col bg-zinc-50">
      {/* Header */}
      <header className="h-16 border-b bg-white px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
            <Link href="/gallery" className="text-zinc-500 hover:text-zinc-900">
                <ArrowLeft size={20} />
            </Link>
            <h1 className="font-bold text-lg capitalize">{params.shapeId} Editor</h1>
            <KeyboardShortcutsHelp />
        </div>
        <div className="flex items-center gap-3">
            {/* Share Button */}
            <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="mr-2 h-4 w-4" />
                Share
            </Button>

            {/* Copy Dropdown */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                        <Copy className="mr-2 h-4 w-4" />
                        Copy
                        <ChevronDown className="ml-2 h-3 w-3 opacity-50" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={handleCopySvg}>
                        Copy SVG
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleCopyJsx}>
                        Copy JSX
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Download Dropdown */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                        <ChevronDown className="ml-2 h-3 w-3 opacity-50" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            Download SVG
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                             {EXPORT_SIZES.map((size) => (
                                <DropdownMenuItem key={size.value} onClick={() => handleDownloadSvg(size.value)}>
                                    {size.label}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuSubContent>
                    </DropdownMenuSub>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Canvas Area */}
        <div className="flex-1 p-8 bg-zinc-100 flex items-center justify-center relative">
            {/* Checkerboard background for transparency */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" 
                 style={{ 
                     backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', 
                     backgroundSize: '20px 20px' 
                 }} 
            />
            <Canvas ref={svgRef} />
        </div>

        {/* Sidebar */}
        <div className="w-80 border-l bg-white h-full overflow-hidden flex flex-col">
            <ControlPanel />
        </div>
      </div>
    </div>
  );
}
