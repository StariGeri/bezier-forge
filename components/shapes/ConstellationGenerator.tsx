"use client";

import { useEditorStore } from '@/store/use-store';
import { seededRandom } from '@/lib/random';
import { ShapeGeneratorProps } from './ShapeRegistry';

export const ConstellationGenerator = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { count, radius, primaryColor, strokeWidth, seed } = config;

  const stars = Math.max(4, count);
  
  // Generate star positions
  const starPositions = Array.from({ length: stars }).map((_, i) => ({
    x: 15 + seededRandom(seed + i) * 70,
    y: 15 + seededRandom(seed + i + 100) * 70,
    size: 1 + seededRandom(seed + i + 200) * 2,
  }));

  // Connect stars with lines (connect to nearest neighbors)
  const lines: React.ReactElement[] = [];
  const usedConnections = new Set<string>();
  
  starPositions.forEach((star, i) => {
    // Find 1-2 nearest stars to connect
    const distances = starPositions
      .map((other, j) => ({ index: j, dist: Math.hypot(star.x - other.x, star.y - other.y) }))
      .filter(d => d.index !== i)
      .sort((a, b) => a.dist - b.dist);
    
    const connections = Math.min(2, distances.length);
    for (let c = 0; c < connections; c++) {
      const key = [Math.min(i, distances[c].index), Math.max(i, distances[c].index)].join('-');
      if (!usedConnections.has(key) && distances[c].dist < radius) {
        usedConnections.add(key);
        const other = starPositions[distances[c].index];
        lines.push(
          <line
            key={key}
            x1={star.x}
            y1={star.y}
            x2={other.x}
            y2={other.y}
            stroke={primaryColor}
            strokeWidth={strokeWidth * 0.3}
            opacity={0.5}
          />
        );
      }
    }
  });

  return (
    <g>
      {lines}
      {starPositions.map((star, i) => (
        <circle
          key={i}
          cx={star.x}
          cy={star.y}
          r={star.size}
          fill={primaryColor}
        />
      ))}
    </g>
  );
};

