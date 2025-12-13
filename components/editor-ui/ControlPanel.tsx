"use client";

import { useEditorStore } from "@/store/use-store";
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

// Moved outside to prevent re-renders closing the Popover
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

export const ControlPanel = () => {
  const { config, updateConfig, randomize } = useEditorStore();

  return (
    <Card className="w-full h-full overflow-y-auto">
      <CardHeader>
        <CardTitle>Controls</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Actions */}
        <div className="flex gap-2">
            <Button onClick={randomize} variant="outline" className="flex-1">Randomize</Button>
        </div>

        {/* Colors */}
        <ColorInput 
            label="Primary Color" 
            value={config.primaryColor} 
            onChange={(val) => updateConfig('primaryColor', val)} 
        />
        <ColorInput 
            label="Secondary Color" 
            value={config.secondaryColor} 
            onChange={(val) => updateConfig('secondaryColor', val)} 
        />

        {/* Sliders */}
        <div className="space-y-4">
            <div className="space-y-2">
                <div className="flex justify-between">
                    <Label>Scale ({config.scale})</Label>
                </div>
                <Slider 
                    value={[config.scale]} 
                    min={0.1} 
                    max={2} 
                    step={0.1} 
                    onValueChange={(val) => updateConfig('scale', val[0])} 
                />
            </div>

            <div className="space-y-2">
                <div className="flex justify-between">
                    <Label>Rotation ({config.rotation})</Label>
                </div>
                <Slider 
                    value={[config.rotation]} 
                    min={0} 
                    max={360} 
                    step={1} 
                    onValueChange={(val) => updateConfig('rotation', val[0])} 
                />
            </div>

            <div className="space-y-2">
                <div className="flex justify-between">
                    <Label>Count ({config.count})</Label>
                </div>
                <Slider 
                    value={[config.count]} 
                    min={1} 
                    max={50} 
                    step={1} 
                    onValueChange={(val) => updateConfig('count', val[0])} 
                />
            </div>

            <div className="space-y-2">
                <div className="flex justify-between">
                    <Label>Radius ({config.radius})</Label>
                </div>
                <Slider 
                    value={[config.radius]} 
                    min={0} 
                    max={50} 
                    step={1} 
                    onValueChange={(val) => updateConfig('radius', val[0])} 
                />
            </div>
            
             <div className="space-y-2">
                <div className="flex justify-between">
                    <Label>Roundness ({config.roundness})</Label>
                </div>
                <Slider 
                    value={[config.roundness]} 
                    min={0} 
                    max={100} 
                    step={1} 
                    onValueChange={(val) => updateConfig('roundness', val[0])} 
                />
            </div>
        </div>

      </CardContent>
    </Card>
  );
};
