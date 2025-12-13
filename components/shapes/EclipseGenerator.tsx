"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from './ShapeRegistry';

export const EclipseGenerator = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { radius, primaryColor, secondaryColor, roundness, rotation } = config;

  const cx = 50;
  const cy = 50;
  const outerRadius = radius;
  const innerRadius = radius * 0.9;
  const offset = (100 - roundness) / 100 * radius * 0.3; // Offset creates eclipse effect

  return (
    <g transform={`rotate(${rotation} ${cx} ${cy})`}>
      {/* Outer glow/corona */}
      <circle
        cx={cx}
        cy={cy}
        r={outerRadius * 1.15}
        fill="none"
        stroke={secondaryColor}
        strokeWidth={outerRadius * 0.1}
        opacity={0.3}
      />
      {/* Main circle */}
      <circle
        cx={cx}
        cy={cy}
        r={outerRadius}
        fill={secondaryColor}
      />
      {/* Eclipsing circle */}
      <circle
        cx={cx + offset}
        cy={cy - offset}
        r={innerRadius}
        fill={primaryColor}
      />
    </g>
  );
};

