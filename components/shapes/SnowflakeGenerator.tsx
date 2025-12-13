"use client";

import { useEditorStore } from '@/store/use-store';
import { polarToCartesian } from '@/lib/geometry';
import { ShapeGeneratorProps } from './ShapeRegistry';

export const SnowflakeGenerator = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { radius, primaryColor, secondaryColor, strokeWidth, rotation, count } = config;

  const cx = 50;
  const cy = 50;
  const arms = 6; // Classic snowflake symmetry
  const branchLevels = Math.max(2, Math.min(count / 4, 4));

  const elements: React.ReactElement[] = [];

  // Generate each arm of the snowflake
  for (let arm = 0; arm < arms; arm++) {
    const baseAngle = (arm / arms) * 360 + rotation;
    
    // Main arm line
    const armEnd = polarToCartesian(cx, cy, radius, baseAngle);
    elements.push(
      <line
        key={`arm-${arm}`}
        x1={cx}
        y1={cy}
        x2={armEnd.x}
        y2={armEnd.y}
        stroke={primaryColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    );

    // Branches along each arm
    for (let level = 1; level <= branchLevels; level++) {
      const distance = (level / (branchLevels + 1)) * radius;
      const branchLength = radius * 0.3 * (1 - level / (branchLevels + 2));
      const branchPoint = polarToCartesian(cx, cy, distance, baseAngle);

      // Left branch
      const leftAngle = baseAngle - 60;
      const leftEnd = polarToCartesian(branchPoint.x, branchPoint.y, branchLength, leftAngle);
      elements.push(
        <line
          key={`branch-${arm}-${level}-left`}
          x1={branchPoint.x}
          y1={branchPoint.y}
          x2={leftEnd.x}
          y2={leftEnd.y}
          stroke={primaryColor}
          strokeWidth={strokeWidth * 0.7}
          strokeLinecap="round"
        />
      );

      // Right branch
      const rightAngle = baseAngle + 60;
      const rightEnd = polarToCartesian(branchPoint.x, branchPoint.y, branchLength, rightAngle);
      elements.push(
        <line
          key={`branch-${arm}-${level}-right`}
          x1={branchPoint.x}
          y1={branchPoint.y}
          x2={rightEnd.x}
          y2={rightEnd.y}
          stroke={primaryColor}
          strokeWidth={strokeWidth * 0.7}
          strokeLinecap="round"
        />
      );
    }

    // Small crystal at tip
    const tipPoint = polarToCartesian(cx, cy, radius * 0.95, baseAngle);
    elements.push(
      <circle
        key={`tip-${arm}`}
        cx={tipPoint.x}
        cy={tipPoint.y}
        r={strokeWidth}
        fill={secondaryColor}
        stroke={primaryColor}
        strokeWidth={strokeWidth / 2}
      />
    );
  }

  // Center hexagon
  const hexPoints: string[] = [];
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * 360 + rotation;
    const point = polarToCartesian(cx, cy, radius * 0.15, angle);
    hexPoints.push(`${point.x},${point.y}`);
  }

  return (
    <g>
      {elements}
      <polygon
        points={hexPoints.join(' ')}
        fill={secondaryColor}
        stroke={primaryColor}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
    </g>
  );
};

