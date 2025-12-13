"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from '../shapes/ShapeRegistry';

export const CurvedCrossLogo = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { primaryColor, roundness } = config;
  
  // Cross shape with curved arms
  const curve = 20 + (roundness / 100) * 10;
  
  return (
    <g transform="translate(50, 50)">
      {/* Vertical arm */}
      <path 
        d={`M -8 -40 C -8 -${curve} 8 -${curve} 8 -40 L 8 40 C 8 ${curve} -8 ${curve} -8 40 Z`}
        fill={primaryColor}
      />
      {/* Horizontal arm */}
      <path 
        d={`M -40 -8 C -${curve} -8 -${curve} 8 -40 8 L 40 8 C ${curve} 8 ${curve} -8 40 -8 Z`}
        fill={primaryColor}
      />
    </g>
  );
};

