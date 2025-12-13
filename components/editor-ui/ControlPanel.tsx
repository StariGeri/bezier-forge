"use client";

import { useEditorStore, EditorConfig } from "@/store/use-store";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    ColorPicker,
    ColorPickerAlpha,
    ColorPickerEyeDropper,
    ColorPickerFormat,
    ColorPickerHue,
    ColorPickerSelection,
} from '@/components/ui/color-picker';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Color from 'color';
import { getShapeControls, ControlDef, SliderControlDef } from '@/components/shapes/ShapeDefinitions';
import { useState, useEffect } from "react";
import { BUILT_IN_PRESETS, Preset } from "@/lib/presets";
import { presetManager } from "@/lib/preset-manager";
import { SavePresetDialog } from "./SavePresetDialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash, Save } from "lucide-react";
import { toast } from "@/lib/toast";

// ────────────────────────────────────────────────────────────────────────────
// Color Input Component
// ────────────────────────────────────────────────────────────────────────────

const ColorInput = ({ 
    label, 
    value, 
    onChange 
}: { 
    label: string, 
    value: string, 
    onChange: (value: string) => void 
}) => {
    return (
        <div className="space-y-2">
        <Label>{label}</Label>
        <Popover>
            <PopoverTrigger asChild>
                <Button 
                    variant="outline" 
                    className="w-full justify-start text-left font-normal"
                >
                    <div className="w-4 h-4 rounded-full mr-2 border border-muted-foreground/20" style={{ backgroundColor: value }} />
                    {value}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[280px] p-3">
                <ColorPicker 
                    value={value} 
                    onChange={(v) => {
                        // Cast to unknown then tuple to avoid type conflict with HTMLAttributes.onChange
                        const [r, g, b, a] = v as unknown as [number, number, number, number];
                        const hex = Color.rgb(r, g, b).alpha(a).hex();
                        onChange(hex);
                    }}
                >
                    <div className="flex w-full flex-col gap-4">
                        <ColorPickerSelection className="h-40 w-full" />
                        <div className="flex flex-col gap-2">
                            <ColorPickerHue />
                            <ColorPickerAlpha />
                        </div>
                        <div className="flex w-full items-center gap-2">
                            <ColorPickerFormat className="flex-1" />
                            <ColorPickerEyeDropper />
                        </div>
                    </div>
                </ColorPicker>
            </PopoverContent>
        </Popover>
        </div>
    );
};

// ────────────────────────────────────────────────────────────────────────────
// Slider Input Component
// ────────────────────────────────────────────────────────────────────────────

const SliderInput = ({
    control,
    value,
    onChange,
}: {
    control: SliderControlDef;
    value: number;
    onChange: (value: number) => void;
}) => {
    // Format display value based on step
    const displayValue = control.step < 1 
        ? value.toFixed(1) 
        : Math.round(value);

    return (
        <div className="space-y-2">
            <div className="flex justify-between">
                <Label>{control.label} ({displayValue})</Label>
            </div>
            <Slider
                value={[value]}
                min={control.min}
                max={control.max}
                step={control.step}
                onValueChange={(val) => onChange(val[0])}
            />
        </div>
    );
};

// ────────────────────────────────────────────────────────────────────────────
// Control Renderer
// ────────────────────────────────────────────────────────────────────────────

const ControlRenderer = ({
    control,
    config,
    updateConfig,
}: {
    control: ControlDef;
    config: EditorConfig;
    updateConfig: <K extends keyof EditorConfig>(key: K, value: EditorConfig[K]) => void;
}) => {
    const key = control.key;
    const value = config[key];

    if (control.type === 'color') {
        return (
            <ColorInput
                key={key}
                label={control.label}
                value={value as string}
                onChange={(val) => updateConfig(key, val as EditorConfig[typeof key])}
            />
        );
    }

    if (control.type === 'slider') {
        return (
            <SliderInput
                key={key}
                control={control}
                value={value as number}
                onChange={(val) => updateConfig(key, val as EditorConfig[typeof key])}
            />
        );
    }

    return null;
};

// ────────────────────────────────────────────────────────────────────────────
// Control Panel
// ────────────────────────────────────────────────────────────────────────────

