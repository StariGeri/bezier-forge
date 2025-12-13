"use client";

import { useEditorStore } from '@/store/use-store';
import { polarToCartesian } from '@/lib/geometry';
import { ShapeGeneratorProps } from './ShapeRegistry';

export const CompassGenerator = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { radius, primaryColor, secondaryColor, strokeWidth, rotation, count } = config;

  const cx = 50;
  const cy = 50;
  const cardinalCount = 4; // N, E, S, W
  const interCardinalCount = 4; // NE, SE, SW, NW
  const minorPoints = Math.max(0, Math.min(count - 8, 8)); // Additional minor points

  const elements: React.ReactElement[] = [];

  // Outer circle
  elements.push(
    <circle
      key="outer-ring"
      cx={cx}
      cy={cy}
      r={radius}
      fill="none"
      stroke={primaryColor}
      strokeWidth={strokeWidth}
    />
  );

  // Inner decorative circle
  elements.push(
    <circle
      key="inner-ring"
      cx={cx}
      cy={cy}
      r={radius * 0.85}
      fill="none"
      stroke={primaryColor}
      strokeWidth={strokeWidth / 2}
    />
  );

  // Cardinal points (N, E, S, W) - Large triangular points
  for (let i = 0; i < cardinalCount; i++) {
    const angle = (i / cardinalCount) * 360 + rotation - 90; // Start from North
    const tipPoint = polarToCartesian(cx, cy, radius * 0.95, angle);
    const baseLeft = polarToCartesian(cx, cy, radius * 0.25, angle - 15);
    const baseRight = polarToCartesian(cx, cy, radius * 0.25, angle + 15);

    // Primary direction (filled)
    elements.push(
      <polygon
        key={`cardinal-${i}`}
        points={`${tipPoint.x},${tipPoint.y} ${baseLeft.x},${baseLeft.y} ${cx},${cy} ${baseRight.x},${baseRight.y}`}
        fill={i === 0 ? primaryColor : secondaryColor}
        stroke={primaryColor}
        strokeWidth={strokeWidth / 2}
        strokeLinejoin="round"
      />
    );

    // Opposite half (outline)
    const oppositeAngle = angle + 180;
    const oppositeTip = polarToCartesian(cx, cy, radius * 0.6, oppositeAngle);
    const oppositeLeft = polarToCartesian(cx, cy, radius * 0.25, oppositeAngle - 12);
    const oppositeRight = polarToCartesian(cx, cy, radius * 0.25, oppositeAngle + 12);

    elements.push(
      <polygon
        key={`cardinal-opposite-${i}`}
        points={`${oppositeTip.x},${oppositeTip.y} ${oppositeLeft.x},${oppositeLeft.y} ${cx},${cy} ${oppositeRight.x},${oppositeRight.y}`}
        fill="none"
        stroke={primaryColor}
        strokeWidth={strokeWidth / 2}
        strokeLinejoin="round"
      />
    );
  }

  // Inter-cardinal points (NE, SE, SW, NW) - Smaller points
  for (let i = 0; i < interCardinalCount; i++) {
    const angle = (i / interCardinalCount) * 360 + rotation - 45; // Start from NE
    const tipPoint = polarToCartesian(cx, cy, radius * 0.7, angle);
    const baseLeft = polarToCartesian(cx, cy, radius * 0.2, angle - 10);
    const baseRight = polarToCartesian(cx, cy, radius * 0.2, angle + 10);

    elements.push(
      <polygon
        key={`intercardinal-${i}`}
        points={`${tipPoint.x},${tipPoint.y} ${baseLeft.x},${baseLeft.y} ${cx},${cy} ${baseRight.x},${baseRight.y}`}
        fill="none"
        stroke={primaryColor}
        strokeWidth={strokeWidth / 2}
        strokeLinejoin="round"
      />
    );
  }

  // Minor tick marks
  for (let i = 0; i < minorPoints; i++) {
    const angle = (i / minorPoints) * 360 + rotation + (360 / minorPoints / 2);
    const outerPoint = polarToCartesian(cx, cy, radius * 0.95, angle);
    const innerPoint = polarToCartesian(cx, cy, radius * 0.88, angle);

    elements.push(
      <line
        key={`minor-${i}`}
        x1={innerPoint.x}
        y1={innerPoint.y}
        x2={outerPoint.x}
        y2={outerPoint.y}
        stroke={primaryColor}
        strokeWidth={strokeWidth / 2}
        strokeLinecap="round"
      />
    );
  }

  // Center hub
  elements.push(
    <circle
      key="center-hub"
      cx={cx}
      cy={cy}
      r={radius * 0.08}
      fill={primaryColor}
      stroke={primaryColor}
      strokeWidth={strokeWidth / 2}
    />
  );

  return <g>{elements}</g>;
};

