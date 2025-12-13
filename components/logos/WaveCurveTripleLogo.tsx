"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from '../shapes/ShapeRegistry';

export const WaveCurveTripleLogo = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { primaryColor, secondaryColor } = config;
  
  // Three rows of alternating wave curves
  
  return (
    <g transform="translate(50, 50)">
      {/* Top row */}
      <path 
        d="M -40 -40 L -40 -25 C -40 -12 -28 0 -15 0 C -28 0 -40 12 -40 25 L -40 40"
        fill="none"
        stroke={primaryColor}
        strokeWidth="15"
        strokeLinecap="round"
      />
      {/* Middle row */}
      <path 
        d="M 0 -40 L 0 -25 C 0 -12 12 0 25 0 C 12 0 0 12 0 25 L 0 40"
        fill="none"
        stroke={secondaryColor || primaryColor}
        strokeWidth="15"
        strokeLinecap="round"
      />
      {/* Right row */}
      <path 
        d="M 40 -40 L 40 -25 C 40 -12 28 0 15 0 C 28 0 40 12 40 25 L 40 40"
        fill="none"
        stroke={primaryColor}
        strokeWidth="15"
        strokeLinecap="round"
      />
    </g>
  );
};

