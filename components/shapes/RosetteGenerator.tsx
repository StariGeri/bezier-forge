"use client";

import { useEditorStore } from '@/store/use-store';
import { polarToCartesian } from '@/lib/geometry';
import { ShapeGeneratorProps } from './ShapeRegistry';

export const RosetteGenerator = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { count, radius, primaryColor, secondaryColor, rotation } = config;

  const petals = Math.max(6, count);
  const cx = 50;
  const cy = 50;
  const outerRadius = radius;
  const innerRadius = radius * 0.4;

  const petalPaths = [];
  for (let i = 0; i < petals; i++) {
    const angle = (i / petals) * 360 + rotation;
    const nextAngle = ((i + 1) / petals) * 360 + rotation;
    const midAngle = (angle + nextAngle) / 2;
    
    const inner = polarToCartesian(cx, cy, innerRadius, angle);
    const outer = polarToCartesian(cx, cy, outerRadius, midAngle);
    const innerNext = polarToCartesian(cx, cy, innerRadius, nextAngle);
    
    petalPaths.push(
      <path
        key={i}
        d={`M ${inner.x} ${inner.y} Q ${outer.x} ${outer.y} ${innerNext.x} ${innerNext.y}`}
        fill={i % 2 === 0 ? primaryColor : secondaryColor}
        stroke={primaryColor}
        strokeWidth={0.5}
      />
    );
  }

  return (
    <g>
      {petalPaths}
      <circle cx={cx} cy={cy} r={innerRadius * 0.6} fill={secondaryColor} />
    </g>
  );
};

