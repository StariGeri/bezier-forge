"use client";

import { useEditorStore } from '@/store/use-store';

export const SeigaihaGenerator = ({ config: overrideConfig }: { config?: any }) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { count, radius, primaryColor, secondaryColor, strokeWidth, rotation } = config;

  const cols = Math.max(3, Math.min(8, count));
  const arcRadius = radius * 0.25;
  const overlap = arcRadius * 0.5;
  
  const arcs: { cx: number; cy: number; layer: number }[] = [];
  
  // Generate wave pattern grid
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < cols; col++) {
      const offset = row % 2 === 0 ? 0 : arcRadius;
      const cx = 10 + col * arcRadius * 2 + offset;
      const cy = 25 + row * (arcRadius - overlap);
      
      if (cx >= 5 && cx <= 95 && cy >= 10 && cy <= 90) {
        arcs.push({ cx, cy, layer: row });
      }
    }
  }

  return (
    <g transform={`rotate(${rotation}, 50, 50)`}>
      {/* Clip to circular region */}
      <defs>
        <clipPath id="seigaiha-clip">
          <circle cx={50} cy={50} r={radius * 1.1} />
        </clipPath>
      </defs>
      
      <g clipPath="url(#seigaiha-clip)">
        {arcs.map((arc, i) => (
          <g key={i}>
            {/* Multiple concentric arcs */}
            {[1, 0.7, 0.4].map((scale, j) => (
              <path
                key={j}
                d={`M ${arc.cx - arcRadius * scale} ${arc.cy} A ${arcRadius * scale} ${arcRadius * scale} 0 0 1 ${arc.cx + arcRadius * scale} ${arc.cy}`}
                fill="none"
                stroke={j % 2 === 0 ? primaryColor : secondaryColor}
                strokeWidth={strokeWidth * 0.5}
              />
            ))}
          </g>
        ))}
      </g>
      
      {/* Outer border */}
      <circle
        cx={50}
        cy={50}
        r={radius * 1.1}
        fill="none"
        stroke={primaryColor}
        strokeWidth={strokeWidth}
      />
    </g>
  );
};

