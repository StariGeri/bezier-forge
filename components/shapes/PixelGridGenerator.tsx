"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from './ShapeRegistry';

export const PixelGridGenerator = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { count, primaryColor } = config;

  const gridSize = Math.max(5, Math.floor(Math.sqrt(count * 5))); 
  const cellSize = 100 / gridSize;
  
  // Create a symmetric pixel art invader-ish shape
  const cells = [];
  for (let x = 0; x < Math.ceil(gridSize / 2); x++) {
      for (let y = 0; y < gridSize; y++) {
          // Determine if filled based on some math pattern
          const isFilled = Math.sin(x * y * count) > 0; // Pseudo-random pattern
          if (isFilled) {
              cells.push({ x, y });
              // Mirror
              if (x !== gridSize - 1 - x) {
                 cells.push({ x: gridSize - 1 - x, y });
              }
          }
      }
  }

  return (
    <g>
        {cells.map((cell, i) => (
            <rect
                key={i}
                x={cell.x * cellSize}
                y={cell.y * cellSize}
                width={cellSize}
                height={cellSize}
                fill={primaryColor}
            />
        ))}
    </g>
  );
};

