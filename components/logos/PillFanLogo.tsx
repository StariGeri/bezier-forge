"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from '../shapes/ShapeRegistry';

export const PillFanLogo = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { primaryColor, secondaryColor, roundness } = config;
  
  // Overlapping pills in a fan/spread arrangement
  
  const pillCount = 5;
  const pillWidth = 12;
  const pillHeight = 55;
  const r = pillWidth / 2;
  
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
    const red = Math.round(c1.r + (c2.r - c1.r) * factor);
    const green = Math.round(c1.g + (c2.g - c1.g) * factor);
    const blue = Math.round(c1.b + (c2.b - c1.b) * factor);
    return `rgb(${red}, ${green}, ${blue})`;
  };
  
  // Fan out from center
  const startAngle = -40;
  const endAngle = 40;
  const angleStep = (endAngle - startAngle) / (pillCount - 1);
  
  return (
    <g transform="translate(50, 50)">
      {Array.from({ length: pillCount }).map((_, i) => {
        const angle = startAngle + i * angleStep;
        const color = interpolateColor(
          primaryColor, 
          secondaryColor || primaryColor, 
          i / (pillCount - 1)
        );
        
        return (
          <rect
            key={i}
            x={-pillWidth / 2}
            y={-pillHeight / 2 - 5}
            width={pillWidth}
            height={pillHeight}
            rx={r}
            fill={color}
            transform={`rotate(${angle})`}
          />
        );
      })}
    </g>
  );
};

