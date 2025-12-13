"use client";

import { useEditorStore } from '@/store/use-store';

export const PistonGenerator = ({ config: overrideConfig }: { config?: any }) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { count, radius, primaryColor, secondaryColor, strokeWidth, rotation, roundness } = config;

  const pistons = Math.max(1, Math.min(4, Math.floor(count / 3)));
  const pistonWidth = (60 / pistons) - 4;
  const pistonHeight = radius * 0.6;
  const rodWidth = pistonWidth * 0.3;
  const rodHeight = radius * 0.5;
  const cornerRadius = roundness * 1.5;

  const startX = 50 - (pistons * (pistonWidth + 4) - 4) / 2;

  return (
    <g transform={`rotate(${rotation}, 50, 50)`}>
      {Array.from({ length: pistons }).map((_, i) => {
        const x = startX + i * (pistonWidth + 4);
        const offsetY = Math.sin((i / pistons) * Math.PI) * radius * 0.2;
        const pistonTop = 30 + offsetY;
        
        return (
          <g key={i}>
            {/* Connecting rod */}
            <rect
              x={x + pistonWidth / 2 - rodWidth / 2}
              y={pistonTop + pistonHeight}
              width={rodWidth}
              height={rodHeight}
              fill={primaryColor}
              rx={cornerRadius * 0.5}
            />
            
            {/* Rod end circle */}
            <circle
              cx={x + pistonWidth / 2}
              cy={pistonTop + pistonHeight + rodHeight}
              r={rodWidth * 0.8}
              fill={secondaryColor}
              stroke={primaryColor}
              strokeWidth={strokeWidth}
            />
            
            {/* Piston body */}
            <rect
              x={x}
              y={pistonTop}
              width={pistonWidth}
              height={pistonHeight}
              fill={secondaryColor}
              stroke={primaryColor}
              strokeWidth={strokeWidth}
              rx={cornerRadius}
            />
            
            {/* Piston rings */}
            {[0.15, 0.3, 0.45].map((offset, j) => (
              <line
                key={j}
                x1={x}
                y1={pistonTop + pistonHeight * offset}
                x2={x + pistonWidth}
                y2={pistonTop + pistonHeight * offset}
                stroke={primaryColor}
                strokeWidth={strokeWidth * 0.5}
              />
            ))}
            
            {/* Wrist pin */}
            <circle
              cx={x + pistonWidth / 2}
              cy={pistonTop + pistonHeight * 0.75}
              r={rodWidth * 0.5}
              fill={primaryColor}
            />
          </g>
        );
      })}
    </g>
  );
};

