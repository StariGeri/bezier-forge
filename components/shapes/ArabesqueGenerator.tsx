"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from './ShapeRegistry';

export const ArabesqueGenerator = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { count, radius, primaryColor, secondaryColor, strokeWidth, rotation } = config;

  const points = Math.max(6, Math.min(12, count));
  const outerRadius = radius * 1.1;
  const innerRadius = radius * 0.4;
  
  // Generate star polygon points
  const starPoints: { x: number; y: number }[] = [];
  for (let i = 0; i < points * 2; i++) {
    const angle = (i / (points * 2)) * Math.PI * 2 - Math.PI / 2;
    const r = i % 2 === 0 ? outerRadius : innerRadius;
    starPoints.push({
      x: 50 + Math.cos(angle) * r,
      y: 50 + Math.sin(angle) * r
    });
  }
  
  const starPath = starPoints.map((p, i) => 
    `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`
  ).join(' ') + ' Z';

  // Generate interlocking geometric pattern
  const innerPatternRadius = radius * 0.6;
  
  return (
    <g transform={`rotate(${rotation}, 50, 50)`}>
      {/* Main star */}
      <path
        d={starPath}
        fill={secondaryColor}
        stroke={primaryColor}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      
      {/* Inner geometric pattern */}
      {Array.from({ length: points }).map((_, i) => {
        const angle = (i / points) * Math.PI * 2;
        const nextAngle = ((i + 1) / points) * Math.PI * 2;
        
        const x1 = 50 + Math.cos(angle) * innerPatternRadius;
        const y1 = 50 + Math.sin(angle) * innerPatternRadius;
        const x2 = 50 + Math.cos(nextAngle) * innerPatternRadius;
        const y2 = 50 + Math.sin(nextAngle) * innerPatternRadius;
        
        return (
          <g key={i}>
            <line
              x1={50}
              y1={50}
              x2={x1}
              y2={y1}
              stroke={primaryColor}
              strokeWidth={strokeWidth * 0.5}
              opacity={0.5}
            />
            <line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={primaryColor}
              strokeWidth={strokeWidth * 0.5}
              opacity={0.5}
            />
          </g>
        );
      })}
      
      {/* Central circle */}
      <circle
        cx={50}
        cy={50}
        r={radius * 0.15}
        fill={primaryColor}
      />
    </g>
  );
};