export const ControlPanel = () => {
    const { selectedShapeId, config, updateConfig, randomize } = useEditorStore();
    const [userPresets, setUserPresets] = useState<Preset[]>([]);
    const [saveDialogOpen, setSaveDialogOpen] = useState(false);
    
    // Load user presets on mount
    useEffect(() => {
        // Use setTimeout to avoid synchronous setState warning
        setTimeout(() => {
            setUserPresets(presetManager.getUserPresets());
        }, 0);
    }, []);

    const refreshPresets = () => {
        setUserPresets(presetManager.getUserPresets());
    };

    // Get controls for the selected shape
    const controls = getShapeControls(selectedShapeId || 'radial');
    
    // Separate color controls from slider controls for grouping
    const colorControls = controls.filter((c) => c.type === 'color');
    const sliderControls = controls.filter((c) => c.type === 'slider');

    const handleApplyPreset = (presetId: string) => {
        const allPresets = [...(BUILT_IN_PRESETS.universal || []), ...userPresets];
        const preset = allPresets.find(p => p.id === presetId);
        
        if (preset) {
            // Only apply colors from the preset
            if (preset.config.primaryColor) {
                updateConfig('primaryColor', preset.config.primaryColor);
            }
            if (preset.config.secondaryColor) {
                updateConfig('secondaryColor', preset.config.secondaryColor);
            }
            
            toast.success(`Applied "${preset.name}" colors`);
        }
    };

    const handleDeletePreset = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        presetManager.deleteUserPreset(id);
        refreshPresets();
        toast.success("Preset deleted");
    };

    return (
        <Card className="w-full h-full overflow-y-auto border-0 shadow-none">
            <CardHeader>
                <CardTitle>Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                
                {/* Actions */}
                <div className="flex flex-col gap-2">
                    {/* Presets Dropdown */}
                    <div className="space-y-2">
                        <Label>Presets</Label>
                        <Select onValueChange={handleApplyPreset}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a preset" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Built-in</SelectLabel>
                                    {BUILT_IN_PRESETS.universal?.map(preset => (
                                        <SelectItem key={preset.id} value={preset.id}>
                                            {preset.name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                                {userPresets.length > 0 && (
                                    <SelectGroup>
                                        <SelectLabel>My Presets</SelectLabel>
                                        {userPresets.map(preset => (
                                            <div key={preset.id} className="flex items-center justify-between pr-2 focus-within:bg-zinc-100 rounded-sm">
                                                <SelectItem value={preset.id} className="flex-1">
                                                    {preset.name}
                                                </SelectItem>
                                                <button 
                                                    onClick={(e) => handleDeletePreset(e, preset.id)}
                                                    className="p-1 text-zinc-400 hover:text-red-500 transition-colors"
                                                    title="Delete preset"
                                                >
                                                    <Trash size={14} />
                                                </button>
                                            </div>
                                        ))}
                                    </SelectGroup>
                                )}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex gap-2 mt-2">
                        <Button onClick={randomize} variant="outline" className="flex-1">
                            Randomize
                        </Button>
                        <Button 
                            variant="outline" 
                            size="icon" 
                            onClick={() => setSaveDialogOpen(true)}
                            title="Save current as preset"
                        >
                            <Save size={18} />
                        </Button>
                    </div>
                </div>

                <SavePresetDialog 
                    open={saveDialogOpen} 
                    onOpenChange={setSaveDialogOpen}
                    onSave={refreshPresets}
                />

                {/* Colors Section */}
                {colorControls.length > 0 && (
                    <div className="space-y-4">
                        {colorControls.map((control) => (
                            <ControlRenderer
                                key={control.key}
                                control={control}
                                config={config}
                                updateConfig={updateConfig}
                            />
                        ))}
                    </div>
                )}

                {/* Sliders Section */}
                {sliderControls.length > 0 && (
                    <div className="space-y-4">
                        {sliderControls.map((control) => (
                            <ControlRenderer
                                key={control.key}
                                control={control}
                                config={config}
                                updateConfig={updateConfig}
                            />
                        ))}
                    </div>
                )}

                {/* Empty state if no controls defined */}
                {controls.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">
                        No controls available for this shape.
                    </p>
                )}

            </CardContent>
        </Card>
    );
};
