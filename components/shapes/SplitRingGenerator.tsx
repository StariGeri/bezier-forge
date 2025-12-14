"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from './ShapeRegistry';
export const SplitRingGenerator = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { radius, primaryColor, strokeWidth, rotation } = config;

  const cx = 50;
  const cy = 50;
  const outerRadius = radius * 1.1;
  const innerRadius = radius * 0.4;
  const thickness = strokeWidth > 0 ? strokeWidth * 1.5 : 3;

  return (
    <g transform={`rotate(${rotation}, ${cx}, ${cy})`}>
      {/* Outer ring */}
      <circle
        cx={cx}
        cy={cy}
        r={outerRadius}
        fill="none"
        stroke={primaryColor}
        strokeWidth={thickness}
      />
      
      {/* Horizontal line through center */}
      <line
        x1={cx - outerRadius}
        y1={cy}
        x2={cx + outerRadius}
        y2={cy}
        stroke={primaryColor}
        strokeWidth={thickness}
      />
      
      {/* Inner filled circle */}
      <circle
        cx={cx}
        cy={cy}
        r={innerRadius}
        fill={primaryColor}
      />
    </g>
  );
};



