"use client";

import { useEditorStore } from '@/store/use-store';
import { polarToCartesian } from '@/lib/geometry';
import { ShapeGeneratorProps } from './ShapeRegistry';

export const VortexGenerator = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { count, radius, primaryColor, strokeWidth, rotation } = config;

  const arms = Math.max(3, count / 2);
  const cx = 50;
  const cy = 50;
  const turns = 2;

  const spiralArms = [];
  
  for (let arm = 0; arm < arms; arm++) {
    const armOffset = (arm / arms) * 360 + rotation;
    const points: { x: number; y: number }[] = [];
    const steps = 30;
    
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const angle = armOffset + t * turns * 360;
      const r = t * radius;
      const { x, y } = polarToCartesian(cx, cy, r, angle);
      points.push({ x, y });
    }
    
    const pathData = `M ${points.map(p => `${p.x},${p.y}`).join(' L ')}`;
    
    spiralArms.push(
      <path
        key={arm}
        d={pathData}
        fill="none"
        stroke={primaryColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        opacity={1 - (arm / arms) * 0.3}
      />
    );
  }

  return <g>{spiralArms}</g>;
};

