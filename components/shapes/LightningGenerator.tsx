"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from './ShapeRegistry';

export const LightningGenerator = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { count, radius, primaryColor, secondaryColor, strokeWidth, rotation } = config;

  const segments = Math.max(2, Math.min(6, Math.floor(count / 2)));
  const height = radius * 1.6;
  const width = radius * 0.5;
  
  const top = 50 - height / 2;
  const segmentHeight = height / segments;
  
  // Build zigzag path
  const points: { x: number; y: number }[] = [{ x: 50, y: top }];
  
  for (let i = 0; i < segments; i++) {
    const y = top + (i + 0.5) * segmentHeight;
    const direction = i % 2 === 0 ? 1 : -1;
    const xOffset = width * direction * (0.8 + (i / segments) * 0.4);
    points.push({ x: 50 + xOffset, y });
  }
  
  points.push({ x: 50, y: top + height });

  // Create bolt shape with thickness
  const pathLeft: string[] = [];
  const pathRight: string[] = [];
  const thickness = strokeWidth * 1.5;
  
  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    pathLeft.push(`${i === 0 ? 'M' : 'L'} ${p.x - thickness} ${p.y}`);
    pathRight.unshift(`L ${p.x + thickness} ${p.y}`);
  }

  const boltPath = pathLeft.join(' ') + ' ' + pathRight.join(' ') + ' Z';

  return (
    <g transform={`rotate(${rotation}, 50, 50)`}>
      <path
        d={boltPath}
        fill={primaryColor}
        stroke={secondaryColor}
        strokeWidth={strokeWidth * 0.3}
        strokeLinejoin="round"
      />
    </g>
  );
};

