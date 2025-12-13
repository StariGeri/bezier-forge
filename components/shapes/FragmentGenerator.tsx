"use client";

import { useEditorStore } from '@/store/use-store';
import { seededRandom } from '@/lib/random';
import { polarToCartesian } from '@/lib/geometry';

export const FragmentGenerator = ({ config: overrideConfig }: { config?: any }) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { count, radius, primaryColor, seed, rotation } = config;

  const fragments = Math.max(4, count);
  const cx = 50;
  const cy = 50;

  return (
    <g transform={`rotate(${rotation} ${cx} ${cy})`}>
      {Array.from({ length: fragments }).map((_, i) => {
        const angle = (i / fragments) * 360 + seededRandom(seed + i) * 30;
        const dist = radius * 0.3 + seededRandom(seed + i + 100) * radius * 0.7;
        const { x, y } = polarToCartesian(cx, cy, dist, angle);
        
        const size = 3 + seededRandom(seed + i + 200) * 8;
        const fragmentRotation = seededRandom(seed + i + 300) * 360;
        
        // Create triangular fragment
        const points = [
          { x: 0, y: -size },
          { x: size * 0.8, y: size * 0.6 },
          { x: -size * 0.8, y: size * 0.6 },
        ];
        
        const pathData = `M ${points.map(p => `${p.x},${p.y}`).join(' L ')} Z`;
        
        return (
          <path
            key={i}
            d={pathData}
            fill={primaryColor}
            transform={`translate(${x}, ${y}) rotate(${fragmentRotation})`}
            opacity={0.6 + seededRandom(seed + i + 400) * 0.4}
          />
        );
      })}
    </g>
  );
};

