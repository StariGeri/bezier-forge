"use client";

import { useEditorStore } from '@/store/use-store';
import { seededRandom } from '@/lib/random';
import { polarToCartesian } from '@/lib/geometry';

export const ShatterGenerator = ({ config: overrideConfig }: { config?: any }) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { count, radius, primaryColor, secondaryColor, seed, rotation } = config;

  const shards = Math.max(6, count);
  const cx = 50;
  const cy = 50;

  return (
    <g transform={`rotate(${rotation} ${cx} ${cy})`}>
      {Array.from({ length: shards }).map((_, i) => {
        const angle = (i / shards) * 360;
        const nextAngle = ((i + 1) / shards) * 360;
        
        const innerDist = radius * 0.1 + seededRandom(seed + i) * radius * 0.2;
        const outerDist = radius * 0.5 + seededRandom(seed + i + 100) * radius * 0.5;
        
        const inner1 = polarToCartesian(cx, cy, innerDist, angle + 2);
        const inner2 = polarToCartesian(cx, cy, innerDist, nextAngle - 2);
        const outer1 = polarToCartesian(cx, cy, outerDist, angle + seededRandom(seed + i + 200) * 5);
        const outer2 = polarToCartesian(cx, cy, outerDist * 0.9, nextAngle - seededRandom(seed + i + 300) * 5);
        
        return (
          <path
            key={i}
            d={`M ${inner1.x} ${inner1.y} L ${outer1.x} ${outer1.y} L ${outer2.x} ${outer2.y} L ${inner2.x} ${inner2.y} Z`}
            fill={i % 2 === 0 ? primaryColor : secondaryColor}
            opacity={0.7 + seededRandom(seed + i + 400) * 0.3}
          />
        );
      })}
    </g>
  );
};

