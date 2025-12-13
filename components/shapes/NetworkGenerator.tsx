"use client";

import { useEditorStore } from '@/store/use-store';
import { polarToCartesian } from '@/lib/geometry';

export const NetworkGenerator = ({ config: overrideConfig }: { config?: any }) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { count, radius, primaryColor, strokeWidth } = config;

  const nodes = Math.max(4, count);
  const points = [];
  
  for (let i = 0; i < nodes; i++) {
      const angle = (i / nodes) * 360;
      points.push(polarToCartesian(50, 50, radius, angle));
  }
  
  // Add center point
  points.push({ x: 50, y: 50 });

  return (
    <g>
        {/* Connections */}
        {points.map((p1, i) => 
            points.map((p2, j) => {
                if (i >= j) return null; // Avoid duplicates
                // Connect if close enough or random logic? Let's connect all to center + neighbors
                const isCenter = i === nodes || j === nodes;
                const isNeighbor = Math.abs(i - j) === 1 || Math.abs(i - j) === nodes - 1;
                
                if (isCenter || isNeighbor) {
                     return (
                         <line
                            key={`${i}-${j}`}
                            x1={p1.x} y1={p1.y}
                            x2={p2.x} y2={p2.y}
                            stroke={primaryColor}
                            strokeWidth={strokeWidth}
                            opacity={0.5}
                         />
                     )
                }
                return null;
            })
        )}
        
        {/* Nodes */}
        {points.map((p, i) => (
            <circle
                key={i}
                cx={p.x}
                cy={p.y}
                r={strokeWidth * 1.5}
                fill={primaryColor}
            />
        ))}
    </g>
  );
};

