"use client";

import { useEditorStore } from '@/store/use-store';
import { seededRandom } from '@/lib/random';

export const CircuitGenerator = ({ config: overrideConfig }: { config?: any }) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { count, radius, primaryColor, strokeWidth, seed } = config;

  // PCB traces
  const traces = Math.max(3, count);
  
  return (
    <g>
        {Array.from({ length: traces }).map((_, i) => {
             const startX = seededRandom(seed + i) * 100;
             const startY = seededRandom(seed + i + 100) * 100;
             const endX = seededRandom(seed + i + 200) * 100;
             const midY = startY; // 90 degree bends
             
             return (
                 <g key={i}>
                    <circle cx={startX} cy={startY} r={strokeWidth * 1.5} fill={primaryColor} />
                    <path
                        d={`M ${startX} ${startY} L ${endX} ${startY} L ${endX} ${endX > 50 ? 90 : 10}`}
                        fill="none"
                        stroke={primaryColor}
                        strokeWidth={strokeWidth}
                    />
                     <circle cx={endX} cy={endX > 50 ? 90 : 10} r={strokeWidth} fill={primaryColor} />
                 </g>
             )
        })}
    </g>
  );
};

