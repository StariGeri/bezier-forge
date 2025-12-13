"use client";

import { useEditorStore } from '@/store/use-store';

export const PillarGenerator = ({ config: overrideConfig }: { config?: any }) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { count, radius, primaryColor, strokeWidth } = config;

  const pillars = Math.max(3, count);
  const width = (radius * 2) / pillars;
  const gap = width * 0.2;
  const colWidth = width - gap;

  return (
    <g transform={`translate(${50 - radius}, ${50 - radius})`}>
        {/* Top Capital */}
        <rect x={0} y={0} width={radius*2} height={10} fill={primaryColor} />
        
        {/* Columns */}
        {Array.from({ length: pillars }).map((_, i) => (
            <rect
                key={i}
                x={i * width + gap/2}
                y={10}
                width={colWidth}
                height={radius * 2 - 20}
                fill="none"
                stroke={primaryColor}
                strokeWidth={strokeWidth}
            />
        ))}

        {/* Base */}
        <rect x={-5} y={radius*2 - 10} width={radius*2 + 10} height={10} fill={primaryColor} />
    </g>
  );
};

