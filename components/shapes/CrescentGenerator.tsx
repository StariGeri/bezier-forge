"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from './ShapeRegistry';

export const CrescentGenerator = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { radius, primaryColor, rotation, roundness } = config;

  const cx = 50;
  const cy = 50;
  const outerR = radius;
  const innerR = radius * (0.3 + (roundness / 100) * 0.5); // Thickness varies with roundness
  const offset = radius * 0.3; // Offset of inner circle
  
  return (
    <g transform={`rotate(${rotation} ${cx} ${cy})`}>
      <path
        d={`
          M ${cx - outerR} ${cy}
          A ${outerR} ${outerR} 0 1 1 ${cx + outerR} ${cy}
          A ${outerR} ${outerR} 0 1 1 ${cx - outerR} ${cy}
          M ${cx - innerR + offset} ${cy}
          A ${innerR} ${innerR} 0 1 0 ${cx + innerR + offset} ${cy}
          A ${innerR} ${innerR} 0 1 0 ${cx - innerR + offset} ${cy}
        `}
        fill={primaryColor}
        fillRule="evenodd"
      />
    </g>
  );
};

