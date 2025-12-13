"use client";

import { useEditorStore } from '@/store/use-store';
import { polarToCartesian } from '@/lib/geometry';
import { ShapeGeneratorProps } from './ShapeRegistry';

export const SunburstGenerator = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { count, radius, primaryColor, secondaryColor, rotation } = config;

  const rays = Math.max(8, count);
  const cx = 50;
  const cy = 50;
  const innerRadius = radius * 0.3;

  const rayPaths = [];
  for (let i = 0; i < rays; i++) {
    const angle = (i / rays) * 360 + rotation;
    const nextAngle = ((i + 0.5) / rays) * 360 + rotation;
    
    const innerPoint = polarToCartesian(cx, cy, innerRadius, angle);
    const outerPoint = polarToCartesian(cx, cy, radius, angle);
    const innerNext = polarToCartesian(cx, cy, innerRadius, nextAngle);
    
    rayPaths.push(
      <path
        key={i}
        d={`M ${innerPoint.x} ${innerPoint.y} L ${outerPoint.x} ${outerPoint.y} L ${innerNext.x} ${innerNext.y} Z`}
        fill={i % 2 === 0 ? primaryColor : secondaryColor}
      />
    );
  }

  return (
    <g>
      <circle cx={cx} cy={cy} r={innerRadius} fill={primaryColor} />
      {rayPaths}
    </g>
  );
};

