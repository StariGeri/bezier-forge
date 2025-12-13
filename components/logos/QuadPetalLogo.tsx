"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from '../shapes/ShapeRegistry';

export const QuadPetalLogo = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { primaryColor, secondaryColor, roundness } = config;
  
  // Map roundness (0-100) to radius
  // For petals, we vary from square (0) to leaf/circle (100)
  // Max radius for a 35x35 rect is 17.5
  const r = (roundness / 100) * 17.5;
  
  return (
    <g transform="translate(50, 50)">
      <rect x="-35" y="-35" width="35" height="35" rx={r} fill={primaryColor} />
      <rect x="0" y="-35" width="35" height="35" rx={r} fill={secondaryColor} />
      <rect x="-35" y="0" width="35" height="35" rx={r} fill={secondaryColor} />
      <rect x="0" y="0" width="35" height="35" rx={r} fill={primaryColor} />
    </g>
  );
};
