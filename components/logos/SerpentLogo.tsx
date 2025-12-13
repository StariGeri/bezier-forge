"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from '../shapes/ShapeRegistry';

export const SerpentLogo = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { primaryColor, secondaryColor } = config;
  
  // Two interweaving S-curves
  
  return (
    <g transform="translate(50, 50)">
      {/* Left S-curve */}
      <path 
        d={`
          M -35 -35
          L -35 -25
          C -35 -10 -20 0 -20 0
          C -20 0 -35 10 -35 25
          L -35 35
          L -25 35
          L -25 25
          C -25 15 -10 5 -10 5
          C -10 5 -25 -5 -25 -25
          L -25 -35
          Z
        `}
        fill={primaryColor}
      />
      {/* Right S-curve (mirrored) */}
      <path 
        d={`
          M 35 -35
          L 35 -25
          C 35 -10 20 0 20 0
          C 20 0 35 10 35 25
          L 35 35
          L 25 35
          L 25 25
          C 25 15 10 5 10 5
          C 10 5 25 -5 25 -25
          L 25 -35
          Z
        `}
        fill={secondaryColor || primaryColor}
      />
    </g>
  );
};

