"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from '../shapes/ShapeRegistry';

export const TargetDotLogo = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { primaryColor, secondaryColor, roundness } = config;
  
  // Roundness affects outer shape (square to circle)
  const r = (roundness / 100) * 40;
  const innerR = (roundness / 100) * 15;
  
  return (
    <g transform="translate(50, 50)">
      <rect x="-40" y="-40" width="80" height="80" rx={r} fill={primaryColor} />
      <rect x="-15" y="-15" width="30" height="30" rx={innerR} fill={secondaryColor} />
      <circle cx="0" cy="0" r="5" fill={primaryColor} />
    </g>
  );
};
