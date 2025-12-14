"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { useEditorStore, ExportSize } from "@/store/use-store";
import { Canvas } from "@/components/editor-ui/Canvas";
import { ControlPanel } from "@/components/editor-ui/ControlPanel";
import { Button } from "@/components/ui/button";
import { Download, ArrowLeft, Share2 } from "lucide-react";
import Link from "next/link";
import { 
  copyTextToClipboard, 
} from "@/lib/download";
import { configToUrl } from "@/lib/url-state";
import { toast } from "@/lib/toast";
import { useUrlSync } from "@/hooks/use-url-sync";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";
import { KeyboardShortcutsHelp } from "@/components/editor-ui/KeyboardShortcutsHelp";
import { ExportDialog } from "@/components/editor-ui/ExportDialog";

export default function EditorPage() {
  const params = useParams();
  const { setShape, randomize, config } = useEditorStore();
  const svgRef = useRef<SVGSVGElement>(null);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  
  useUrlSync();

  useEffect(() => {
    if (params.shapeId) {
      setShape(params.shapeId as string);
    }
  }, [params.shapeId, setShape]);

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
    onDownload: () => setExportDialogOpen(true),
    onCopy: () => setExportDialogOpen(true),
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

            {/* Export Button */}
            <Button onClick={() => setExportDialogOpen(true)} size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
            </Button>

            <ExportDialog 
                open={exportDialogOpen} 
                onOpenChange={setExportDialogOpen}
                svgElement={svgRef.current}
                shapeId={params.shapeId as string}
            />
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
