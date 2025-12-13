"use client";

import { useEditorStore } from '@/store/use-store';

export const TrailGenerator = ({ config: overrideConfig }: { config?: any }) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { count, radius, primaryColor, strokeWidth, rotation } = config;

  const lines = Math.max(3, count);
  const cx = 50;
  const cy = 50;

  return (
    <g transform={`rotate(${rotation} ${cx} ${cy})`}>
      {/* Central object */}
      <circle cx={cx + radius * 0.3} cy={cy} r={radius * 0.15} fill={primaryColor} />
      
      {/* Speed lines */}
      {Array.from({ length: lines }).map((_, i) => {
        const yOffset = ((i - (lines - 1) / 2) / lines) * radius * 1.5;
        const lineLength = radius * (0.5 + (1 - Math.abs(yOffset) / (radius * 0.75)) * 0.5);
        const startX = cx - radius * 0.5;
        
        return (
          <line
            key={i}
            x1={startX}
            y1={cy + yOffset}
            x2={startX - lineLength}
            y2={cy + yOffset}
            stroke={primaryColor}
            strokeWidth={strokeWidth * 0.5}
            strokeLinecap="round"
            opacity={0.3 + (1 - Math.abs(yOffset) / (radius * 0.75)) * 0.7}
          />
        );
      })}
    </g>
  );
};

