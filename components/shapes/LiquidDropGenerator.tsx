"use client";

import { useEditorStore } from '@/store/use-store';
import { createSpline } from '@/lib/spline';
import { seededRandom } from '@/lib/random';

export const LiquidDropGenerator = ({ config: overrideConfig }: { config?: any }) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { radius, primaryColor, seed } = config;

  // Teardrop shape simulation with random wobble
  const points = [
      { x: 50, y: 50 - radius }, // Top
      { x: 50 + radius * 0.8, y: 50 + radius * 0.2 }, // Right bulge
      { x: 50, y: 50 + radius }, // Bottom
      { x: 50 - radius * 0.8, y: 50 + radius * 0.2 }, // Left bulge
  ];
  
  // Add some random noise
  points.forEach((p, i) => {
      if (i !== 0) { // Keep top fixedish
          p.x += seededRandom(seed + i) * 10 - 5;
          p.y += seededRandom(seed + i + 10) * 10 - 5;
      }
  });
  
  const pathData = createSpline(points, 1, true);

  return (
    <path
      d={pathData}
      fill={primaryColor}
    />
  );
};

