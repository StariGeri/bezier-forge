"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from './ShapeRegistry';

export const SprocketGenerator = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { count, radius, primaryColor, secondaryColor, strokeWidth, rotation } = config;

  const teeth = Math.max(8, Math.min(20, count));
  const outerRadius = radius * 1.1;
  const valleyRadius = radius * 0.85;
  const holeRadius = radius * 0.35;

  // Generate sprocket path with rounded teeth
  const points: string[] = [];
  const toothAngle = (Math.PI * 2) / teeth;

  for (let i = 0; i < teeth; i++) {
    const angle = i * toothAngle;
    const midAngle = angle + toothAngle / 2;
    
    // Valley point
    const vx = 50 + Math.cos(angle) * valleyRadius;
    const vy = 50 + Math.sin(angle) * valleyRadius;
    
    // Tooth peak
    const px = 50 + Math.cos(midAngle) * outerRadius;
    const py = 50 + Math.sin(midAngle) * outerRadius;
    
    if (i === 0) {
      points.push(`M ${vx} ${vy}`);
    } else {
      points.push(`L ${vx} ${vy}`);
    }
    
    // Arc to tooth peak and back down
    points.push(`Q ${50 + Math.cos(angle + toothAngle * 0.25) * outerRadius} ${50 + Math.sin(angle + toothAngle * 0.25) * outerRadius} ${px} ${py}`);
    points.push(`Q ${50 + Math.cos(midAngle + toothAngle * 0.25) * outerRadius} ${50 + Math.sin(midAngle + toothAngle * 0.25) * outerRadius} ${50 + Math.cos(angle + toothAngle) * valleyRadius} ${50 + Math.sin(angle + toothAngle) * valleyRadius}`);
  }
  
  points.push('Z');

  return (
    <g transform={`rotate(${rotation}, 50, 50)`}>
      {/* Sprocket body */}
      <path
        d={points.join(' ')}
        fill={secondaryColor}
        stroke={primaryColor}
        strokeWidth={strokeWidth}
      />
      
      {/* Center hole */}
      <circle
        cx={50}
        cy={50}
        r={holeRadius}
        fill={secondaryColor}
        stroke={primaryColor}
        strokeWidth={strokeWidth}
      />
      
      {/* Lightening holes */}
      {Array.from({ length: Math.min(4, Math.floor(teeth / 4)) }).map((_, i) => {
        const angle = (i / Math.min(4, Math.floor(teeth / 4))) * Math.PI * 2 + Math.PI / 4;
        const hx = 50 + Math.cos(angle) * (holeRadius + valleyRadius) / 2;
        const hy = 50 + Math.sin(angle) * (holeRadius + valleyRadius) / 2;
        const holeSize = (valleyRadius - holeRadius) * 0.25;
        
        return (
          <circle
            key={i}
            cx={hx}
            cy={hy}
            r={holeSize}
            fill={secondaryColor}
            stroke={primaryColor}
            strokeWidth={strokeWidth * 0.5}
          />
        );
      })}
    </g>
  );
};

