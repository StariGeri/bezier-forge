"use client";

import { useEditorStore } from '@/store/use-store';
import { seededRandom } from '@/lib/random';

export const BokehGenerator = ({ config: overrideConfig }: { config?: any }) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { count, radius, primaryColor, secondaryColor, rotation, seed } = config;

  const circles = Math.max(5, Math.min(25, count * 2));
  
  // Generate bokeh circles with seeded random positions
  const bokehElements: { x: number; y: number; r: number; opacity: number; color: string }[] = [];
  
  for (let i = 0; i < circles; i++) {
    const x = 10 + seededRandom(seed + i * 3) * 80;
    const y = 10 + seededRandom(seed + i * 7) * 80;
    const r = radius * (0.05 + seededRandom(seed + i * 11) * 0.15);
    const opacity = 0.2 + seededRandom(seed + i * 13) * 0.5;
    const color = seededRandom(seed + i * 17) > 0.5 ? primaryColor : secondaryColor;
    
    bokehElements.push({ x, y, r, opacity, color });
  }

  // Sort by size for depth effect (larger in back)
  bokehElements.sort((a, b) => b.r - a.r);

  return (
    <g transform={`rotate(${rotation}, 50, 50)`}>
      {bokehElements.map((el, i) => (
        <circle
          key={i}
          cx={el.x}
          cy={el.y}
          r={el.r}
          fill={el.color}
          opacity={el.opacity}
        />
      ))}
    </g>
  );
};

