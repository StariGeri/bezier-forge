"use client";

import { useEditorStore } from '@/store/use-store';
import { polarToCartesian } from '@/lib/geometry';

export const TorusGenerator = ({ config: overrideConfig }: { config?: any }) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { count, radius, primaryColor, rotation } = config;

  const rings = Math.max(3, count);
  
  return (
    <g transform={`translate(50,50) rotate(${rotation})`}>
        {Array.from({ length: rings }).map((_, i) => {
            const angle = (i / rings) * 180; // 180 cover for full sphere illusion
            return (
                <ellipse
                    key={i}
                    cx={0}
                    cy={0}
                    rx={radius}
                    ry={radius / 3}
                    fill="none"
                    stroke={primaryColor}
                    transform={`rotate(${angle})`}
                />
            )
        })}
    </g>
  );
};

