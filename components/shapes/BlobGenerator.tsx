"use client";

import { useEditorStore } from '@/store/use-store';
import { createSpline } from '@/lib/spline';
import { polarToCartesian } from '@/lib/geometry';
import { seededRandom } from '@/lib/random';
import { ShapeGeneratorProps } from './ShapeRegistry';

export const BlobGenerator = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { count, radius, primaryColor, seed, roundness } = config;
  
  const points = [];
  const numPoints = Math.max(3, count); // Minimum 3 points for a shape
  
  for (let i = 0; i < numPoints; i++) {
    const angle = (i / numPoints) * 360;
    // Add noise based on seed
    const noise = seededRandom(seed + i) * (100 - roundness); // Less roundness = more noise
    const r = radius + noise;
    
    const { x, y } = polarToCartesian(50, 50, r, angle);
    points.push({ x, y });
  }
  
  const pathData = createSpline(points, 1, true);

  return (
    <path
      d={pathData}
      fill={primaryColor}
    />
  );
};

