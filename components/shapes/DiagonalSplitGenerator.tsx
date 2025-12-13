"use client";

import { useEditorStore } from '@/store/use-store';

export const DiagonalSplitGenerator = ({ config: overrideConfig }: { config?: any }) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { radius, primaryColor, secondaryColor, strokeWidth, rotation } = config;

  const cx = 50;
  const cy = 50;
  const size = radius * 1.3;
  const gap = radius * 0.12;

  // Two triangles split diagonally with a gap - lightning bolt style
  const topTriangle = `
    M ${cx - size} ${cy - size}
    L ${cx + size * 0.3} ${cy - size}
    L ${cx - gap} ${cy - gap}
    L ${cx - size} ${cy + size * 0.3}
    Z
  `;

  const bottomTriangle = `
    M ${cx + size} ${cy + size}
    L ${cx - size * 0.3} ${cy + size}
    L ${cx + gap} ${cy + gap}
    L ${cx + size} ${cy - size * 0.3}
    Z
  `;

  return (
    <g transform={`rotate(${rotation}, ${cx}, ${cy})`}>
      <path
        d={topTriangle}
        fill={primaryColor}
        stroke={secondaryColor}
        strokeWidth={strokeWidth > 0 ? strokeWidth * 0.5 : 0}
      />
      <path
        d={bottomTriangle}
        fill={primaryColor}
        stroke={secondaryColor}
        strokeWidth={strokeWidth > 0 ? strokeWidth * 0.5 : 0}
      />
    </g>
  );
};

