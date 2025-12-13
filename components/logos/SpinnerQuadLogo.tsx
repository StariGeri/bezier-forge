"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from '../shapes/ShapeRegistry';

export const SpinnerQuadLogo = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { primaryColor } = config;
  
  // Based on the first SVG - 4 curved blades in rotation pattern
  // Original viewBox 256, scaled to 100 (scale factor ~0.39)
  // Centered at 50,50 instead of 128,128
  
  return (
    <g transform="translate(50, 50) scale(0.39)">
      <path 
        d="M 0 64 C -35.346 64 -64 92.654 -64 128 L -128 128 C -128 57.308 -70.692 0 0 0 Z M 128 0 C 128 70.692 70.692 128 0 128 L 0 64 C 35.346 64 64 35.346 64 0 Z M 0 -64 C -35.346 -64 -64 -35.346 -64 0 L -128 0 C -128 -70.692 -70.692 -128 0 -128 Z M 128 -128 C 128 -57.308 70.692 0 0 0 L 0 -64 C 35.346 -64 64 -92.654 64 -128 Z"
        fill={primaryColor}
      />
    </g>
  );
};

