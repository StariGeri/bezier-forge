"use client";

import { useEditorStore } from '@/store/use-store';

export const CloudGenerator = ({ config: overrideConfig }: { config?: any }) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { count, radius, primaryColor } = config;
  
  // Simple cloud: multiple circles
  const puffs = Math.max(3, count);
  const puffRadius = radius / 2;
  
  return (
    <g transform="translate(50,50)">
        {Array.from({ length: puffs }).map((_, i) => {
            const angle = (i / puffs) * Math.PI * 2;
            const x = Math.cos(angle) * (radius * 0.6);
            const y = Math.sin(angle) * (radius * 0.4) + (radius * 0.1);
            return (
                <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r={puffRadius}
                    fill={primaryColor}
                />
            )
        })}
        {/* Center filler */}
        <circle cx={0} cy={0} r={radius * 0.7} fill={primaryColor} />
    </g>
  );
};

