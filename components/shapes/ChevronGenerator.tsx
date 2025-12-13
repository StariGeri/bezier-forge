"use client";

import { useEditorStore } from '@/store/use-store';

export const ChevronGenerator = ({ config: overrideConfig }: { config?: any }) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { count, radius, primaryColor, strokeWidth, rotation } = config;

  const chevrons = Math.max(2, Math.min(count, 8));
  const cx = 50;
  const cy = 50;
  const width = radius * 1.5;
  const spacing = radius / chevrons;

  return (
    <g transform={`rotate(${rotation} ${cx} ${cy})`}>
      {Array.from({ length: chevrons }).map((_, i) => {
        const y = cy - (chevrons / 2) * spacing + i * spacing;
        const opacity = 1 - (i * 0.1);
        
        return (
          <path
            key={i}
            d={`M ${cx - width / 2} ${y} L ${cx} ${y + spacing * 0.8} L ${cx + width / 2} ${y}`}
            fill="none"
            stroke={primaryColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={opacity}
          />
        );
      })}
    </g>
  );
};

