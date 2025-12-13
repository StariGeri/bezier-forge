"use client";

import { useEditorStore } from '@/store/use-store';
import { getRegularPolygonPoints } from '@/lib/geometry';
import { ShapeGeneratorProps } from './ShapeRegistry';

export const PolygonGenerator = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { count, radius, rotation, primaryColor, strokeWidth, roundness } = config;
  
  // count = number of sides (min 3)
  const sides = Math.max(3, count);
  const points = getRegularPolygonPoints(sides, radius, 50, 50, rotation);
  
  const pathData = points.map((p, i) => 
    (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)
  ).join(' ') + ' Z';

  return (
    <path
      d={pathData}
      fill={primaryColor}
      stroke={primaryColor}
      strokeWidth={strokeWidth}
      strokeLinejoin={roundness > 50 ? "round" : "miter"}
    />
  );
};

