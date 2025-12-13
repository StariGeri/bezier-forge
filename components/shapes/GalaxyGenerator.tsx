"use client";

import { useEditorStore } from '@/store/use-store';
import { polarToCartesian } from '@/lib/geometry';
import { seededRandom } from '@/lib/random';
import { ShapeGeneratorProps } from './ShapeRegistry';

export const GalaxyGenerator = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { count, radius, primaryColor, secondaryColor, rotation, seed } = config;

  const arms = Math.max(2, Math.min(count / 3, 4));
  const pointsPerArm = Math.max(10, count);
  const cx = 50;
  const cy = 50;

  const spiralPoints: React.ReactElement[] = [];
  
  for (let arm = 0; arm < arms; arm++) {
    const armOffset = (arm / arms) * 360;
    
    for (let i = 0; i < pointsPerArm; i++) {
      const t = i / pointsPerArm;
      const angle = armOffset + t * 360 + rotation;
      const r = t * radius;
      const spread = seededRandom(seed + arm * 100 + i) * 5;
      const { x, y } = polarToCartesian(cx, cy, r + spread, angle);
      
      const dotSize = 0.8 + (1 - t) * 1.5;
      const opacity = 0.3 + (1 - t) * 0.7;
      
      spiralPoints.push(
        <circle
          key={`${arm}-${i}`}
          cx={x}
          cy={y}
          r={dotSize}
          fill={arm % 2 === 0 ? primaryColor : secondaryColor}
          opacity={opacity}
        />
      );
    }
  }

  return (
    <g>
      <circle cx={cx} cy={cy} r={radius * 0.1} fill={primaryColor} />
      {spiralPoints}
    </g>
  );
};

