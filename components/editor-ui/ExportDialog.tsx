"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ExportSize } from "@/store/use-store";
import { Copy, Download, FileCode, ImageIcon } from "lucide-react";
import { toast as customToast } from "@/lib/toast";

import { 
    downloadSvg, 
    getSvgString, 
    copyTextToClipboard,
    copyPngToClipboard,
    downloadPng
} from "@/lib/download";
import { svgStringToJsx } from "@/lib/svg-to-jsx";
import { shapeIdToComponentName } from "@/lib/utils";

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

type ExportFormat = "svg" | "png" | "jsx";

interface ExportDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    svgElement: SVGSVGElement | null;
    shapeId: string;
}

export function ExportDialog({ open, onOpenChange, svgElement, shapeId }: ExportDialogProps) {
    const [format, setFormat] = useState<ExportFormat>("svg");
    const [size, setSize] = useState<ExportSize>(1024);
    const [isCopying, setIsCopying] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);

    // Reset state when dialog opens
    useEffect(() => {
        if (open) {
             // We can potentially set specific defaults here if needed
        }
    }, [open]);

    const getFilename = () => `${shapeId}_${size}`;
    
    const getComponentName = () => {
        return shapeIdToComponentName(shapeId);
    };

    const handleCopy = async () => {
        if (!svgElement) return;
        setIsCopying(true);
        
        try {
            if (format === "svg") {
                const source = getSvgString(svgElement, size);
                await copyTextToClipboard(source);
                customToast.success("SVG copied to clipboard");
            } else if (format === "png") {
                await copyPngToClipboard(svgElement, size);
                customToast.success("PNG copied to clipboard");
            } else if (format === "jsx") {
                const source = getSvgString(svgElement, size);
                const jsx = svgStringToJsx(source, getComponentName());
                await copyTextToClipboard(jsx);
                customToast.success("JSX copied to clipboard");
            }
        } catch (e) {
            console.error(e);
            customToast.error("Failed to copy to clipboard");
        } finally {
            setIsCopying(false);
        }
    };

    const handleDownload = async () => {
        if (!svgElement) return;
        setIsDownloading(true);

        try {
            if (format === "svg") {
                downloadSvg(svgElement, getFilename(), size);
                customToast.success(`Downloaded ${size}×${size} SVG`);
            } else if (format === "png") {
                await downloadPng(svgElement, getFilename(), size);
                customToast.success(`Downloaded ${size}×${size} PNG`);
            } else if (format === "jsx") {
                const source = getSvgString(svgElement, size);
                const jsx = svgStringToJsx(source, getComponentName());
                const blob = new Blob([jsx], { type: "text/plain" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `${getComponentName()}.tsx`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                customToast.success("Downloaded JSX component");
            }
        } catch (e) {
            console.error(e);
            customToast.error("Failed to download");
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Export</DialogTitle>
                    <DialogDescription>
                        Choose format and size to export your logo.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-6 py-4">
                    <Tabs value={format} onValueChange={(v) => setFormat(v as ExportFormat)} className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="svg">
                                <FileCode className="mr-2 h-4 w-4" />
                                SVG
                            </TabsTrigger>
                            <TabsTrigger value="png">
                                <ImageIcon className="mr-2 h-4 w-4" />
                                PNG
                            </TabsTrigger>
                            <TabsTrigger value="jsx">
                                <FileCode className="mr-2 h-4 w-4" />
                                JSX
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>

                    <div className="grid gap-2">
                        <Label htmlFor="size">Size</Label>
                        <Select
                            value={size.toString()}
                            onValueChange={(val) => setSize(Number(val) as ExportSize)}
                        >
                            <SelectTrigger id="size">
                                <SelectValue placeholder="Select size" />
                            </SelectTrigger>
                            <SelectContent>
                                {EXPORT_SIZES.map((s) => (
                                    <SelectItem key={s.value} value={s.value.toString()}>
                                        {s.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {format === "jsx" && (
                            <p className="text-xs text-muted-foreground mt-1">
                                Component name: <span className="font-mono font-medium">{getComponentName()}</span>
                            </p>
                        )}
                    </div>
                </div>

                <DialogFooter className="flex-col sm:flex-row gap-2">
                    <Button variant="outline" onClick={handleCopy} disabled={isCopying} className="w-full sm:w-auto">
                        {isCopying ? (
                            <span className="animate-spin mr-2">⏳</span>
                        ) : (
                            <Copy className="mr-2 h-4 w-4" />
                        )}
                        Copy to Clipboard
                    </Button>
                    <Button onClick={handleDownload} disabled={isDownloading} className="w-full sm:w-auto">
                        {isDownloading ? (
                            <span className="animate-spin mr-2">⏳</span>
                        ) : (
                            <Download className="mr-2 h-4 w-4" />
                        )}
                        Download
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
