"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from '../shapes/ShapeRegistry';

export const SplitSquareLogo = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { primaryColor, secondaryColor, roundness } = config;

  // Square split by diagonal with negative space
  // Based on bottom-mid-right logo
  
  const size = 60;
  const gap = 12; // Diagonal gap
  const r = (roundness / 100) * (size / 4);

  // We can create two triangles/polygons to form the split square
  
  return (
    <g transform="translate(50, 50)">
      {/* Top Left Part */}
      <path
        d={`
            M ${-size/2} ${-size/2}
            L ${size/2 - gap} ${-size/2}
            L ${-size/2} ${size/2 - gap}
            Z
        `}
        fill={primaryColor}
        stroke={primaryColor}
        strokeWidth={roundness > 0 ? "8" : "0"} // Use stroke to round corners if needed, simplistic approach
        strokeLinejoin={roundness > 0 ? "round" : "miter"}
      />
      
      {/* Bottom Right Part */}
      <path
        d={`
            M ${size/2} ${size/2}
            L ${-size/2 + gap} ${size/2}
            L ${size/2} ${-size/2 + gap}
            Z
        `}
        fill={secondaryColor || primaryColor}
        stroke={secondaryColor || primaryColor}
        strokeWidth={roundness > 0 ? "8" : "0"}
        strokeLinejoin={roundness > 0 ? "round" : "miter"}
      />
      
      {/* Center Circle/Dot in the negative space (optional based on interpretation, 
          image shows more like a slash cut. Let's stick to just the slash cut first) */}
    </g>
  );
};

