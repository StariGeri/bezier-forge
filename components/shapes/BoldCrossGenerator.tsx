"use client";

import { useEditorStore } from '@/store/use-store';

export const BoldCrossGenerator = ({ config: overrideConfig }: { config?: any }) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { radius, primaryColor, secondaryColor, strokeWidth, rotation } = config;

  const cx = 50;
  const cy = 50;
  const armLength = radius * 1.1;
  const armWidth = radius * 0.35;

  // Bold X shape with thick rectangular arms
  const crossPath = `
    M ${cx - armWidth} ${cy - armLength}
    L ${cx + armWidth} ${cy - armLength}
    L ${cx + armWidth} ${cy - armWidth}
    L ${cx + armLength} ${cy - armWidth}
    L ${cx + armLength} ${cy + armWidth}
    L ${cx + armWidth} ${cy + armWidth}
    L ${cx + armWidth} ${cy + armLength}
    L ${cx - armWidth} ${cy + armLength}
    L ${cx - armWidth} ${cy + armWidth}
    L ${cx - armLength} ${cy + armWidth}
    L ${cx - armLength} ${cy - armWidth}
    L ${cx - armWidth} ${cy - armWidth}
    Z
  `;

  return (
    <g transform={`rotate(${rotation + 45}, ${cx}, ${cy})`}>
      <path
        d={crossPath}
        fill={primaryColor}
        stroke={secondaryColor}
        strokeWidth={strokeWidth > 0 ? strokeWidth : 0}
      />
    </g>
  );
};

