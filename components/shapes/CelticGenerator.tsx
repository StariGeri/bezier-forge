"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from './ShapeRegistry';

export const CelticGenerator = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { count, radius, primaryColor, secondaryColor, strokeWidth, rotation } = config;

  const loops = Math.max(3, Math.min(8, count));
  const knotRadius = radius * 0.9;
  
  // Generate interlocking loops
  const paths: string[] = [];
  
  for (let i = 0; i < loops; i++) {
    const angle = (i / loops) * Math.PI * 2;
    const nextAngle = ((i + 1) / loops) * Math.PI * 2;
    
    const x1 = 50 + Math.cos(angle) * knotRadius * 0.5;
    const y1 = 50 + Math.sin(angle) * knotRadius * 0.5;
    const x2 = 50 + Math.cos(angle) * knotRadius;
    const y2 = 50 + Math.sin(angle) * knotRadius;
    const x3 = 50 + Math.cos(nextAngle) * knotRadius;
    const y3 = 50 + Math.sin(nextAngle) * knotRadius;
    const x4 = 50 + Math.cos(nextAngle) * knotRadius * 0.5;
    const y4 = 50 + Math.sin(nextAngle) * knotRadius * 0.5;
    
    // Control points for smooth curves
    const cpx1 = 50 + Math.cos(angle + Math.PI / loops) * knotRadius * 0.8;
    const cpy1 = 50 + Math.sin(angle + Math.PI / loops) * knotRadius * 0.8;
    
    paths.push(`M ${x1} ${y1} Q ${x2} ${y2} ${cpx1} ${cpy1} Q ${x3} ${y3} ${x4} ${y4}`);
  }

  return (
    <g transform={`rotate(${rotation}, 50, 50)`}>
      {/* Background band */}
      <circle
        cx={50}
        cy={50}
        r={knotRadius * 0.75}
        fill="none"
        stroke={secondaryColor}
        strokeWidth={strokeWidth * 3}
        opacity={0.3}
      />
      
      {/* Knot paths */}
      {paths.map((path, i) => (
        <path
          key={i}
          d={path}
          fill="none"
          stroke={primaryColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
      ))}
      
      {/* Inner decorative circle */}
      <circle
        cx={50}
        cy={50}
        r={knotRadius * 0.3}
        fill="none"
        stroke={primaryColor}
        strokeWidth={strokeWidth}
      />
      
      {/* Outer decorative circle */}
      <circle
        cx={50}
        cy={50}
        r={knotRadius}
        fill="none"
        stroke={primaryColor}
        strokeWidth={strokeWidth}
      />
    </g>
  );
};

