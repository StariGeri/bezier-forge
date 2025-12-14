"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from '../shapes/ShapeRegistry';

export const SignalTowerLogo = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { primaryColor, roundness } = config;

  // Symmetric signal bars radiating up
  const barWidth = 10;
  const spacing = 8;
  const maxHeight = 60;
  const minHeight = 20;
  const count = 5; // Odd number for center symmetry
  
  const r = (roundness / 100) * (barWidth / 2);
  
  const totalWidth = count * barWidth + (count - 1) * spacing;
  const startX = -totalWidth / 2;
  
  // Center index
  const centerIdx = Math.floor(count / 2);

  return (
    <g transform="translate(50, 50)">
      {Array.from({ length: count }).map((_, i) => {
          // Calculate height based on distance from center
          const dist = Math.abs(i - centerIdx);
          const height = maxHeight - (dist * ((maxHeight - minHeight) / centerIdx));
          
          const x = startX + i * (barWidth + spacing);
          const y = -height / 2; // Center vertically
          
          return (
            <rect
                key={i}
                x={x}
                y={y}
                width={barWidth}
                height={height}
                rx={r}
                fill={primaryColor}
            />
          );
      })}
    </g>
  );
};

