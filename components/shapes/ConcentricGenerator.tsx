"use client";

import { useEditorStore } from '@/store/use-store';
import { getRegularPolygonPoints } from '@/lib/geometry';

export const ConcentricGenerator = ({ config: overrideConfig }: { config?: any }) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { count, radius, primaryColor, secondaryColor, strokeWidth } = config;

  const rings = Math.max(1, Math.min(count, 20)); // Limit rings
  const step = radius / rings;

  return (
    <g transform="translate(50, 50)">
      {Array.from({ length: rings }).map((_, i) => {
        const r = radius - (i * step);
        if (r <= 0) return null;
        
        return (
            <circle
                key={i}
                cx={0}
                cy={0}
                r={r}
                fill="none"
                stroke={i % 2 === 0 ? primaryColor : secondaryColor}
                strokeWidth={strokeWidth}
            />
        );
      })}
    </g>
  );
};

