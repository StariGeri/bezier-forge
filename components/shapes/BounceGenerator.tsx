"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from './ShapeRegistry';

export const BounceGenerator = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { count, radius, primaryColor, strokeWidth, rotation } = config;

  const bounces = Math.max(2, Math.min(count / 2, 5));
  const cx = 50;
  const cy = 50;

  // Generate bouncing arc path
  let pathData = 'M 10 70';
  const totalWidth = 80;
  const bounceWidth = totalWidth / bounces;
  
  for (let i = 0; i < bounces; i++) {
    const startX = 10 + i * bounceWidth;
    const endX = startX + bounceWidth;
    const peakY = 70 - radius * (1 - i * 0.2); // Decreasing height
    const controlX = (startX + endX) / 2;
    
    pathData += ` Q ${controlX} ${peakY} ${endX} 70`;
  }

  return (
    <g transform={`rotate(${rotation} ${cx} ${cy})`}>
      {/* Bounce path */}
      <path
        d={pathData}
        fill="none"
        stroke={primaryColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      
      {/* Ball at current position */}
      <circle
        cx={10}
        cy={70}
        r={radius * 0.15}
        fill={primaryColor}
      />
      
      {/* Ground line */}
      <line
        x1={5}
        y1={72}
        x2={95}
        y2={72}
        stroke={primaryColor}
        strokeWidth={strokeWidth * 0.5}
        opacity={0.3}
      />
    </g>
  );
};

