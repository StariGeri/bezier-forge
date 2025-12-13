"use client";

import { useEditorStore } from '@/store/use-store';
import { getSpiralPoints } from '@/lib/geometry';
import { createSpline } from '@/lib/spline';
import { ShapeGeneratorProps } from './ShapeRegistry';

export const VineGenerator = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { count, radius, primaryColor, secondaryColor, strokeWidth } = config;
  
  // Organic spiral with leaves
  const points = getSpiralPoints(3, 10, radius, 50, 50, 0);
  const vinePath = createSpline(points, 0.5, false);
  
  const leaves = points.filter((_, i) => i % (Math.floor(20/count) + 1) === 0);

  return (
    <g>
        <path d={vinePath} fill="none" stroke={primaryColor} strokeWidth={strokeWidth} strokeLinecap="round" />
        {leaves.map((p, i) => (
            <ellipse
                key={i}
                cx={p.x}
                cy={p.y}
                rx={5}
                ry={2}
                fill={secondaryColor}
                transform={`rotate(${i * 20}, ${p.x}, ${p.y})`}
            />
        ))}
    </g>
  );
};

