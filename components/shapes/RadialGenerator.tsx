"use client";

import { useEditorStore } from '@/store/use-store';

export const RadialGenerator = ({ config: overrideConfig }: { config?: any }) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { count, radius, rotation, primaryColor } = config;
  
  // Create an array of length 'count'
  const items = Array.from({ length: Math.max(1, count) }); // Ensure at least 1

  return (
    <g transform={`translate(50, 50) rotate(${rotation})`}>
      {items.map((_, i) => (
        <ellipse
          key={i}
          cx={radius} // Distance from center
          cy="0"
          rx="10" 
          ry="4"
          fill={primaryColor}
          transform={`rotate(${(360 / items.length) * i})`}
        />
      ))}
    </g>
  );
};

