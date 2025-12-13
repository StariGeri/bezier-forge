"use client";

import { useEditorStore } from '@/store/use-store';

export const OrbitGenerator = ({ config: overrideConfig }: { config?: any }) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { count, radius, primaryColor, secondaryColor, rotation } = config;

  const orbits = Math.max(2, Math.floor(count / 2));
  
  return (
    <g transform={`translate(50,50) rotate(${rotation})`}>
        <circle cx={0} cy={0} r={radius * 0.2} fill={primaryColor} />
        
        {Array.from({ length: orbits }).map((_, i) => (
            <g key={i} transform={`rotate(${i * (180/orbits)})`}>
                <ellipse
                    cx={0}
                    cy={0}
                    rx={radius * (0.5 + i * 0.2)}
                    ry={radius * 0.2}
                    fill="none"
                    stroke={primaryColor}
                    strokeWidth={1}
                />
                <circle
                    cx={radius * (0.5 + i * 0.2)}
                    cy={0}
                    r={3}
                    fill={secondaryColor}
                />
            </g>
        ))}
    </g>
  );
};

