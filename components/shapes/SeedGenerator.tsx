"use client";

import { useEditorStore } from '@/store/use-store';
import { seededRandom } from '@/lib/random';
import { polarToCartesian } from '@/lib/geometry';
import { ShapeGeneratorProps } from './ShapeRegistry';

export const SeedGenerator = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { count, radius, primaryColor, seed, rotation } = config;

  const seeds = Math.max(3, count);
  const cx = 50;
  const cy = 50;

  return (
    <g transform={`rotate(${rotation} ${cx} ${cy})`}>
      {Array.from({ length: seeds }).map((_, i) => {
        const angle = (i / seeds) * 360 + seededRandom(seed + i) * 30;
        const dist = radius * 0.2 + seededRandom(seed + i + 100) * radius * 0.5;
        const { x, y } = polarToCartesian(cx, cy, dist, angle);
        
        const seedWidth = 2 + seededRandom(seed + i + 200) * 3;
        const seedHeight = seedWidth * 2;
        const seedRotation = angle + 90;
        
        return (
          <ellipse
            key={i}
            cx={x}
            cy={y}
            rx={seedWidth}
            ry={seedHeight}
            fill={primaryColor}
            transform={`rotate(${seedRotation} ${x} ${y})`}
          />
        );
      })}
    </g>
  );
};

