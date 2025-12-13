"use client";

import { useEditorStore } from '@/store/use-store';
import { seededRandom } from '@/lib/random';

export const MazeGenerator = ({ config: overrideConfig }: { config?: any }) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { count, radius, primaryColor, seed, strokeWidth } = config;

  // Simple randomized walls on a grid
  const gridSize = Math.max(5, count);
  const cellSize = (radius * 2) / gridSize;
  const offset = 50 - radius;

  return (
    <g transform={`translate(${offset}, ${offset})`}>
        {Array.from({ length: gridSize }).map((_, x) => 
            Array.from({ length: gridSize }).map((_, y) => {
                const isWallRight = seededRandom(seed + x * y) > 0.5;
                const isWallBottom = seededRandom(seed + x * y + 1000) > 0.5;
                
                return (
                    <g key={`${x}-${y}`}>
                        {isWallRight && (
                            <line
                                x1={(x+1)*cellSize} y1={y*cellSize}
                                x2={(x+1)*cellSize} y2={(y+1)*cellSize}
                                stroke={primaryColor}
                                strokeWidth={strokeWidth}
                            />
                        )}
                        {isWallBottom && (
                            <line
                                x1={x*cellSize} y1={(y+1)*cellSize}
                                x2={(x+1)*cellSize} y2={(y+1)*cellSize}
                                stroke={primaryColor}
                                strokeWidth={strokeWidth}
                            />
                        )}
                    </g>
                )
            })
        )}
        {/* Border */}
        <rect x={0} y={0} width={radius*2} height={radius*2} fill="none" stroke={primaryColor} strokeWidth={strokeWidth} />
    </g>
  );
};

