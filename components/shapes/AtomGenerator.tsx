"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from './ShapeRegistry';

export const AtomGenerator = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { count, radius, primaryColor, secondaryColor, strokeWidth, rotation } = config;

  const orbits = Math.max(2, Math.min(6, count));
  const orbitRadius = radius * 1.1;
  const nucleusRadius = radius * 0.15;
  const electronRadius = radius * 0.06;

  return (
    <g transform={`rotate(${rotation}, 50, 50)`}>
      {/* Nucleus */}
      <circle
        cx={50}
        cy={50}
        r={nucleusRadius}
        fill={primaryColor}
      />
      
      {/* Electron orbits */}
      {Array.from({ length: orbits }).map((_, i) => {
        const angle = (i / orbits) * 180;
        // Create elliptical orbit
        const scaleY = 0.3 + (i / orbits) * 0.2;
        
        return (
          <g key={i} transform={`rotate(${angle}, 50, 50)`}>
            <ellipse
              cx={50}
              cy={50}
              rx={orbitRadius}
              ry={orbitRadius * scaleY}
              fill="none"
              stroke={primaryColor}
              strokeWidth={strokeWidth * 0.5}
              opacity={0.6}
            />
            {/* Electron on orbit */}
            <circle
              cx={50 + orbitRadius}
              cy={50}
              r={electronRadius}
              fill={secondaryColor}
            />
          </g>
        );
      })}
    </g>
  );
};

