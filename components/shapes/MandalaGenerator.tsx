"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from './ShapeRegistry';

export const MandalaGenerator = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { count, radius, primaryColor, secondaryColor, strokeWidth, rotation } = config;

  const layers = Math.max(2, Math.min(5, Math.floor(count / 3)));
  const petalsPerLayer = Math.max(6, count);
  
  return (
    <g transform={`rotate(${rotation}, 50, 50)`}>
      {/* Generate multiple layers */}
      {Array.from({ length: layers }).map((_, layerIndex) => {
        const layerRadius = radius * (0.3 + (layerIndex / layers) * 0.7);
        const petalCount = petalsPerLayer + layerIndex * 2;
        const petalLength = layerRadius * 0.4;
        const petalWidth = layerRadius * 0.15;
        
        return (
          <g key={layerIndex}>
            {/* Circle for this layer */}
            <circle
              cx={50}
              cy={50}
              r={layerRadius}
              fill="none"
              stroke={primaryColor}
              strokeWidth={strokeWidth * 0.5}
              opacity={0.3}
            />
            
            {/* Petals for this layer */}
            {Array.from({ length: petalCount }).map((_, petalIndex) => {
              const angle = (petalIndex / petalCount) * 360 + (layerIndex * 15);
              const isAlternate = petalIndex % 2 === 0;
              
              return (
                <g key={petalIndex} transform={`rotate(${angle}, 50, 50)`}>
                  <ellipse
                    cx={50}
                    cy={50 - layerRadius + petalLength / 2}
                    rx={petalWidth}
                    ry={petalLength}
                    fill={isAlternate ? primaryColor : secondaryColor}
                    stroke={primaryColor}
                    strokeWidth={strokeWidth * 0.3}
                    opacity={0.8}
                  />
                </g>
              );
            })}
          </g>
        );
      })}
      
      {/* Central dot */}
      <circle
        cx={50}
        cy={50}
        r={radius * 0.08}
        fill={primaryColor}
      />
    </g>
  );
};

