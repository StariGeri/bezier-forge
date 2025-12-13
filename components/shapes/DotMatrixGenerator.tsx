"use client";

import { useEditorStore } from '@/store/use-store';
import { seededRandom } from '@/lib/random';
import { ShapeGeneratorProps } from './ShapeRegistry';

export const DotMatrixGenerator = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { count, radius, primaryColor, seed } = config;

  const dots = Math.max(5, count * 2);

  return (
    <g>
      {Array.from({ length: dots }).map((_, i) => {
        const x = 10 + seededRandom(seed + i) * 80;
        const y = 10 + seededRandom(seed + i + 100) * 80;
        const r = 1 + seededRandom(seed + i + 200) * (radius / 10);
        const opacity = 0.4 + seededRandom(seed + i + 300) * 0.6;
        
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={r}
            fill={primaryColor}
            opacity={opacity}
          />
        );
      })}
    </g>
  );
};

