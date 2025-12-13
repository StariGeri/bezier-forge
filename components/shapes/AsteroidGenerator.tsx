"use client";

import { useEditorStore } from '@/store/use-store';
import { seededRandom } from '@/lib/random';
import { polarToCartesian } from '@/lib/geometry';
import { createSpline } from '@/lib/spline';

export const AsteroidGenerator = ({ config: overrideConfig }: { config?: any }) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { radius, primaryColor, secondaryColor, seed, rotation, roundness } = config;

  const cx = 50;
  const cy = 50;
  const numPoints = 12;
  const points = [];

  // Create irregular rocky shape
  for (let i = 0; i < numPoints; i++) {
    const angle = (i / numPoints) * 360;
    const variation = seededRandom(seed + i) * radius * 0.4;
    const r = radius * 0.6 + variation;
    const { x, y } = polarToCartesian(cx, cy, r, angle);
    points.push({ x, y });
  }

  const pathData = createSpline(points, roundness / 100, true);

  // Add crater circles
  const craters = [];
  for (let i = 0; i < 3; i++) {
    const craterAngle = seededRandom(seed + i + 100) * 360;
    const craterDist = seededRandom(seed + i + 200) * radius * 0.4;
    const { x, y } = polarToCartesian(cx, cy, craterDist, craterAngle);
    const craterSize = 2 + seededRandom(seed + i + 300) * 4;
    
    craters.push(
      <circle
        key={i}
        cx={x}
        cy={y}
        r={craterSize}
        fill={secondaryColor}
        opacity={0.3}
      />
    );
  }

  return (
    <g transform={`rotate(${rotation} ${cx} ${cy})`}>
      <path d={pathData} fill={primaryColor} />
      {craters}
    </g>
  );
};

