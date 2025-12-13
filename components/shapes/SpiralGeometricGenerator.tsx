"use client";

import { useEditorStore } from '@/store/use-store';
import { getSpiralPoints } from '@/lib/geometry';
import { ShapeGeneratorProps } from './ShapeRegistry';

export const SpiralGeometricGenerator = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { count, radius, rotation, primaryColor, strokeWidth } = config;
  
  // count = turns (approx)
  // roundness or density affects points per turn
  const points = getSpiralPoints(Math.max(1, count / 2), 50, radius, 50, 50, rotation);
  
  const pathData = points.map((p, i) => 
    (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)
  ).join(' ');

  return (
    <path
      d={pathData}
      fill="none"
      stroke={primaryColor}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
  );
};

