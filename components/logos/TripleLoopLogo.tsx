"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from '../shapes/ShapeRegistry';

export const TripleLoopLogo = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { primaryColor, secondaryColor, roundness } = config;

  // Three interlocking loops
  // Mapped roundness 0-100 to rx 0-20
  const r = (roundness / 100) * 20;
  
  // Triangle configuration
  const centerOffset = 18;
  const size = 36;
  
  // Calculate positions for 3 items in a circle
  const angles = [0, 120, 240];
  
  return (
    <g transform="translate(50, 50)">
        {/* Rotate entire group for better balance */}
      <g transform="rotate(30)">
        {angles.map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x = Math.cos(rad) * centerOffset;
          const y = Math.sin(rad) * centerOffset;
          
          return (
            <rect
              key={i}
              x={x - size / 2}
              y={y - size / 2}
              width={size}
              height={size}
              rx={r}
              fill="none"
              stroke={i === 0 ? primaryColor : (secondaryColor || primaryColor)}
              strokeWidth="6"
              transform={`rotate(${angle} ${x} ${y})`}
            />
          );
        })}
      </g>
    </g>
  );
};

