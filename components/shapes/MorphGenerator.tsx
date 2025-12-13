"use client";

import { useEditorStore } from '@/store/use-store';
import { polarToCartesian } from '@/lib/geometry';
import { seededRandom } from '@/lib/random';
import { createSpline } from '@/lib/spline';
import { ShapeGeneratorProps } from './ShapeRegistry';

export const MorphGenerator = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { radius, primaryColor, secondaryColor, seed, roundness } = config;

  const cx = 50;
  const cy = 50;
  const numPoints = 8;

  // Create two overlapping morphing shapes
  const createMorphShape = (seedOffset: number, radiusScale: number, color: string, opacity: number) => {
    const points = [];
    
    for (let i = 0; i < numPoints; i++) {
      const angle = (i / numPoints) * 360;
      const variation = seededRandom(seed + seedOffset + i) * radius * 0.4;
      const r = radius * radiusScale + variation;
      const angleOffset = (seededRandom(seed + seedOffset + i + 100) - 0.5) * 20;
      const { x, y } = polarToCartesian(cx, cy, r, angle + angleOffset);
      points.push({ x, y });
    }
    
    const pathData = createSpline(points, roundness / 100, true);
    
    return (
      <path
        d={pathData}
        fill={color}
        opacity={opacity}
      />
    );
  };

  return (
    <g>
      {createMorphShape(0, 0.9, secondaryColor, 0.5)}
      {createMorphShape(50, 0.7, primaryColor, 0.8)}
    </g>
  );
};

