"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from '../shapes/ShapeRegistry';

export const CornerDuoLogo = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { primaryColor, secondaryColor } = config;
  
  // Two opposing curved corners
  
  return (
    <g transform="translate(50, 50)">
      {/* Top-left corner */}
      <path 
        d="M -40 0 C -40 22 -22 40 0 40 L -15 40 C -29 40 -40 29 -40 15 Z"
        fill={primaryColor}
        transform="scale(1.2)"
      />
      {/* Bottom-right corner */}
      <path 
        d="M 40 0 C 40 -22 22 -40 0 -40 L 15 -40 C 29 -40 40 -29 40 -15 Z"
        fill={secondaryColor || primaryColor}
        transform="scale(1.2)"
      />
    </g>
  );
};

