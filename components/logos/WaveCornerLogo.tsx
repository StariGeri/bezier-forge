"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from '../shapes/ShapeRegistry';

export const WaveCornerLogo = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { primaryColor, secondaryColor } = config;
  
  // Wave-like corners with alternating colors
  
  return (
    <g transform="translate(50, 50)">
      {/* Top corners */}
      <path 
        d="M -40 -40 C -40 -20 -20 0 0 0 L 0 -15 C -12 -15 -25 -25 -25 -40 Z"
        fill={primaryColor}
      />
      <path 
        d="M 40 -40 C 40 -20 20 0 0 0 L 0 -15 C 12 -15 25 -25 25 -40 Z"
        fill={secondaryColor || primaryColor}
      />
      {/* Bottom corners */}
      <path 
        d="M -40 40 C -40 20 -20 0 0 0 L 0 15 C -12 15 -25 25 -25 40 Z"
        fill={secondaryColor || primaryColor}
      />
      <path 
        d="M 40 40 C 40 20 20 0 0 0 L 0 15 C 12 15 25 25 25 40 Z"
        fill={primaryColor}
      />
    </g>
  );
};

