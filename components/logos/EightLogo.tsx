"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from '../shapes/ShapeRegistry';

export const EightLogo = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { primaryColor, roundness } = config;
  
  // Stylized figure-8 or infinity shape with bars
  const strokeW = 10 + (roundness / 100) * 4;
  
  return (
    <g transform="translate(50, 50)">
      {/* Top loop */}
      <path 
        d={`
          M -25 0
          C -25 -30 25 -30 25 0
        `}
        fill="none"
        stroke={primaryColor}
        strokeWidth={strokeW}
        strokeLinecap="round"
      />
      {/* Bottom loop */}
      <path 
        d={`
          M -25 0
          C -25 30 25 30 25 0
        `}
        fill="none"
        stroke={primaryColor}
        strokeWidth={strokeW}
        strokeLinecap="round"
      />
      {/* Horizontal bars */}
      <line x1="-40" y1="-25" x2="-15" y2="-25" stroke={primaryColor} strokeWidth={strokeW} strokeLinecap="round" />
      <line x1="15" y1="-25" x2="40" y2="-25" stroke={primaryColor} strokeWidth={strokeW} strokeLinecap="round" />
      <line x1="-40" y1="25" x2="-15" y2="25" stroke={primaryColor} strokeWidth={strokeW} strokeLinecap="round" />
      <line x1="15" y1="25" x2="40" y2="25" stroke={primaryColor} strokeWidth={strokeW} strokeLinecap="round" />
    </g>
  );
};

