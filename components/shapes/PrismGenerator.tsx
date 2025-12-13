"use client";

import { useEditorStore } from '@/store/use-store';
import { polarToCartesian } from '@/lib/geometry';

export const PrismGenerator = ({ config: overrideConfig }: { config?: any }) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { radius, primaryColor, secondaryColor, strokeWidth, rotation, count } = config;

  const cx = 50;
  const cy = 50;

  // Prism triangle vertices
  const points: { x: number; y: number }[] = [];
  for (let i = 0; i < 3; i++) {
    const angle = (i / 3) * 360 + rotation - 90; // Point up
    points.push(polarToCartesian(cx, cy, radius, angle));
  }

  // Rainbow spectrum colors for light refraction
  const spectrumColors = [
    '#ff0000', // Red
    '#ff7f00', // Orange
    '#ffff00', // Yellow
    '#00ff00', // Green
    '#0000ff', // Blue
    '#4b0082', // Indigo
    '#9400d3', // Violet
  ];

  const rayCount = Math.max(3, Math.min(count / 2, 7));
  const rays: JSX.Element[] = [];

  // Incoming white light ray (left side)
  const entryPoint = {
    x: (points[0].x + points[2].x) / 2,
    y: (points[0].y + points[2].y) / 2,
  };
  const incomingStart = {
    x: entryPoint.x - radius * 0.8,
    y: entryPoint.y - radius * 0.3,
  };

  rays.push(
    <line
      key="incoming"
      x1={incomingStart.x}
      y1={incomingStart.y}
      x2={entryPoint.x}
      y2={entryPoint.y}
      stroke={primaryColor}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
  );

  // Exit point on right side
  const exitPoint = {
    x: (points[0].x + points[1].x) / 2,
    y: (points[0].y + points[1].y) / 2,
  };

  // Refracted rays spreading out
  for (let i = 0; i < rayCount; i++) {
    const t = i / (rayCount - 1);
    const spreadAngle = -20 + t * 50; // Spread from -20 to +30 degrees
    const rayLength = radius * 0.9;
    
    const angleRad = ((rotation + spreadAngle) * Math.PI) / 180;
    const endX = exitPoint.x + Math.cos(angleRad) * rayLength;
    const endY = exitPoint.y + Math.sin(angleRad) * rayLength;

    rays.push(
      <line
        key={`ray-${i}`}
        x1={exitPoint.x}
        y1={exitPoint.y}
        x2={endX}
        y2={endY}
        stroke={spectrumColors[i % spectrumColors.length]}
        strokeWidth={strokeWidth * 0.8}
        strokeLinecap="round"
        opacity={0.9}
      />
    );
  }

  // Internal refraction line
  rays.push(
    <line
      key="internal"
      x1={entryPoint.x}
      y1={entryPoint.y}
      x2={exitPoint.x}
      y2={exitPoint.y}
      stroke={secondaryColor}
      strokeWidth={strokeWidth * 0.5}
      strokeLinecap="round"
      opacity={0.5}
    />
  );

  // Prism triangle with gradient fill
  const prismPath = `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y} L ${points[2].x} ${points[2].y} Z`;

  return (
    <g>
      <defs>
        <linearGradient id="prismGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={secondaryColor} stopOpacity="0.3" />
          <stop offset="50%" stopColor={secondaryColor} stopOpacity="0.1" />
          <stop offset="100%" stopColor={secondaryColor} stopOpacity="0.3" />
        </linearGradient>
      </defs>

      {/* Light rays behind prism */}
      {rays}

      {/* Prism body */}
      <path
        d={prismPath}
        fill="url(#prismGradient)"
        stroke={primaryColor}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />

      {/* Highlight edge */}
      <line
        x1={points[0].x}
        y1={points[0].y}
        x2={points[2].x}
        y2={points[2].y}
        stroke={secondaryColor}
        strokeWidth={strokeWidth / 2}
        strokeLinecap="round"
        opacity={0.6}
      />
    </g>
  );
};

