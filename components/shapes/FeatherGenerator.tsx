"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from './ShapeRegistry';

export const FeatherGenerator = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { count, radius, primaryColor, secondaryColor, rotation, strokeWidth } = config;

  const barbs = Math.max(4, count);
  const cx = 50;
  const cy = 50;
  const featherLength = radius * 1.8;
  const featherWidth = radius * 0.8;

  // Create barbs on both sides
  const barbElements = [];
  for (let i = 0; i < barbs; i++) {
    const t = (i + 1) / (barbs + 1);
    const y = cy - featherLength / 2 + t * featherLength;
    const barbLength = featherWidth * (1 - Math.abs(t - 0.5) * 1.5);
    
    // Left barb
    barbElements.push(
      <line
        key={`l-${i}`}
        x1={cx}
        y1={y}
        x2={cx - barbLength}
        y2={y - 5}
        stroke={primaryColor}
        strokeWidth={strokeWidth * 0.5}
      />
    );
    // Right barb
    barbElements.push(
      <line
        key={`r-${i}`}
        x1={cx}
        y1={y}
        x2={cx + barbLength}
        y2={y - 5}
        stroke={primaryColor}
        strokeWidth={strokeWidth * 0.5}
      />
    );
  }

  return (
    <g transform={`rotate(${rotation} ${cx} ${cy})`}>
      {/* Central rachis (spine) */}
      <line
        x1={cx}
        y1={cy - featherLength / 2}
        x2={cx}
        y2={cy + featherLength / 2}
        stroke={secondaryColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      {barbElements}
    </g>
  );
};

