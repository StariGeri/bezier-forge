"use client";

import { useEditorStore } from '@/store/use-store';

export const GearGenerator = ({ config: overrideConfig }: { config?: any }) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { count, radius, primaryColor, secondaryColor, strokeWidth, rotation } = config;

  const teeth = Math.max(6, Math.min(24, count));
  const outerRadius = radius * 1.1;
  const innerRadius = radius * 0.85;
  const holeRadius = radius * 0.25;
  
  // Generate gear tooth path
  const toothAngle = (Math.PI * 2) / teeth;
  const toothWidth = toothAngle * 0.4;
  
  const points: string[] = [];
  
  for (let i = 0; i < teeth; i++) {
    const baseAngle = i * toothAngle;
    
    // Inner corner 1
    const a1 = baseAngle;
    points.push(`${i === 0 ? 'M' : 'L'} ${50 + Math.cos(a1) * innerRadius} ${50 + Math.sin(a1) * innerRadius}`);
    
    // Outer corner 1
    const a2 = baseAngle + toothWidth * 0.3;
    points.push(`L ${50 + Math.cos(a2) * outerRadius} ${50 + Math.sin(a2) * outerRadius}`);
    
    // Outer corner 2
    const a3 = baseAngle + toothWidth;
    points.push(`L ${50 + Math.cos(a3) * outerRadius} ${50 + Math.sin(a3) * outerRadius}`);
    
    // Inner corner 2
    const a4 = baseAngle + toothWidth + toothWidth * 0.3;
    points.push(`L ${50 + Math.cos(a4) * innerRadius} ${50 + Math.sin(a4) * innerRadius}`);
  }
  
  points.push('Z');
  const gearPath = points.join(' ');

  return (
    <g transform={`rotate(${rotation}, 50, 50)`}>
      {/* Gear body */}
      <path
        d={gearPath}
        fill={secondaryColor}
        stroke={primaryColor}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
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
      
      {/* Spokes */}
      {Array.from({ length: Math.min(6, Math.floor(teeth / 3)) }).map((_, i) => {
        const angle = (i / Math.min(6, Math.floor(teeth / 3))) * Math.PI * 2;
        return (
          <line
            key={i}
            x1={50 + Math.cos(angle) * holeRadius}
            y1={50 + Math.sin(angle) * holeRadius}
            x2={50 + Math.cos(angle) * innerRadius * 0.7}
            y2={50 + Math.sin(angle) * innerRadius * 0.7}
            stroke={primaryColor}
            strokeWidth={strokeWidth}
          />
        );
      })}
    </g>
  );
};

