"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from '../shapes/ShapeRegistry';

export const ArcQuadLogo = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { primaryColor, roundness } = config;
  
  // Four arcs forming a circular pattern
  const strokeW = 10 + (roundness / 100) * 5;
  
  return (
    <g transform="translate(50, 50)">
      {[0, 90, 180, 270].map((angle, i) => (
        <path 
          key={i}
          d="M 15 -35 C 35 -35 35 -15 35 -15"
          fill="none"
          stroke={primaryColor}
          strokeWidth={strokeW}
          strokeLinecap="round"
          transform={`rotate(${angle})`}
        />
      ))}
    </g>
  );
};

