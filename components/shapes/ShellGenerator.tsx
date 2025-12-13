"use client";

import { useEditorStore } from '@/store/use-store';
import { polarToCartesian } from '@/lib/geometry';
import { ShapeGeneratorProps } from './ShapeRegistry';

export const ShellGenerator = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { count, radius, primaryColor, strokeWidth, rotation } = config;

  const cx = 50;
  const cy = 50;
  const turns = Math.max(2, count / 3);
  const points: { x: number; y: number }[] = [];

  // Golden ratio spiral (nautilus shell)
  const goldenRatio = 1.618;
  const totalAngle = turns * 360;
  const steps = Math.max(50, count * 10);

  for (let i = 0; i <= steps; i++) {
    const angle = (i / steps) * totalAngle;
    const t = i / steps;
    const r = (radius * 0.1) * Math.pow(goldenRatio, t * turns);
    const { x, y } = polarToCartesian(cx, cy, Math.min(r, radius), angle);
    points.push({ x, y });
  }

  const pathData = `M ${points.map(p => `${p.x},${p.y}`).join(' L ')}`;

  return (
    <g transform={`rotate(${rotation} ${cx} ${cy})`}>
      <path
        d={pathData}
        fill="none"
        stroke={primaryColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </g>
  );
};

