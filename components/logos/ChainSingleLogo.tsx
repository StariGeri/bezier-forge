"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from '../shapes/ShapeRegistry';

export const ChainSingleLogo = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { primaryColor } = config;
  
  // Single S-curve chain segment
  
  return (
    <g transform="translate(50, 50)">
      <path 
        d={`
          M -30 -40
          L 10 -40
          C 10 -40 30 -40 30 -20
          C 30 0 10 0 10 0
          L -10 0
          C -10 0 -30 0 -30 20
          C -30 40 -10 40 -10 40
          L 30 40
          L 30 30
          L -10 30
          C -10 30 -20 30 -20 20
          C -20 10 -10 10 -10 10
          L 10 10
          C 10 10 40 10 40 -20
          C 40 -50 10 -50 10 -50
          L -30 -50
          Z
        `}
        fill={primaryColor}
      />
    </g>
  );
};

