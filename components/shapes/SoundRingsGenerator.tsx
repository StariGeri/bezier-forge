"use client";

import { useEditorStore } from '@/store/use-store';
import { seededRandom } from '@/lib/random';

export const SoundRingsGenerator = ({ config: overrideConfig }: { config?: any }) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { count, radius, primaryColor, strokeWidth, rotation, seed } = config;

  const rings = Math.max(3, Math.min(12, count));
  const maxRadius = radius * 1.2;
  const minRadius = radius * 0.2;

  return (
    <g transform={`rotate(${rotation}, 50, 50)`}>
      {Array.from({ length: rings }).map((_, i) => {
        const progress = i / (rings - 1);
        const r = minRadius + (maxRadius - minRadius) * progress;
        // Varying stroke width based on seed
        const widthVariation = seededRandom(seed + i * 13);
        const sw = strokeWidth * (0.5 + widthVariation * 1.5);
        // Fade opacity for outer rings
        const opacity = 1 - progress * 0.6;

        return (
          <circle
            key={i}
            cx={50}
            cy={50}
            r={r}
            fill="none"
            stroke={primaryColor}
            strokeWidth={sw}
            opacity={opacity}
          />
        );
      })}
    </g>
  );
};

