"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from '../shapes/ShapeRegistry';

export const StarCutoutLogo = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { primaryColor, roundness } = config;
  
  // Simpler version - just a rounded square with 4-pointed star cutout
  const r = (roundness / 100) * 15;
  
  return (
    <g transform="translate(50, 50)">
      <mask id="star-cutout-mask">
        <rect x="-40" y="-40" width="80" height="80" rx={r} fill="white" />
        {/* Star cutout using 4 circles */}
        <circle cx="-40" cy="0" r="25" fill="black" />
        <circle cx="40" cy="0" r="25" fill="black" />
        <circle cx="0" cy="-40" r="25" fill="black" />
        <circle cx="0" cy="40" r="25" fill="black" />
      </mask>
      <rect x="-40" y="-40" width="80" height="80" rx={r} fill={primaryColor} mask="url(#star-cutout-mask)" />
    </g>
  );
};

