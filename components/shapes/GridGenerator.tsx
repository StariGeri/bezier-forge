"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from './ShapeRegistry';

export const GridGenerator = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { count, roundness, primaryColor, secondaryColor } = config;

  const gridSize = Math.max(2, Math.floor(Math.sqrt(count))); // Simplified grid size logic
  const cellSize = 100 / gridSize;
  
  const cells = [];
  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
        cells.push({ x: x * cellSize, y: y * cellSize });
    }
  }

  return (
    <g>
       {cells.map((cell, i) => {
         const isCircle = roundness > 50; // Simple threshold
         const cx = cell.x + cellSize / 2;
         const cy = cell.y + cellSize / 2;
         const r = (cellSize / 2) * 0.8;
         
         if (isCircle) {
             return (
                 <circle
                    key={i}
                    cx={cx}
                    cy={cy}
                    r={r}
                    fill={i % 2 === 0 ? primaryColor : secondaryColor}
                 />
             )
         }
         
         return (
             <rect
                key={i}
                x={cell.x + cellSize * 0.1}
                y={cell.y + cellSize * 0.1}
                width={cellSize * 0.8}
                height={cellSize * 0.8}
                fill={i % 2 === 0 ? primaryColor : secondaryColor}
                rx={roundness / 10} // Optional slight rounding
             />
         )
       })}
    </g>
  )
}

