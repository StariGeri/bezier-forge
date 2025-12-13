"use client";

import { useEditorStore } from '@/store/use-store';
import { seededRandom } from '@/lib/random';

export const GlitchGenerator = ({ config: overrideConfig }: { config?: any }) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { count, radius, primaryColor, secondaryColor, seed } = config;

  const slices = Math.max(5, count * 2);
  const height = radius * 2;
  const sliceHeight = height / slices;
  
  return (
    <g transform="translate(50, 50)">
        {Array.from({ length: slices }).map((_, i) => {
            const offset = (seededRandom(seed + i) - 0.5) * 20; // Glitch offset
            const y = -radius + i * sliceHeight;
            const w = radius * 1.5; // Fixed width block for now, could be dynamic
            
            return (
                <rect
                    key={i}
                    x={-w/2 + offset}
                    y={y}
                    width={w}
                    height={sliceHeight * 0.9}
                    fill={i % 3 === 0 ? secondaryColor : primaryColor}
                />
            )
        })}
    </g>
  );
};

