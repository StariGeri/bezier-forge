"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from '../shapes/ShapeRegistry';

export const ArrowDualLogo = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { primaryColor, secondaryColor } = config;
  
  // Two arrow-like shapes pointing in opposite directions
  
  return (
    <g transform="translate(50, 50)">
      {/* Left arrow pointing down-left */}
      <path 
        d="M -5 -35 L -40 0 L -5 0 L -5 35 L -15 35 L -15 10 L -40 10 L 5 -45 Z"
        fill={primaryColor}
      />
      {/* Right arrow pointing up-right */}
      <path 
        d="M 5 35 L 40 0 L 5 0 L 5 -35 L 15 -35 L 15 -10 L 40 -10 L -5 45 Z"
        fill={secondaryColor || primaryColor}
      />
    </g>
  );
};

