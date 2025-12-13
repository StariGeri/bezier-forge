"use client";

import { useEditorStore } from '@/store/use-store';
import { seededRandom } from '@/lib/random';

export const EqualizerGenerator = ({ config: overrideConfig }: { config?: any }) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { count, radius, primaryColor, secondaryColor, rotation, seed, roundness } = config;

  const bars = Math.max(3, Math.min(20, count));
  const barWidth = 60 / bars;
  const gap = barWidth * 0.2;
  const actualBarWidth = barWidth - gap;
  const startX = 20;

  return (
    <g transform={`rotate(${rotation}, 50, 50)`}>
      {Array.from({ length: bars }).map((_, i) => {
        const randomHeight = seededRandom(seed + i * 7) * 0.8 + 0.2;
        const height = radius * randomHeight * 1.2;
        const x = startX + i * barWidth;
        const y = 50 - height / 2;
        
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width={actualBarWidth}
            height={height}
            fill={i % 2 === 0 ? primaryColor : secondaryColor}
            rx={roundness * 0.5}
            ry={roundness * 0.5}
          />
        );
      })}
    </g>
  );
};

