"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from '../shapes/ShapeRegistry';

export const BoltTripleLogo = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { primaryColor, secondaryColor } = config;
  
  // Three stacked parallelograms
  
  return (
    <g transform="translate(50, 50)">
      {/* Top bolt */}
      <path 
        d="M 40 -25 L 0 -25 L -40 -40 L 0 -40 Z"
        fill={primaryColor}
      />
      {/* Middle bolt */}
      <path 
        d="M 40 5 L 0 5 L -40 -10 L 0 -10 Z"
        fill={secondaryColor || primaryColor}
      />
      {/* Bottom bolt */}
      <path 
        d="M 40 35 L 0 35 L -40 20 L 0 20 Z"
        fill={primaryColor}
      />
    </g>
  );
};

