"use client";

import { useEditorStore } from '@/store/use-store';
import { seededRandom } from '@/lib/random';
import { polarToCartesian } from '@/lib/geometry';
import { ShapeGeneratorProps } from './ShapeRegistry';

export const StarClusterGenerator = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { count, radius, primaryColor, seed } = config;

  const stars = Math.max(5, count);
  const cx = 50;
  const cy = 50;

  const createStar = (x: number, y: number, size: number, key: number) => {
    const points = [];
    for (let i = 0; i < 5; i++) {
      const outerAngle = (i * 72) - 90;
      const innerAngle = outerAngle + 36;
      points.push(polarToCartesian(0, 0, size, outerAngle));
      points.push(polarToCartesian(0, 0, size * 0.4, innerAngle));
    }
    const pathData = `M ${points.map(p => `${p.x},${p.y}`).join(' L ')} Z`;
    
    return (
      <path
        key={key}
        d={pathData}
        fill={primaryColor}
        transform={`translate(${x}, ${y})`}
      />
    );
  };

  return (
    <g>
      {Array.from({ length: stars }).map((_, i) => {
        const dist = seededRandom(seed + i) * radius;
        const angle = seededRandom(seed + i + 100) * 360;
        const { x, y } = polarToCartesian(cx, cy, dist, angle);
        const size = 2 + seededRandom(seed + i + 200) * 5;
        
        return createStar(x, y, size, i);
      })}
    </g>
  );
};

