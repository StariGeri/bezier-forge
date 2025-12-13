"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from './ShapeRegistry';

export const AnchorGenerator = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { radius, primaryColor, secondaryColor, strokeWidth, rotation } = config;

  const scale = radius / 30;
  const cx = 50;
  const cy = 50;

  // Anchor proportions
  const ringRadius = 6 * scale;
  const shankHeight = 35 * scale;
  const armWidth = 28 * scale;
  const flukeSize = 10 * scale;

  // Ring at top
  const ringY = cy - shankHeight / 2 - ringRadius;

  // Crossbar position
  const crossbarY = cy - shankHeight / 4;

  // Flukes at bottom
  const bottomY = cy + shankHeight / 2;

  return (
    <g transform={`rotate(${rotation}, ${cx}, ${cy})`}>
      {/* Ring at top */}
      <circle
        cx={cx}
        cy={ringY}
        r={ringRadius}
        fill="none"
        stroke={primaryColor}
        strokeWidth={strokeWidth}
      />
      
      {/* Vertical shank */}
      <line
        x1={cx}
        y1={ringY + ringRadius}
        x2={cx}
        y2={bottomY}
        stroke={primaryColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      
      {/* Horizontal crossbar */}
      <line
        x1={cx - armWidth / 3}
        y1={crossbarY}
        x2={cx + armWidth / 3}
        y2={crossbarY}
        stroke={primaryColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      
      {/* Left arm and fluke */}
      <path
        d={`
          M ${cx} ${bottomY}
          Q ${cx - armWidth / 4} ${bottomY + 2 * scale}, ${cx - armWidth / 2} ${bottomY - flukeSize / 2}
          L ${cx - armWidth / 2 - flukeSize / 3} ${bottomY - flukeSize * 1.2}
        `}
        fill="none"
        stroke={primaryColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Right arm and fluke */}
      <path
        d={`
          M ${cx} ${bottomY}
          Q ${cx + armWidth / 4} ${bottomY + 2 * scale}, ${cx + armWidth / 2} ${bottomY - flukeSize / 2}
          L ${cx + armWidth / 2 + flukeSize / 3} ${bottomY - flukeSize * 1.2}
        `}
        fill="none"
        stroke={primaryColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Decorative center point */}
      <circle
        cx={cx}
        cy={bottomY}
        r={2 * scale}
        fill={secondaryColor}
        stroke={primaryColor}
        strokeWidth={strokeWidth / 2}
      />
    </g>
  );
};

