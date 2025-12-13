"use client";

import { useEditorStore } from '@/store/use-store';
import { seededRandom } from '@/lib/random';
import { polarToCartesian } from '@/lib/geometry';
import { createSpline } from '@/lib/spline';
import { ShapeGeneratorProps } from './ShapeRegistry';

export const NebulaGenerator = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { count, radius, primaryColor, secondaryColor, seed } = config;

  const cx = 50;
  const cy = 50;
  const clouds = Math.max(3, Math.min(count / 2, 6));

  const cloudElements = [];

  for (let c = 0; c < clouds; c++) {
    const cloudCx = cx + (seededRandom(seed + c) - 0.5) * radius * 0.8;
    const cloudCy = cy + (seededRandom(seed + c + 50) - 0.5) * radius * 0.8;
    const cloudRadius = radius * 0.4 + seededRandom(seed + c + 100) * radius * 0.3;
    
    const numPoints = 8;
    const points = [];
    
    for (let i = 0; i < numPoints; i++) {
      const angle = (i / numPoints) * 360;
      const variation = seededRandom(seed + c * 100 + i) * cloudRadius * 0.4;
      const r = cloudRadius + variation;
      const { x, y } = polarToCartesian(cloudCx, cloudCy, r, angle);
      points.push({ x, y });
    }
    
    const pathData = createSpline(points, 1, true);
    
    cloudElements.push(
      <path
        key={c}
        d={pathData}
        fill={c % 2 === 0 ? primaryColor : secondaryColor}
        opacity={0.3 + seededRandom(seed + c + 200) * 0.3}
      />
    );
  }

  return <g>{cloudElements}</g>;
};

