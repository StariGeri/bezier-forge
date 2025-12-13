"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from '../shapes/ShapeRegistry';

export const StarFrameLogo = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { primaryColor, roundness } = config;
  
  // Based on the second SVG - rounded rectangle with 4-pointed star cutout
  // Original viewBox 256, scaled to 100 (scale factor ~0.39)
  // r controls corner radius of outer frame
  
  const r = 4 + (roundness / 100) * 6; // 4-10 range for corners
  
  return (
    <g transform="translate(50, 50) scale(0.35)">
      <path 
        d={`
          M -78 -128 
          C -67 -128 -58 -119 -58 -108 
          L -58 -108 
          C -58 -119 -49 -128 -38 -128 
          L 108 -128 
          C 119 -128 128 -119 128 -108 
          L 128 -20 
          C 128 -9 119 0 108 0 
          C 119 0 128 9 128 20 
          L 128 108 
          C 128 119 119 128 108 128 
          L 20 128 
          C 9 128 0 119 0 108 
          C 0 119 -9 128 -20 128 
          L -108 128 
          C -119 128 -128 119 -128 108 
          L -128 20 
          C -128 9 -119 0 -108 0 
          C -119 0 -128 -9 -128 -20 
          L -128 -108 
          C -128 -119 -119 -128 -108 -128 
          Z 
          M 0 -64 
          C 0 -28 -28 0 -64 0 
          C -28 0 0 28 0 64 
          C 0 28 28 0 64 0 
          C 28 0 0 -28 0 -64 
          Z
        `}
        fill={primaryColor}
        fillRule="evenodd"
      />
    </g>
  );
};

