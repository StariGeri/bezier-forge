"use client";

import { useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { useEditorStore, ExportSize } from "@/store/use-store";
import { Canvas } from "@/components/editor-ui/Canvas";
import { ControlPanel } from "@/components/editor-ui/ControlPanel";
import { Button } from "@/components/ui/button";
import { Download, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { downloadSvg, downloadPng } from "@/lib/download";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const { setShape, exportSize, setExportSize } = useEditorStore();
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (params.shapeId) {
      setShape(params.shapeId as string);
    }
  }, [params.shapeId, setShape]);

  const handleDownload = (format: 'svg' | 'png') => {
      if (!svgRef.current) return;
      if (format === 'svg') {
          downloadSvg(svgRef.current, `logo-${params.shapeId}`, exportSize);
      } else {
          downloadPng(svgRef.current, `logo-${params.shapeId}`, exportSize);
      }
  };

  return (
    <div className="h-screen w-full flex flex-col bg-zinc-50">
      {/* Header */}
      <header className="h-16 border-b bg-white px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
            <Link href="/gallery" className="text-zinc-500 hover:text-zinc-900">
                <ArrowLeft size={20} />
            </Link>
            <h1 className="font-bold text-lg capitalize">{params.shapeId} Editor</h1>
        </div>
        <div className="flex items-center gap-3">
            <Select 
              value={exportSize.toString()} 
              onValueChange={(val) => setExportSize(parseInt(val) as ExportSize)}
            >
              <SelectTrigger className="w-[140px] h-9">
                <SelectValue placeholder="Export Size" />
              </SelectTrigger>
              <SelectContent>
                {EXPORT_SIZES.map((size) => (
                  <SelectItem key={size.value} value={size.value.toString()}>
                    {size.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" onClick={() => handleDownload('png')}>
                Download PNG
            </Button>
            <Button size="sm" onClick={() => handleDownload('svg')}>
                <Download className="mr-2 h-4 w-4" />
                Download SVG
            </Button>
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
