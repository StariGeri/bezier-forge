"use client";

import { useEditorStore } from '@/store/use-store';

export const TurbineGenerator = ({ config: overrideConfig }: { config?: any }) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { count, radius, primaryColor, secondaryColor, strokeWidth, rotation } = config;

  const blades = Math.max(3, Math.min(12, count));
  const bladeLength = radius * 1.0;
  const bladeWidth = radius * 0.2;
  const hubRadius = radius * 0.15;

  return (
    <g transform={`rotate(${rotation}, 50, 50)`}>
      {/* Blades */}
      {Array.from({ length: blades }).map((_, i) => {
        const angle = (i / blades) * 360;
        
        // Curved blade path
        const bladePath = `
          M 50 ${50 - hubRadius}
          Q ${50 + bladeWidth} ${50 - bladeLength * 0.3}
            ${50 + bladeWidth * 0.5} ${50 - bladeLength}
          Q ${50 - bladeWidth * 0.3} ${50 - bladeLength * 0.7}
            50 ${50 - hubRadius}
          Z
        `;
        
        return (
          <g key={i} transform={`rotate(${angle}, 50, 50)`}>
            <path
              d={bladePath}
              fill={i % 2 === 0 ? primaryColor : secondaryColor}
              stroke={primaryColor}
              strokeWidth={strokeWidth * 0.5}
              strokeLinejoin="round"
            />
          </g>
        );
      })}
      
      {/* Center hub */}
      <circle
        cx={50}
        cy={50}
        r={hubRadius}
        fill={secondaryColor}
        stroke={primaryColor}
        strokeWidth={strokeWidth}
      />
      
      {/* Hub center */}
      <circle
        cx={50}
        cy={50}
        r={hubRadius * 0.4}
        fill={primaryColor}
      />
    </g>
  );
};

