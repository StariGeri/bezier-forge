"use client";

import { useEditorStore } from '@/store/use-store';

export const CylinderGenerator = ({ config: overrideConfig }: { config?: any }) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { count, radius, primaryColor, secondaryColor } = config;

  const stackHeight = Math.max(2, count * 2);
  const coinHeight = 10;
  
  return (
    <g transform="translate(50, 20)">
        {Array.from({ length: stackHeight }).map((_, i) => {
            const y = i * (coinHeight / 2); // Overlap
            const width = radius * 2;
            const height = radius; // Oval height
            
            return (
                <g key={i} transform={`translate(0, ${y})`}>
                    {/* Side */}
                    <path
                        d={`M ${-width/2} 0 L ${-width/2} ${coinHeight} A ${width/2} ${height/2} 0 0 0 ${width/2} ${coinHeight} L ${width/2} 0`}
                        fill={secondaryColor}
                    />
                     {/* Top */}
                    <ellipse
                        cx={0}
                        cy={0}
                        rx={width/2}
                        ry={height/2}
                        fill={primaryColor}
                        stroke={secondaryColor}
                        strokeWidth={1}
                    />
                </g>
            )
        })}
    </g>
  );
};

