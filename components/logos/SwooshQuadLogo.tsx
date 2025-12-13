"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from '../shapes/ShapeRegistry';

export const SwooshQuadLogo = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { primaryColor } = config;
  
  // Four swoosh shapes radiating from center
  
  return (
    <g transform="translate(50, 50)">
      {[0, 90, 180, 270].map((angle, i) => (
        <path 
          key={i}
          d="M 0 0 C 0 -25 20 -40 40 -40 L 40 -25 C 28 -25 15 -15 15 0 Z"
          fill={primaryColor}
          transform={`rotate(${angle})`}
        />
      ))}
    </g>
  );
};

