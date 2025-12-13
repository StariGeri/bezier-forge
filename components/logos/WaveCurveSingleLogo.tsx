"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from '../shapes/ShapeRegistry';

export const WaveCurveSingleLogo = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { primaryColor, secondaryColor } = config;
  
  // Simplified two-part wave - just top-right and bottom-left
  
  return (
    <g transform="translate(50, 50)">
      {/* Top-right curved section */}
      <path 
        d="M 0 -40 L 40 -40 C 40 -40 40 0 40 0 C 18 0 0 -18 0 -40 Z"
        fill={primaryColor}
      />
      {/* Bottom-left curved section */}
      <path 
        d="M 0 40 L -40 40 C -40 40 -40 0 -40 0 C -18 0 0 18 0 40 Z"
        fill={secondaryColor || primaryColor}
      />
    </g>
  );
};

