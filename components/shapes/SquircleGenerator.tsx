"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from './ShapeRegistry';

export const SquircleGenerator = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { radius, primaryColor, strokeWidth, rotation, roundness } = config;

  const cx = 50;
  const cy = 50;
  const size = radius * 1.1;
  const cornerRadius = radius * 0.35 + (roundness * 0.2);
  const thickness = strokeWidth > 0 ? strokeWidth * 2 : 4;

  const r = Math.min(cornerRadius, size);

  const squirclePath = `
    M ${cx - size + r} ${cy - size}
    L ${cx + size - r} ${cy - size}
    Q ${cx + size} ${cy - size} ${cx + size} ${cy - size + r}
    L ${cx + size} ${cy + size - r}
    Q ${cx + size} ${cy + size} ${cx + size - r} ${cy + size}
    L ${cx - size + r} ${cy + size}
    Q ${cx - size} ${cy + size} ${cx - size} ${cy + size - r}
    L ${cx - size} ${cy - size + r}
    Q ${cx - size} ${cy - size} ${cx - size + r} ${cy - size}
    Z
  `;

  return (
    <g transform={`rotate(${rotation}, ${cx}, ${cy})`}>
      <path
        d={squirclePath}
        fill="none"
        stroke={primaryColor}
        strokeWidth={thickness}
      />
    </g>
  );
};



