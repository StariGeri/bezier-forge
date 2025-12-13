"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from '../shapes/ShapeRegistry';

export const DiagonalBarsLogo = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { primaryColor, roundness } = config;
  
  // Diagonal parallel bars
  const gap = 8 + (roundness / 100) * 4;
  
  return (
    <g transform="translate(50, 50) rotate(-25)">
      {[-2, -1, 0, 1, 2].map((i) => (
        <rect 
          key={i}
          x={i * (10 + gap) - 5}
          y={-45}
          width="10"
          height="90"
          rx={roundness / 100 * 5}
          fill={primaryColor}
        />
      ))}
    </g>
  );
};

