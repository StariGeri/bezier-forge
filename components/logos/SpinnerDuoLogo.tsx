"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from '../shapes/ShapeRegistry';

export const SpinnerDuoLogo = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { primaryColor, secondaryColor } = config;
  
  // Two-blade version of the spinner - more like an S-curve
  
  return (
    <g transform="translate(50, 50) scale(0.39)">
      {/* Top-right blade */}
      <path 
        d="M 128 0 C 128 70.692 70.692 128 0 128 L 0 64 C 35.346 64 64 35.346 64 0 Z"
        fill={primaryColor}
      />
      {/* Bottom-left blade */}
      <path 
        d="M -128 0 C -128 -70.692 -70.692 -128 0 -128 L 0 -64 C -35.346 -64 -64 -35.346 -64 0 Z"
        fill={secondaryColor || primaryColor}
      />
    </g>
  );
};

