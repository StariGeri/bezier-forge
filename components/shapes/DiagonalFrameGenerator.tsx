"use client";

import { useEditorStore } from '@/store/use-store';

export const DiagonalFrameGenerator = ({ config: overrideConfig }: { config?: any }) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { radius, primaryColor, secondaryColor, strokeWidth, rotation } = config;

  const cx = 50;
  const cy = 50;
  const size = radius * 1.3;
  const innerGap = radius * 0.25;
  const thickness = strokeWidth > 0 ? strokeWidth * 1.5 : 3;

  return (
    <g transform={`rotate(${rotation}, ${cx}, ${cy})`}>
      {/* Outer square */}
      <rect
        x={cx - size}
        y={cy - size}
        width={size * 2}
        height={size * 2}
        fill={primaryColor}
        stroke={secondaryColor}
        strokeWidth={strokeWidth > 0 ? strokeWidth * 0.5 : 0}
      />
      
      {/* Diagonal lines from corners to center forming X */}
      <line
        x1={cx - size}
        y1={cy - size}
        x2={cx - innerGap}
        y2={cy - innerGap}
        stroke={secondaryColor}
        strokeWidth={thickness}
      />
      <line
        x1={cx + size}
        y1={cy - size}
        x2={cx + innerGap}
        y2={cy - innerGap}
        stroke={secondaryColor}
        strokeWidth={thickness}
      />
      <line
        x1={cx + size}
        y1={cy + size}
        x2={cx + innerGap}
        y2={cy + innerGap}
        stroke={secondaryColor}
        strokeWidth={thickness}
      />
      <line
        x1={cx - size}
        y1={cy + size}
        x2={cx - innerGap}
        y2={cy + innerGap}
        stroke={secondaryColor}
        strokeWidth={thickness}
      />
    </g>
  );
};

