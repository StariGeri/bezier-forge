"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from '../shapes/ShapeRegistry';

export const HelixLogo = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { primaryColor, secondaryColor } = config;
  
  // DNA-like helix pattern
  
  return (
    <g transform="translate(50, 50)">
      {/* Left strand */}
      <path 
        d={`
          M -20 -40
          Q 0 -25 -20 -10
          Q -40 5 -20 20
          Q 0 35 -20 40
        `}
        fill="none"
        stroke={primaryColor}
        strokeWidth="10"
        strokeLinecap="round"
      />
      {/* Right strand */}
      <path 
        d={`
          M 20 -40
          Q 0 -25 20 -10
          Q 40 5 20 20
          Q 0 35 20 40
        `}
        fill="none"
        stroke={secondaryColor || primaryColor}
        strokeWidth="10"
        strokeLinecap="round"
      />
      {/* Cross bars */}
      <line x1="-12" y1="-25" x2="12" y2="-25" stroke={primaryColor} strokeWidth="6" strokeLinecap="round" />
      <line x1="-12" y1="5" x2="12" y2="5" stroke={primaryColor} strokeWidth="6" strokeLinecap="round" />
      <line x1="-12" y1="35" x2="12" y2="35" stroke={primaryColor} strokeWidth="6" strokeLinecap="round" />
    </g>
  );
};

