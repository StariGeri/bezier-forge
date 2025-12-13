"use client";

import { useEditorStore } from '@/store/use-store';
import { createSpline } from '@/lib/spline';
import { ShapeGeneratorProps } from './ShapeRegistry';

export const KnotGenerator = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { count, radius, primaryColor, strokeWidth } = config;
  
  const points = [];
  const resolution = 100;
  const loops = Math.max(2, Math.floor(count / 2));
  
  for(let i=0; i<=resolution; i++) {
      const t = (i / resolution) * Math.PI * 2;
      const r = radius * (0.8 + 0.2 * Math.cos(loops * t));
      const x = 50 + r * Math.cos(t);
      const y = 50 + r * Math.sin(t);
      points.push({x, y});
  }
  
  const pathData = createSpline(points, 1, true);

  return (
    <path
        d={pathData}
        fill="none"
        stroke={primaryColor}
        strokeWidth={strokeWidth}
    />
  );
};

