"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from '../shapes/ShapeRegistry';

export const WaveCurveLogo = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { primaryColor, secondaryColor } = config;
  
  // Two opposing curved shapes - like yin-yang but squared
  
  return (
    <g transform="translate(50, 50)">
      {/* Top-left to bottom-right curve */}
      <path 
        d="M -35 -35 L 0 -35 C 0 -35 0 0 0 0 C -19.33 0 -35 -15.67 -35 -35 Z"
        fill={primaryColor}
        transform="scale(1.15)"
      />
      <path 
        d="M 35 -35 C 35 -15.67 19.33 0 0 0 L 0 -35 Z"
        fill={primaryColor}
        transform="scale(1.15)"
      />
      {/* Bottom curves */}
      <path 
        d="M -35 35 C -35 15.67 -19.33 0 0 0 L 0 35 Z"
        fill={secondaryColor || primaryColor}
        transform="scale(1.15)"
      />
      <path 
        d="M 35 35 L 0 35 C 0 35 0 0 0 0 C 19.33 0 35 15.67 35 35 Z"
        fill={secondaryColor || primaryColor}
        transform="scale(1.15)"
      />
    </g>
  );
};

