"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from '../shapes/ShapeRegistry';

export const BullseyeRingsLogo = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { primaryColor, secondaryColor, roundness } = config;
  
  const r1 = (roundness / 100) * 40;
  const r2 = (roundness / 100) * 25;
  const r3 = (roundness / 100) * 10;
  
  return (
    <g transform="translate(50, 50)">
      <rect x="-40" y="-40" width="80" height="80" rx={r1} fill={primaryColor} />
      <rect x="-25" y="-25" width="50" height="50" rx={r2} fill={secondaryColor} />
      <rect x="-10" y="-10" width="20" height="20" rx={r3} fill={primaryColor} />
    </g>
  );
};
