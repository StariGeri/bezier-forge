"use client";

import { useEditorStore, EditorConfig } from '@/store/use-store';
import { createSpline } from '@/lib/spline';
import { seededRandom } from '@/lib/random';
import { polarToCartesian } from '@/lib/geometry';

export const AmoebaGenerator = ({ config: overrideConfig }: { config?: EditorConfig }) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { count, radius, primaryColor, seed } = config;

  // Multiple merged blobs
  const nucleiCount = Math.max(2, Math.min(count, 5));
  const paths = [];

  for (let n = 0; n < nucleiCount; n++) {
      const cx = 50 + (seededRandom(seed + n) * 30 - 15);
      const cy = 50 + (seededRandom(seed + n + 100) * 30 - 15);
      const r = radius * (0.5 + seededRandom(seed + n + 200) * 0.5);
      
      const points = [];
      const numPoints = 8;
      for (let i = 0; i < numPoints; i++) {
        const angle = (i / numPoints) * 360;
        const noise = seededRandom(seed + n + i) * 5;
        const { x, y } = polarToCartesian(cx, cy, r + noise, angle);
        points.push({ x, y });
      }
      paths.push(createSpline(points, 1, true));
  }

  return (
    <g>
        {paths.map((d, i) => (
            <path key={i} d={d} fill={primaryColor} opacity={0.7} style={{ mixBlendMode: 'multiply' }} />
        ))}
    </g>
  );
};

