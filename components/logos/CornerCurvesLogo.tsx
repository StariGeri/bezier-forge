"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from '../shapes/ShapeRegistry';

export const CornerCurvesLogo = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { primaryColor } = config;
  
  // Four curved corner shapes - exact design from SVG
  // Scaled from 256 to 100 viewBox
  
  return (
    <g transform="translate(50, 50) scale(0.39)">
      <path 
        d={`
          M -128 0 C -57.308 0 0 57.308 0 128 L -64 128 C -64 92.654 -92.654 64 -128 64 Z 
          M 128 64 C 92.654 64 64 92.654 64 128 L 0 128 C 0 57.308 57.308 0 128 0 Z 
          M 0 -128 C 0 -57.308 -57.308 0 -128 0 L -128 -64 C -92.654 -64 -64 -92.654 -64 -128 Z 
          M 64 -128 C 64 -92.654 92.654 -64 128 -64 L 128 0 C 57.308 0 0 -57.308 0 -128 Z
        `}
        fill={primaryColor}
      />
    </g>
  );
};

