"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from '../shapes/ShapeRegistry';

export const BoltStackLogo = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { primaryColor } = config;
  
  // Two stacked parallelograms - exact design from SVG
  // Scaled from 256 to 100 viewBox
  
  return (
    <g transform="translate(50, 50) scale(0.35)">
      <path 
        d={`
          M 128 128 L 0 128 L -128 0 L 0 0 Z
          M 128 0 L 0 0 L -128 -128 L 0 -128 Z
        `}
        fill={primaryColor}
      />
    </g>
  );
};

