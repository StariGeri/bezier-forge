"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from '../shapes/ShapeRegistry';

export const DonutRingLogo = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { primaryColor, roundness } = config;
  
  // Outer radius 40, inner 20
  // Roundness affects corner radius of the "square" ring
  // If roundness is 0, it's a square frame. If 100, it's a circle ring.
  
  const outerR = (roundness / 100) * 40;
  const innerR = (roundness / 100) * 20;
  
  return (
    <g transform="translate(50, 50)">
      <mask id="donut-hole">
        <rect x="-50" y="-50" width="100" height="100" fill="white" />
        <rect x="-20" y="-20" width="40" height="40" rx={innerR} fill="black" />
      </mask>
      <rect x="-40" y="-40" width="80" height="80" rx={outerR} fill={primaryColor} mask="url(#donut-hole)" />
    </g>
  );
};
