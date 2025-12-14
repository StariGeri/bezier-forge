"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from './ShapeRegistry';

export const SquareCrossGenerator = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { radius, primaryColor, secondaryColor, strokeWidth, rotation } = config;

  const cx = 50;
  const cy = 50;
  const squareSize = radius * 0.6;
  const gap = radius * 0.08;
  const centerRadius = radius * 0.15;

  // Cross made of 4 squares with a center circle
  const squares = [
    { x: cx - squareSize - gap / 2, y: cy - squareSize - gap / 2 }, // top-left
    { x: cx + gap / 2, y: cy - squareSize - gap / 2 },              // top-right
    { x: cx + gap / 2, y: cy + gap / 2 },                           // bottom-right
    { x: cx - squareSize - gap / 2, y: cy + gap / 2 },              // bottom-left
  ];

  return (
    <g transform={`rotate(${rotation}, ${cx}, ${cy})`}>
      {squares.map((sq, i) => (
        <rect
          key={i}
          x={sq.x}
          y={sq.y}
          width={squareSize}
          height={squareSize}
          fill={primaryColor}
          stroke={secondaryColor}
          strokeWidth={strokeWidth > 0 ? strokeWidth * 0.3 : 0}
        />
      ))}
      
      {/* Center circle */}
      <circle
        cx={cx}
        cy={cy}
        r={centerRadius}
        fill={secondaryColor}
      />
    </g>
  );
};



