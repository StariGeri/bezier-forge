"use client";

import { useEditorStore } from '@/store/use-store';
import { seededRandom } from '@/lib/random';
import { d3Delaunay } from 'd3-delaunay';

// Note: d3-delaunay is not installed, so we'll simulate a simple voronoi-ish or mosaic pattern 
// using a grid with random offsets to avoid adding a heavy dependency if not needed.
// Or we can use a simpler approach: Random triangles.

export const MosaicGenerator = ({ config: overrideConfig }: { config?: any }) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { count, radius, primaryColor, secondaryColor, seed } = config;

  // Generate random triangles within the radius
  const items = Math.max(5, count * 3);
  const triangles = [];
  
  for (let i = 0; i < items; i++) {
      const r = seededRandom(seed + i) * radius;
      const angle = seededRandom(seed + i + 1000) * 360;
      const size = 5 + seededRandom(seed + i + 2000) * 15;
      
      triangles.push({
          x: 50 + r * Math.cos(angle * Math.PI / 180),
          y: 50 + r * Math.sin(angle * Math.PI / 180),
          size,
          rotation: seededRandom(seed + i + 3000) * 360,
          color: i % 2 === 0 ? primaryColor : secondaryColor
      });
  }

  return (
    <g>
        {triangles.map((t, i) => (
            <path
                key={i}
                d={`M 0 ${-t.size/2} L ${t.size/2} ${t.size/2} L ${-t.size/2} ${t.size/2} Z`}
                fill={t.color}
                opacity={0.8}
                transform={`translate(${t.x}, ${t.y}) rotate(${t.rotation})`}
            />
        ))}
    </g>
  );
};

