"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from '../shapes/ShapeRegistry';

export const PillStackLogo = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { primaryColor, secondaryColor, roundness } = config;
  
  // Overlapping vertical rounded rectangles/pills
  // Based on the image with layered pill shapes
  
  const pillCount = 5;
  const pillWidth = 14;
  const pillHeight = 70;
  const spacing = 12;
  const r = pillWidth / 2; // Fully rounded ends
  
  // Calculate starting X to center the stack
  const totalWidth = (pillCount - 1) * spacing + pillWidth;
  const startX = -totalWidth / 2;
  
  // Interpolate between primary and secondary colors
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };
  
  const interpolateColor = (color1: string, color2: string, factor: number) => {
    const c1 = hexToRgb(color1);
    const c2 = hexToRgb(color2);
    const r = Math.round(c1.r + (c2.r - c1.r) * factor);
    const g = Math.round(c1.g + (c2.g - c1.g) * factor);
    const b = Math.round(c1.b + (c2.b - c1.b) * factor);
    return `rgb(${r}, ${g}, ${b})`;
  };
  
  return (
    <g transform="translate(50, 50)">
      {Array.from({ length: pillCount }).map((_, i) => {
        const x = startX + i * spacing;
        const color = interpolateColor(
          primaryColor, 
          secondaryColor || primaryColor, 
          i / (pillCount - 1)
        );
        
        return (
          <rect
            key={i}
            x={x}
            y={-pillHeight / 2}
            width={pillWidth}
            height={pillHeight}
            rx={r}
            fill={color}
          />
        );
      })}
    </g>
  );
};

